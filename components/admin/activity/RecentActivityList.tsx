// components/admin/activity/RecentActivityList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

interface Activity {
  name: string;
  time: string;
  status: string;
  date: Date;
}

interface RecentActivityListProps {
  recentActivity: Activity[];
}

export const RecentActivityList: React.FC<RecentActivityListProps> = ({ recentActivity }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
      <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">
        Aktivitas Terbaru Hari Ini
      </h3>
      <ul className="space-y-4">
        {recentActivity.map((activity, index) => (
          <li key={index} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-200">{activity.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activity.time} - {format(activity.date, 'dd MMMM yyyy', { locale: id })}
              </p>
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-full ${
                activity.status === 'Hadir'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
              }`}
            >
              {activity.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <Link href="/admin/kehadiran" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Lihat Selengkapnya
        </Link>
      </div>
    </div>
  );
};
