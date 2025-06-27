'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

interface StatistikKehadiranChartProps {
  chartData: {
    name: string;
    hadir: number;
    terlambat: number;
    izin: number;
  }[];
  dayName?: string;
  filterMode: 'Tanggal' | 'Minggu' | 'Bulan' | 'Tahun';
  labelDetail?: string; // Optional: Minggu ke-1 (1–7 Juni)
}

export const StatistikKehadiranChart: React.FC<StatistikKehadiranChartProps> = ({
  chartData,
  dayName,
  filterMode,
  labelDetail,
}) => {
  const getTitle = () => {
    switch (filterMode) {
      case 'Tanggal':
        return `Statistik Hari ${dayName ?? '-'}`;
      case 'Minggu':
        return 'Statistik Kehadiran per Hari (Mingguan)';
      case 'Bulan':
        return 'Statistik Kehadiran per Pekan (Bulanan)';
      case 'Tahun':
        return 'Statistik Kehadiran Tahunan';
      default:
        return 'Statistik Kehadiran';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-md">
      <h3 className="font-bold text-lg mb-1 text-slate-800 dark:text-white">
        {getTitle()}
      </h3>
      {labelDetail && (
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{labelDetail}</p>
      )}

      {chartData.length === 0 ? (
        <p className="text-center text-slate-500 dark:text-slate-400 py-8">
          Tidak ada data untuk ditampilkan.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(203, 213, 225, 0.3)"
            />
            <XAxis
              dataKey="name"
              tick={({ x, y, payload }) => {
                const lines = String(payload.value).split('\n');
                return (
                  <text x={x} y={y + 10} textAnchor="middle" fill="#94a3b8" fontSize={12}>
                    {lines.map((line: string, index: number) => (
                      <tspan key={index} x={x} dy={index === 0 ? 0 : 14}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />
            <YAxis tick={{ fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                borderColor: '#334155',
                color: '#cbd5e1',
              }}
            />
            <Legend />
            <Bar dataKey="hadir" fill="#3b82f6" name="Hadir" />
            <Bar dataKey="terlambat" fill="#f59e0b" name="Terlambat" />
            <Bar dataKey="izin" fill="#64748b" name="Izin/Sakit" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
