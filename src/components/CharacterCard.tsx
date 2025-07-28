import { User, Calendar, Ruler, Weight } from 'lucide-react';
import type { Character } from '../types/Character';

interface Props {
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
            <User data-testid="avatar" className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {character.name}
          </h3>

          {description && (
            <p className="text-gray-600 text-sm mb-3">{description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            {character.height !== 'unknown' && (
              <div className="flex items-center space-x-1">
                <Ruler className="w-3 h-3" />
                <span>{character.height}cm</span>
              </div>
            )}

            {character.mass !== 'unknown' && (
              <div className="flex items-center space-x-1">
                <Weight className="w-3 h-3" />
                <span>{character.mass}kg</span>
              </div>
            )}

            {character.birth_year !== 'unknown' && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{character.birth_year}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
