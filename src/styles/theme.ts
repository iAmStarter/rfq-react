// theme.ts
import { createTheme, alpha, lighten, darken } from "@mui/material/styles";

const tokens = (mode: "light" | "dark") => {
  const isLight = mode === "light";

  // Base neutrals tuned for pastel UI
  const bgDefault = isLight ? "#FAFBFA" : "#0F1311";
  const bgPaper = isLight ? "#FFFFFF" : "#141815";
  const textPrimary = isLight ? "#27362F" : "#EAF2EE";
  const textSecondary = isLight ? "#6A7E74" : "#B5C6BC";
  const divider = isLight ? "#E4EEE8" : "#2B3630";
  const hover = isLight ? "#F3F7F5" : "#1D2621";
  const selected = isLight ? "#DCEFE6" : "#253A2F";

  // Brand pastels (kept your original primary/secondary and harmonized others)
  const primary = { main: "#88C5A6", light: "#A8D8BF", dark: "#6BA88B", contrastText: "#FFFFFF" };
  const secondary = { main: "#9DB8D1", light: "#BBD0E1", dark: "#7A9AB8", contrastText: "#FFFFFF" };
  const info = { main: "#8EC5E9", light: "#B9DFF5", dark: "#6AA9D0", contrastText: "#0F1A1F" };
  const success = { main: "#8FD6B3", light: "#BDE7CF", dark: "#6EB894", contrastText: "#0F1A14" };
  const warning = { main: "#F6C88F", light: "#FBE2BF", dark: "#D8A870", contrastText: "#23190E" };
  const error = { main: "#F19AA8", light: "#F6C3CB", dark: "#D47986", contrastText: "#220C11" };

  const ring = alpha(primary.main, isLight ? 0.35 : 0.45);
  const softShadow = isLight
    ? "0 4px 20px rgba(72, 94, 86, 0.08)"
    : "0 6px 24px rgba(0,0,0,0.45)";

  return {
    isLight,
    bgDefault,
    bgPaper,
    textPrimary,
    textSecondary,
    divider,
    hover,
    selected,
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    ring,
    softShadow,
  };
};

export const buildTheme = (mode: "light" | "dark") => {
  const t = tokens(mode);

  return createTheme({
    palette: {
      mode,
      primary: t.primary,
      secondary: t.secondary,
      info: t.info,
      success: t.success,
      warning: t.warning,
      error: t.error,
      background: { default: t.bgDefault, paper: t.bgPaper },
      text: { primary: t.textPrimary, secondary: t.textSecondary },
      divider: t.divider,
      action: {
        active: t.textPrimary,
        hover: t.hover,
        selected: t.selected,
        disabled: alpha(t.textSecondary, 0.38),
        disabledBackground: alpha(t.textSecondary, 0.12),
        focus: t.ring,
      },
      tonalOffset: 0.2,
      contrastThreshold: 3,
    },

    shape: { borderRadius: 16 },

    typography: {
      fontFamily:
        '"Inter", "Kanit", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      h1: { fontWeight: 700, fontSize: "2rem", color: t.textPrimary, letterSpacing: "-0.01em" },
      h2: { fontWeight: 700, fontSize: "1.75rem", color: t.textPrimary },
      h3: { fontWeight: 600, fontSize: "1.5rem", color: t.textPrimary },
      h4: { fontWeight: 600, fontSize: "1.25rem", color: t.textPrimary },
      h5: { fontWeight: 500, fontSize: "1.125rem", color: t.textPrimary },
      h6: { fontWeight: 500, fontSize: "1rem", color: t.textPrimary },
      body1: { fontSize: "1rem", lineHeight: 1.6, color: t.textPrimary },
      body2: { fontSize: "0.925rem", lineHeight: 1.55, color: t.textSecondary },
      button: { textTransform: "none", fontWeight: 600 },
      subtitle1: { color: t.textSecondary },
      subtitle2: { color: t.textSecondary },
      overline: { letterSpacing: "0.06em", fontWeight: 600 },
      caption: { color: t.textSecondary },
    },

    shadows: [
      "none",
      "0 1px 2px rgba(0,0,0,0.04)",
      "0 2px 8px rgba(0,0,0,0.06)",
      "0 4px 16px rgba(0,0,0,0.08)",
      t.softShadow,
      ...Array(20).fill(t.softShadow),
    ] as any,

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ":root": { colorScheme: mode },
          body: {
            backgroundColor: t.bgDefault,
            color: t.textPrimary,
            letterSpacing: "0.01px",
          },
          "*:focus-visible": {
            outline: `2px solid ${t.ring}`,
            outlineOffset: 2,
            borderRadius: 6,
          },
          "::selection": {
            background: alpha(t.primary.main, 0.25),
          },
        },
      },

      // Containers
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundColor: t.bgPaper,
            border: `1px solid ${t.divider}`,
            borderRadius: 16,
          },
          outlined: {
            borderColor: t.divider,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: t.isLight ? "#FEFFFE" : t.bgPaper,
            border: `1px solid ${t.divider}`,
            borderRadius: 20,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            backdropFilter: "blur(10px)",
            backgroundColor: t.isLight ? "#FFFFFF90" : "#14181590",
            border: 'none',
            // borderBottom: `1px solid ${t.divider}`,
            // borderTop: 'none',
            // borderLeft: 'none',
            // borderRight: 'none',
            borderRadius: 0,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: t.bgPaper,
            borderRight: `1px solid ${t.divider}`,
             borderRadius: 0,
          },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: t.divider } },
      },

      // Navigation
      MuiListItemButton: {
        styleOverrides: {
          root: {
            margin: "4px 10px",
            borderRadius: 12,
            transition: "all .2s ease",
            "&:hover": { backgroundColor: t.hover },
            "&.active, &.Mui-selected": {
              backgroundColor: t.selected,
              "&:hover": { backgroundColor: t.isLight ? "#CFE7DB" : "#2C4437" },
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: { root: { minWidth: 44, color: t.textSecondary } },
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          separator: { color: t.textSecondary },
          li: { color: t.textSecondary },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: { minHeight: 42 },
          indicator: { height: 3, borderRadius: 3, backgroundColor: t.primary.main },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minHeight: 42,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 10,
            "&.Mui-selected": { color: t.textPrimary },
          },
        },
      },

      // Buttons
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 12,
            padding: "10px 18px",
          },
          containedPrimary: {
            backgroundColor: t.primary.main,
            "&:hover": { backgroundColor: t.primary.light },
            "&.Mui-disabled": { backgroundColor: t.divider, color: alpha(t.textSecondary, 0.6) },
          },
          containedSecondary: {
            backgroundColor: t.secondary.main,
            "&:hover": { backgroundColor: t.secondary.light },
          },
          textPrimary: {
            "&:hover": { backgroundColor: alpha(t.primary.main, 0.1) },
          },
          outlinedPrimary: {
            borderColor: t.primary.main,
            color: t.primary.main,
            "&:hover": {
              backgroundColor: alpha(t.primary.main, 0.08),
              borderColor: t.primary.light,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            "&:hover": { backgroundColor: alpha(t.textSecondary, 0.12) },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },

      // Inputs
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: t.textSecondary,
            "&.Mui-focused": { color: t.primary.main },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { borderRadius: 12 },
          input: { paddingTop: 12, paddingBottom: 12 },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: t.primary.main },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: t.primary.main,
              borderWidth: 2,
            },
          },
          notchedOutline: { borderColor: t.divider },
        },
      },
      MuiTextField: { defaultProps: { variant: "outlined" } },
      MuiSelect: {
        styleOverrides: {
          icon: { color: t.textSecondary },
          select: { "&:focus": { borderRadius: 12 } },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            border: `1px solid ${t.divider}`,
            borderRadius: 14,
            boxShadow: t.softShadow,
          },
          option: {
            borderRadius: 8,
            margin: "2px 6px",
            "&[aria-selected='true']": { background: t.selected },
            "&:hover": { background: t.hover },
          },
          tag: { borderRadius: 10 },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: { padding: 8 },
          track: { backgroundColor: t.isLight ? "#D7E5DD" : "#33413A", borderRadius: 20 },
          switchBase: {
            "&.Mui-checked": { color: t.primary.main },
            "&.Mui-checked + .MuiSwitch-track": { backgroundColor: t.primary.main, opacity: 0.5 },
          },
          thumb: { boxShadow: "0 2px 4px rgba(0,0,0,0.12)" },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: alpha(t.textSecondary, 0.6),
            "&.Mui-checked": { color: t.primary.main },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: alpha(t.textSecondary, 0.6),
            "&.Mui-checked": { color: t.primary.main },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            "&.Mui-selected": {
              backgroundColor: t.selected,
              borderColor: t.primary.main,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            backgroundColor: t.isLight ? "#EAF6F0" : "#24372C",
            color: t.isLight ? darken(t.primary.main, 0.2) : t.primary.light,
          },
          outlined: {
            borderColor: t.primary.main,
            color: t.primary.main,
            backgroundColor: "transparent",
          },
          filled: { backgroundColor: t.primary.main, color: "#FFFFFF" },
        },
      },

      // Feedback
      MuiAlert: {
        defaultProps: { variant: "soft" as any }, // still renders as standard; style below
        styleOverrides: {
          root: {
            borderRadius: 14,
            border: `1px solid ${t.divider}`,
          },
          standardInfo: {
            background: alpha(t.info.main, 0.15),
            color: darken(t.info.main, t.isLight ? 0.4 : 0.2),
            borderColor: alpha(t.info.main, 0.35),
          },
          standardSuccess: {
            background: alpha(t.success.main, 0.15),
            color: darken(t.success.main, t.isLight ? 0.45 : 0.2),
            borderColor: alpha(t.success.main, 0.35),
          },
          standardWarning: {
            background: alpha(t.warning.main, 0.18),
            color: darken(t.warning.main, t.isLight ? 0.5 : 0.25),
            borderColor: alpha(t.warning.main, 0.4),
          },
          standardError: {
            background: alpha(t.error.main, 0.16),
            color: darken(t.error.main, t.isLight ? 0.5 : 0.25),
            borderColor: alpha(t.error.main, 0.4),
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: { "& .MuiPaper-root": { borderRadius: 14, border: `1px solid ${t.divider}` } },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 10,
            border: `1px solid ${t.divider}`,
            background: t.isLight ? "#ffffff" : "#1A1E1C",
            color: t.textPrimary,
            boxShadow: t.softShadow,
          },
          arrow: {
            color: t.isLight ? "#ffffff" : "#1A1E1C",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            borderRadius: 16,
            border: `1px solid ${t.divider}`,
            boxShadow: t.softShadow,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 24,
            border: `1px solid ${t.divider}`,
            boxShadow: t.softShadow,
            backgroundColor: t.isLight ? "#FEFFFE" : t.bgPaper,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${t.divider}`,
            "&:before": { display: "none" },
            overflow: "hidden",
          },
        },
      },

      // Data display
      MuiAvatar: {
        styleOverrides: {
          root: {
            backgroundColor: alpha(t.primary.main, 0.15),
            color: darken(t.primary.main, 0.25),
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            border: `2px solid ${t.bgPaper}`,
            backgroundColor: t.primary.main,
            color: "#fff",
          },
        },
      },

      // Data / tables
      MuiTableContainer: {
        styleOverrides: { root: { borderRadius: 16, border: `1px solid ${t.divider}` } },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: t.isLight ? "#ECF7F2" : "#24372C",
            "& .MuiTableCell-root": { color: t.textPrimary, fontWeight: 700 },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: { borderColor: t.divider },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            border: `1px solid ${t.divider}`,
            borderRadius: 16,
            "--DataGrid-rowBorderColor": t.divider,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: t.isLight ? "#ECF7F2" : "#24372C",
            },
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
            "& .MuiDataGrid-cell:focus,& .MuiDataGrid-cell:focus-within": {
              outline: `2px solid ${t.ring}`,
              outlineOffset: -2,
            },
            "& .MuiDataGrid-row:hover": { backgroundColor: t.hover },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: t.selected,
              "&:hover": { backgroundColor: t.isLight ? "#CFE7DB" : "#2C4437" },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${t.divider}`,
              backgroundColor: t.bgDefault,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
          },
        },
      },

      // Progress / sliders
      MuiLinearProgress: {
        styleOverrides: {
          root: { height: 8, borderRadius: 8 },
          bar: { borderRadius: 8 },
        },
      },
      MuiCircularProgress: {
        styleOverrides: { root: { strokeLinecap: "round" } as any },
      },
      MuiSlider: {
        styleOverrides: {
          root: { paddingTop: 16, paddingBottom: 16 },
          rail: { opacity: 0.3 },
          track: { height: 8, borderRadius: 8 },
          thumb: { width: 20, height: 20, boxShadow: "none" },
          valueLabel: { borderRadius: 8 },
        },
      },

      // Navigation & pagination
      MuiPagination: {
        styleOverrides: {
          ul: { gap: 6 },
          root: { "& .MuiPaginationItem-root": { borderRadius: 10 } },
        },
      },

      // Feedback / skeleton
      MuiSkeleton: {
        styleOverrides: {
          root: {
            background:
              mode === "light"
                ? `linear-gradient(90deg, ${alpha("#DDE8E1", 0.6)} 25%, ${alpha(
                  "#F2F7F4",
                  0.9
                )} 37%, ${alpha("#DDE8E1", 0.6)} 63%)`
                : `linear-gradient(90deg, ${alpha("#223028", 0.6)} 25%, ${alpha(
                  "#17201B",
                  0.9
                )} 37%, ${alpha("#223028", 0.6)} 63%)`,
          },
        },
      },

      // Menus
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: t.bgPaper,
            border: `1px solid ${t.divider}`,
            borderRadius: 16,
            boxShadow: t.softShadow,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "4px 6px",
            "&:hover": { backgroundColor: t.hover },
            "&.Mui-selected": {
              backgroundColor: t.selected,
              "&:hover": { backgroundColor: t.isLight ? "#CFE7DB" : "#2C4437" },
            },
          },
        },
      },

      // Links
      MuiLink: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            color: t.primary.main,
            textDecorationColor: alpha(t.primary.main, 0.4),
            "&:hover": { textDecorationColor: t.primary.main },
          },
        },
      },
    },
  });
};
