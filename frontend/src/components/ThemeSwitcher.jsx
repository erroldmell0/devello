import { useEffect, useState } from "react";
import { PaletteIcon, CheckIcon } from "lucide-react";

export const THEME_STORAGE_KEY = "devello-theme";
export const DEFAULT_THEME = "forest";

/**
 * Which hero artwork suits each theme's palette. Grouped by colour family so
 * the grouping stays readable — a theme's family is the thing being decided,
 * the filename is just the consequence.
 *
 * Covers all 35 daisyUI themes; anything unlisted falls back to the green art.
 *
 * The green art is a PNG because it has a real alpha channel and blends into
 * the page. The rest are fully opaque with a baked white background, so they
 * ship as JPEG at 1024px — same pixels on screen, ~145 KB instead of ~4.4 MB.
 */
export const HERO_FAMILIES = {
  green: {
    src: "/hero.png",
    themes: ["forest", "dim", "lemonade", "abyss", "silk", "emerald"],
  },
  whiteBlack: {
    src: "/hero_white_black.jpg",
    themes: ["black", "luxury", "lofi", "wireframe"],
  },
  blue: {
    src: "/hero_blue.jpg",
    themes: ["night", "business", "aqua", "cmyk", "winter", "nord", "corporate", "cupcake"],
  },
  pink: {
    src: "/hero_pink.jpg",
    themes: ["dracula", "cyberpunk", "valentine", "garden", "acid"],
  },
  purple: {
    src: "/hero_purple.jpg",
    themes: ["dark", "light", "synthwave", "pastel", "fantasy"],
  },
  brown: {
    src: "/hero_brown.jpg",
    themes: ["coffee", "halloween", "autumn", "sunset", "caramellatte", "retro", "bumblebee"],
  },
};

const HERO_BY_THEME = Object.fromEntries(
  Object.values(HERO_FAMILIES).flatMap(({ src, themes }) =>
    themes.map((theme) => [theme, src])
  )
);

export function getHeroForTheme(theme) {
  return HERO_BY_THEME[theme] || HERO_FAMILIES.green.src;
}

// Every theme daisyUI ships with, in picker order. index.css enables
// `themes: all`, so all of these are already in the bundle.
export const THEMES = [
  "forest", "dark", "light", "dim", "night", "black", "business", "coffee",
  "luxury", "dracula", "synthwave", "halloween", "aqua", "cyberpunk",
  "valentine", "garden", "lofi", "pastel", "fantasy", "wireframe", "cmyk",
  "autumn", "acid", "lemonade", "winter", "nord", "sunset", "caramellatte",
  "abyss", "silk", "emerald", "corporate", "retro", "cupcake", "bumblebee",
];

export function getStoredTheme() {
  if (typeof localStorage === "undefined") return DEFAULT_THEME;
  return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
}

/**
 * Read the live theme from the <html> element. Watching the attribute rather
 * than sharing React state means this works no matter where the switcher sits
 * in the tree — including HomePage, which renders its own nav.
 */
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || DEFAULT_THEME
  );

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.getAttribute("data-theme") || DEFAULT_THEME);

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return theme;
}

function ThemeSwitcher() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const chooseTheme = (next) => {
    setTheme(next);
    // daisyUI dropdowns stay open while focused — drop focus to close it
    document.activeElement?.blur();
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="px-3 py-2 border-2 border-primary/30 text-base-content/70 hover:text-primary hover:border-primary brut-press flex items-center gap-2"
        aria-label="Change theme"
        title="Change theme"
      >
        <PaletteIcon className="size-4" />
        <span className="brut-meta hidden md:inline">{theme}</span>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content z-100 mt-2 w-60 max-h-96 overflow-y-auto bg-base-100 brut p-2"
      >
        <p className="brut-meta text-base-content/50 px-2 py-2 border-b-2 border-primary/30 mb-2">
          Theme
        </p>

        <div className="flex flex-col gap-1">
          {THEMES.map((name) => (
            <button
              key={name}
              data-theme={name}
              onClick={() => chooseTheme(name)}
              aria-label={`Use ${name} theme`}
              aria-pressed={theme === name}
              className={`flex items-center justify-between gap-3 px-2.5 py-2 bg-base-100 border-2 transition-colors ${
                theme === name
                  ? "border-primary"
                  : "border-transparent hover:border-primary/40"
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                {theme === name ? (
                  <CheckIcon className="size-3.5 text-primary shrink-0" />
                ) : (
                  <span className="size-3.5 shrink-0" />
                )}
                <span className="brut-meta text-base-content truncate">{name}</span>
              </span>

              {/* Swatches read from this row's own data-theme, so each line
                  previews the palette it applies. */}
              <span className="flex gap-1 shrink-0">
                <span className="size-3.5 bg-primary" />
                <span className="size-3.5 bg-secondary" />
                <span className="size-3.5 bg-accent" />
                <span className="size-3.5 bg-neutral" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
