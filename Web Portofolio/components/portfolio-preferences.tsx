"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import {
  defaultPreferences,
  readPreferences,
  savePreference,
  type Preferences,
} from "@/lib/portfolio-preferences";

let snapshot = defaultPreferences;
let initialized = false;
const listeners = new Set<() => void>();

function getSnapshot() {
  if (!initialized) {
    snapshot = readPreferences(() => window.localStorage);
    initialized = true;
  }
  return snapshot;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function setPreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
  snapshot = { ...getSnapshot(), [key]: value };
  savePreference(() => window.localStorage, key, value);
  listeners.forEach((listener) => listener());
}

const PreferencesContext = createContext<Preferences | null>(null);

export function PortfolioPreferencesProvider({ children }: { children: React.ReactNode }) {
  const preferences = useSyncExternalStore(subscribe, getSnapshot, () => defaultPreferences);

  useEffect(() => {
    const current = getSnapshot();
    document.documentElement.lang = current.language;
    document.documentElement.dataset.theme = current.theme;
  }, [preferences]);

  return <PreferencesContext.Provider value={preferences}>{children}</PreferencesContext.Provider>;
}

export function usePortfolioPreferences() {
  const preferences = useContext(PreferencesContext);
  if (!preferences) throw new Error("Portfolio preferences provider is missing");
  return {
    ...preferences,
    setLanguage: (value: Preferences["language"]) => setPreference("language", value),
    setTheme: (value: Preferences["theme"]) => setPreference("theme", value),
  };
}
