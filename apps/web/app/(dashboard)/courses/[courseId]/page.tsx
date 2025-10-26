"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  LinearProgress,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import {
  ExpandMore,
  PlayArrow,
  Lock,
  CheckCircle,
  ArrowBack,
  School,
  EmojiEvents,
} from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Deck {
  id: string;
  title: string;
  description: string | null;
  difficulty: string;
  experienceGain: number;
  _count: { cards: number };
  progress: Array<{
    cardsLearned: number;
    cardsMastered: number;
    totalReviews: number;
    isCompleted: boolean;
  }>;
}

interface Section {
  id: string;
  title: string;
  description: string | null;
  order: number;
  difficulty: string;
  requiredLevel: number;
  experienceGain: number;
  isLocked: boolean;
  deckCount: number;
  decks: Deck[];
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  language: string;
  icon: string | null;
  color: string | null;
  difficulty: string;
  experienceGain: number;
  totalDecks: number;
  totalCards: number;
  sections: Section[];
  courseProgress: Array<{
    sectionsCompleted: number;
    decksCompleted: number;
    experienceGained: number;
    isCompleted: boolean;
  }>;
}

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLevel] = useState(2); // TODO: Get from session

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !course) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || "Course not found"}
          </Alert>
          <Button component={Link} href="/courses" variant="contained">
            Back to Courses
          </Button>
        </Box>
      </Container>
    );
  }

  const progress = course.courseProgress[0];
  const progressPercent = progress
    ? (progress.decksCompleted / course.totalDecks) * 100
    : 0;

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          component={Link}
          href="/courses"
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Back to Courses
        </Button>

        <Card
          sx={{
            background: `linear-gradient(135deg, ${course.color || "#4A90E2"}22 0%, ${course.color || "#4A90E2"}11 100%)`,
            borderLeft: `4px solid ${course.color || "#4A90E2"}`,
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={3} alignItems="flex-start">
              <Typography variant="h1" sx={{ fontSize: 80 }}>
                {course.icon || "📚"}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h3" fontWeight={700} gutterBottom>
                  {course.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {course.description}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  sx={{ mb: 2, gap: 1 }}
                >
                  <Chip label={course.language} color="primary" />
                  <Chip label={course.difficulty} variant="outlined" />
                  <Chip
                    icon={<School fontSize="small" />}
                    label={`${course.sections.length} sections`}
                    variant="outlined"
                  />
                  <Chip
                    icon={<EmojiEvents fontSize="small" />}
                    label={`+${course.experienceGain} XP per deck`}
                    variant="outlined"
                  />
                </Stack>

                {/* Progress */}
                {progress && (
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      sx={{ mb: 0.5 }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        Overall Progress
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {progress.decksCompleted}/{course.totalDecks} decks
                        completed
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={progressPercent}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Sections */}
      <Box>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          Learning Path
        </Typography>

        <Stack spacing={2}>
          {course.sections.map((section, index) => {
            const isLocked =
              section.isLocked || section.requiredLevel > userLevel;
            const completedDecks = section.decks.filter(
              (d) => d.progress[0]?.isCompleted,
            ).length;
            const sectionProgress =
              section.decks.length > 0
                ? (completedDecks / section.decks.length) * 100
                : 0;

            return (
              <Accordion
                key={section.id}
                defaultExpanded={index === 0}
                disabled={isLocked}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  "&:before": { display: "none" },
                  opacity: isLocked ? 0.6 : 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ flex: 1, pr: 2 }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: isLocked
                          ? "grey.700"
                          : completedDecks === section.decks.length
                            ? "success.main"
                            : "primary.main",
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      {isLocked ? (
                        <Lock fontSize="small" />
                      ) : completedDecks === section.decks.length ? (
                        <CheckCircle fontSize="small" />
                      ) : (
                        index + 1
                      )}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {section.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {section.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                        <Chip
                          label={section.difficulty}
                          size="small"
                          variant="outlined"
                        />
                        {isLocked && (
                          <Chip
                            label={`Level ${section.requiredLevel} required`}
                            size="small"
                            color="error"
                            variant="outlined"
                          />
                        )}
                        <Chip
                          label={`${completedDecks}/${section.decks.length} decks`}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>

                    {!isLocked && section.decks.length > 0 && (
                      <Box sx={{ width: 100 }}>
                        <Typography variant="caption" color="text.secondary">
                          {Math.round(sectionProgress)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={sectionProgress}
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    )}
                  </Stack>
                </AccordionSummary>

                <AccordionDetails>
                  <Stack spacing={2}>
                    {section.decks.map((deck) => {
                      const deckProgress = deck.progress[0];
                      const isCompleted = deckProgress?.isCompleted || false;
                      const cardProgress = deckProgress
                        ? (deckProgress.cardsLearned / deck._count.cards) * 100
                        : 0;

                      return (
                        <Card key={deck.id} variant="outlined">
                          <CardContent>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              {isCompleted ? (
                                <CheckCircle
                                  sx={{ color: "success.main", fontSize: 32 }}
                                />
                              ) : (
                                <School
                                  sx={{ color: "primary.main", fontSize: 32 }}
                                />
                              )}

                              <Box sx={{ flex: 1 }}>
                                <Typography variant="h6" fontWeight={600}>
                                  {deck.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mb: 1 }}
                                >
                                  {deck.description}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                  <Chip
                                    label={`${deck._count.cards} cards`}
                                    size="small"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={`+${deck.experienceGain} XP`}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  />
                                  {isCompleted && (
                                    <Chip
                                      label="Completed"
                                      size="small"
                                      color="success"
                                    />
                                  )}
                                </Stack>

                                {deckProgress && !isCompleted && (
                                  <Box sx={{ mt: 1 }}>
                                    <LinearProgress
                                      variant="determinate"
                                      value={cardProgress}
                                      sx={{ height: 4, borderRadius: 2 }}
                                    />
                                  </Box>
                                )}
                              </Box>

                              <Button
                                component={Link}
                                href={`/study/${deck.id}`}
                                variant={isCompleted ? "outlined" : "contained"}
                                startIcon={<PlayArrow />}
                              >
                                {isCompleted
                                  ? "Review"
                                  : deckProgress
                                    ? "Continue"
                                    : "Start"}
                              </Button>
                            </Stack>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      </Box>
    </Container>
  );
}
