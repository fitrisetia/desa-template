'use client';

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Daftar Semua Pegawai</h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-1">Kelola data pegawai desa di sini dengan mudah.</p>
          </div>
        </div>

        {/* Tombol Tambah */}
        <div className="flex justify-start mb-6">
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto justify-center"
          >
            <PlusCircle size={20} />
            <span>Tambah Pegawai</span>
          </button>
        </div>

        {/* Tabel Desktop */}
        <div className="hidden md:block bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-600 dark:text-slate-300">
              <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Nama</th>
                  <th className="px-6 py-3">Jabatan</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Tgl Bergabung</th>
                  <th className="px-6 py-3 text-center rounded-tr-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pegawaiList.map((pegawai) => (
                  <tr key={pegawai.id} className="bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-150">
                    <td className="px-6 py-4 flex items-center gap-3 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      <img
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 dark:border-blue-600"
                        src={pegawai.avatar}
                        alt={pegawai.nama}
                        onError={(e) => { e.currentTarget.src = `https://placehold.co/150x150/aabbcc/ffffff?text=${pegawai.nama.charAt(0)}`; }}
                      />
                      {pegawai.nama}
                    </td>
                    <td className="px-6 py-4">{pegawai.jabatan}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${pegawai.status === 'Aktif' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
                        {pegawai.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{pegawai.tanggal_bergabung}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-4">
                        <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30" title="Edit">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30" title="Hapus">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 mt-6">
          {pegawaiList.map((pegawai) => (
            <div key={pegawai.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-4 border-b pb-4 border-slate-200 dark:border-slate-700">
                <img
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-400 dark:border-blue-600"
                  src={pegawai.avatar}
                  alt={pegawai.nama}
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/150x150/aabbcc/ffffff?text=${pegawai.nama.charAt(0)}`; }}
                />
                <div className="flex-grow">
                  <p className="font-bold text-xl text-slate-800 dark:text-white">{pegawai.nama}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{pegawai.jabatan}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm text-slate-700 dark:text-slate-300 text-center">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${pegawai.status === 'Aktif' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'}`}>
                    {pegawai.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Tgl Bergabung</p>
                  <p className="font-medium">{pegawai.tanggal_bergabung}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Aksi</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-2">
                    <button className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/50 p-2 rounded-lg" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/50 p-2 rounded-lg" title="Hapus">
                      <Trash2 size={16} />
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
