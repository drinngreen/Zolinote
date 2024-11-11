import { writeFile, utils } from 'xlsx';
import { readFileSync } from 'fs';

const notes = JSON.parse(readFileSync('notes.json', 'utf8'));

const ws = utils.json_to_sheet(notes);
const wb = utils.book_new();
utils.book_append_sheet(wb, ws, "Notes");

writeFile(wb, "zolinotes-export.xlsx");