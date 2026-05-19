import { readAppTokens } from "@/styles/tokens";
import type { ITheme } from "@xterm/xterm";

/**
 * xterm.js ITheme is 18 colors: bg/fg/cursor/cursorAccent/selection + ANSI 16.
 *
 * Chrome colors (background, foreground, cursor, selection) come from shadcn's
 * globals.css tokens so the terminal visually fuses with the app. ANSI 16
 * stays curated — globals.css is grayscale, it has no semantic color palette.
 */

/** Rose Pine Dark ANSI 16 palette. */
const ansi = {
  black: "#191724",        // Base
  red: "#eb6f92",          // Love
  green: "#31748f",        // Pine
  yellow: "#f6c177",       // Gold
  blue: "#9ccfd8",         // Foam
  magenta: "#c4a7e7",      // Iris
  cyan: "#ebbcba",         // Rose
  white: "#e0def4",        // Text

  brightBlack: "#6e6a86",  // Muted
  brightRed: "#eb6f92",    // Love
  brightGreen: "#31748f",  // Pine
  brightYellow: "#f6c177", // Gold
  brightBlue: "#9ccfd8",   // Foam
  brightMagenta: "#c4a7e7", // Iris
  brightCyan: "#ebbcba",   // Rose
  brightWhite: "#e0def4",  // Text
} as const;

/** Semantic palette reused by the code editor. Kept in one place so the
 *  terminal's ANSI colors and syntax highlighting stay visually coherent. */
export const syntaxPalette = {
  comment: ansi.brightBlack,   // Muted
  keyword: "#c4a7e7",         // Iris
  string: "#31748f",          // Pine
  number: "#f6c177",          // Gold
  constant: "#c4a7e7",        // Iris
  fn: "#9ccfd8",              // Foam
  type: "#9ccfd8",            // Foam
  tag: "#31748f",             // Pine
  punctuation: "#908caa",     // Subtle
  invalid: "#eb6f92",         // Love
  link: "#9ccfd8",            // Foam
} as const;

/**
 * Builds an xterm theme at runtime from the current app tokens. Must be
 * called after the DOM is ready (after first paint); globals.css variables
 * are resolved via getComputedStyle.
 */
export function buildTerminalTheme(): ITheme {
  const t = readAppTokens();
  return {
    background: t.background,
    foreground: t.foreground,
    cursor: t.foreground,
    cursorAccent: t.background,
    selectionBackground: t.accent,
    ...ansi,
  };
}
