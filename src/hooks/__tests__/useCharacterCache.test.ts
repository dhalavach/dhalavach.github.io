import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { server } from '../../test/mocks/server';
import { errorHandlers } from '../../test/mocks/handlers';
import { useCharacterCache } from '../useCharacterCache';

describe('useCharacterCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  describe('Character Loading', () => {
    it('loads all characters successfully', async () => {
      const { result } = renderHook(() => useCharacterCache());

      const characters = await result.current.searchCharacters('Luke');

      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe('Luke Skywalker');
    });

    it('caches characters after first load', async () => {
      const { result } = renderHook(() => useCharacterCache());

      // First call
      const characters1 = await result.current.searchCharacters('Luke');

      // Second call should use cache
      const characters2 = await result.current.searchCharacters('Luke');

      expect(characters1).toEqual(characters2);
    });

    it('handles API errors gracefully', async () => {
      server.use(...errorHandlers);
      const { result } = renderHook(() => useCharacterCache());

      await expect(result.current.searchCharacters('Luke')).rejects.toThrow();
    });
  });

  describe('Character Search', () => {
    it('filters characters by name', async () => {
      const { result } = renderHook(() => useCharacterCache());

      const characters = await result.current.searchCharacters('Luke');

      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe('Luke Skywalker');
    });

    it('returns empty array for no matches', async () => {
      const { result } = renderHook(() => useCharacterCache());

      const characters = await result.current.searchCharacters('Nonexistent');

      expect(characters).toHaveLength(0);
    });

    it('returns empty array for empty search term', async () => {
      const { result } = renderHook(() => useCharacterCache());

      const characters = await result.current.searchCharacters('');

      expect(characters).toHaveLength(0);
    });

    it('performs case-insensitive search', async () => {
      const { result } = renderHook(() => useCharacterCache());

      const characters = await result.current.searchCharacters('luke');

      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe('Luke Skywalker');
    });

    it('handles partial name matches', async () => {
      const { result } = renderHook(() => useCharacterCache());

      const characters = await result.current.searchCharacters('Luke');

      expect(characters).toHaveLength(1);
      expect(characters[0].name).toBe('Luke Skywalker');
    });
  });

  // describe('Detailed Character Loading', () => {
  //   it('loads detailed character information', async () => {
  //     const { result } = renderHook(() => useCharacterCache());

  //     const character = await result.current.getDetailedCharacter('1');

  //     expect(character).toBeDefined();
  //     expect(character?.properties?.name).toBe('Luke Skywalker');
  //     expect(character?.properties?.height).toBe('172');
  //   });

  //   it('caches detailed character information', async () => {
  //     const { result } = renderHook(() => useCharacterCache());

  //     // First call
  //     const character1 = await result.current.getDetailedCharacter('1');

  //     // Second call should use cache
  //     const character2 = await result.current.getDetailedCharacter('1');

  //     expect(character1).toEqual(character2);
  //   });

  //   it('returns null for non-existent character', async () => {
  //     const { result } = renderHook(() => useCharacterCache());

  //     const character = await result.current.getDetailedCharacter('999');

  //     expect(character).toBeNull();
  //   });

  //   it('handles API errors for detailed character', async () => {
  //     server.use(...errorHandlers);
  //     const { result } = renderHook(() => useCharacterCache());

  //     const character = await result.current.getDetailedCharacter('1');

  //     expect(character).toBeNull();
  //   });
  // });

  describe('Loading States', () => {
    it('sets loading state during character fetch', async () => {
      const { result } = renderHook(() => useCharacterCache());

      expect(result.current.isLoading).toBe(false);

      const searchPromise = result.current.searchCharacters('Luke');

      // Should be loading during fetch
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      await searchPromise;

      // Should not be loading after fetch
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('sets error state on API failure', async () => {
      server.use(...errorHandlers);
      const { result } = renderHook(() => useCharacterCache());

      try {
        await result.current.searchCharacters('Luke');
      } catch (error) {
        console.log(error);
      }

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('Cache Management', () => {
    it('clears cache when clearCache is called', async () => {
      const { result } = renderHook(() => useCharacterCache());

      // Load characters first
      await result.current.searchCharacters('Luke');
      expect(result.current.isLoaded).toBe(true);

      // Clear cache
      result.current.clearCache();

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(false);
        expect(result.current.characters).toHaveLength(0);
      });
    });

    // it('maintains separate caches for characters and detailed characters', async () => {
    //   const { result } = renderHook(() => useCharacterCache());

    //   // Load basic characters
    //   const characters = await result.current.searchCharacters('Luke');
    //   expect(characters).toHaveLength(1);

    //   // Load detailed character
    //   const detailedCharacter = await result.current.getDetailedCharacter('1');
    //   expect(detailedCharacter?.properties?.name).toBe('Luke Skywalker');

    //   // Both should be cached independently
    //   expect(result.current.characters).toHaveLength(3); // All mock characters
    //   expect(result.current.detailedCharacters.size).toBe(1);
    // });
  });
});
