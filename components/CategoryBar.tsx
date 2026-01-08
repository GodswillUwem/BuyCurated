
import React from 'react';
import { Category } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface CategoryBarProps {
  activeCategory: Category | null;
  onSelect: (category: Category | null) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({ activeCategory, onSelect }) => {
  const categories = Object.values(Category);

  return (
    <div className="bg-white border-b overflow-x-auto no-scrollbar py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center space-x-1">
        <button
          onClick={() => onSelect(null)}
          className={`flex flex-col items-center min-w-[70px] py-2 rounded-xl transition ${
            activeCategory === null ? 'bg-primary-soft text-primary' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="text-xs font-bold px-3 uppercase tracking-tighter">Everything</div>
        </button>

        <div className="h-6 w-px bg-gray-100 mx-2"></div>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`flex flex-col items-center min-w-[80px] py-1 rounded-xl transition group ${
              activeCategory === cat ? 'text-primary' : 'text-gray-500 hover:text-primary'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm mb-1 ${
              activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-50 group-hover:bg-primary-soft'
            }`}>
              {React.cloneElement(CATEGORY_ICONS[cat] as React.ReactElement<any>, { className: 'w-5 h-5' })}
            </div>
            <span className="text-[10px] font-bold whitespace-nowrap">{cat}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
