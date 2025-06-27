'use client';

import React from 'react';
import Link from 'next/link';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, href }) => {
  const cardContent = (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-500 dark:text-blue-300 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
};
