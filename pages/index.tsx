// File: pages/index.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect otomatis ke dashboard admin
    router.replace('/admin/dashboard');
  }, [router]);

  return null; // Bisa diganti loading spinner kalau mau
}
