import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // Cleanup function to restore previous title
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}; 