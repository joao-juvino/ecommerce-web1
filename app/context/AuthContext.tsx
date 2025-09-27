"use client";

import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import apiClient from '@/app/services/api';
import { loginUser, registerUser } from '@/app/services/authService';
import { useRouter } from 'next/navigation';

// CORREÇÃO 1: Criada uma interface específica para Loja para remover o 'any'
interface Loja {
  id: number;
  nome_fantasia: string;
  // Adicione outros campos da loja que você possa precisar no futuro
}

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: 'cliente' | 'vendedor' | 'admin';
  loja?: Loja | null; // Usamos a nova interface Loja
}

interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  tipo: 'cliente' | 'vendedor';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (dados: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // CORREÇÃO 2: A função 'logout' foi envolvida em useCallback
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('accessToken');
    delete apiClient.defaults.headers.common['Authorization'];
    router.push('/login');
    setIsLoading(false);
  }, [router]);

  // CORREÇÃO 2.1: 'logout' foi adicionado como dependência do useEffect
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      apiClient.get('/api/v1/usuarios/me')
        .then(response => setUser(response.data))
        .catch(() => logout())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [logout]);

  const login = useCallback(async (email: string, senha: string) => {
    try {
      const data = await loginUser(email, senha);
      localStorage.setItem('accessToken', data.access_token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      const userResponse = await apiClient.get('/api/v1/usuarios/me');
      const loggedInUser: User = userResponse.data;
      setUser(loggedInUser);

      if (loggedInUser.tipo === 'vendedor' && !loggedInUser.loja) {
        router.push('/loja/cadastrar');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error("Falha no login", error);
      alert("Email ou senha inválidos.");
    }
  }, [router]);

  const register = useCallback(async (dados: RegisterData) => {
    try {
      await registerUser(dados);
      alert('Cadastro realizado! Por favor, verifique seu e-mail para ativar sua conta.');
      router.push('/login');
    } catch (error) {
      console.error("Falha no cadastro", error);
      alert('Não foi possível realizar o cadastro. Verifique os dados.');
    }
  }, [router]);

  const value = {
    isAuthenticated: !!user,
    user,
    isLoading,
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