'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbPath {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  paths: BreadcrumbPath[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => (
  <nav className="flex mb-4" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2">
      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        return (
          <li key={path.name}>
            <div className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 text-slate-400" />}
              {isLast ? (
                <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {path.name}
                </span>
              ) : (
                <Link
                  href={path.href || '#'}
                  className="ml-2 text-sm font-medium text-slate-700 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white"
                >
                  {path.name}
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  </nav>
);
