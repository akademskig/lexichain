"use client";

import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    IconButton,
    Box,
} from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import { motion } from "framer-motion";

interface FlashcardProps {
    front: string;
    back: string;
    pronunciation?: string | null;
    example?: string | null;
    isFlipped: boolean;
    onFlip: () => void;
    onPronunciation: () => void;
}

export function Flashcard({
    front,
    back,
    pronunciation,
    example,
    isFlipped,
    onFlip,
    onPronunciation,
}: Readonly<FlashcardProps>) {
    return (
        <Box
            sx={{
                perspective: "1000px",
                mb: 4,
                minHeight: 400,
            }}
        >
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
            >
                {/* Front of card */}
                <Card
                    onClick={() => !isFlipped && onFlip()}
                    sx={{
                        position: "absolute",
                        width: "100%",
                        minHeight: 400,
                        backfaceVisibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)",
                        cursor: isFlipped ? "default" : "pointer",
                        pointerEvents: isFlipped ? "none" : "auto",
                        transition: "none",
                        "&:hover": {
                            transform: "none",
                        },
                    }}
                >
                    <CardContent sx={{ textAlign: "center", width: "100%", p: 4 }}>
                        <Chip label="Question" color="primary" sx={{ mb: 3 }} />
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            {front}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                            Click to reveal answer
                        </Typography>
                    </CardContent>
                </Card>

                {/* Back of card */}
                <Card
                    sx={{
                        position: "absolute",
                        width: "100%",
                        minHeight: 400,
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                            "linear-gradient(135deg, rgba(255,0,255,0.1) 0%, rgba(0,255,255,0.1) 100%)",
                        pointerEvents: isFlipped ? "auto" : "none",
                        transition: "none",
                        "&:hover": {
                            transform: "rotateY(180deg)",
                        },
                    }}
                >
                    <CardContent sx={{ textAlign: "center", width: "100%", p: 4 }}>
                        <Chip label="Answer" color="secondary" sx={{ mb: 3 }} />
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                            {back}
                        </Typography>

                        {/* Pronunciation */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                            sx={{ mt: 2 }}
                        >
                            <IconButton size="small" onClick={onPronunciation}>
                                <VolumeUp />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary">
                                {pronunciation}
                            </Typography>
                        </Stack>

                        {/* Example */}
                        {example && (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mt: 3, fontStyle: "italic" }}
                            >
                                &quot;{example}&quot;
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </Box>
    );
}
