import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, User, Globe, Calendar, Ruler, Weight } from 'lucide-react';
import type { Character } from '../types/Character';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { useCharacterCache } from '../hooks/useCharacterCache';

interface CharacterDetailsProps {
  characters: Character[];
  onBack: () => void;
}

export const CharacterDetails = ({ onBack }: CharacterDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const { getDetailedCharacter } = useCharacterCache();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const detailedCharacter = await getDetailedCharacter(id);
        if (detailedCharacter) {
          setCharacter(detailedCharacter);
        } else {
          throw new Error('Character not found');
        }
      } catch (error) {
        console.error('Error fetching character details:', error);
        setError(
          error instanceof Error
            ? error.message
            : 'Failed to load character details'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id, getDetailedCharacter]);

  const handleRetry = () => {
    if (id) {
      setError(null);
      setIsLoading(true);
      // Re-trigger the effect by updating a dependency
      setCharacter(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
          <p className="text-gray-500">Character not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Results
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {character.name}
              </h1>
              <p className="text-gray-500">Star Wars Character</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {character.properties?.height && (
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-semibold">
                    {character.properties.height} cm
                  </p>
                </div>
              </div>
            )}

            {character.properties?.mass && (
              <div className="flex items-center gap-3">
                <Weight className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Mass</p>
                  <p className="font-semibold">
                    {character.properties.mass} kg
                  </p>
                </div>
              </div>
            )}

            {character.properties?.birth_year && (
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Birth Year</p>
                  <p className="font-semibold">
                    {character.properties.birth_year}
                  </p>
                </div>
              </div>
            )}

            {character.properties?.gender && (
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-semibold capitalize">
                    {character.properties.gender}
                  </p>
                </div>
              </div>
            )}

            {character.properties?.eye_color && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                <div>
                  <p className="text-sm text-gray-500">Eye Color</p>
                  <p className="font-semibold capitalize">
                    {character.properties.eye_color}
                  </p>
                </div>
              </div>
            )}

            {character.properties?.hair_color && (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-300" />
                <div>
                  <p className="text-sm text-gray-500">Hair Color</p>
                  <p className="font-semibold capitalize">
                    {character.properties.hair_color}
                  </p>
                </div>
              </div>
            )}
          </div>

          {character.properties?.homeworld && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Homeworld</p>
                  <p className="font-semibold">
                    {character.properties.homeworld}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
