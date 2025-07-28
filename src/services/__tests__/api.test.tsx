import { APIService } from '../api';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

global.fetch = vi.fn();

describe('APIService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Successful API Calls', () => {
    it('makes API call with correct URL for search term', async () => {
      const mockResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: ['https://swapi.dev/api/films/1/'],
            species: [],
            vehicles: ['https://swapi.dev/api/vehicles/14/'],
            starships: ['https://swapi.dev/api/starships/12/'],
            created: '2014-12-09T13:50:51.644000Z',
            edited: '2014-12-20T21:17:56.891000Z',
            url: 'https://swapi.dev/api/people/1/',
          },
        ],
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await APIService.searchCharacters('Luke');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api//people/?search=Luke&page=1',
        expect.objectContaining({
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('makes API call without search term for all characters', async () => {
      const mockResponse = {
        count: 82,
        next: 'https://swapi.dev/api/people/?page=2',
        previous: null,
        results: [],
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await APIService.searchCharacters('');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api//people/?page=1',
        expect.any(Object)
      );

      expect(result).toEqual(mockResponse);
    });

    it('handles special characters in search term', async () => {
      const mockResponse = {
        count: 0,
        next: null,
        previous: null,
        results: [],
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await APIService.searchCharacters('C-3PO & R2-D2');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api//people/?search=C-3PO+%2526+R2-D2&page=1',
        expect.any(Object)
      );
    });
  });

  describe('Error Handling', () => {
    it('handles 4xx client errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(APIService.searchCharacters('test')).rejects.toThrow(
        'Client error (404): Not Found. Please check your request and try again.'
      );
    });

    it('handles 5xx server errors', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(APIService.searchCharacters('test')).rejects.toThrow(
        'Server error (500): Internal Server Error. The service is temporarily unavailable.'
      );
    });

    it('handles CORS errors with fallback', async () => {
      global.fetch = vi.fn().mockRejectedValueOnce(new Error('CORS error'));

      const result = await APIService.searchCharacters('Vader');

      // Should return filtered mock data
      expect(result.results).toHaveLength(1);
      expect(result.results[0].name).toBe('Darth Vader');
    });
  });

  describe('Request Configuration', () => {
    it('sets correct headers', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 0,
          next: null,
          previous: null,
          results: [],
        }),
      });

      await APIService.searchCharacters('test');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('sets up abort controller for timeout', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 0,
          next: null,
          previous: null,
          results: [],
        }),
      });

      await APIService.searchCharacters('test');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });
  });
});
