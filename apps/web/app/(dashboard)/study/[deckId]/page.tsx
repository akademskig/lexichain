'use client';

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
    Chip,
} from '@mui/material';
import {
    Close,
    VolumeUp,
    Lightbulb,
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StudySessionPageProps {
    params: {
        deckId: string;
    };
}

export default function StudySessionPage({ params }: StudySessionPageProps) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);

    // Mock data - will be replaced with real data from API
    const deck = {
        id: params.deckId,
        title: 'Spanish Basics',
        language: 'Spanish',
    };

    const cards = [
        {
            id: '1',
            front: 'Hello',
            back: 'Hola',
            pronunciation: 'OH-lah',
            example: '¡Hola! ¿Cómo estás?',
            hint: 'Common greeting',
        },
        {
            id: '2',
            front: 'Goodbye',
            back: 'Adiós',
            pronunciation: 'ah-DYOHS',
            example: 'Adiós, hasta luego.',
            hint: 'Farewell expression',
        },
        {
            id: '3',
            front: 'Thank you',
            back: 'Gracias',
            pronunciation: 'GRAH-syahs',
            example: 'Muchas gracias por tu ayuda.',
            hint: 'Expression of gratitude',
        },
        {
            id: '4',
            front: 'Please',
            back: 'Por favor',
            pronunciation: 'pohr fah-BOHR',
            example: 'Por favor, ayúdame.',
            hint: 'Polite request',
        },
        {
            id: '5',
            front: 'Yes / No',
            back: 'Sí / No',
            pronunciation: 'see / noh',
            example: 'Sí, entiendo. No, no comprendo.',
            hint: 'Affirmative and negative',
        },
    ];

    const currentCard = cards[currentCardIndex];
    const progress = ((currentCardIndex + 1) / cards.length) * 100;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleQualityRating = (quality: number) => {
        // In real app, this would save the review with SM-2 algorithm
        console.log(`Rated card ${currentCard?.id} with quality: ${quality}`);

        // Move to next card
        if (currentCardIndex < cards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
            setShowHint(false);
        } else {
            setSessionComplete(true);
        }
    };

    const handlePronunciation = () => {
        // In real app, this would use text-to-speech
        console.log('Playing pronunciation:', currentCard?.pronunciation);
    };

    if (sessionComplete) {
        return (
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5 }}
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

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
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
                    <Card sx={{ mt: 4, maxWidth: 400, mx: 'auto' }}>
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
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

            {/* Flashcard */}
            <Box
                sx={{
                    perspective: '1000px',
                    mb: 4,
                    minHeight: 400,
                }}
            >
                <motion.div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                    }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                >
                    {/* Front of card */}
                    <Card
                        onClick={() => !isFlipped && handleFlip()}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            minHeight: 400,
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)',
                            cursor: isFlipped ? 'default' : 'pointer',
                            pointerEvents: isFlipped ? 'none' : 'auto',
                            transition: 'none',
                            '&:hover': {
                                transform: 'none',
                            },
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', width: '100%', p: 4 }}>
                            <Chip label="Question" color="primary" sx={{ mb: 3 }} />
                            <Typography variant="h3" fontWeight={700} gutterBottom>
                                {currentCard?.front}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                                Click to reveal answer
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Back of card */}
                    <Card
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            minHeight: 400,
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, rgba(255,0,255,0.1) 0%, rgba(0,255,255,0.1) 100%)',
                            pointerEvents: isFlipped ? 'auto' : 'none',
                            transition: 'none',
                            '&:hover': {
                                transform: 'rotateY(180deg)',
                            },
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', width: '100%', p: 4 }}>
                            <Chip label="Answer" color="secondary" sx={{ mb: 3 }} />
                            <Typography variant="h3" fontWeight={700} gutterBottom>
                                {currentCard?.back}
                            </Typography>

                            {/* Pronunciation */}
                            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
                                <IconButton size="small" onClick={handlePronunciation}>
                                    <VolumeUp />
                                </IconButton>
                                <Typography variant="body2" color="text.secondary">
                                    {currentCard?.pronunciation}
                                </Typography>
                            </Stack>

                            {/* Example */}
                            {currentCard?.example && (
                                <Typography variant="body1" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
                                    &quot;{currentCard?.example}&quot;
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </Box>

            {/* Hint Button */}
            {!isFlipped && currentCard?.hint && (
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Button
                        startIcon={<Lightbulb />}
                        onClick={() => setShowHint(!showHint)}
                        variant="outlined"
                        size="small"
                    >
                        {showHint ? 'Hide Hint' : 'Show Hint'}
                    </Button>
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                    💡 {currentCard?.hint}
                                </Typography>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>
            )}

            {/* Quality Rating Buttons (SM-2) */}
            {isFlipped && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                        How well did you know this?
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size="large"
                            onClick={() => handleQualityRating(1)}
                            sx={{
                                borderColor: 'error.main',
                                color: 'error.main',
                                '&:hover': {
                                    borderColor: 'error.dark',
                                    bgcolor: 'rgba(255, 0, 0, 0.1)',
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
                                borderColor: 'warning.main',
                                color: 'warning.main',
                                '&:hover': {
                                    borderColor: 'warning.dark',
                                    bgcolor: 'rgba(255, 165, 0, 0.1)',
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
                                borderColor: 'success.main',
                                color: 'success.main',
                                '&:hover': {
                                    borderColor: 'success.dark',
                                    bgcolor: 'rgba(0, 255, 0, 0.1)',
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
                                bgcolor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
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

