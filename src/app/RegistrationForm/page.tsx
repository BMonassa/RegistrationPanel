'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import UserTable from '@/components/UserTable/UserTable';
import api from '@/services/axios';

export default function RegistrationForm() {
  const [data, setData] = useState<[]>([]);

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
    <div>
      {data.length === 0 ? (
        <h1>...</h1>
      ) : (
        <>
          <Header />
          <div className="ml-10 mr-10">
            <UserTable data={data} />
          </div>
        </>
      )}
    </div>
  );
}
