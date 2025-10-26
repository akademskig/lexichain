"use client";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Chip,
    Link,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Person,
    Logout,
    LocalFireDepartment,
} from "@mui/icons-material";
import { useState } from "react";
import { DRAWER_WIDTH } from "./Sidebar";

interface NavbarProps {
    onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: Readonly<NavbarProps>) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Mock user data - will be replaced with real auth
    const user = {
        name: "Demo User",
        email: "demo@lexichain.com",
        streak: 7,
    };

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { lg: `calc(100% - ${DRAWER_WIDTH}px)` },
                ml: { lg: `${DRAWER_WIDTH}px` },
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Mobile/Tablet/Small Desktop Menu Button */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { lg: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Page Title / Search - can be customized per page */}
                <Box sx={{ flex: 1 }} />

                {/* User Menu */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {/* Streak Indicator */}
                    <Chip
                        icon={<LocalFireDepartment sx={{ color: "#ff6b35 !important" }} />}
                        label={`${user.streak} day streak`}
                        size="small"
                        sx={{
                            backgroundColor: "rgba(255, 107, 53, 0.1)",
                            border: "1px solid #ff6b35",
                            color: "#ff6b35",
                            fontWeight: 600,
                            display: { xs: "none", md: "flex" },
                        }}
                    />

                    {/* User Avatar */}
                    <IconButton onClick={handleMenu} size="small">
                        <Avatar
                            sx={{
                                width: 36,
                                height: 36,
                                bgcolor: "primary.main",
                                color: "background.default",
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        slotProps={{
                            paper: {
                                sx: {
                                    mt: 1.5,
                                    minWidth: 200,
                                },
                            },
                        }}
                    >
                        <Box
                            sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}
                        >
                            <Typography variant="subtitle2" fontWeight={600}>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                        <MenuItem component={Link} href="/profile" onClick={handleClose}>
                            <Person sx={{ mr: 1.5 }} fontSize="small" />
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
                            <Logout sx={{ mr: 1.5 }} fontSize="small" />
                            Logout
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
