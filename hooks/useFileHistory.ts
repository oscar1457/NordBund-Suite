import { useState, useEffect, useCallback } from 'react';
import { FileHistoryEntry } from '../types';

const STORAGE_KEY = 'nordbund_file_history';
const MAX_HISTORY_ENTRIES = 10;

interface UseFileHistoryOptions {
  privateMode?: boolean;
  userId?: string;
}

export const useFileHistory = (options: UseFileHistoryOptions = {}) => {
  const { privateMode = false, userId } = options;
  const [history, setHistory] = useState<FileHistoryEntry[]>([]);

  // Create user-specific storage key
  const getStorageKey = useCallback(() => {
    return userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY;
  }, [userId]);

  // Load history from localStorage on mount (skip if private mode)
  useEffect(() => {
    if (privateMode) {
      setHistory([]);
      return;
    }

    try {
      const stored = localStorage.getItem(getStorageKey());
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Error loading file history:', error);
    }
  }, [privateMode, userId, getStorageKey]);

  // Save history to localStorage whenever it changes (skip if private mode)
  useEffect(() => {
    if (privateMode) return;

    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(history));
    } catch (error) {
      console.error('Error saving file history:', error);
    }
  }, [history, privateMode, userId, getStorageKey]);

  const addToHistory = useCallback((entry: FileHistoryEntry) => {
    if (privateMode) return; // Don't save in private mode
    setHistory(prev => {
      // Remove duplicate if exists (same fileName)
      const filtered = prev.filter(item => item.fileName !== entry.fileName);

      // Add new entry at the beginning
      const updated = [entry, ...filtered];

      // Keep only MAX_HISTORY_ENTRIES
      return updated.slice(0, MAX_HISTORY_ENTRIES);
    });
  }, [privateMode]);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (!privateMode) {
      localStorage.removeItem(getStorageKey());
    }
  }, [privateMode, getStorageKey]);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};
