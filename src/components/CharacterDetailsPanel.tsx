import React from 'react';
import {
  X,
  User,
  Calendar,
  Ruler,
  Weight,
  MapPin,
  Film,
  Rocket,
  Car,
} from 'lucide-react';
import type { Character } from '../types/Character';

interface Props {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CharacterDetailsPanel = ({
  character,
  isOpen,
  onClose,
}: Props) => {
  if (!isOpen || !character) return null;

  const formatList = (items: string[], label: string) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">{label}</h4>
        <p className="text-gray-600 text-sm">
          {items.length} {label.toLowerCase()}
        </p>
      </div>
    );
  };

  const formatAttribute = (value: string, defaultText: string = 'Unknown') => {
    return value && value !== 'unknown' && value !== 'n/a'
      ? value
      : defaultText;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full lg:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
            <h2 className="text-xl font-bold text-white truncate pr-4">
              {character.name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0"
              aria-label="Close details panel"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Character Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Gender
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatAttribute(character.gender)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Birth Year
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatAttribute(character.birth_year)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Height
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatAttribute(character.height, 'Unknown')}
                      {character.height !== 'unknown' &&
                        character.height !== 'n/a' &&
                        ' cm'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Weight className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Mass
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatAttribute(character.mass, 'Unknown')}
                      {character.mass !== 'unknown' &&
                        character.mass !== 'n/a' &&
                        ' kg'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Physical Appearance */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Physical Appearance
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Hair Color
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatAttribute(character.hair_color)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Skin Color
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatAttribute(character.skin_color)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    Eye Color
                  </p>
                  <p className="text-sm text-gray-900">
                    {formatAttribute(character.eye_color)}
                  </p>
                </div>
              </div>
            </div>

            {/* Associations */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Associations
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Homeworld
                    </p>
                    <p className="text-sm text-gray-900">
                      {character.homeworld ? 'Known' : 'Unknown'}
                    </p>
                  </div>
                </div>

                {formatList(character.films, 'Films') && (
                  <div className="flex items-center space-x-2">
                    <Film className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Films
                      </p>
                      <p className="text-sm text-gray-900">
                        Appeared in {character.films.length} film
                        {character.films.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                )}

                {character.species.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Species
                      </p>
                      <p className="text-sm text-gray-900">
                        {character.species.length} species association
                        {character.species.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                )}

                {character.starships.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Rocket className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Starships
                      </p>
                      <p className="text-sm text-gray-900">
                        Piloted {character.starships.length} starship
                        {character.starships.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                )}

                {character.vehicles.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Car className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        Vehicles
                      </p>
                      <p className="text-sm text-gray-900">
                        Used {character.vehicles.length} vehicle
                        {character.vehicles.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Record Information
              </h3>

              <div className="space-y-2 text-xs text-gray-500">
                <p>
                  Created: {new Date(character.created).toLocaleDateString()}
                </p>
                <p>
                  Last edited: {new Date(character.edited).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
