/**
 * Simple Authentication Service
 * Uses localStorage for session management
 * For production, integrate with Supabase Auth
 */

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

class AuthService {
  private storageKey = 'marketgap_user';
  private tokenKey = 'marketgap_token';

  /**
   * Login with email and password
   */
  login(email: string, password: string): AuthResponse {
    try {
      // Simple validation
      if (!email || !password) {
        return {
          success: false,
          error: 'Email and password are required',
        };
      }

      if (!email.includes('@')) {
        return {
          success: false,
          error: 'Invalid email format',
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: 'Password must be at least 6 characters',
        };
      }

      // Create user object
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0],
      };

      // Generate simple token
      const token = btoa(`${email}:${Date.now()}`);

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(user));
        localStorage.setItem(this.tokenKey, token);
      }

      console.log(`✅ User logged in: ${email}`);

      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
      };
    }
  }

  /**
   * Logout
   */
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.tokenKey);
    }
    console.log('✅ User logged out');
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    try {
      if (typeof window === 'undefined') return null;

      const userStr = localStorage.getItem(this.storageKey);
      if (!userStr) return null;

      return JSON.parse(userStr) as User;
    } catch (error) {
      console.error('❌ Error getting current user:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(this.storageKey);
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(this.tokenKey);
  }
}

export const authService = new AuthService();
