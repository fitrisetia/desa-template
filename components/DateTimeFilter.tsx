// File: components/DateTimeFilter.tsx
'use client';

import React, { useState } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateTimeFilter({ selected, onChange }: {
  selected: Date;
  onChange: (date: Date) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
      >
        <CalendarDays size={18} />
        <span>{format(selected, 'EEEE, dd MMMM yyyy - HH:mm', { locale: id })}</span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute mt-2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-lg p-3">
          <DatePicker
            selected={selected}
            onChange={(date) => {
              onChange(date as Date);
              setOpen(false);
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="Pp"
            locale={id}
            className="text-sm px-2 py-1"
            inline
          />
        </div>
      )}
    </div>
  );
}
