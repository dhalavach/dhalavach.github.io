import { User, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Character } from '../../types/Character.ts';
import { useCharacterCache } from '../../hooks/useCharacterCache';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { getDetailedCharacter } = useCharacterCache();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailedCharacter = await getDetailedCharacter(character.uid);
        if (detailedCharacter?.properties) {
          setDetails(detailedCharacter.properties);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching character details:', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [character.uid, getDetailedCharacter]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {character.name}
            </h3>
            {details && (
              <p className="text-sm text-gray-500">
                {details.gender} • {details.birth_year}
              </p>
            )}
          </div>
        </div>
        <Link
          to={`/character/${character.uid}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
        >
          View Details
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Loading details...</span>
        </div>
      )}

      {error && (
        <div className="text-sm text-gray-500 py-2">
          <p>Unable to load character details</p>
        </div>
      )}

      {details && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-medium text-gray-700">Height:</span>
            <span className="ml-1 text-gray-600">
              {details.height === 'unknown'
                ? 'Unknown'
                : `${details.height} cm`}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Mass:</span>
            <span className="ml-1 text-gray-600">
              {details.mass === 'unknown' ? 'Unknown' : `${details.mass} kg`}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Eye Color:</span>
            <span className="ml-1 text-gray-600 capitalize">
              {details.eye_color}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Hair Color:</span>
            <span className="ml-1 text-gray-600 capitalize">
              {details.hair_color}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
