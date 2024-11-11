import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { Note, Category } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface NoteListProps {
  notes: Note[];
  categories: Category[];
  onDelete: (id: string) => void;
}

function NoteList({ notes, categories, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12 bg-[#1A2730] rounded-xl">
        <p className="text-gray-400 text-lg">No notes yet. Start writing!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => {
        const category = categories.find((c) => c.id === note.category);
        return (
          <div
            key={note.id}
            className="bg-[#1A2730] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:translate-y-[-2px]"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-white line-clamp-2">{note.title}</h3>
              <button
                onClick={() => onDelete(note.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <p className="text-gray-300 mb-4 whitespace-pre-wrap line-clamp-3">{note.content}</p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${category?.color || 'bg-gray-500'} text-[#0A1116] font-medium`}>
                {category?.name || 'Uncategorized'}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={14} />
                <span>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default NoteList;