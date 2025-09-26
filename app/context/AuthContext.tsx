"use client";
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import apiClient from '@/app/services/api';
import { loginUser, registerUser } from '@/app/services/authService.js';
import { useRouter } from 'next/navigation';
interface User {
  id: number;
  nome: string;
  email: string;
  tipo: 'cliente' | 'vendedor' | 'admin';
}

type RegisterData = {
  nome: string;
  email: string;
  senha: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  register: (dados: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const data = await loginUser(email, senha);
      localStorage.setItem('accessToken', data.access_token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      const userResponse = await apiClient.get('/api/v1/usuarios/me');
      setUser(userResponse.data);
      router.push('/'); 
    } catch (error) {
      console.error("Falha no login", error);
      alert("Email ou senha inválidos.");
    }
  };

const register = async (dados: RegisterData) => {
  try {
    await registerUser(dados);
    alert('Cadastro realizado com sucesso! Verifique seu e-mail para ativar sua conta.');
    router.push('/login');
  } catch (error) {
    console.error("Falha no cadastro", error);
    alert('Não foi possível realizar o cadastro. Verifique os dados.');
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    delete apiClient.defaults.headers.common['Authorization'];
    router.push('/login');
  };

  const value = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}