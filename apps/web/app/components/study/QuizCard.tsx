"use client";

import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Button,
    Box,
} from "@mui/material";

interface QuizOption {
    text: string;
    isCorrect: boolean;
}

interface QuizCardProps {
    cardId: string;
    question: string;
    answer: string;
    options: QuizOption[];
    selectedAnswer: number | null;
    showResult: boolean;
    onAnswerSelect: (index: number) => void;
}

export function QuizCard({
    cardId,
    question,
    answer,
    options,
    selectedAnswer,
    showResult,
    onAnswerSelect,
}: Readonly<QuizCardProps>) {
    return (
        <Card sx={{ mb: 4, minHeight: 400 }}>
            <CardContent sx={{ p: 4 }}>
                <Chip label="Quiz" color="primary" sx={{ mb: 3 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    {question}
                </Typography>

                <Stack spacing={2} sx={{ mt: 4 }}>
                    {options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = option.isCorrect;

                        let buttonColor = "inherit";
                        let buttonVariant: "outlined" | "contained" = "outlined";

                        if (showResult && isSelected) {
                            buttonColor = isCorrect ? "success" : "error";
                            buttonVariant = "contained";
                        } else if (showResult && isCorrect) {
                            buttonColor = "success";
                            buttonVariant = "contained";
                        }

                        return (
                            <Button
                                key={`${cardId}-option-${index}`}
                                fullWidth
                                variant={buttonVariant}
                                size="large"
                                onClick={() => !showResult && onAnswerSelect(index)}
                                disabled={showResult}
                                sx={{
                                    justifyContent: "flex-start",
                                    textAlign: "left",
                                    py: 2,
                                    px: 3,
                                    ...(buttonColor === "success" && {
                                        bgcolor: "success.main",
                                        color: "white",
                                        "&:hover": { bgcolor: "success.dark" },
                                    }),
                                    ...(buttonColor === "error" && {
                                        bgcolor: "error.main",
                                        color: "white",
                                        "&:hover": { bgcolor: "error.dark" },
                                    }),
                                }}
                            >
                                <Typography variant="body1">{option.text}</Typography>
                            </Button>
                        );
                    })}
                </Stack>

                {showResult && selectedAnswer !== null && (
                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        {options[selectedAnswer]?.isCorrect ? (
                            <Typography variant="h6" color="success.main">
                                ✓ Correct!
                            </Typography>
                        ) : (
                            <Typography variant="h6" color="error.main">
                                ✗ Incorrect. The correct answer is: {answer}
                            </Typography>
                        )}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}
