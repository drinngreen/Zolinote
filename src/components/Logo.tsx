import React from 'react';
import { Pencil } from 'lucide-react';

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-[#00FFD1] rounded-lg flex items-center justify-center">
        <Pencil className="text-[#0A1116]" size={24} />
      </div>
      <span className="text-2xl font-bold text-white">ZoliNotes</span>
    </div>
  );
}

export default Logo;