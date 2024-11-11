import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

function Sidebar({ categories, selectedCategory, setSelectedCategory }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <nav>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Notes
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${category.color}`} />
                  {category.name}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;