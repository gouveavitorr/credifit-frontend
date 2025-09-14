'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppContextType, User } from './AppContext.types';
import axios from 'axios';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:3333/user')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return <AppContext.Provider value={{ users, setUsers }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}
