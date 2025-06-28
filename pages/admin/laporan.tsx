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
}

const dummyData: Record<ReportType, ReportData[]> = {
  Minggu: [
    { id: 1, nama: 'Budi Santoso', jabatan: 'Staf Pelayanan', hadir: 5, terlambat: 0, izin: 0 },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Bendahara Desa', hadir: 4, terlambat: 1, izin: 0 },
    { id: 3, nama: 'Joko Susilo', jabatan: 'Kasi Pemerintahan', hadir: 3, terlambat: 1, izin: 1 },
  ],
  Bulan: [
    { id: 1, nama: 'Budi Santoso', jabatan: 'Staf Pelayanan', hadir: 22, terlambat: 1, izin: 0 },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Bendahara Desa', hadir: 20, terlambat: 2, izin: 1 },
    { id: 3, nama: 'Joko Susilo', jabatan: 'Kasi Pemerintahan', hadir: 18, terlambat: 3, izin: 1 },
    { id: 4, nama: 'Dewi Lestari', jabatan: 'Staf Umum', hadir: 21, terlambat: 0, izin: 2 },
  ],
  Tahun: [
    { id: 1, nama: 'Budi Santoso', jabatan: 'Staf Pelayanan', hadir: 250, terlambat: 10, izin: 5 },
    { id: 2, nama: 'Siti Aminah', jabatan: 'Bendahara Desa', hadir: 245, terlambat: 12, izin: 8 },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ReportType>('Bulan');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const handlePrint = () => window.print();

  const total = dummyData[activeTab].reduce(
    (acc, curr) => {
      acc.hadir += curr.hadir;
      acc.terlambat += curr.terlambat;
      acc.izin += curr.izin;
      return acc;
    },
    { hadir: 0, terlambat: 0, izin: 0 }
  );

  return (
    <AdminLayout pageTitle="Laporan Absensi">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Rekapitulasi Kehadiran Pegawai</h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mt-1">Pilih periode laporan untuk menampilkan data yang relevan.</p>
          </div>
        </div>

        {/* Filter + Print */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
          {/* Filter */}
          <div className="w-full sm:max-w-xs relative">
            <button
              onClick={() => setShowFilterOptions(!showFilterOptions)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors shadow-md w-full justify-center sm:hidden"
            >
              <Filter size={20} />
              <span>Filter Periode</span>
            </button>
            <div className={`sm:block ${showFilterOptions ? 'block' : 'hidden'} mt-2 sm:mt-0`}>
              <div className="relative flex items-center">
                <Filter className="absolute left-3 text-slate-500 dark:text-slate-300" size={20} />
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as ReportType)}
                  className="w-full pl-11 pr-4 py-3 appearance-none bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Minggu">Mingguan</option>
                  <option value="Bulan">Bulanan</option>
                  <option value="Tahun">Tahunan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                  <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-all shadow-md w-full sm:w-auto justify-center"
          >
            <Printer size={20} />
            <span>Cetak Laporan</span>
          </button>
        </div>

        {/* Desktop Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hidden md:block print:block">
          <div className="p-6" id="laporan-area">
            <div className="text-center mb-6 hidden print:block">
              <h1 className="text-3xl font-bold">Laporan Absensi Pegawai</h1>
              <h2 className="text-xl font-medium">Periode: <span className="capitalize">{activeTab}</span></h2>
              <p className="text-base">Desa Maju Sejahtera</p>
            </div>

            <table className="min-w-full text-sm text-left text-slate-600 dark:text-slate-300">
              <thead className="text-xs uppercase bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3">Nama Pegawai</th>
                  <th className="px-6 py-3">Jabatan</th>
                  <th className="px-6 py-3 text-center">Hadir</th>
                  <th className="px-6 py-3 text-center">Terlambat</th>
                  <th className="px-6 py-3 text-center">Izin</th>
                </tr>
              </thead>
              <tbody>
                {dummyData[activeTab].map((pegawai) => (
                  <tr key={pegawai.id} className="border-b dark:border-slate-700">
                    <td className="px-6 py-4 font-medium">{pegawai.nama}</td>
                    <td className="px-6 py-4">{pegawai.jabatan}</td>
                    <td className="px-6 py-4 text-center text-green-600">{pegawai.hadir}</td>
                    <td className="px-6 py-4 text-center text-amber-600">{pegawai.terlambat}</td>
                    <td className="px-6 py-4 text-center text-blue-600">{pegawai.izin}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 dark:bg-slate-700">
                  <td className="px-6 py-4 font-bold" colSpan={2}>Total</td>
                  <td className="px-6 py-4 text-center font-bold text-green-700">{total.hadir}</td>
                  <td className="px-6 py-4 text-center font-bold text-amber-700">{total.terlambat}</td>
                  <td className="px-6 py-4 text-center font-bold text-blue-700">{total.izin}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 print:hidden">
          {dummyData[activeTab].map((pegawai) => (
            <div key={pegawai.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow border dark:border-slate-700">
              <div className="flex justify-between mb-3 border-b pb-2">
                <p className="font-bold">{pegawai.nama}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{pegawai.jabatan}</p>
              </div>
              <div className="grid grid-cols-3 text-center">
                <div>
                  <p className="text-xs text-slate-500">Hadir</p>
                  <p className="font-bold text-green-600">{pegawai.hadir}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Terlambat</p>
                  <p className="font-bold text-amber-600">{pegawai.terlambat}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Izin</p>
                  <p className="font-bold text-blue-600">{pegawai.izin}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl shadow mt-4">
            <p className="font-bold mb-2">Total Rekapitulasi</p>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-xs text-slate-500">Hadir</p>
                <p className="font-bold text-green-700">{total.hadir}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Terlambat</p>
                <p className="font-bold text-amber-700">{total.terlambat}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Izin</p>
                <p className="font-bold text-blue-700">{total.izin}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}
