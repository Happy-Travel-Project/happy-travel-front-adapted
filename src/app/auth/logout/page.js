'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();
    router.replace('/login');
  }, [logout, router]);

  return null;
}