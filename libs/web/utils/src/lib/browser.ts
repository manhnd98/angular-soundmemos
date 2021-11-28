interface DetectBrowser {
  browser: string | null;
  version: number | null;
  minVersion: number | null;
}

/**
 * get current browser information
 * @returns {result.browser}: browser name `chrome`, `firefox`, etc.
 * @returns {result.version}: current version number
 * @returns {result.minVersion}: minimum version
 */
export function detectBrowser(): DetectBrowser {
  const result: DetectBrowser = {
    browser: null,
    version: null,
    minVersion: null,
  };

  if (typeof window === 'undefined' || !window.navigator) {
    result.browser = 'Not a supported browser.';
    return result;
  }

  return result;
}
