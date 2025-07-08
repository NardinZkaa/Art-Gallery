import { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { ArtworkService } from '../services/artworkService';

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ArtworkService.getAllArtworks();
      setArtworks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load artworks');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableArtworks = async () => {
    try {
      return await ArtworkService.getAvailableArtworks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load available artworks');
      return [];
    }
  };

  const getArtworksByCategory = async (category: string) => {
    try {
      return await ArtworkService.getArtworksByCategory(category);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load artworks by category');
      return [];
    }
  };

  return {
    artworks,
    loading,
    error,
    refetch: loadArtworks,
    getAvailableArtworks,
    getArtworksByCategory
  };
}