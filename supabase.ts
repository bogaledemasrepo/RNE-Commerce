import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto'; // Must be the very first import

// Define the structure for the custom storage adapter required by Supabase
interface StorageAdapter {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

// --- SecureStore Adapter Implementation ---
// This custom adapter uses expo-secure-store to securely handle the session token.
const SecureStoreAdapter: StorageAdapter = {
  async getItem(key: string): Promise<string | null> {
    try {
      // expo-secure-store getItemAsync returns string | null
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore Error during getItem:', error);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      // expo-secure-store setItemAsync returns void
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('SecureStore Error during setItem:', error);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      // expo-secure-store deleteItemAsync returns void
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('SecureStore Error during removeItem:', error);
    }
  },
};

// --- Client Initialization ---

// !!! IMPORTANT: Replace these placeholders with your actual Supabase credentials !!!
const supabaseUrl: string = 'https://uyquwuswpvdobvzkqhkh.supabase.co'; 
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cXV3dXN3cHZkb2J2emtxaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTE5NjcsImV4cCI6MjA3OTE4Nzk2N30.ZeO7D1q2NpMKRBBdZXZNmJuSPj90Hotmq2K4kJjN0WA';

// Explicitly type the Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Pass the custom typed storage adapter
    storage: SecureStoreAdapter, 
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Essential for React Native
  },
});

// To use this in any component:
// import { supabase } from './supabaseClient';