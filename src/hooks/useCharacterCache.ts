import { useState, useCallback, useRef } from 'react';
import type { Character, ApiResponse } from '../types/Character';

interface CacheState {
  characters: Character[];
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useCharacterCache = () => {
  const [cache, setCache] = useState<CacheState>({
    characters: [],
    isLoaded: false,
    isLoading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const loadAllCharacters = useCallback(async () => {
    // If already loaded or loading, don't fetch again
    if (cache.isLoaded || cache.isLoading) {
      return cache.characters;
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setCache((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const allCharacters: Character[] = [];
      // let currentPage = 1;
      // let hasMorePages = true;

      // Fetch all pages concurrently for better performance
      const firstResponse = await fetch(
        `https://swapi.tech/api/people?page=1&limit=10`,
        { signal: abortController.signal }
      );

      if (!firstResponse.ok) {
        throw new Error(`HTTP error! status: ${firstResponse.status}`);
      }

      const firstData: ApiResponse = await firstResponse.json();
      allCharacters.push(...firstData.results);

      // Calculate total pages from first response
      const totalPages =
        firstData.total_pages || Math.ceil(firstData.total_records / 10);

      // Fetch remaining pages concurrently
      if (totalPages > 1) {
        const pagePromises = [];
        for (let page = 2; page <= Math.min(totalPages, 10); page++) {
          // Limit to 10 pages for performance
          pagePromises.push(
            fetch(`https://swapi.tech/api/people?page=${page}&limit=10`, {
              signal: abortController.signal,
            }).then((response) => {
              if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);
              return response.json();
            })
          );
        }

        const remainingData = await Promise.all(pagePromises);
        remainingData.forEach((data: ApiResponse) => {
          if (data.results) {
            allCharacters.push(...data.results);
          }
        });
      }

      setCache({
        characters: allCharacters,
        isLoaded: true,
        isLoading: false,
        error: null,
      });

      return allCharacters;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return cache.characters; // Return existing data if aborted
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load characters';
      setCache((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }, [cache.isLoaded, cache.isLoading, cache.characters]);

  const searchCharacters = useCallback(
    async (searchTerm: string): Promise<Character[]> => {
      const characters = await loadAllCharacters();

      if (!searchTerm.trim()) {
        return [];
      }

      const searchLower = searchTerm.toLowerCase();
      return characters.filter((character) =>
        character.name.toLowerCase().includes(searchLower)
      );
    },
    [loadAllCharacters]
  );

  const clearCache = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setCache({
      characters: [],
      isLoaded: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...cache,
    searchCharacters,
    clearCache,
  };
};
