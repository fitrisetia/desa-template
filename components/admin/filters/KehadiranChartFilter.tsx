'use client';

import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { format } from 'date-fns';

type Mode = 'Tanggal' | 'Minggu' | 'Bulan' | 'Tahun';

interface Props {
  selectedDate: Date;
  selectedType: Mode;
  onTypeChange: (t: Mode) => void;
  onDateChange: (d: Date) => void;
}

export function KehadiranChartFilter({
  selectedDate,
  selectedType,
  onTypeChange,
  onDateChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const inputType =
    selectedType === 'Bulan'
      ? 'month'
      : selectedType === 'Tahun'
      ? 'number'
      : 'date';

  const inputValue =
    selectedType === 'Tahun'
      ? selectedDate.getFullYear().toString()
      : selectedType === 'Bulan'
      ? format(selectedDate, 'yyyy-MM')
      : format(selectedDate, 'yyyy-MM-dd');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (selectedType === 'Tahun') {
      const year = Number(v);
      if (!isNaN(year)) onDateChange(new Date(year, 0, 1));
    } else if (selectedType === 'Bulan') {
      const [yr, m] = v.split('-').map(Number);
      if (!isNaN(yr) && !isNaN(m)) onDateChange(new Date(yr, m - 1, 1));
    } else {
      const d = new Date(v);
      if (!isNaN(d.getTime())) onDateChange(d);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="text-slate-600 dark:text-slate-300 hover:scale-105"
        title="Filter chart"
      >
        <Filter size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow z-20">
          <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            Tipe Filter
          </label>
          <select
            className="w-full mb-3 px-2 py-1 text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded text-slate-800 dark:text-white"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as Mode)}
          >
            <option value="Tanggal">Tanggal</option>
            <option value="Minggu">Minggu</option>
            <option value="Bulan">Bulan</option>
            <option value="Tahun">Tahun</option>
          </select>

          <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
            {selectedType === 'Tahun' ? 'Tahun' : selectedType}
          </label>
          <input
            type={inputType}
            className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded text-sm text-slate-800 dark:text-white"
            value={inputValue}
            onChange={handleChange}
            min={selectedType === 'Tahun' ? '2000' : undefined}
            max={selectedType === 'Tahun' ? String(new Date().getFullYear()) : undefined}
          />
        </div>
      )}
    </div>
  );
}
