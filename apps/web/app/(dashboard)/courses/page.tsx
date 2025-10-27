"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import { TrendingUp, School } from "@mui/icons-material";
import { useState, useEffect } from "react";
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
          {courses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <CourseCard course={course} userLevel={userLevel} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
