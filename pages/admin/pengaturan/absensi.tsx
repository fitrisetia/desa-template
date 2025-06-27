// File: pages/admin/pengaturan/absensi.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { AdminLayout } from '../../../components/AdminLayout';

const InputField: React.FC<{ label: string; type: string; id: string; icon: React.ReactNode; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string; }> = ({ label, type, id, icon, value, onChange, className }) => (
    <div className={className}>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">{icon}</span>
            <input type={type} id={id} value={value} onChange={onChange} className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-700 dark:border-slate-600 dark:text-white"/>
        </div>
    </div>
);

const DaySelector: React.FC<{ selectedDays: string[]; onToggleDay: (day: string) => void; }> = ({ selectedDays, onToggleDay }) => {
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hari Kerja Aktif</label>
            <div className="flex flex-wrap gap-2">
                {days.map(day => {
                    const isSelected = selectedDays.includes(day);
                    return (
                        <button key={day} onClick={() => onToggleDay(day)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                            {day}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default function AbsensiSettingsPage() {
    const [jamMasuk, setJamMasuk] = useState('08:00');
    const [jamPulang, setJamPulang] = useState('16:00');
    const [radius, setRadius] = useState('100');
    const [workingDays, setWorkingDays] = useState(['Sen', 'Sel', 'Rab', 'Kam', 'Jum']);

    const toggleWorkingDay = (day: string) => {
        setWorkingDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
    };

    return (
        <AdminLayout pageTitle="Pengaturan Absensi">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Jam Masuk Kerja" type="time" id="jam-masuk" icon={<Clock size={16} />} value={jamMasuk} onChange={e => setJamMasuk(e.target.value)} />
                        <InputField label="Jam Pulang Kerja" type="time" id="jam-pulang" icon={<Clock size={16} />} value={jamPulang} onChange={e => setJamPulang(e.target.value)} />
                    </div>
                    <InputField label="Radius Lokasi Kantor (meter)" type="number" id="radius" icon={<MapPin size={16} />} value={radius} onChange={e => setRadius(e.target.value)} />
                    <DaySelector selectedDays={workingDays} onToggleDay={toggleWorkingDay} />
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
