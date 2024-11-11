import { utils, writeFile } from 'xlsx';
import { Note, Category } from '../types';

export const exportToExcel = (notes: Note[], categories: Category[]) => {
  // Prepare data for export
  const exportData = notes.map(note => {
    const category = categories.find(c => c.id === note.category);
    return {
      Title: note.title,
      Content: note.content,
      Category: category?.name || 'Uncategorized',
      'Created At': new Date(note.createdAt).toLocaleString()
    };
  });

  // Create worksheet
  const ws = utils.json_to_sheet(exportData);

  // Create workbook
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Notes");

  // Generate file name with timestamp
  const fileName = `zolinotes-export-${new Date().toISOString().split('T')[0]}.xlsx`;

  // Save file
  writeFile(wb, fileName);
};