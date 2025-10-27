"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  TrendingUp,
  LocalFireDepartment,
  LibraryBooks,
  EmojiEvents,
  Add,
  PlayArrow,
} from "@mui/icons-material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CourseCard } from "../../components/courses/CourseCard";

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
  isEnrolled: boolean;
  courseProgress: Array<{
    sectionsCompleted: number;
    decksCompleted: number;
    experienceGained: number;
    isCompleted: boolean;
  }>;
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLevel] = useState(2); // TODO: Get from user session

  // Fetch enrolled courses from API
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/courses/enrolled");
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  // Mock stats - will be replaced with real data later
  const stats = {
    totalReviews: 247,
    currentStreak: 7,
    longestStreak: 12,
    coursesEnrolled: courses.length,
    cardsDueToday: 15,
    achievements: 5,
  };

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Welcome back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          You have {stats.cardsDueToday} cards due for review today
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Total Reviews
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.totalReviews}
                  </Typography>
                </Box>
                <TrendingUp
                  sx={{ fontSize: 40, color: "primary.main", opacity: 0.8 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Current Streak
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.currentStreak} days
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Longest: {stats.longestStreak} days
                  </Typography>
                </Box>
                <LocalFireDepartment
                  sx={{ fontSize: 40, color: "#ff6b35", opacity: 0.8 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Enrolled Courses
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.coursesEnrolled}
                  </Typography>
                </Box>
                <LibraryBooks
                  sx={{ fontSize: 40, color: "secondary.main", opacity: 0.8 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Achievements
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.achievements}
                  </Typography>
                </Box>
                <EmojiEvents
                  sx={{ fontSize: 40, color: "#ffd700", opacity: 0.8 }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      {stats.cardsDueToday > 0 && (
        <Card
          sx={{
            mb: 4,
            background:
              "linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)",
          }}
        >
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Ready to Study?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You have {stats.cardsDueToday} cards waiting for review
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                sx={{ minWidth: 200 }}
              >
                Start Reviewing
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Your Courses */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" fontWeight={600}>
            Your Courses
          </Typography>
          <Button
            component={Link}
            href="/courses"
            variant="outlined"
            startIcon={<Add />}
          >
            Browse Courses
          </Button>
        </Stack>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && courses.length === 0 && (
          <Card>
            <CardContent sx={{ textAlign: "center", py: 8 }}>
              <LibraryBooks
                sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                No courses yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Browse available courses to start learning
              </Typography>
              <Button
                component={Link}
                href="/courses"
                variant="contained"
                startIcon={<Add />}
              >
                Browse Courses
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && courses.length > 0 && (
          <Grid container spacing={3}>
            {courses.map((course) => (
              <Grid key={course.id} size={{ xs: 12, md: 4 }}>
                <CourseCard course={course} userLevel={userLevel} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Browse More Courses */}
      <Card>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Explore More Courses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover structured learning paths and start learning new
                languages
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/courses"
              variant="outlined"
              size="large"
            >
              Browse Courses
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
