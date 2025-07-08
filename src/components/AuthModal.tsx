import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  const { signIn, signUp, resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signin') {
        await signIn({
          email: formData.email,
          password: formData.password
        });
        onClose();
      } else if (mode === 'signup') {
        await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone
        });
        setSuccess('Account created successfully! Please check your email to verify your account.');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (mode === 'forgot') {
        await resetPassword(formData.email);
        setSuccess('Password reset email sent! Please check your inbox.');
        setTimeout(() => {
          setMode('signin');
          setSuccess('');
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      fullName: '',
      phone: ''
    });
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="relative mb-6">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-gray-600">
            {mode === 'signin' && 'Sign in to your account to continue'}
            {mode === 'signup' && 'Join us to start collecting art'}
            {mode === 'forgot' && 'Enter your email to reset your password'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Enter your password"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 6 characters long
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>
                  {mode === 'signin' && 'Signing In...'}
                  {mode === 'signup' && 'Creating Account...'}
                  {mode === 'forgot' && 'Sending Email...'}
                </span>
              </div>
            ) : (
              <>
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Email'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => switchMode('forgot')}
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Forgot your password?
              </button>
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-gray-900 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          {mode === 'signup' && (
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => switchMode('signin')}
                className="text-gray-900 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p className="text-gray-600 text-sm">
              Remember your password?{' '}
              <button
                onClick={() => switchMode('signin')}
                className="text-gray-900 hover:underline font-medium"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}