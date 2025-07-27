export interface Character {
  uid: string;
  name: string;
  url: string;
  properties?: {
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    homeworld?: string;
    films?: string[];
    species?: string[];
    vehicles?: string[];
    starships?: string[];
    created?: string;
    edited?: string;
    url?: string;
  };
}

export interface ApiResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Character[];
}
