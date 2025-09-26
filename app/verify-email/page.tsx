"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { verifyEmail } from '@/app/services/authService';

function VerificationComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); 
  useEffect(() => {
    if (token) {
      const doVerification = async () => {
        try {
          await verifyEmail(token as string);
          setStatus('success');
        } catch (error) {
          console.error('Falha na verificação de e-mail', error);
          setStatus('error');
        }
      };
      doVerification();
    } else {setStatus('error'); }}, [token]);

  const renderStatus = () => {
    switch (status) {
      case 'success':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-green-600">E-mail Verificado!</h2>
            <p className="text-gray-700">Sua conta foi ativada com sucesso. Você já pode fazer o login.</p>
            <Link href="/login" className="mt-6 inline-block bg-[#ba4949] text-white px-6 py-2 rounded-full">
              Ir para Login
            </Link>
          </>
        );

      case 'error':
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-red-600">Falha na Verificação</h2>
            <p className="text-gray-700">O link de verificação é inválido ou já expirou. Por favor, tente se cadastrar novamente.</p>
          </>
        );

      default: 
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Verificando...</h2>
            <p className="text-gray-700">Aguarde um momento enquanto validamos a sua conta.</p>
          </>
        );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white shadow-md rounded text-center max-w-md">
        {renderStatus()}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <VerificationComponent />
    </Suspense>
  );
}