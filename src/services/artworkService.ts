import { supabase, DatabaseArtwork } from '../lib/supabase';
import { Artwork } from '../types';

export class ArtworkService {
  static async getAllArtworks(): Promise<Artwork[]> {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(this.transformDatabaseArtwork);
    } catch (error) {
      console.error('Error fetching artworks:', error);
      throw new Error('Failed to fetch artworks');
    }
  }

  static async getArtworkById(id: string): Promise<Artwork | null> {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data ? this.transformDatabaseArtwork(data) : null;
    } catch (error) {
      console.error('Error fetching artwork:', error);
      return null;
    }
  }

  static async getAvailableArtworks(): Promise<Artwork[]> {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('available', true)
        .gt('price', 0)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(this.transformDatabaseArtwork);
    } catch (error) {
      console.error('Error fetching available artworks:', error);
      throw new Error('Failed to fetch available artworks');
    }
  }

  static async getArtworksByCategory(category: string): Promise<Artwork[]> {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(this.transformDatabaseArtwork);
    } catch (error) {
      console.error('Error fetching artworks by category:', error);
      throw new Error('Failed to fetch artworks by category');
    }
  }

  private static transformDatabaseArtwork(dbArtwork: DatabaseArtwork): Artwork {
    return {
      id: parseInt(dbArtwork.id.replace(/-/g, '').slice(-8), 16), // Convert UUID to number for compatibility
      title: dbArtwork.title,
      medium: dbArtwork.medium,
      size: dbArtwork.size,
      year: dbArtwork.year,
      price: dbArtwork.price === 0 ? 'Commission' : `$${dbArtwork.price.toLocaleString()}`,
      category: dbArtwork.category,
      image: dbArtwork.image_url,
      description: dbArtwork.description,
      available: dbArtwork.available,
      databaseId: dbArtwork.id // Keep original UUID for database operations
    };
  }
}