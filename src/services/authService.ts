import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  static async signUp(data: SignUpData): Promise<User> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user');

      // Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          full_name: data.fullName,
          phone: data.phone
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Don't throw error here as the user was created successfully
      }

      return authData.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error('Failed to create account');
    }
  }

  static async signIn(data: SignInData): Promise<User> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) throw error;
      if (!authData.user) throw new Error('Failed to sign in');

      return authData.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error('Invalid email or password');
    }
  }

  static async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out');
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Failed to send reset password email');
    }
  }

  static async updatePassword(newPassword: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error updating password:', error);
      throw new Error('Failed to update password');
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });
  }
}