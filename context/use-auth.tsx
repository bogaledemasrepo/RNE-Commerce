import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface User {
  username: string;
  email: string;
  password?: string; // Optional, not stored in state
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  setUser:(data:User|null)=>void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser:(data:User|null)=>{},
  logout: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  async function logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to log out');
    }
  }

  useEffect(() => {
    async function getUserFromSession() {
      try {
        const storedUser = await AsyncStorage.getItem('appUser');
        if (storedUser && storedUser !== '') {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      }
    }
    getUserFromSession();
  }, []); // Removed `user` from dependencies to prevent infinite loop

  return (
    <AuthContext.Provider value={{ user,setUser, logout }}>
      {children}
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