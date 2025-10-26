"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  School,
  TrendingUp,
  Lock,
  CheckCircle,
  PlayArrow,
} from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Course {
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
  totalCards: number;
  progress: {
    sectionsCompleted: number;
    decksCompleted: number;
    experienceGained: number;
    isCompleted: boolean;
  } | null;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLevel] = useState(2); // TODO: Get from user session

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "success";
      case "Intermediate":
        return "warning";
      case "Advanced":
        return "error";
      default:
        return "default";
    }
  };

  const isLocked = (course: Course) => course.requiredLevel > userLevel;

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Courses 📚
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Choose a structured learning path to master a new language
        </Typography>
      </Box>

      {/* User Level Info */}
      <Card
        sx={{
          mb: 4,
          background:
            "linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)",
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <TrendingUp sx={{ fontSize: 40, color: "primary.main" }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={600}>
                Your Level: {userLevel}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Keep learning to unlock more advanced courses!
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && courses.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: "center", py: 8 }}>
            <School sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No courses available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later for new courses
            </Typography>
          </CardContent>
        </Card>
      )}

      {!loading && courses.length > 0 && (
        <Grid container spacing={3}>
          {courses.map((course) => {
            const locked = isLocked(course);
            const progress = course.progress;
            const progressPercent = progress
              ? (progress.sectionsCompleted / course.totalSections) * 100
              : 0;

            return (
              <Grid key={course.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    opacity: locked ? 0.6 : 1,
                    borderLeft: course.color
                      ? `4px solid ${course.color}`
                      : undefined,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Course Icon & Title */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                      sx={{ mb: 2 }}
                    >
                      <Typography variant="h2">
                        {course.icon || "📚"}
                      </Typography>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          {course.description}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* Tags */}
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      sx={{ mb: 2, gap: 1 }}
                    >
                      <Chip
                        label={course.language}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={course.difficulty}
                        size="small"
                        color={getDifficultyColor(course.difficulty) as any}
                        variant="outlined"
                      />
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
                          {course.totalDecks} decks
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
                            {progress.sectionsCompleted}/{course.totalSections}{" "}
                            sections
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
                      startIcon={
                        locked ? (
                          <Lock />
                        ) : progress ? (
                          <PlayArrow />
                        ) : (
                          <School />
                        )
                      }
                      disabled={locked}
                    >
                      {locked
                        ? "Locked"
                        : progress
                          ? "Continue"
                          : "Start Course"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}
