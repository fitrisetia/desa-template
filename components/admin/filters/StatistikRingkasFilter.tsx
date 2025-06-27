'use client';

import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { format } from 'date-fns';

interface Props {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function StatistikRingkasanFilter({ selectedDate, onDateChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      onDateChange(newDate);
      setShowPicker(false);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="text-slate-600 dark:text-slate-300 hover:scale-105"
        title="Filter ringkasan"
      >
        <Filter size={20} />
      </button>

      {showPicker && (
        <input
          type="date"
          autoFocus
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={handleChange}
          className="absolute right-0 mt-2 z-20 px-2 py-1 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded shadow"
        />
      )}
    </div>
  );
}
