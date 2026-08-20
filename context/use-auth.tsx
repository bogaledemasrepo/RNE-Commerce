import { API_BASE_URL } from '@/constants';
import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

interface AuthContextType {
  user: User | null;
  setUser: (data: User | null) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (data: User | null) => {},
  logout: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch {
      Alert.alert('Error', 'Failed to log out');
    }
  }
  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        if (isMounted) setIsLoading(false);
        return;
      }
      try {
        const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (isMounted) setUser(userData);
        } else {
          if (isMounted) setUser(null);
        }
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {isLoading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}></View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
