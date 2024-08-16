import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as AuthSession from "expo-auth-session"

const supabaseUrl = "https://vjiilyeaseyprgelahjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqaWlseWVhc2V5cHJnZWxhaGpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5NTExMDQsImV4cCI6MjAzNjUyNzEwNH0.vCpYKHf4I1Ssm_o4Dkijx1Ou0h61Muw9CENh6FZZwFs"



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});


