// OXOT Design Tokens - Comprehensive Style Guide
// Based on OXOT public website visual language

export const oxotTokens = {
  colors: {
    // Backgrounds - deep charcoal to near-black
    bg: {
      primary: '#050507',      // Deepest background
      secondary: '#0a0b0f',    // Slightly lighter
      tertiary: '#0f1117',     // Card backgrounds
      elevated: '#141620',     // Elevated surfaces
      surface: '#1a1c2a',      // Interactive surfaces
    },
    // Grey scale - many shades
    grey: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#adb5bd',
      400: '#868e96',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#16181d',
      950: '#0d0f14',
    },
    // Dutch Orange accent - primary brand
    accent: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#FF6B00',     // Primary Dutch orange
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
      muted: '#71717a',
      disabled: '#52525b',
    },
    // Status colors
    status: {
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
      info: '#3b82f6',
    },
    // Glass effects
    glass: {
      light: 'rgba(255, 255, 255, 0.03)',
      medium: 'rgba(255, 255, 255, 0.05)',
      heavy: 'rgba(255, 255, 255, 0.08)',
      border: 'rgba(255, 255, 255, 0.06)',
      borderHover: 'rgba(255, 255, 255, 0.12)',
      accentGlow: 'rgba(255, 107, 0, 0.15)',
      accentBorder: 'rgba(255, 107, 0, 0.3)',
    },
  },

  typography: {
    fontFamily: {
      heading: "'Outfit', sans-serif",
      body: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace",
    },
    fontSize: {
      // Hero
      hero: { size: '4rem', lineHeight: '1.1', weight: '700', letterSpacing: '-0.02em' },
      // Headings
      h1: { size: '2.5rem', lineHeight: '1.2', weight: '700', letterSpacing: '-0.02em' },
      h2: { size: '2rem', lineHeight: '1.25', weight: '600', letterSpacing: '-0.01em' },
      h3: { size: '1.5rem', lineHeight: '1.35', weight: '600', letterSpacing: '0' },
      h4: { size: '1.25rem', lineHeight: '1.4', weight: '500', letterSpacing: '0' },
      // Body
      bodyLg: { size: '1.125rem', lineHeight: '1.7', weight: '400' },
      body: { size: '1rem', lineHeight: '1.6', weight: '400' },
      bodySm: { size: '0.875rem', lineHeight: '1.5', weight: '400' },
      caption: { size: '0.75rem', lineHeight: '1.4', weight: '400' },
    },
  },

  spacing: {
    section: '5rem',
    component: '2rem',
    element: '1rem',
    tight: '0.5rem',
  },

  effects: {
    glassMorphism: {
      light: {
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      },
      medium: {
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      },
      heavy: {
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      },
      accent: {
        background: 'rgba(255, 107, 0, 0.05)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 107, 0, 0.2)',
      },
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
      glow: '0 0 30px rgba(255, 107, 0, 0.15)',
      glowStrong: '0 0 60px rgba(255, 107, 0, 0.25)',
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.75rem',
      lg: '1rem',
      xl: '1.5rem',
    },
  },

  animation: {
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms',
    },
    easings: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
} as const;

export type OxotTokens = typeof oxotTokens;
export default oxotTokens;
