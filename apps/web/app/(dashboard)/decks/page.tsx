"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  Add,
  FilterList,
  MoreVert,
  PlayArrow,
  Edit,
  Delete,
  Public,
  Lock,
  LibraryBooks,
} from "@mui/icons-material";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Deck {
  id: string;
  title: string;
  description: string | null;
  language: string;
  level: string | null;
  cardCount: number;
  isPublic: boolean;
  author?: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export default function DecksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("all");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch decks from API
  useEffect(() => {
    async function fetchDecks() {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (filterLanguage !== "all")
          params.append("language", filterLanguage);

        const response = await fetch(`/api/decks?${params}`);
        if (response.ok) {
          const data = await response.json();
          setDecks(data);
        }
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDecks();
  }, [searchQuery, filterLanguage]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    deckId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedDeck(deckId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDeck(null);
  };

  // Get unique languages for filter
  const languages = ["all", ...new Set(decks.map((d) => d.language))];
  console.log(decks)
  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h3" fontWeight={700}>
            Decks
          </Typography>
          <Button
            component={Link}
            href="/decks/new"
            variant="contained"
            size="large"
            startIcon={<Add />}
          >
            Create Deck
          </Button>
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Browse and manage your language learning decks
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search decks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              sx={{ minWidth: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterList />
                  </InputAdornment>
                ),
              }}
            >
              {languages.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang === "all" ? "All Languages" : lang}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* Decks Grid */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8, width: "100%" }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && decks.length === 0 && (
        <Card sx={{ width: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 8 }}>
            <LibraryBooks sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No decks found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchQuery || filterLanguage !== "all"
                ? "Try adjusting your filters"
                : "Create your first deck to get started"}
            </Typography>
            <Button
              component={Link}
              href="/decks/new"
              variant="contained"
              startIcon={<Add />}
            >
              Create Deck
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && decks.length > 0 && (
        <Grid container spacing={3}>
          {decks.map((deck) => (
            <Grid key={deck.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{ height: "100%", display: "flex", flexDirection: "column" }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Header with menu */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 2 }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {deck.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {deck.description}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, deck.id)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Stack>

                  {/* Tags */}
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2, gap: 1 }}>
                    <Chip
                      label={deck.language}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    {deck.level && (
                      <Chip label={deck.level} size="small" variant="outlined" />
                    )}
                    <Chip
                      icon={
                        deck.isPublic ? (
                          <Public fontSize="small" />
                        ) : (
                          <Lock fontSize="small" />
                        )
                      }
                      label={deck.isPublic ? "Public" : "Private"}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  {/* Stats */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {deck.cardCount} cards
                    </Typography>
                    {deck.author && (
                      <Typography variant="caption" color="text.secondary">
                        by {deck.author.name || "Anonymous"}
                      </Typography>
                    )}
                  </Stack>

                  {/* Actions */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      component={Link}
                      href={`/study/${deck.id}`}
                      variant="contained"
                      fullWidth
                      startIcon={<PlayArrow />}
                    >
                      Study
                    </Button>
                    <Button
                      component={Link}
                      href={`/decks/${deck.id}`}
                      variant="outlined"
                      fullWidth
                    >
                      View
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Deck Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          component={Link}
          href={`/decks/${selectedDeck}/edit`}
          onClick={handleMenuClose}
        >
          <Edit sx={{ mr: 1.5 }} fontSize="small" />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
          <Delete sx={{ mr: 1.5 }} fontSize="small" />
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
}
