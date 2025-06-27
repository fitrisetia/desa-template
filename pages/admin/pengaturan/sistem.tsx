// File: pages/admin/pengaturan/sistem.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '../../../components/AdminLayout';
import { Sun, Palette, Moon } from 'lucide-react';

const InputField: React.FC<{
    label: string;
    type: string;
    id: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}> = ({ label, type, id, value, onChange, className }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
        </label>
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-700 dark:border-slate-600 dark:text-white"
        />
    </div>
);

export default function SistemSettingsPage() {
    const [desaName, setDesaName] = useState('Desa Maju Sejahtera');
    const [theme, setTheme] = useState<'light' | 'navy' | 'dark'>('navy');

    return (
        <AdminLayout pageTitle="Pengaturan Sistem">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8 max-w-3xl mx-auto"
            >
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md space-y-6">
                    <InputField
                        label="Nama Desa / Instansi"
                        type="text"
                        id="desa-name"
                        value={desaName}
                        onChange={(e) => setDesaName(e.target.value)}
                    />

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tema Tampilan</label>
                        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg">
                            <button
                                onClick={() => setTheme('light')}
                                className={`w-1/3 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${
                                    theme === 'light'
                                        ? 'bg-white text-slate-800 shadow'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                            >
                                <Sun size={16} /> Terang
                            </button>
                            <button
                                onClick={() => setTheme('navy')}
                                className={`w-1/3 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${
                                    theme === 'navy'
                                        ? 'bg-blue-500 text-white shadow'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                            >
                                <Palette size={16} /> Navy
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`w-1/3 py-2 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-colors ${
                                    theme === 'dark'
                                        ? 'bg-slate-900 text-white shadow'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                                }`}
                            >
                                <Moon size={16} /> Gelap
                            </button>
                        </div>
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
