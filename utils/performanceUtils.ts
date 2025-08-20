import React from 'react';

// Performance optimization utilities
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastExecution = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastExecution >= delay) {
      func(...args);
      lastExecution = now;
    }
  };
};

// Preload images for better performance
export const preloadImages = async (imageUris: string[]): Promise<void> => {
  const promises = imageUris.map(uri => {
    return new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve();
      image.onerror = () => reject();
      image.src = uri;
    });
  });

  try {
    await Promise.all(promises);
    console.log('All images preloaded successfully');
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Lazy component loader with timeout
export const createLazyComponent = <T>(
  loader: () => Promise<{ default: React.ComponentType<T> }>,
  fallback: React.ComponentType<T>,
  timeout: number = 5000
) => {
  return React.lazy(() => 
    Promise.race([
      loader(),
      new Promise<{ default: React.ComponentType<T> }>((_, reject) =>
        setTimeout(() => reject(new Error('Component load timeout')), timeout)
      )
    ]).catch(() => ({ default: fallback }))
  );
};
