'use client';

import React from 'react';
import { Users, FileText, Clock } from 'lucide-react';
import { StatCard } from '../cards/StatCard';

interface StatistikRingkasanCardProps {
  hadir: number;
  terlambat: number;
  izin: number;
  totalPegawai?: number; // Optional if you want to make it dynamic
}

export const StatistikRingkasanCard: React.FC<StatistikRingkasanCardProps> = ({
  hadir,
  terlambat,
  izin,
  totalPegawai = 35, // Default value if not passed
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <StatCard
        title="Total Pegawai"
        value={String(totalPegawai)}
        icon={<Users size={24} />}
        href="/admin/pegawai"
      />
      <StatCard
        title="Hadir Hari Ini"
        value={String(hadir)}
        icon={<FileText size={24} />}
      />
      <StatCard
        title="Terlambat"
        value={String(terlambat)}
        icon={<Clock size={24} />}
      />
      <StatCard
        title="Izin/Sakit"
        value={String(izin)}
        icon={<FileText size={24} />}
      />
    </div>
  );
};
