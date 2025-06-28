// File: pages/admin/pegawai.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

interface Pegawai {
  id: number;
  nama: string;
  avatar: string;
  jabatan: string;
  status: 'Aktif' | 'Tidak Aktif';
  tanggal_bergabung: string;
}

const dummyPegawai: Pegawai[] = [
  { id: 1, nama: 'Budi Santoso', avatar: 'https://i.pravatar.cc/150?u=budi', jabatan: 'Staf Pelayanan', status: 'Aktif', tanggal_bergabung: '12/01/2022' },
  { id: 2, nama: 'Siti Aminah', avatar: 'https://i.pravatar.cc/150?u=siti', jabatan: 'Bendahara Desa', status: 'Aktif', tanggal_bergabung: '05/03/2021' },
  { id: 3, nama: 'Joko Susilo', avatar: 'https://i.pravatar.cc/150?u=joko', jabatan: 'Kasi Pemerintahan', status: 'Aktif', tanggal_bergabung: '20/07/2020' },
  { id: 4, nama: 'Dewi Lestari', avatar: 'https://i.pravatar.cc/150?u=dewi', jabatan: 'Staf Umum', status: 'Tidak Aktif', tanggal_bergabung: '15/11/2022' },
  { id: 5, nama: 'Agus Setiawan', avatar: 'https://i.pravatar.cc/150?u=agus', jabatan: 'Kaur Perencanaan', status: 'Aktif', tanggal_bergabung: '01/02/2019' },
  { id: 6, nama: 'Rina Marlina', avatar: 'https://i.pravatar.cc/150?u=rina', jabatan: 'Staf Kesejahteraan', status: 'Aktif', tanggal_bergabung: '10/06/2023' },
];

export default function PegawaiPage() {
  const [pegawaiList] = useState(dummyPegawai);

  return (
    <AdminLayout pageTitle="Data Pegawai">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Daftar Semua Pegawai</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Kelola data pegawai desa di sini.</p>
          </div>
<button
  className="flex items-center gap-1 
    bg-blue-500 text-white 
    text-sm sm:text-base 
    font-medium sm:font-semibold 
    px-3 py-1.5 sm:px-4 sm:py-2 
    rounded-md sm:rounded-lg 
    hover:bg-blue-600 transition-colors 
    shadow w-full max-w-[180px] sm:w-auto sm:max-w-none"
>
  <PlusCircle size={16} className="sm:hidden" />
  <PlusCircle size={20} className="hidden sm:inline" />
  <span>Tambah Pegawai</span>
</button>

        </div>

        {/* TAMPILAN TABLE UNTUK DESKTOP */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Jabatan</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Tgl Bergabung</th>
                <th className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pegawaiList.map((pegawai) => (
                <tr key={pegawai.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                  <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src={pegawai.avatar} alt={pegawai.nama} />
                    {pegawai.nama}
                  </td>
                  <td className="px-6 py-4">{pegawai.jabatan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pegawai.status === 'Aktif'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    }`}>{pegawai.status}</span>
                  </td>
                  <td className="px-6 py-4">{pegawai.tanggal_bergabung}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-500 hover:text-blue-700" title="Edit"><Edit size={18} /></button>
                      <button className="text-red-500 hover:text-red-700" title="Hapus"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

{/* MOBILE VERSION - CARD VIEW */}
<div className="md:hidden space-y-4">
  {pegawaiList.map((pegawai) => (
    <div
      key={pegawai.id}
      className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-4 border border-slate-100 dark:border-slate-700"
    >
      {/* Avatar + Nama (masih di tengah biar keren) */}
      <div className="flex flex-col items-right mb-3">
        <img
          className="w-14 h-14 rounded-full object-cover mb-1"
          src={pegawai.avatar}
          alt={pegawai.nama}
        />
        <div className="text-left">
          <p className="text-xs text-slate-500 dark:text-slate-400">Nama</p>
          <p className="text-sm font-semibold text-slate-800 dark:text-white">{pegawai.nama}</p>
        </div>
      </div>

      {/* Dua kolom info */}
      <div className="grid grid-cols-2 gap-y-3 text-sm text-slate-700 dark:text-slate-300">
        {/* Kiri */}
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Jabatan</p>
          <p>{pegawai.jabatan}</p>
        </div>
        {/* Kanan */}
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
          <span className={`inline-block text-xs font-semibold px-2 py-1 rounded-full ${
            pegawai.status === 'Aktif'
              ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
              : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
          }`}>
            {pegawai.status}
          </span>
        </div>

        {/* Kiri */}
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tgl Bergabung</p>
          <p>{pegawai.tanggal_bergabung}</p>
        </div>
        {/* Kanan */}
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Aksi</p>
          <div className="flex justify-end gap-3">
            <button className="text-blue-500 hover:text-blue-700" title="Edit">
              <Edit size={18} />
            </button>
            <button className="text-red-500 hover:text-red-700" title="Hapus">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      </motion.div>
    </AdminLayout>
  );
}
