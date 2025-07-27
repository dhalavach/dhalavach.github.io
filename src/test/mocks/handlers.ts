import { http, HttpResponse } from 'msw';
import type { ApiResponse } from '../../types/Character';

const mockCharacters = [
  {
    uid: '1',
    name: 'Luke Skywalker',
    url: 'https://swapi.tech/api/people/1',
  },
  {
    uid: '2',
    name: 'C-3PO',
    url: 'https://swapi.tech/api/people/2',
  },
  {
    uid: '3',
    name: 'R2-D2',
    url: 'https://swapi.tech/api/people/3',
  },
];

const mockDetailedCharacter = {
  result: {
    uid: '1',
    properties: {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'Tatooine',
    },
    url: 'https://swapi.tech/api/people/1',
  },
};

export const handlers = [
  http.get('https://swapi.tech/api/people', () => {
    // const url = new URL(request.url);
    // const page = url.searchParams.get('page') || '1';

    const response: ApiResponse = {
      message: 'ok',
      total_records: 3,
      total_pages: 1,
      previous: null,
      next: null,
      results: mockCharacters,
    };

    return HttpResponse.json(response);
  }),

  http.get('https://swapi.tech/api/people/:id', ({ params }) => {
    const { id } = params;

    if (id === '1') {
      return HttpResponse.json(mockDetailedCharacter);
    }

    return HttpResponse.json(
      { message: 'Character not found' },
      { status: 404 }
    );
  }),
];

export const errorHandlers = [
  http.get('https://swapi.tech/api/people', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }),

  http.get('https://swapi.tech/api/people/:id', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }),
];

export const rateLimitHandlers = [
  http.get('https://swapi.tech/api/people', () => {
    return HttpResponse.json({ message: 'Too Many Requests' }, { status: 429 });
  }),
];
