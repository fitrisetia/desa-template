// File: pages/admin/pengaturan.tsx

import React from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import Link from 'next/link';
import { Clock, CalendarDays, Settings, UserCog } from 'lucide-react';

export default function PengaturanOverviewPage() {
  return (
    <AdminLayout pageTitle="Ringkasan Pengaturan">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link href="/admin/pengaturan/profil" className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <UserCog size={32} className="text-orange-500" />
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Profil Admin</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ubah nama, email, dan kata sandi akun admin</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/pengaturan/absensi" className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <Clock size={32} className="text-blue-500" />
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Pengaturan Absensi</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Jam kerja, hari aktif, dan radius lokasi</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/pengaturan/libur" className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <CalendarDays size={32} className="text-green-500" />
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Hari Libur</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Daftar hari libur nasional dan cuti bersama</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/pengaturan/sistem" className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <Settings size={32} className="text-purple-500" />
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Pengaturan Sistem</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tema, nama instansi, dan lainnya</p>
            </div>
          </div>
        </Link>

      </div>
    </AdminLayout>
  );
}
