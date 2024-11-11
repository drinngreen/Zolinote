import React, { useState } from 'react';
import { Plus, Tag, Download } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Note, Category } from './types';
import Logo from './components/Logo';
import NoteList from './components/NoteList';
import Timeline from './components/Timeline';
import CategoryManager from './components/CategoryManager';
import { exportToExcel } from './utils/excelExport';

function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', [
    { id: 'default', name: 'General', color: 'bg-[#00FFD1]' }
  ]);
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('default');
  const [noteInput, setNoteInput] = useState('');

  const addNote = () => {
    if (!noteInput.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: noteInput.split('\n')[0] || 'Untitled',
      content: noteInput,
      category: selectedCategory,
      createdAt: new Date().toISOString()
    };

    setNotes([newNote, ...notes]);
    setNoteInput('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleExport = () => {
    exportToExcel(notes, categories);
  };

  return (
    <div className="min-h-screen bg-[#0A1116] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <Logo />
          <div className="flex gap-4">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A2730] rounded-lg hover:bg-[#243440] transition-colors"
            >
              <Download size={20} />
              <span>Export</span>
            </button>
            <button
              onClick={() => setShowCategoryManager(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1A2730] rounded-lg hover:bg-[#243440] transition-colors"
            >
              <Tag size={20} />
              <span>Categories</span>
            </button>
          </div>
        </header>

        <div className="mb-8">
          <textarea
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Write your note here..."
            className="w-full h-48 p-6 bg-[#1A2730] rounded-xl border border-[#2A3F4D] focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent resize-none text-white placeholder-gray-400 text-lg"
            style={{
              backgroundImage: 'linear-gradient(#2A3F4D 1px, transparent 1px)',
              backgroundSize: '100% 2rem',
              lineHeight: '2rem',
            }}
          />
          <div className="flex justify-between items-center mt-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-[#1A2730] border border-[#2A3F4D] rounded-lg text-white focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={addNote}
              className="px-6 py-2 bg-[#00FFD1] text-[#0A1116] rounded-lg hover:bg-[#00E6BC] transition-colors flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              <span>Add Note</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <NoteList
            notes={notes}
            categories={categories}
            onDelete={deleteNote}
          />

          <Timeline notes={notes} />
        </div>

        {showCategoryManager && (
          <CategoryManager
            categories={categories}
            setCategories={setCategories}
            onClose={() => setShowCategoryManager(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;