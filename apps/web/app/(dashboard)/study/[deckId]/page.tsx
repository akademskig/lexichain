"use client";

import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    LinearProgress,
    Stack,
    IconButton,
    CircularProgress,
    Alert,
} from "@mui/material";
import { Close, Lightbulb } from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { Flashcard } from "../../../components/study/Flashcard";
import { QuizCard } from "../../../components/study/QuizCard";

interface QuizOption {
    text: string;
    isCorrect: boolean;
}

interface Card {
    id: string;
    front: string;
    back: string;
    type: string;
    quizOptions?: QuizOption[];
    pronunciation: string | null;
    example: string | null;
    hint: string | null;
}

interface Deck {
    id: string;
    title: string;
    language: string;
    cards: Card[];
}

export default function StudySessionPage() {
    const { deckId } = useParams();
    console.log(deckId);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [deck, setDeck] = useState<Deck | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showQuizResult, setShowQuizResult] = useState(false);

    // Fetch deck and cards from API
    useEffect(() => {
        async function fetchDeck() {
            try {
                const response = await fetch(`/api/decks/${deckId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.cards && data.cards.length > 0) {
                        setDeck(data);
                    } else {
                        setError("This deck has no cards yet.");
                    }
                } else {
                    setError("Deck not found.");
                }
            } catch (err) {
                console.error("Error fetching deck:", err);
                setError("Failed to load deck.");
            } finally {
                setLoading(false);
            }
        }
        fetchDeck();
    }, [deckId]);

    const cards = deck?.cards || [];
    const currentCard = cards[currentCardIndex];
    const progress =
        cards.length > 0 ? ((currentCardIndex + 1) / cards.length) * 100 : 0;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleQuizAnswer = (optionIndex: number) => {
        setSelectedAnswer(optionIndex);
        setShowQuizResult(true);
    };

    const handleQualityRating = async (quality: number) => {
        if (!currentCard) return;

        try {
            // Save review to API
            await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    cardId: currentCard.id,
                    quality,
                }),
            });
        } catch (error) {
            console.error("Error saving review:", error);
        }

        // Move to next card
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
            setShowHint(false);
            setSelectedAnswer(null);
            setShowQuizResult(false);
        } else {
            setSessionComplete(true);
        }
    };

    const handlePronunciation = () => {
        if (!currentCard?.back || !deck) return;

        // Check if browser supports Web Speech API
        if ("speechSynthesis" in globalThis) {
            // Cancel any ongoing speech
            globalThis.speechSynthesis.cancel();

            // Map deck language to speech synthesis language codes
            const languageMap: Record<string, string> = {
                Spanish: "es-ES",
                French: "fr-FR",
                German: "de-DE",
                Italian: "it-IT",
                Portuguese: "pt-PT",
                Japanese: "ja-JP",
                Chinese: "zh-CN",
                Korean: "ko-KR",
                Russian: "ru-RU",
                Arabic: "ar-SA",
                Dutch: "nl-NL",
                Polish: "pl-PL",
                Turkish: "tr-TR",
                Hindi: "hi-IN",
            };

            // Create utterance
            const utterance = new SpeechSynthesisUtterance(currentCard.back);
            utterance.lang = languageMap[deck.language] || "en-US"; // Default to English
            utterance.rate = 0.8; // Slightly slower for learning
            utterance.pitch = 1;
            utterance.volume = 1;

            // Speak
            globalThis.speechSynthesis.speak(utterance);
        } else {
            console.warn("Text-to-speech not supported in this browser");
            alert("Text-to-speech is not supported in your browser");
        }
    };

    // Loading state
    if (loading) {
        return (
            <Container maxWidth="md">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "60vh",
                    }}
                >
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    // Error state
    if (error || !deck) {
        return (
            <Container maxWidth="md">
                <Box sx={{ py: 8 }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error || "Failed to load deck"}
                    </Alert>
                    <Button component={Link} href="/dashboard" variant="contained">
                        Back to Dashboard
                    </Button>
                </Box>
            </Container>
        );
    }

    if (sessionComplete) {
        return (
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", py: 8 }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <Typography variant="h2" gutterBottom>
                            🎉
                        </Typography>
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            Session Complete!
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            Great job! You reviewed {cards.length} cards from {deck.title}
                        </Typography>
                    </motion.div>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                                setCurrentCardIndex(0);
                                setSessionComplete(false);
                                setIsFlipped(false);
                            }}
                        >
                            Study Again
                        </Button>
                        <Button
                            component={Link}
                            href="/dashboard"
                            variant="outlined"
                            size="large"
                        >
                            Back to Dashboard
                        </Button>
                    </Stack>

                    {/* Stats Card */}
                    <Card sx={{ mt: 4, maxWidth: 400, mx: "auto" }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Session Stats
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Cards Reviewed
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {cards.length}
                                        </Typography>
                                    </Stack>
                                </Box>
                                <Box>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography variant="body2" color="text.secondary">
                                            Deck
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {deck.title}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 3 }}
            >
                <Box>
                    <Typography variant="h5" fontWeight={600}>
                        {deck.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Card {currentCardIndex + 1} of {cards.length}
                    </Typography>
                </Box>
                <IconButton component={Link} href="/dashboard">
                    <Close />
                </IconButton>
            </Stack>

            {/* Progress Bar */}
            <Box sx={{ mb: 4 }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 8, borderRadius: 4 }}
                />
            </Box>

            {/* Card Display - Flashcard or Quiz */}
            {currentCard?.type === "quiz" && currentCard.quizOptions ? (
                <QuizCard
                    cardId={currentCard.id}
                    question={currentCard.front}
                    answer={currentCard.back}
                    options={currentCard.quizOptions}
                    selectedAnswer={selectedAnswer}
                    showResult={showQuizResult}
                    onAnswerSelect={handleQuizAnswer}
                />
            ) : (
                <Flashcard
                    front={currentCard?.front || ""}
                    back={currentCard?.back || ""}
                    pronunciation={currentCard?.pronunciation}
                    example={currentCard?.example}
                    isFlipped={isFlipped}
                    onFlip={handleFlip}
                    onPronunciation={handlePronunciation}
                />
            )}

            {/* Hint Button */}
            {!isFlipped && !showQuizResult && currentCard?.hint && (
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Button
                        startIcon={<Lightbulb />}
                        onClick={() => setShowHint(!showHint)}
                        variant="outlined"
                        size="small"
                    >
                        {showHint ? "Hide Hint" : "Show Hint"}
                    </Button>
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                >
                                    💡 {currentCard?.hint}
                                </Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            )}

            {/* Quality Rating Buttons (SM-2) */}
            {(isFlipped || showQuizResult) && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ mb: 2 }}
                    >
                        How well did you know this?
                    </Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={() => handleQualityRating(1)}
                            sx={{
                                borderColor: "error.main",
                                color: "error.main",
                                "&:hover": {
                                    borderColor: "error.dark",
                                    bgcolor: "rgba(255, 0, 0, 0.1)",
                                },
                            }}
                        >
                            Again
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                &lt;1 min
                            </Typography>
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={() => handleQualityRating(3)}
                            sx={{
                                borderColor: "warning.main",
                                color: "warning.main",
                                "&:hover": {
                                    borderColor: "warning.dark",
                                    bgcolor: "rgba(255, 165, 0, 0.1)",
                                },
                            }}
                        >
                            Hard
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                &lt;10 min
                            </Typography>
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={() => handleQualityRating(4)}
                            sx={{
                                borderColor: "success.main",
                                color: "success.main",
                                "&:hover": {
                                    borderColor: "success.dark",
                                    bgcolor: "rgba(0, 255, 0, 0.1)",
                                },
                            }}
                        >
                            Good
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                4 days
                            </Typography>
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            onClick={() => handleQualityRating(5)}
                            sx={{
                                bgcolor: "primary.main",
                                "&:hover": {
                                    bgcolor: "primary.dark",
                                },
                            }}
                        >
                            Easy
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                                7 days
                            </Typography>
                        </Button>
                    </Stack>
                </motion.div>
            )}
        </Container>
    );
}
