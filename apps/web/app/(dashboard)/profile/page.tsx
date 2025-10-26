"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Stack,
  Chip,
  LinearProgress,
  Divider,
} from "@mui/material";
import {
  Edit,
  EmojiEvents,
  LocalFireDepartment,
  TrendingUp,
  CalendarMonth,
  Verified,
  AccountBalanceWallet,
} from "@mui/icons-material";

export default function ProfilePage() {
  // Mock data - will be replaced with real data from API
  const user = {
    name: "Demo User",
    email: "demo@lexichain.com",
    bio: "Language enthusiast learning Spanish and French",
    joinedDate: "January 2025",
    walletAddress: null, // or '0x1234...5678'
  };

  const stats = {
    totalReviews: 247,
    currentStreak: 7,
    longestStreak: 12,
    decksCompleted: 2,
    cardsLearned: 150,
    cardsMastered: 85,
    totalStudyTime: "12h 30m",
  };

  const achievements = [
    {
      id: "1",
      title: "Welcome to LexiChain!",
      description: "Started your language learning journey",
      icon: "🎉",
      earnedAt: "2025-01-15",
      isOnChain: false,
    },
    {
      id: "2",
      title: "7 Day Streak",
      description: "Studied for 7 consecutive days",
      icon: "🔥",
      earnedAt: "2025-01-22",
      isOnChain: true,
      attestationId: "0xabc...def",
    },
    {
      id: "3",
      title: "First Deck Completed",
      description: "Completed Spanish Basics",
      icon: "📚",
      earnedAt: "2025-01-20",
      isOnChain: true,
      attestationId: "0x123...456",
    },
    {
      id: "4",
      title: "100 Reviews",
      description: "Reviewed 100 flashcards",
      icon: "💯",
      earnedAt: "2025-01-18",
      isOnChain: false,
    },
  ];

  const recentActivity = [
    { date: "2025-01-26", reviews: 15, streak: true },
    { date: "2025-01-25", reviews: 20, streak: true },
    { date: "2025-01-24", reviews: 18, streak: true },
    { date: "2025-01-23", reviews: 12, streak: true },
    { date: "2025-01-22", reviews: 25, streak: true },
    { date: "2025-01-21", reviews: 10, streak: true },
    { date: "2025-01-20", reviews: 22, streak: true },
  ];

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your learning journey and achievements
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Profile Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Profile Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack spacing={3} alignItems="center">
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: "primary.main",
                    fontSize: "3rem",
                    fontWeight: 700,
                  }}
                >
                  {user.name.charAt(0)}
                </Avatar>
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {user.email}
                  </Typography>
                  {user.bio && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {user.bio}
                    </Typography>
                  )}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 2 }}
                  >
                    Member since {user.joinedDate}
                  </Typography>
                </Box>
                <Button variant="outlined" fullWidth startIcon={<Edit />}>
                  Edit Profile
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Wallet Card */}
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AccountBalanceWallet color="primary" />
                  <Typography variant="h6" fontWeight={600}>
                    Web3 Wallet
                  </Typography>
                </Stack>
                {user.walletAddress ? (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {user.walletAddress}
                    </Typography>
                    <Button variant="outlined" size="small">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Connect your wallet to receive on-chain achievements
                    </Typography>
                    <Button variant="contained" fullWidth>
                      Connect Wallet
                    </Button>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Stats & Achievements */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card>
                <CardContent>
                  <TrendingUp
                    sx={{ fontSize: 32, color: "primary.main", mb: 1 }}
                  />
                  <Typography variant="h4" fontWeight={700}>
                    {stats.totalReviews}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Reviews
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card>
                <CardContent>
                  <LocalFireDepartment
                    sx={{ fontSize: 32, color: "#ff6b35", mb: 1 }}
                  />
                  <Typography variant="h4" fontWeight={700}>
                    {stats.currentStreak}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Day Streak
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card>
                <CardContent>
                  <EmojiEvents sx={{ fontSize: 32, color: "#ffd700", mb: 1 }} />
                  <Typography variant="h4" fontWeight={700}>
                    {achievements.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Achievements
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <Card>
                <CardContent>
                  <CalendarMonth
                    sx={{ fontSize: 32, color: "secondary.main", mb: 1 }}
                  />
                  <Typography variant="h4" fontWeight={700}>
                    {stats.totalStudyTime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Study Time
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Learning Progress */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Learning Progress
              </Typography>
              <Stack spacing={3} sx={{ mt: 3 }}>
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Cards Learned
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stats.cardsLearned}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.cardsLearned / 200) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Cards Mastered
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stats.cardsMastered}
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.cardsMastered / stats.cardsLearned) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                    color="secondary"
                  />
                </Box>
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Decks Completed
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stats.decksCompleted} / 5
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.decksCompleted / 5) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                    color="success"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Achievements
              </Typography>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {achievements.map((achievement) => (
                  <Box key={achievement.id}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          fontSize: "2rem",
                          width: 56,
                          height: 56,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 2,
                          bgcolor: "background.default",
                        }}
                      >
                        {achievement.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {achievement.title}
                          </Typography>
                          {achievement.isOnChain && (
                            <Chip
                              icon={<Verified fontSize="small" />}
                              label="On-Chain"
                              size="small"
                              color="primary"
                              sx={{ height: 20 }}
                            />
                          )}
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Earned on {achievement.earnedAt}
                        </Typography>
                      </Box>
                    </Stack>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Recent Activity
              </Typography>
              <Stack spacing={1} sx={{ mt: 3 }}>
                {recentActivity.map((activity, index) => (
                  <Stack
                    key={index}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      p: 1.5,
                      borderRadius: 1,
                      bgcolor: activity.streak
                        ? "rgba(255, 107, 53, 0.05)"
                        : "transparent",
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {activity.streak && (
                        <LocalFireDepartment
                          sx={{ color: "#ff6b35", fontSize: 20 }}
                        />
                      )}
                      <Typography variant="body2">{activity.date}</Typography>
                    </Stack>
                    <Typography variant="body2" fontWeight={600}>
                      {activity.reviews} reviews
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
