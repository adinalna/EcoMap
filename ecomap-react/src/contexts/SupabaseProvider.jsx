import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const SupabaseContext = createContext();

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const supabaseClient = createClient(
      import.meta.env.VITE_APP_SUPABASE_URL,
      import.meta.env.VITE_APP_SUPABASE_KEY
    );

    setSupabase(supabaseClient);
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};