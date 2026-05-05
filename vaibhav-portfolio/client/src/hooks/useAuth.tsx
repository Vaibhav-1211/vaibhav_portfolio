import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api, { setAccessToken as setGlobalToken } from '../api/axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Attempt to silently refresh token on mount
    const initAuth = async () => {
      try {
        const { data } = await api.post('/auth/refresh');
        setGlobalToken(data.accessToken);
        setIsAuthenticated(true);
      } catch (error) {
        // Not logged in or token expired
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen for custom events from axios interceptor
    const handleLogoutEvent = () => {
      setIsAuthenticated(false);
    };

    const handleTokenRefreshed = (e: Event) => {
      setIsAuthenticated(true);
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    window.addEventListener('auth:token-refreshed', handleTokenRefreshed);

    return () => {
      window.removeEventListener('auth:logout', handleLogoutEvent);
      window.removeEventListener('auth:token-refreshed', handleTokenRefreshed);
    };
  }, []);

  const login = (token: string) => {
    setGlobalToken(token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      setGlobalToken('');
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
