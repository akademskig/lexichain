"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  Dashboard,
  LibraryBooks,
  Person,
  EmojiEvents,
  Add,
  LocalFireDepartment,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DRAWER_WIDTH = 280;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: "permanent" | "temporary";
}

export function Sidebar({
  open,
  onClose,
  variant = "permanent",
}: Readonly<SidebarProps>) {
  const pathname = usePathname();

  // Mock user data - will be replaced with real auth
  const user = {
    name: "Demo User",
    email: "demo@lexichain.com",
    streak: 7,
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, href: "/dashboard" },
    { text: "My Decks", icon: <LibraryBooks />, href: "/decks" },
    { text: "Achievements", icon: <EmojiEvents />, href: "/achievements" },
    { text: "Profile", icon: <Person />, href: "/profile" },
  ];

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <Box sx={{ p: 3, pb: 2 }}>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Image
            src="/lexi-logo-icon.svg"
            alt="LexiChain"
            width={40}
            height={40}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LexiChain
          </Typography>
        </Link>
      </Box>

      <Divider />

      {/* User Info */}
      <Box sx={{ p: 3, py: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              bgcolor: "primary.main",
              color: "background.default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              fontWeight: 700,
            }}
          >
            {user.name.charAt(0)}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} noWrap>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user.email}
            </Typography>
          </Box>
        </Stack>

        {/* Streak Badge */}
        <Chip
          icon={<LocalFireDepartment sx={{ color: "#ff6b35 !important" }} />}
          label={`${user.streak} day streak 🔥`}
          size="small"
          sx={{
            mt: 2,
            width: "100%",
            backgroundColor: "rgba(255, 107, 53, 0.1)",
            border: "1px solid #ff6b35",
            color: "#ff6b35",
            fontWeight: 600,
          }}
        />
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ flex: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={variant === "temporary" ? onClose : undefined}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "background.default" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive ? "primary.dark" : "action.hover",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "background.default" : "primary.main",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      fontWeight: isActive ? 600 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        <Divider sx={{ my: 2 }} />

        {/* Create New Deck Button */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/decks/new"
            onClick={variant === "temporary" ? onClose : undefined}
            sx={{
              borderRadius: 2,
              py: 1.5,
              background:
                "linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)",
              border: "1px solid",
              borderColor: "primary.main",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.2) 100%)",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
              <Add />
            </ListItemIcon>
            <ListItemText
              primary="Create Deck"
              slotProps={{
                primary: {
                  fontWeight: 600,
                  color: "primary.main",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      {/* Footer */}
      <Box sx={{ p: 3, pt: 2 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          display="block"
        >
          Learn it. Own it. Prove it.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export { DRAWER_WIDTH };
