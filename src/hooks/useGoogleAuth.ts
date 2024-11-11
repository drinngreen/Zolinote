import { useState, useCallback } from 'react';
import { Note } from '../types';

export function useGoogleAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(null);

  const handleGoogleSuccess = useCallback(async (response: any) => {
    const { access_token } = response;
    // Initialize Google Sheets API
    await initGoogleSheetsApi(access_token);
    setIsAuthenticated(true);
  }, []);

  const handleGoogleError = useCallback(() => {
    console.error('Google login failed');
    setIsAuthenticated(false);
  }, []);

  const initGoogleSheetsApi = async (accessToken: string) => {
    try {
      // Initialize the Google Sheets API
      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            title: 'Rapid Notes Database'
          },
          sheets: [
            {
              properties: {
                title: 'Notes'
              }
            }
          ]
        })
      });

      const data = await response.json();
      setSpreadsheetId(data.spreadsheetId);
    } catch (error) {
      console.error('Error initializing Google Sheets:', error);
    }
  };

  const syncWithGoogleSheets = async (notes: Note[]) => {
    if (!spreadsheetId) return;

    try {
      // Convert notes to spreadsheet format
      const values = notes.map(note => [
        note.id,
        note.title,
        note.content,
        note.category,
        note.createdAt
      ]);

      // Update the spreadsheet
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Notes!A2:E${values.length + 1}?valueInputOption=RAW`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('googleAccessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values
        })
      });
    } catch (error) {
      console.error('Error syncing with Google Sheets:', error);
    }
  };

  return {
    isAuthenticated,
    handleGoogleSuccess,
    handleGoogleError,
    syncWithGoogleSheets
  };
}