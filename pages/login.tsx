// File: pages/login.tsx
// Kode ini telah diperbarui dengan notifikasi dummy yang lebih modern saat login berhasil.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Ilustrasi SVG (tidak berubah)
const SvgIllustration = () => (
    <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <motion.circle 
            cx="200" cy="200" r="150" fill="none" stroke="url(#grad1)" strokeWidth="10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path d="M150 200 L200 250 L250 200" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} />
        <motion.path d="M200 150 V 250" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ delay: 1.5, duration: 1 }} />
    </svg>
);

// --- Interface & Komponen Form (tidak berubah) ---
interface LoginFormProps { onTogglePassword: () => void; showPassword: boolean; handleLogin: (e: React.FormEvent) => void; email: string; setEmail: (value: string) => void; password: string; setPassword: (value: string) => void; error: string; }
const LoginForm: React.FC<LoginFormProps> = ({ onTogglePassword, showPassword, handleLogin, email, setEmail, password, setPassword, error }) => (
    <motion.form key="login" onSubmit={handleLogin} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
        <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type="email" placeholder="Email (cth: admin@desa.id)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-800 dark:border-slate-700" required/></div>
        <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type={showPassword ? "text" : "password"} placeholder="Password (cth: admin123)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-800 dark:border-slate-700" required/><button type="button" onClick={onTogglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">{showPassword ? <EyeOff/> : <Eye/>}</button></div>
        <div className="text-right"><Link href="#" className="text-sm text-blue-500 hover:underline">Lupa Password?</Link></div>
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">Login</button>
    </motion.form>
);
const SignUpForm: React.FC<{ onTogglePassword: () => void; showPassword: boolean; }> = ({ onTogglePassword, showPassword }) => (
    <motion.div key="signup" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
        <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type="text" placeholder="Nama Lengkap" className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-800 dark:border-slate-700" /></div>
        <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type="email" placeholder="Email" className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-800 dark:border-slate-700" /></div>
        <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input type={showPassword ? "text" : "password"} placeholder="Buat Password" className="w-full bg-slate-100 border border-slate-200 rounded-full py-3 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 outline-none transition dark:bg-slate-800 dark:border-slate-700" /><button type="button" onClick={onTogglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">{showPassword ? <EyeOff/> : <Eye/>}</button></div>
        <button className="w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">Buat Akun</button>
    </motion.div>
);
// --------------------------------------------------

// Komponen Notifikasi Sukses
const SuccessNotification: React.FC<{ role: string }> = ({ role }) => (
    <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-xl"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Login Berhasil!</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
                Selamat datang! Anda akan diarahkan ke halaman {role}.
            </p>
        </motion.div>
    </motion.div>
);

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // State baru untuk notifikasi
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let role = '';
    let path = '';

    if (email === 'admin@desa.id' && password === 'admin123') {
        role = 'Admin';
        path = '/admin/dashboard';
    } else if (email === 'kades@desa.id' && password === 'kades123') {
        role = 'Kepala Desa';
        path = '/kades/dashboard';
    } else if (email === 'pegawai@desa.id' && password === 'pegawai123') {
        role = 'Pegawai';
        path = '/pegawai/dashboard';
    }

    if (role && path) {
        setUserRole(role);
        setLoginSuccess(true);
        // Arahkan setelah notifikasi muncul selama 2 detik
        setTimeout(() => {
            router.push(path);
        }, 2000);
    } else {
        setError('Kombinasi email dan password salah.');
    }
  };

  return (
    <>
      <Head>
          <title>Login - Absensi Desa</title>
      </Head>
      
      <AnimatePresence>
          {loginSuccess && <SuccessNotification role={userRole} />}
      </AnimatePresence>

      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 text-slate-900 dark:text-slate-50">
          <div className="grid md:grid-cols-2 max-w-4xl w-full bg-white dark:bg-slate-950/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-slate-200 dark:border-slate-800">
              <div className="p-8 md:p-12">
                  <motion.div initial={{opacity:0, y:-40}} animate={{opacity:1, y:0}} transition={{delay:0.1}}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Lambang_Provinsi_Jawa_Barat.svg" alt="Logo Jawa Barat" className="mx-auto h-20 w-20 mb-4" />
                  </motion.div>
                  <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                      <h1 className="text-3xl font-bold text-center mb-2">{activeTab === 'login' ? 'Selamat Datang Kembali!' : 'Buat Akun Baru'}</h1>
                      <p className="text-center text-sm text-slate-600 dark:text-slate-400 mb-8">{activeTab === 'login' ? 'Masuk untuk melanjutkan ke sistem absensi.' : 'Daftar untuk mendapatkan akses penuh.'}</p>
                  </motion.div>
                  <div className="flex justify-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full mb-8">
                      <button onClick={() => setActiveTab('login')} className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'login' ? 'bg-blue-500 text-white shadow' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>Login</button>
                      <button onClick={() => setActiveTab('signup')} className={`w-1/2 py-2.5 text-sm font-semibold rounded-full transition-colors ${activeTab === 'signup' ? 'bg-blue-500 text-white shadow' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'}`}>Sign Up</button>
                  </div>
                  <AnimatePresence mode="wait">
                      {activeTab === 'login' 
                          ? <LoginForm key="login" onTogglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} handleLogin={handleLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} error={error} /> 
                          : <SignUpForm key="signup" onTogglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} />
                      }
                  </AnimatePresence>
                  <div className="flex items-center my-8"><hr className="w-full border-t border-slate-200 dark:border-slate-700"/><span className="px-4 text-xs text-slate-400 dark:text-slate-500">ATAU</span><hr className="w-full border-t border-slate-200 dark:border-slate-700"/></div>
                  <div className="space-y-4"><button className="w-full flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 py-3 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/><span className="text-sm font-medium">Lanjutkan dengan Google</span></button></div>
              </div>
              <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-500 p-8"><div className="w-64 h-64"><SvgIllustration/></div></div>
          </div>
      </div>
    </>
  );
}
