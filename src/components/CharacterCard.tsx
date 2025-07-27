import { User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Character } from '../types/Character';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {character.name}
            </h3>
            <p className="text-sm text-gray-500">
              Character ID: {character.uid}
            </p>
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

      {character.properties && (
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          {character.properties.gender && (
            <div>
              <span className="text-gray-500">Gender:</span>
              <span className="ml-1 text-gray-900 capitalize">
                {character.properties.gender}
              </span>
            </div>
          )}
          {character.properties.birth_year && (
            <div>
              <span className="text-gray-500">Birth Year:</span>
              <span className="ml-1 text-gray-900">
                {character.properties.birth_year}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
