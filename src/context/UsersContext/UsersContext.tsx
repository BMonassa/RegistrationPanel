'use client';
import React, { createContext, useState, useEffect } from 'react';

import api from '../../services/axios';

type UsersProps = {
  id: number;
  name: string;
  phone: string;
  registrationDate: string;
  status: string;
};

type UsersContextProps = {
  children: React.ReactNode;
};

export const DataContext = createContext<{ data: UsersProps[] }>({ data: [] });

export const UsersContext = ({ children }: UsersContextProps) => {
  const [data, setData] = useState<UsersProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};
