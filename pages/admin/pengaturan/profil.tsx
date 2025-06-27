import React, { useState } from 'react';
import { AdminLayout } from '../../../components/AdminLayout';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

const InputField: React.FC<{
  label: string;
  type: string;
  id: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, id, icon, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-300 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      />
    </div>
  </div>
);

export default function ProfilAdminPage() {
  const [nama, setNama] = useState('Admin Desa');
  const [email, setEmail] = useState('admin@desa.go.id');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Update data:', { nama, email, password });
    alert('Profil berhasil diperbarui!');
  };

  return (
    <AdminLayout pageTitle="Pengaturan Profil Admin">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Edit Profil</h2>

          <InputField
            label="Nama Lengkap"
            type="text"
            id="nama"
            icon={<User size={16} />}
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <InputField
            label="Email"
            type="email"
            id="email"
            icon={<Mail size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Kata Sandi Baru"
            type="password"
            id="password"
            icon={<Lock size={16} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </motion.div>
    </AdminLayout>
  );
}
