import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Note, Category } from '../types';

interface NoteFormProps {
  categories: Category[];
  onSubmit: (note: Note) => void;
  onClose: () => void;
}

function NoteForm({ categories, onSubmit, onClose }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newNote);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1A2730] rounded-xl shadow-xl p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">New Note</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 text-xl font-semibold bg-[#243440] text-white border-0 border-b-2 border-[#2A3F4D] focus:ring-0 focus:border-[#00FFD1] rounded-lg"
                placeholder="Note title"
                required
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-[#243440] text-white border border-[#2A3F4D] rounded-lg focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-64 p-6 text-lg bg-[#243440] text-white border border-[#2A3F4D] rounded-lg focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent font-mono"
            placeholder="Start typing your note..."
            required
            style={{
              backgroundImage: 'linear-gradient(#2A3F4D 1px, transparent 1px)',
              backgroundSize: '100% 2rem',
              lineHeight: '2rem',
            }}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-white bg-[#243440] rounded-lg hover:bg-[#2A3F4D]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#00FFD1] text-[#0A1116] rounded-lg hover:bg-[#00E6BC]"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;