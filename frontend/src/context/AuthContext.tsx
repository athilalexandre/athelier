import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser as apiLogin, logoutUser as apiLogout, AuthResponse } from '../services/authService';
import { User, LoginData } from '../types/api'; 
// apiClient import is removed as it's not directly used here; authService handles API calls.

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // Initialize with null, useEffect will check localStorage
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      const storedToken = localStorage.getItem('jwtToken');
      const storedUserString = localStorage.getItem('authUser');

      if (storedToken) {
        setToken(storedToken);
        if (storedUserString) {
          try {
            const storedUser: User = JSON.parse(storedUserString);
            setUser(storedUser);
            // TODO (optional but recommended): Verify token with a backend call here.
            // If token is invalid (e.g., expired, revoked), then clear localStorage and state.
            // Example:
            // try {
            //   // Assuming apiClient is configured to use the storedToken
            //   // const validatedUser = await apiClient.get<User>('/auth/me'); 
            //   // setUser(validatedUser.data);
            // } catch (error) {
            //   console.error("Token validation failed on app load:", error);
            //   localStorage.removeItem('jwtToken');
            //   localStorage.removeItem('authUser');
            //   setToken(null);
            //   setUser(null);
            // }
          } catch (e) {
            console.error("Failed to parse stored user:", e);
            localStorage.removeItem('authUser'); // Clear corrupted data
            // Potentially clear token too if user data is essential for auth state
            localStorage.removeItem('jwtToken');
            setToken(null);
          }
        } else {
          // Token exists but no user data in localStorage.
          // This state might occur if localStorage was manually tampered with,
          // or if a /me endpoint call is preferred to fetch fresh user data on load.
          // For now, we treat this as "authenticated but user details unknown until next login or profile fetch".
          // Or, you could decide to clear the token if user data is always expected.
          console.warn("Token found but no user data in localStorage. User details will be missing until login/profile fetch.");
          // To be more strict, you might clear the token here:
          // localStorage.removeItem('jwtToken');
          // setToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginData) => {
    setIsLoading(true);
    try {
      const data: AuthResponse = await apiLogin(credentials); // authService handles setting token in localStorage
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('authUser', JSON.stringify(data.user)); // Store user object for session persistence
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // Clear any potentially inconsistent state on login failure
      setToken(null);
      setUser(null);
      localStorage.removeItem('jwtToken'); // authService might not clear on failure, ensure it here
      localStorage.removeItem('authUser');
      throw error; 
    }
  };

  const logout = () => {
    apiLogout(); // authService handles clearing token from localStorage
    setToken(null);
    setUser(null);
    localStorage.removeItem('authUser'); // Clear stored user object
  };
  
  // isAuthenticated is true if we have a token AND a user object.
  // Adjust this logic if a token alone is considered "authenticated" before user data is fetched.
  const isAuthenticated = !!token && !!user; 

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
