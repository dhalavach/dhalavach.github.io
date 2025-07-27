import { User, Calendar, Ruler, Weight } from 'lucide-react';
import type { Character } from '../types/Character';

interface CharacterCardProps {
  character: Character;
  onClick?: (character: Character) => void;
}

const formatDescription = (character: Character): string => {
  const details = [];

  if (character.gender !== 'unknown') {
    details.push(character.gender);
  }

  if (character.birth_year !== 'unknown') {
    details.push(`Born ${character.birth_year}`);
  }

  if (character.height !== 'unknown') {
    details.push(`${character.height}cm tall`);
  }

  if (character.mass !== 'unknown') {
    details.push(`${character.mass}kg`);
  }

  return details.join(' • ');
};

export const CharacterCard = ({ character, onClick }: Props) => {
  const description = formatDescription(character);

  const handleClick = () => {
    if (onClick) {
      onClick(character);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200 cursor-pointer hover:border-blue-300 hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
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
              {details.height === 'unknown' ? 'Unknown' : `${details.height} cm`}
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
            <span className="ml-1 text-gray-600 capitalize">{details.eye_color}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Hair Color:</span>
            <span className="ml-1 text-gray-600 capitalize">{details.hair_color}</span>
          </div>
        </div>
      )}
    </div>
  );
};