import React from 'react';
import { Clock } from 'lucide-react';
import { Note } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface TimelineProps {
  notes: Note[];
}

function Timeline({ notes }: TimelineProps) {
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (notes.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-[#243440] pt-8">
      <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
        <Clock size={24} className="text-[#00FFD1]" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        {sortedNotes.map((note) => (
          <div key={note.id} className="flex items-start gap-4 bg-[#1A2730] p-4 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-[#00FFD1] mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-white truncate">{note.title}</h3>
              <p className="text-gray-400 text-sm">
                {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;