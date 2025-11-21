import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient("https://uyquwuswpvdobvzkqhkh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cXV3dXN3cHZkb2J2emtxaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MTE5NjcsImV4cCI6MjA3OTE4Nzk2N30.ZeO7D1q2NpMKRBBdZXZNmJuSPj90Hotmq2K4kJjN0WA", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
