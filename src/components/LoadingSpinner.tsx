import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2
        data-testid="spinner"
        className="w-8 h-8 text-blue-600 animate-spin mb-4"
      />
      <p className="text-gray-600">Searching the galaxy...</p>
    </div>
  );
};
