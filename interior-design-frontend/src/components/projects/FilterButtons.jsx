import React from 'react';

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'image', label: 'Images' },
    { id: 'youtube', label: 'Videos' }  // video → youtube
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`
            relative px-6 py-3 font-['Poppins'] text-sm tracking-wide transition-all duration-300
            ${activeFilter === filter.id
              ? 'text-stone-900 after:scale-x-100'
              : 'text-stone-500 hover:text-stone-900 after:scale-x-0'
            }
            after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
            after:bg-orange-500 after:transition-transform after:duration-300 after:origin-left
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;