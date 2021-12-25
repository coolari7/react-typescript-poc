export interface Theme {
  /**
   * duration in ms
   */
  timeout: number;
}

export const defaultTimeout = 200;

const DEFAULT_THEME: Theme = {
  timeout: defaultTimeout,
};

export function useTheme(): Theme {
  return DEFAULT_THEME;
}
