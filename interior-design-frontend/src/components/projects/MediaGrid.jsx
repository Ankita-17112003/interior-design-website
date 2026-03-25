// components/MediaGrid.jsx
import React from 'react';
import MediaCard from './MediaCard';

const MediaGrid = ({ items, onItemClick }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-stone-50 rounded-2xl p-12 max-w-md mx-auto">
          <p className="font-['Poppins'] text-stone-500 text-lg mb-2">
            No projects found
          </p>
          <p className="text-stone-400 text-sm">
            Try selecting a different filter
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {items.map((item) => (
        <MediaCard 
          key={item.id} 
          item={item} 
          onClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default MediaGrid;