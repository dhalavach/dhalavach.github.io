import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

export const About = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Heart data-testid="heart-icon" className="w-5 h-5 text-red-500" />
            <p className="text-gray-600">Created by yours truly</p>
          </div>

          <p className="text-sm text-gray-500">© {currentYear}</p>

          <div className="flex items-center justify-center space-x-2">
            <a
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>RS School React Course</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
