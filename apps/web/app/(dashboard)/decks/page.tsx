'use client';

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
    LinearProgress,
} from '@mui/material';
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
} from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';

export default function DecksPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('all');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, deckId: string) => {
        setAnchorEl(event.currentTarget);
        setSelectedDeck(deckId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedDeck(null);
    };

    // Mock data - will be replaced with real data from API
    const decks = [
        {
            id: '1',
            title: 'Spanish Basics',
            description: 'Essential Spanish vocabulary for beginners',
            language: 'Spanish',
            level: 'Beginner',
            cardCount: 50,
            progress: 65,
            isPublic: true,
            isOwner: true,
            createdBy: 'You',
        },
        {
            id: '2',
            title: 'French Essentials',
            description: 'Common French phrases for travelers',
            language: 'French',
            level: 'Beginner',
            cardCount: 45,
            progress: 40,
            isPublic: true,
            isOwner: true,
            createdBy: 'You',
        },
        {
            id: '3',
            title: 'Japanese Hiragana',
            description: 'Learn to read and write Hiragana characters',
            language: 'Japanese',
            level: 'Beginner',
            cardCount: 46,
            progress: 20,
            isPublic: false,
            isOwner: true,
            createdBy: 'You',
        },
        {
            id: '4',
            title: 'German Grammar Basics',
            description: 'Essential German grammar rules and examples',
            language: 'German',
            level: 'Intermediate',
            cardCount: 80,
            progress: 0,
            isPublic: true,
            isOwner: false,
            createdBy: 'Community',
        },
        {
            id: '5',
            title: 'Italian Food Vocabulary',
            description: 'Learn Italian words related to food and dining',
            language: 'Italian',
            level: 'Beginner',
            cardCount: 60,
            progress: 0,
            isPublic: true,
            isOwner: false,
            createdBy: 'Community',
        },
    ];

    const languages = ['all', 'Spanish', 'French', 'Japanese', 'German', 'Italian'];

    const filteredDecks = decks.filter((deck) => {
        const matchesSearch = deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deck.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLanguage = filterLanguage === 'all' || deck.language === filterLanguage;
        return matchesSearch && matchesLanguage;
    });

    return (
        <Container maxWidth="xl">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
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
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                                    {lang === 'all' ? 'All Languages' : lang}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                </CardContent>
            </Card>

            {/* Decks Grid */}
            <Grid container spacing={3}>
                {filteredDecks.map((deck) => (
                    <Grid key={deck.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                {/* Header with menu */}
                                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" fontWeight={600} gutterBottom>
                                            {deck.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                            {deck.description}
                                        </Typography>
                                    </Box>
                                    {deck.isOwner && (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, deck.id)}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                    )}
                                </Stack>

                                {/* Tags */}
                                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                    <Chip label={deck.language} size="small" color="primary" variant="outlined" />
                                    <Chip label={deck.level} size="small" variant="outlined" />
                                    <Chip
                                        icon={deck.isPublic ? <Public fontSize="small" /> : <Lock fontSize="small" />}
                                        label={deck.isPublic ? 'Public' : 'Private'}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Stack>

                                {/* Stats */}
                                <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {deck.cardCount} cards
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        by {deck.createdBy}
                                    </Typography>
                                </Stack>

                                {/* Progress */}
                                {deck.progress > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
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
                                            sx={{ height: 6, borderRadius: 3 }}
                                        />
                                    </Box>
                                )}

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

            {/* Empty State */}
            {filteredDecks.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No decks found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {searchQuery || filterLanguage !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Create your first deck to get started'}
                    </Typography>
                    <Button
                        component={Link}
                        href="/decks/new"
                        variant="contained"
                        startIcon={<Add />}
                    >
                        Create Deck
                    </Button>
                </Box>
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
                <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                    <Delete sx={{ mr: 1.5 }} fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>
        </Container>
    );
}

