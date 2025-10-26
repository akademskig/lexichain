"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Stack,
} from "@mui/material";
import {
  TrendingUp,
  LocalFireDepartment,
  LibraryBooks,
  EmojiEvents,
  PlayArrow,
  Add,
} from "@mui/icons-material";
import Link from "next/link";

export default function DashboardPage() {
  // Mock data - will be replaced with real data from API
  const stats = {
    totalReviews: 247,
    currentStreak: 7,
    longestStreak: 12,
    decksInProgress: 3,
    cardsDueToday: 15,
    achievements: 5,
  };

  const recentDecks = [
    {
      id: "1",
      title: "Spanish Basics",
      language: "Spanish",
      progress: 65,
      cardsDue: 8,
    },
    {
      id: "2",
      title: "French Essentials",
      language: "French",
      progress: 40,
      cardsDue: 7,
    },
    {
      id: "3",
      title: "Japanese Hiragana",
      language: "Japanese",
      progress: 20,
      cardsDue: 0,
    },
  ];

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
                    Active Decks
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {stats.decksInProgress}
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

      {/* Recent Decks */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h5" fontWeight={600}>
            Your Decks
          </Typography>
          <Button
            component={Link}
            href="/decks"
            variant="outlined"
            startIcon={<Add />}
          >
            New Deck
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {recentDecks.map((deck) => (
            <Grid key={deck.id} size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        sx={{ mb: 1 }}
                      >
                        <Typography variant="h6" fontWeight={600}>
                          {deck.title}
                        </Typography>
                        {deck.cardsDue > 0 && (
                          <Chip
                            label={`${deck.cardsDue} due`}
                            size="small"
                            color="primary"
                          />
                        )}
                      </Stack>
                      <Chip
                        label={deck.language}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Box>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 0.5 }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="caption" fontWeight={600}>
                          {deck.progress}%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={deck.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    <Button
                      component={Link}
                      href={`/study/${deck.id}`}
                      variant={deck.cardsDue > 0 ? "contained" : "outlined"}
                      fullWidth
                      startIcon={<PlayArrow />}
                    >
                      {deck.cardsDue > 0 ? "Study Now" : "Continue Learning"}
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Browse More Decks */}
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
                Explore More Decks
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover community-created decks and start learning new
                languages
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/decks"
              variant="outlined"
              size="large"
            >
              Browse Decks
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
