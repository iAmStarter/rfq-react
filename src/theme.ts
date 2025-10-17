import { createTheme } from "@mui/material/styles";

export const buildTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#88C5A6",
        light: "#A5D4BD",
        dark: "#6BA88B",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#9DB8D1",
        light: "#B8CBDF",
        dark: "#7A9AB8",
        contrastText: "#FFFFFF",
      },
      background: {
        default: mode === "light" ? "#F8FAF9" : "#0F1311",
        paper: mode === "light" ? "#FFFFFF" : "#1A1E1C",
      },
      text: {
        primary: mode === "light" ? "#2C3E37" : "#E8F0EC",
        secondary: mode === "light" ? "#6B8076" : "#B0C4B8",
      },
      divider: mode === "light" ? "#E0EDE6" : "#2D3831",
      action: {
        active: mode === "light" ? "#2C3E37" : "#E8F0EC",
        hover: mode === "light" ? "#F0F7F3" : "#232B26",
        selected: mode === "light" ? "#D6EFE3" : "#2A3D32",
      },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            borderBottom: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
            backgroundColor: mode === "light" ? "#FFFFFFDD" : "#1A1E1CDD",
            backdropFilter: "blur(12px)",
            border: "none",
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#1A1E1C",
            border: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
            borderRadius: 16,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            margin: "4px 12px",
            borderRadius: 12,
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: mode === "light" ? "#F0F7F3" : "#232B26",
            },
            "&.active, &.Mui-selected": {
              backgroundColor: mode === "light" ? "#D6EFE3" : "#2A3D32",
              borderLeft: `4px solid ${mode === "light" ? "#88C5A6" : "#A5D4BD"}`,
              paddingLeft: "12px",
              "&:hover": {
                backgroundColor: mode === "light" ? "#C8E8D8" : "#2F4539",
              },
              "& .MuiListItemIcon-root": {
                color: mode === "light" ? "#88C5A6" : "#A5D4BD",
              },
              "& .MuiListItemText-primary": {
                color: mode === "light" ? "#2C3E37" : "#E8F0EC",
                fontWeight: 600,
              },
            },
            "& .MuiListItemIcon-root": {
              color: mode === "light" ? "#6B8076" : "#B0C4B8",
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: mode === "light" ? "#6B8076" : "#B0C4B8",
            minWidth: 44,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 12,
            padding: "10px 20px",
          },
          containedPrimary: {
            backgroundColor: "#88C5A6",
            "&:hover": {
              backgroundColor: "#A5D4BD",
            },
            "&.Mui-disabled": {
              backgroundColor: mode === "light" ? "#E0EDE6" : "#2D3831",
            },
          },
          containedSecondary: {
            backgroundColor: "#9DB8D1",
            "&:hover": {
              backgroundColor: "#B8CBDF",
            },
          },
          outlinedPrimary: {
            borderColor: "#88C5A6",
            color: "#88C5A6",
            "&:hover": {
              backgroundColor: mode === "light" ? "#F0F7F3" : "#232B26",
              borderColor: "#A5D4BD",
            },
          },
          outlinedSecondary: {
            borderColor: "#9DB8D1",
            color: "#9DB8D1",
            "&:hover": {
              backgroundColor: mode === "light" ? "#F0F5F9" : "#232630",
              borderColor: "#B8CBDF",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#FDFFFE" : "#1A1E1C",
            border: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
            borderRadius: 20,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#E8F5EE" : "#2A3D32",
            color: mode === "light" ? "#4A7A5E" : "#A5D4BD",
            borderRadius: 10,
          },
          outlined: {
            borderColor: "#88C5A6",
            color: "#88C5A6",
            backgroundColor: "transparent",
          },
          filled: {
            backgroundColor: "#88C5A6",
            color: "#FFFFFF",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#88C5A6",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#88C5A6",
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          switchBase: {
            color: mode === "light" ? "#E0EDE6" : "#2D3831",
            "&.Mui-checked": {
              color: "#88C5A6",
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#88C5A6",
              opacity: 0.5,
            },
          },
          track: {
            backgroundColor: mode === "light" ? "#D0DED6" : "#3A4640",
            opacity: 1,
            borderRadius: 20,
          },
          thumb: {
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#1A1E1C",
            borderRight: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "light" ? "#FFFFFF" : "#1A1E1C",
            border: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
            borderRadius: 16,
            boxShadow: mode === "light" 
              ? "0 4px 24px rgba(68, 120, 91, 0.08)" 
              : "0 4px 24px rgba(0, 0, 0, 0.4)",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "4px 8px",
            "&:hover": {
              backgroundColor: mode === "light" ? "#F0F7F3" : "#232B26",
            },
            "&.Mui-selected": {
              backgroundColor: mode === "light" ? "#D6EFE3" : "#2A3D32",
              "&:hover": {
                backgroundColor: mode === "light" ? "#C8E8D8" : "#2F4539",
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "light" ? "#FDFFFE" : "#1A1E1C",
            border: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
            borderRadius: 24,
            boxShadow: mode === "light"
              ? "0 8px 32px rgba(68, 120, 91, 0.12)"
              : "0 8px 32px rgba(0, 0, 0, 0.6)",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
            borderRadius: 16,
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: mode === "light" ? "#E8F5EE" : "#2A3D32",
              color: mode === "light" ? "#2C3E37" : "#E8F0EC",
              fontWeight: 600,
              "&:focus, &:focus-within": {
                outline: "2px solid #88C5A6",
              },
            },
            "& .MuiDataGrid-cell": {
              borderColor: mode === "light" ? "#F0F7F3" : "#232B26",
              "&:focus, &:focus-within": {
                outline: "2px solid #88C5A6",
              },
            },
            "& .MuiDataGrid-row": {
              "&:hover": {
                backgroundColor: mode === "light" ? "#F0F7F3" : "#232B26",
              },
              "&.Mui-selected": {
                backgroundColor: mode === "light" ? "#D6EFE3" : "#2A3D32",
                "&:hover": {
                  backgroundColor: mode === "light" ? "#C8E8D8" : "#2F4539",
                },
              },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${mode === "light" ? "#E0EDE6" : "#2D3831"}`,
              backgroundColor: mode === "light" ? "#F8FAF9" : "#0F1311",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: mode === "light" ? "#E0EDE6" : "#2D3831",
          },
        },
      },
    },
    typography: {
      fontFamily:
        '"Inter", "Kanit", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      h1: {
        fontWeight: 700,
        fontSize: "2rem",
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      h2: {
        fontWeight: 700,
        fontSize: "1.75rem",
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      h3: {
        fontWeight: 600,
        fontSize: "1.5rem",
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      h4: {
        fontWeight: 500,
        fontSize: "1.25rem",
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      h5: {
        fontWeight: 400,
        fontSize: "1rem",
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      h6: {
        fontWeight: 300,
        fontSize: "0.875rem",
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      body1: {
        fontSize: "1rem",
        lineHeight: 1.6,
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      body2: {
        fontSize: "0.875rem",
        lineHeight: 1.6,
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
        color: mode === "light" ? "#2C3E37" : "#E8F0EC",
      },
    },
  });