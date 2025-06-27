'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Printer, Filter } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';

type ReportType = 'Minggu' | 'Bulan' | 'Tahun';

interface ReportData {
  id: number;
  nama: string;
  jabatan: string;
  hadir: number;
  terlambat: number;
  izin: number;
  alpha: number;
}

const dummyData: Record<ReportType, ReportData[]> = {
  Minggu: [
    { id: 1, nama: 'Budi Santoso', jabatan: 'Staf Pelayanan', hadir: 5, terlambat: 0, izin: 0, alpha: 0 },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Bendahara Desa', hadir: 4, terlambat: 1, izin: 0, alpha: 0 },
    { id: 3, nama: 'Joko Susilo', jabatan: 'Kasi Pemerintahan', hadir: 3, terlambat: 1, izin: 1, alpha: 0 },
  ],
  Bulan: [
    { id: 1, nama: 'Budi Santoso', jabatan: 'Staf Pelayanan', hadir: 22, terlambat: 1, izin: 0, alpha: 0 },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Bendahara Desa', hadir: 20, terlambat: 2, izin: 1, alpha: 0 },
    { id: 3, nama: 'Joko Susilo', jabatan: 'Kasi Pemerintahan', hadir: 18, terlambat: 3, izin: 1, alpha: 1 },
    { id: 4, nama: 'Dewi Lestari', jabatan: 'Staf Umum', hadir: 21, terlambat: 0, izin: 2, alpha: 0 },
  ],
  Tahun: [
    { id: 1, nama: 'Budi Santoso', jabatan: 'Staf Pelayanan', hadir: 250, terlambat: 10, izin: 5, alpha: 1 },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Bendahara Desa', hadir: 245, terlambat: 12, izin: 8, alpha: 3 },
  ],
};

export default function LaporanPage() {
  const [activeTab, setActiveTab] = useState<ReportType>('Bulan');

  const handlePrint = () => window.print();

  const total = dummyData[activeTab].reduce(
    (acc, curr) => {
      acc.hadir += curr.hadir;
      acc.terlambat += curr.terlambat;
      acc.izin += curr.izin;
      acc.alpha += curr.alpha;
      return acc;
    },
    { hadir: 0, terlambat: 0, izin: 0, alpha: 0 }
  );

  return (
    <AdminLayout pageTitle="Laporan Absensi">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 print:hidden">
          <div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Rekapitulasi Kehadiran Pegawai</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Pilih periode laporan untuk ditampilkan.</p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-md w-full sm:w-auto"
          >
            <Printer size={20} />
            <span>Cetak Laporan</span>
          </button>
        </div>

        {/* Filter */}
        <div className="mb-4 print:hidden w-full max-w-xs">
          <div className="relative flex items-center">
            <Filter className="absolute left-3 text-slate-500 dark:text-slate-300" size={18} />
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as ReportType)}
              className="w-full pl-10 pr-4 py-2 appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Minggu">Mingguan</option>
              <option value="Bulan">Bulanan</option>
              <option value="Tahun">Tahunan</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <div className="p-4" id="laporan-area">
            {/* Header Cetak */}
            <div className="text-center mb-6 hidden print:block">
              <h1 className="text-2xl font-bold">Laporan Absensi Pegawai</h1>
              <h2 className="text-lg font-medium">Periode: <span className="capitalize">{activeTab}</span></h2>
              <p className="text-sm">Desa Maju Sejahtera</p>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-3">Nama Pegawai</th>
                    <th className="px-6 py-3">Jabatan</th>
                    <th className="px-6 py-3 text-center">Hadir</th>
                    <th className="px-6 py-3 text-center">Terlambat</th>
                    <th className="px-6 py-3 text-center">Izin</th>
                    <th className="px-6 py-3 text-center">Alpha</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyData[activeTab].map((pegawai) => (
                    <tr key={pegawai.id} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700">
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap dark:text-white">{pegawai.nama}</td>
                      <td className="px-6 py-4">{pegawai.jabatan}</td>
                      <td className="px-6 py-4 text-center font-semibold text-green-600">{pegawai.hadir}</td>
                      <td className="px-6 py-4 text-center font-semibold text-amber-600">{pegawai.terlambat}</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-600">{pegawai.izin}</td>
                      <td className="px-6 py-4 text-center font-semibold text-red-600">{pegawai.alpha}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-100 dark:bg-slate-700">
                    <td className="px-6 py-4 font-bold text-slate-700 dark:text-white" colSpan={2}>Total</td>
                    <td className="px-6 py-4 text-center font-bold text-green-700 dark:text-green-400">{total.hadir}</td>
                    <td className="px-6 py-4 text-center font-bold text-amber-700 dark:text-amber-400">{total.terlambat}</td>
                    <td className="px-6 py-4 text-center font-bold text-blue-700 dark:text-blue-400">{total.izin}</td>
                    <td className="px-6 py-4 text-center font-bold text-red-700 dark:text-red-400">{total.alpha}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
