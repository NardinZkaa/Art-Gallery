import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    AuthService.getCurrentUser().then(user => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    signUp: AuthService.signUp,
    signIn: AuthService.signIn,
    signOut: AuthService.signOut,
    resetPassword: AuthService.resetPassword,
    updatePassword: AuthService.updatePassword
  };
}