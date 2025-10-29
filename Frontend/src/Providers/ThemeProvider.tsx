import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  type ReactNode,
 type Dispatch,
 type SetStateAction,
} from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

// 💡 Define type for our context
interface ThemeContextType {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

// ✅ Create context with proper type
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const theme = useMemo(
    () => ({
      algorithm: isDark
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: isDark ? "#722ed1" : "#1677ff",
        colorBgBase: isDark ? "#141414" : "#f4f4f4",
        borderRadius: 8,
        fontFamily: "'Inter', sans-serif",
      },
    }),
    [isDark]
  );

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}

// Optional helper hook for easier usage
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
