import { useState, useCallback, useRef } from 'react';
import type { Character, ApiResponse } from '../types/Character';

interface DetailedCharacter extends Character {
  properties?: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
  };
}

interface CacheState {
  characters: Character[];
  detailedCharacters: Map<string, DetailedCharacter>;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useCharacterCache = () => {
  // Ensure hooks are called in consistent order
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasInitialLoad = useRef(false);

  const [cache, setCache] = useState<CacheState>({
    characters: [],
    detailedCharacters: new Map(),
    isLoaded: false,
    isLoading: false,
    error: null,
  });

  const loadInitialCharacters = useCallback(async () => {
    // If already loading, don't fetch again
    if (cache.isLoading || hasInitialLoad.current) {
      return cache.characters;
    }

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    hasInitialLoad.current = true;

    setCache((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Only fetch the first page initially for fast loading
      const firstResponse = await fetch(
        `https://swapi.tech/api/people?page=1&limit=10`,
        { signal: abortController.signal }
      );

      if (!firstResponse.ok) {
        throw new Error(`HTTP error! status: ${firstResponse.status}`);
      }

      const firstData: ApiResponse = await firstResponse.json();

      setCache({
        characters: firstData.results || [],
        detailedCharacters: new Map(),
        isLoaded: false, // Not fully loaded yet, just initial page
        isLoading: false,
        error: null,
      });

      return firstData.results || [];
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
  }, [cache.isLoading, cache.characters]);

  const loadAllCharacters = useCallback(async () => {
    // If already fully loaded, return cached data
    if (cache.isLoaded) {
      return cache.characters;
    }

    // First ensure we have initial characters
    let characters = cache.characters;
    if (characters.length === 0) {
      characters = await loadInitialCharacters();
    }

    // If we only have the first page, load the rest
    if (characters.length <= 10 && !cache.isLoaded) {
      // Cancel any existing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setCache((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const allCharacters: Character[] = [...characters];

        // Fetch remaining pages (starting from page 2)
        for (let page = 2; page <= 10; page++) {
          // Add delay to prevent rate limiting
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const response = await fetch(
            `https://swapi.tech/api/people?page=${page}&limit=10`,
            {
              signal: abortController.signal,
            }
          );

          if (!response.ok) {
            if (response.status === 404) {
              // No more pages
              break;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: ApiResponse = await response.json();
          if (data.results && data.results.length > 0) {
            allCharacters.push(...data.results);
          } else {
            // No more results
            break;
          }
        }

        setCache({
          characters: allCharacters,
          detailedCharacters: new Map(),
          isLoaded: true,
          isLoading: false,
          error: null,
        });

        return allCharacters;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return characters; // Return existing data if aborted
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
    }

    return characters;
  }, [cache.isLoaded, cache.characters, loadInitialCharacters]);

  const searchCharacters = useCallback(
    async (searchTerm: string): Promise<Character[]> => {
      // For search, start with initial load for fast response
      let characters = cache.characters;
      if (characters.length === 0) {
        characters = await loadInitialCharacters();
      }

      if (!searchTerm.trim()) {
        return [];
      }

      const searchLower = searchTerm.toLowerCase();
      const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes(searchLower)
      );

      // If we found results in the initial page, return them immediately
      // Otherwise, load all characters and search again
      if (filteredCharacters.length > 0 || cache.isLoaded) {
        return filteredCharacters;
      }

      // Load all characters for comprehensive search
      const allCharacters = await loadAllCharacters();
      return allCharacters.filter((character) =>
        character.name.toLowerCase().includes(searchLower)
      );
    },
    [cache.characters, cache.isLoaded, loadInitialCharacters, loadAllCharacters]
  );

  const clearCache = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    hasInitialLoad.current = false;
    setCache({
      characters: [],
      detailedCharacters: new Map(),
      isLoaded: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const getDetailedCharacter = useCallback(
    async (uid: string): Promise<DetailedCharacter | null> => {
      // Check cache first
      const cached = cache.detailedCharacters.get(uid);
      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(`https://swapi.tech/api/people/${uid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const detailedCharacter: DetailedCharacter = {
          uid: data.result.uid,
          name: data.result.properties.name,
          url: data.result.url,
          properties: data.result.properties,
        };

        // Update cache
        setCache((prev) => ({
          ...prev,
          detailedCharacters: new Map(prev.detailedCharacters).set(
            uid,
            detailedCharacter
          ),
        }));

        return detailedCharacter;
      } catch (error) {
        console.error('Error fetching character details:', error);
        return null;
      }
    },
    [cache.detailedCharacters]
  );

  return {
    ...cache,
    searchCharacters,
    getDetailedCharacter,
    clearCache,
  };
};
