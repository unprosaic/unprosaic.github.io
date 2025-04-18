import React, { createContext, useState, useContext, ReactNode } from "react";
import { defaultConfig, Config } from "../config";
import { getThemeById } from "../components/themes";

interface ConfigContextType {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
  countdownEnded: boolean;
  setCountdownEnded: (ended: boolean) => void;
  applyThemeStyles: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [countdownEnded, setCountdownEnded] = useState(false);

  const updateConfig = (newConfig: Partial<Config>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('birthdayConfig', JSON.stringify(updated));
      return updated;
    });
  };

  // Apply the current theme's colors to CSS variables
  const applyThemeStyles = () => {
    const theme = getThemeById(config.theme);
    const root = document.documentElement;

    // Set CSS variables
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--secondary', theme.colors.secondary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--neutral', theme.colors.neutral);
    root.style.setProperty('--accent2', theme.colors.accent2);
  };

  // Load saved config from localStorage on mount
  React.useEffect(() => {
    // Clear any existing saved config to apply new defaults
    localStorage.removeItem('birthdayConfig');
    
    const savedConfig = localStorage.getItem('birthdayConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        // Convert string date back to Date object
        if (parsedConfig.birthdayDate) {
          parsedConfig.birthdayDate = new Date(parsedConfig.birthdayDate);
        }
        setConfig({...defaultConfig, ...parsedConfig});
      } catch (e) {
        console.error("Failed to parse saved config:", e);
      }
    }
  }, []);

  // Apply theme whenever it changes
  React.useEffect(() => {
    applyThemeStyles();
  }, [config.theme]);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, countdownEnded, setCountdownEnded, applyThemeStyles }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
}
