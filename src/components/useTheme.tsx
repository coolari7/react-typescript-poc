export interface Theme {
  /**
   * duration in ms
   */
  timeout: number;
}

const DEFAULT_THEME: Theme = {
  timeout: 200,
};

export function useTheme(): Theme {
  return DEFAULT_THEME;
}
