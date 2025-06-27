'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { format, isValid, startOfWeek, addDays } from 'date-fns';
import { id } from 'date-fns/locale';

import { AdminLayout } from '../../components/AdminLayout';
import { Breadcrumb } from '../../components/admin/ui/Breadcrumb';
import { RecentActivityList } from '../../components/admin/activity/RecentActivityList';
import { StatistikKehadiranChart } from '../../components/admin/charts/StatistikKehadiranChart';
import { StatistikRingkasanFilter } from '../../components/admin/filters/StatistikRingkasFilter';
import { KehadiranChartFilter } from '../../components/admin/filters/KehadiranChartFilter';
import { StatistikRingkasanCard } from '../../components/admin/charts/StatistikRingkasanCard';

const attendanceData = [
  { name: 'Sen', hadir: 28, terlambat: 3, izin: 2 },
  { name: 'Sel', hadir: 30, terlambat: 1, izin: 1 },
  { name: 'Rab', hadir: 27, terlambat: 2, izin: 3 },
  { name: 'Kam', hadir: 29, terlambat: 1, izin: 2 },
  { name: 'Jum', hadir: 25, terlambat: 2, izin: 5 },
];

const recentActivity = [
  { name: 'Lina Marlina', time: '07:53', status: 'Hadir', date: new Date() },
  { name: 'Ahmad Fadli', time: '08:17', status: 'Terlambat', date: new Date() },
  { name: 'Beni Saputra', time: '08:00', status: 'Hadir', date: new Date() },
  { name: 'Rizky Amelia', time: '08:22', status: 'Terlambat', date: new Date() },
  { name: 'Novi Andari', time: '07:50', status: 'Hadir', date: new Date() },
];

// Generate mock data for a week (Senin–Jumat)
function getWeekDates(baseDate: Date) {
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 }); // Senin
  const data = [];

  for (let i = 0; i < 5; i++) {
    const current = addDays(weekStart, i);
    data.push({
      name: format(current, 'dd MMM', { locale: id }),
      hadir: Math.floor(Math.random() * 30),
      terlambat: Math.floor(Math.random() * 5),
      izin: Math.floor(Math.random() * 4),
    });
  }

  return data;
}

function getMonthWeeks(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const weeks: { name: string, hadir: number, terlambat: number, izin: number }[] = [];

  let current = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  let weekIndex = 1;

  while (current.getMonth() <= month) {
    let totalHadir = 0;
    let totalTerlambat = 0;
    let totalIzin = 0;

    for (let i = 0; i < 5; i++) { // Senin–Jum'at
      const currentDate = addDays(current, i);
      if (currentDate.getMonth() !== month) continue;
      totalHadir += Math.floor(Math.random() * 30);
      totalTerlambat += Math.floor(Math.random() * 5);
      totalIzin += Math.floor(Math.random() * 4);
    }

    weeks.push({
      name: `Minggu ke-${weekIndex}`,
      hadir: totalHadir,
      terlambat: totalTerlambat,
      izin: totalIzin,
    });

    current = addDays(current, 7);
    weekIndex++;
  }

  return weeks;
}

function getYearData(date: Date) {
  const year = date.getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => {
    return {
      name: format(new Date(year, i, 1), 'MMMM', { locale: id }),
      hadir: Math.floor(Math.random() * 600),
      terlambat: Math.floor(Math.random() * 100),
      izin: Math.floor(Math.random() * 80),
    };
  });
  return months;
}

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterMode, setFilterMode] = useState<'Tanggal' | 'Minggu' | 'Bulan' | 'Tahun'>('Tanggal');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isDateValid = isValid(selectedDate);
  const formattedDate = isDateValid
    ? format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: id })
    : '-';
  const dayName = isDateValid
    ? format(selectedDate, 'eee', { locale: id })
    : '';
  const dayData = attendanceData.find((d) => d.name === dayName);

const displayChartData = useMemo(() => {
  if (filterMode === 'Tanggal') {
    return dayData ? [dayData] : [];
  }
  if (filterMode === 'Minggu') {
    return getWeekDates(selectedDate);
  }
  if (filterMode === 'Bulan') {
    return getMonthWeeks(selectedDate);
  }
  if (filterMode === 'Tahun') {
    return getYearData(selectedDate);
  }
  return attendanceData;
}, [filterMode, dayData, selectedDate]);


const chartLabelDetail = useMemo(() => {
  if (filterMode === 'Tanggal') {
    return formattedDate;
  }
  if (filterMode === 'Minggu') {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 4);
    return `${format(weekStart, 'dd MMM', { locale: id })} – ${format(weekEnd, 'dd MMM yyyy', { locale: id })}`;
  }
  if (filterMode === 'Bulan') {
    return format(selectedDate, 'MMMM yyyy', { locale: id });
  }
  if (filterMode === 'Tahun') {
    return `Tahun ${format(selectedDate, 'yyyy', { locale: id })}`;
  }
  return undefined;
}, [filterMode, selectedDate, formattedDate]);

  return (
    <AdminLayout pageTitle="Dashboard" showSearch={false}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Breadcrumb paths={[{ name: 'Dashboard' }]} />

        <div className="mb-8">

          {hasMounted && (
            <div className="mt-4">
              <p className="text-5xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {format(currentTime, 'HH:mm:ss')}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300">
                {format(currentTime, 'dd MMMM yyyy', { locale: id })}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Data Statistik */}
            <div>
              <div className="flex items-center justify-between mb-4 gap-2 flex-wrap relative">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Data Statistik</h3>
                <StatistikRingkasanFilter
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
              </div>
              <StatistikRingkasanCard
                hadir={dayData?.hadir ?? 0}
                terlambat={dayData?.terlambat ?? 0}
                izin={dayData?.izin ?? 0}
              />
            </div>

            {/* Statistik Kehadiran */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Statistik Kehadiran</h3>
                <KehadiranChartFilter
                  selectedDate={selectedDate}
                  selectedType={filterMode}
                  onTypeChange={setFilterMode}
                  onDateChange={setSelectedDate}
                />
              </div>
              <StatistikKehadiranChart
                chartData={displayChartData}
                dayName={dayName}
                filterMode={filterMode}
                labelDetail={chartLabelDetail}
              />
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <RecentActivityList recentActivity={recentActivity} />
        </div>
      </motion.div>
    </AdminLayout>
  );
}
