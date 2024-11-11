import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Category } from '../types';

interface CategoryManagerProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  onClose: () => void;
}

function CategoryManager({ categories, setCategories, onClose }: CategoryManagerProps) {
  const [newCategoryName, setNewCategoryName] = useState('');

  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: colors[categories.length % colors.length],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A2730] rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Manage Categories</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                <span className="text-white">{category.name}</span>
              </div>
              {category.id !== 'default' && (
                <button
                  onClick={() => deleteCategory(category.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="flex-1 px-4 py-2 bg-[#243440] text-white border border-[#2A3F4D] rounded-lg focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
            placeholder="New category name"
          />
          <button
            onClick={addCategory}
            className="px-4 py-2 bg-[#00FFD1] text-[#0A1116] rounded-lg hover:bg-[#00E6BC] flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryManager;