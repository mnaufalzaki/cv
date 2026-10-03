export type Preferences = {
  language: "en" | "id";
  theme: "dark" | "light";
};

export const defaultPreferences: Preferences = { language: "en", theme: "dark" };

type PreferenceStorage = Pick<Storage, "getItem" | "setItem">;

export function readPreferences(getStorage: () => PreferenceStorage): Preferences {
  try {
    const storage = getStorage();
    const language = storage.getItem("portfolio-language");
    const theme = storage.getItem("portfolio-theme");
    return {
      language: language === "id" ? "id" : "en",
      theme: theme === "light" ? "light" : "dark",
    };
  } catch {
    return defaultPreferences;
  }
}

export function savePreference(
  getStorage: () => PreferenceStorage,
  key: keyof Preferences,
  value: Preferences[typeof key],
) {
  try {
    getStorage().setItem(`portfolio-${key}`, value);
  } catch {
    // The shared provider retains this choice for the current visit.
  }
}

// Runs in <head> before paint. Static HTML and the server snapshot stay dark/en.
export const themeBootstrap = `try{var t=localStorage.getItem("portfolio-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch{}`;
