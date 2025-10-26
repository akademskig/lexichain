import {
    Box,
    Card,
    CardContent,
    Button,
    Chip,
    Stack,
    Typography,
    LinearProgress,
} from "@mui/material";
import { Lock, CheckCircle, PlayArrow, School } from "@mui/icons-material";
import Link from "next/link";

interface CourseProgress {
    sectionsCompleted: number;
    decksCompleted: number;
    experienceGained: number;
    isCompleted: boolean;
}

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        description: string | null;
        language: string;
        icon: string | null;
        color: string | null;
        difficulty: string;
        requiredLevel: number;
        experienceGain: number;
        totalSections: number;
        totalDecks: number;
        isEnrolled?: boolean;
        courseProgress?: CourseProgress[];
    };
    userLevel: number;
}

function getDifficultyColor(difficulty: string) {
    switch (difficulty.toLowerCase()) {
        case "beginner":
            return "success";
        case "intermediate":
            return "warning";
        case "advanced":
            return "error";
        default:
            return "default";
    }
}

function getButtonIcon(locked: boolean, hasProgress: boolean) {
    if (locked) return <Lock />;
    if (hasProgress) return <PlayArrow />;
    return <School />;
}

function getButtonText(locked: boolean, hasProgress: boolean) {
    if (locked) return "Locked";
    if (hasProgress) return "Continue";
    return "Start Course";
}

export function CourseCard({ course, userLevel }: Readonly<CourseCardProps>) {
    const locked = course.requiredLevel > userLevel;
    const progress = course.courseProgress?.[0];
    const progressPercent = progress
        ? (progress.sectionsCompleted / course.totalSections) * 100
        : 0;

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                opacity: locked ? 0.6 : 1,
                borderLeft: course.color ? `4px solid ${course.color}` : undefined,
                ...(course.isEnrolled && {
                    boxShadow: `0 0 0 2px ${course.color || "#4A90E2"}33`,
                    background: `linear-gradient(135deg, ${course.color || "#4A90E2"}08 0%, ${course.color || "#4A90E2"}03 100%)`,
                }),
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {/* Course Icon & Title */}
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                    <Typography variant="h2">{course.icon || "📚"}</Typography>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {course.description}
                        </Typography>
                    </Box>
                </Stack>

                {/* Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
                    <Chip
                        label={course.language}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                    <Chip
                        label={course.difficulty}
                        size="small"
                        color={
                            getDifficultyColor(course.difficulty) as
                            | "default"
                            | "primary"
                            | "secondary"
                            | "error"
                            | "info"
                            | "success"
                            | "warning"
                        }
                        variant="outlined"
                    />
                    {course.isEnrolled && (
                        <Chip
                            icon={<CheckCircle fontSize="small" />}
                            label="Enrolled"
                            size="small"
                            color="primary"
                            sx={{
                                fontWeight: 600,
                                bgcolor: `${course.color || "#4A90E2"}22`,
                                borderColor: course.color || "#4A90E2",
                            }}
                        />
                    )}
                    {locked && (
                        <Chip
                            icon={<Lock fontSize="small" />}
                            label={`Level ${course.requiredLevel} required`}
                            size="small"
                            color="error"
                            variant="outlined"
                        />
                    )}
                    {progress?.isCompleted && (
                        <Chip
                            icon={<CheckCircle fontSize="small" />}
                            label="Completed"
                            size="small"
                            color="success"
                        />
                    )}
                </Stack>

                {/* Stats */}
                <Stack spacing={1} sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">
                            {course.totalSections} sections
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                            +{course.experienceGain} XP per deck
                        </Typography>
                    </Stack>
                </Stack>

                {/* Progress Bar */}
                {progress && !progress.isCompleted && (
                    <Box sx={{ mb: 2 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                        >
                            <Typography variant="caption" color="text.secondary">
                                Progress
                            </Typography>
                            <Typography variant="caption" fontWeight={600}>
                                {progress.sectionsCompleted}/{course.totalSections} sections
                            </Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={progressPercent}
                            sx={{ height: 6, borderRadius: 3 }}
                        />
                    </Box>
                )}

                {/* Action Button */}
                <Button
                    component={Link}
                    href={locked ? "#" : `/courses/${course.id}`}
                    variant={locked ? "outlined" : "contained"}
                    fullWidth
                    startIcon={getButtonIcon(locked, !!progress)}
                    disabled={locked}
                >
                    {getButtonText(locked, !!progress)}
                </Button>
            </CardContent>
        </Card>
    );
}

