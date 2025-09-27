// app/components/AppLayout.jsx
"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ['/login', '/cadastro', '/verify-email'];

  if (noLayoutRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    // AQUI ESTÁ A CORREÇÃO
    <div className="flex flex-col h-screen" suppressHydrationWarning>
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto bg-[#ebebeb]">
          {children}
        </main>
      </div>
    </div>
  );
}