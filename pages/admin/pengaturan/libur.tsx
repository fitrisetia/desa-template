// File: pages/admin/pengaturan/libur.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, PlusCircle } from 'lucide-react';
import { AdminLayout } from '../../../components/AdminLayout';

const InputField: React.FC<{ label: string; type: string; id: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string; placeholder?: string; }> = ({ label, type, id, value, onChange, className, placeholder }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
    </div>
);

export default function LiburSettingsPage() {
    const [holidays, setHolidays] = useState([
        { date: '2025-08-17', description: 'Hari Kemerdekaan RI' },
        { date: '2025-12-25', description: 'Hari Raya Natal' },
    ]);
    const [newHoliday, setNewHoliday] = useState({ date: '', description: '' });

    const handleAddHoliday = (e: React.FormEvent) => {
        e.preventDefault();
        if (newHoliday.date && newHoliday.description) {
            setHolidays(prev =>
                [...prev, newHoliday].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            );
            setNewHoliday({ date: '', description: '' });
        }
    };

    const removeHoliday = (date: string) => {
        setHolidays(prev => prev.filter(h => h.date !== date));
    };

    return (
        <AdminLayout pageTitle="Hari Libur & Pengecualian">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 max-w-3xl mx-auto"
            >
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-6">
                    <form onSubmit={handleAddHoliday} className="flex flex-col sm:flex-row items-end gap-4">
                        <InputField
                            label="Tanggal"
                            type="date"
                            id="holiday-date"
                            value={newHoliday.date}
                            onChange={e => setNewHoliday({ ...newHoliday, date: e.target.value })}
                            className="flex-1"
                        />
                        <InputField
                            label="Keterangan"
                            type="text"
                            id="holiday-desc"
                            placeholder="Cth: Cuti Bersama"
                            value={newHoliday.description}
                            onChange={e => setNewHoliday({ ...newHoliday, description: e.target.value })}
                            className="flex-1"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors h-10 flex items-center gap-2"
                        >
                            <PlusCircle size={18} /> Tambah
                        </button>
                    </form>

                    <div className="space-y-2 pt-4">
                        {holidays.map(holiday => (
                            <div
                                key={holiday.date}
                                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                            >
                                <div>
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                                        {holiday.description}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(holiday.date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeHoliday(holiday.date)}
                                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="bg-green-500 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors shadow-lg">
                        Simpan Perubahan
                    </button>
                </div>
            </motion.div>
        </AdminLayout>
    );
}
