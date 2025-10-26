"use client";

import { createTheme } from "@mui/material/styles";

// Neon Futuristic Color Palette
const neonColors = {
  primary: {
    main: "#00ffff", // Cyan neon
    light: "#66ffff",
    dark: "#00cccc",
    glow: "rgba(0, 255, 255, 0.5)",
  },
  secondary: {
    main: "#ff00ff", // Magenta neon
    light: "#ff66ff",
    dark: "#cc00cc",
    glow: "rgba(255, 0, 255, 0.5)",
  },
  accent: {
    main: "#00ff00", // Green neon
    light: "#66ff66",
    dark: "#00cc00",
    glow: "rgba(0, 255, 0, 0.5)",
  },
  warning: {
    main: "#ffff00", // Yellow neon
    light: "#ffff66",
    dark: "#cccc00",
  },
  error: {
    main: "#ff0066", // Pink neon
    light: "#ff3385",
    dark: "#cc0052",
  },
  background: {
    default: "#0a0a0f", // Deep dark blue-black
    paper: "#121218", // Slightly lighter dark
    elevated: "#1a1a24",
  },
  text: {
    primary: "#ffffff",
    secondary: "#b0b0b8",
    disabled: "#606068",
  },
};

// Create the neon futuristic theme
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: neonColors.primary.main,
      light: neonColors.primary.light,
      dark: neonColors.primary.dark,
    },
    secondary: {
      main: neonColors.secondary.main,
      light: neonColors.secondary.light,
      dark: neonColors.secondary.dark,
    },
    error: {
      main: neonColors.error.main,
    },
    warning: {
      main: neonColors.warning.main,
    },
    background: {
      default: neonColors.background.default,
      paper: neonColors.background.paper,
    },
    text: {
      primary: neonColors.text.primary,
      secondary: neonColors.text.secondary,
      disabled: neonColors.text.disabled,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      textShadow: `0 0 20px ${neonColors.primary.glow}`,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 600,
      letterSpacing: "-0.01em",
      textShadow: `0 0 15px ${neonColors.primary.glow}`,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      textShadow: `0 0 10px ${neonColors.primary.glow}`,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "1rem",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `0 8px 24px ${neonColors.primary.glow}`,
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${neonColors.primary.main} 0%, ${neonColors.secondary.main} 100%)`,
          boxShadow: `0 4px 12px ${neonColors.primary.glow}`,
          "&:hover": {
            background: `linear-gradient(135deg, ${neonColors.primary.light} 0%, ${neonColors.secondary.light} 100%)`,
            boxShadow: `0 8px 24px ${neonColors.primary.glow}`,
          },
        },
        outlined: {
          borderWidth: 2,
          borderColor: neonColors.primary.main,
          color: neonColors.primary.main,
          "&:hover": {
            borderWidth: 2,
            borderColor: neonColors.primary.light,
            backgroundColor: `${neonColors.primary.glow}20`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.background.paper,
          backgroundImage: "none",
          border: `1px solid rgba(0, 255, 255, 0.1)`,
          boxShadow: `0 4px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px ${neonColors.primary.glow}20`,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px ${neonColors.primary.glow}`,
            borderColor: neonColors.primary.main,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: neonColors.background.paper,
        },
        elevation1: {
          boxShadow: `0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px ${neonColors.primary.glow}10`,
        },
        elevation2: {
          boxShadow: `0 4px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px ${neonColors.primary.glow}20`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(0, 255, 255, 0.3)",
              borderWidth: 2,
            },
            "&:hover fieldset": {
              borderColor: neonColors.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: neonColors.primary.main,
              boxShadow: `0 0 12px ${neonColors.primary.glow}`,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.background.elevated,
          border: `1px solid ${neonColors.primary.main}`,
          color: neonColors.primary.main,
          fontWeight: 600,
          "&:hover": {
            backgroundColor: `${neonColors.primary.glow}20`,
            boxShadow: `0 0 12px ${neonColors.primary.glow}`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.background.paper,
          backgroundImage: "none",
          borderBottom: `1px solid ${neonColors.primary.main}40`,
          boxShadow: `0 4px 24px rgba(0, 0, 0, 0.5), 0 1px 0 ${neonColors.primary.glow}`,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.background.elevated,
          borderRadius: 8,
          height: 8,
        },
        bar: {
          background: `linear-gradient(90deg, ${neonColors.primary.main} 0%, ${neonColors.secondary.main} 100%)`,
          boxShadow: `0 0 12px ${neonColors.primary.glow}`,
          borderRadius: 8,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: neonColors.primary.main,
            "& + .MuiSwitch-track": {
              backgroundColor: neonColors.primary.main,
              opacity: 0.5,
            },
          },
        },
        track: {
          backgroundColor: neonColors.text.disabled,
        },
      },
    },
  },
});

export default theme;
