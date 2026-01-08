
import { createClient } from '@supabase/supabase-js';
import { Listing } from '../types';

const supabaseUrl = "https://yxhsscssfjhoijwdjklj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4aHNzY3NzZmpob2lqd2Rqa2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNTA0ODksImV4cCI6MjA4MjkyNjQ4OX0.Y_f11CNgOkJQt-uSiOddPntML20qLbA8yamUP2uciBE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Auth Operations ---

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar_url: `https://picsum.photos/seed/${fullName}/200`,
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// --- Database Operations ---

export const fetchListings = async (): Promise<Listing[]> => {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
  return (data || []) as Listing[];
};

// Fix: Correct Omit key from 'created_at' to 'createdAt' to match Listing interface
export const insertListing = async (listing: Omit<Listing, 'id' | 'createdAt'>): Promise<Listing | null> => {
  const { data, error } = await supabase
    .from('listings')
    .insert([listing])
    .select()
    .single();

  if (error) {
    console.error('Error inserting listing:', error);
    return null;
  }
  return data as Listing;
};

export const deleteListing = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting listing:', error);
    return false;
  }
  return true;
};
