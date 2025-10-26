"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
} from "@mui/material";
import { School, Verified, Language, TrendingUp } from "@mui/icons-material";
import Image from "next/image";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 100%)",
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Image
            src="/lexi-logo-full.svg"
            alt="LexiChain Logo"
            width={250}
            height={100}
          />
        </Stack>

        <Typography
          variant="h2"
          component="h2"
          align="center"
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Fluency with Proof
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 800, mx: "auto" }}
        >
          Master languages with blockchain-verified credentials. Learn with
          spaced repetition, earn on-chain achievements, and prove your skills
          to the world.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 8 }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
          >
            Explore Decks
          </Button>
        </Stack>

        {/* Feature Cards */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <School sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Smart Learning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SM-2 spaced repetition algorithm optimizes your study sessions
                  for maximum retention
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Verified
                  sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  On-Chain Proof
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Earn blockchain-verified badges and attestations for your
                  achievements
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Language sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Community Decks
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access thousands of decks or create and publish your own to
                  IPFS
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <TrendingUp
                  sx={{ fontSize: 48, color: "secondary.main", mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  Track Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visualize your learning journey with detailed analytics and
                  streaks
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Status Section */}
        <Box sx={{ mt: 12, textAlign: "center" }}>
          <Chip
            label="Phase 1 - MVP In Progress"
            color="primary"
            sx={{ mb: 3, fontSize: "1rem", py: 3 }}
          />
          <Typography variant="h4" gutterBottom>
            Learn it. Own it. Prove it.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            LexiChain is building the future of verifiable language learning.
            Join us on this journey to make education transparent and
            credentials portable.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
