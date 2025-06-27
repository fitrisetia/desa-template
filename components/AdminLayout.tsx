// File: components/AdminLayout.tsx
// Kode ini disesuaikan untuk mengatasi error kompilasi di lingkungan pratinjau.
// Fungsionalitas spesifik Next.js (Link, Head) dinonaktifkan sementara.

import React, { useState, Fragment } from 'react';
// import Head from 'next/head'; // Dinonaktifkan untuk kompatibilitas pratinjau
// import Link from 'next/link'; // Dinonaktifkan untuk kompatibilitas pratinjau
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Users, 
    FileText, 
    Settings, 
    ChevronLeft,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  showSearch?: boolean; 
}

// Komponen Navigasi untuk digunakan di Sidebar Desktop dan Mobile
const NavigationLinks: React.FC = () => {
    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
        { icon: <Users size={20} />, label: 'Data Pegawai', href: '/admin/pegawai' },
        { icon: <FileText size={20} />, label: 'Laporan Absensi', href: '/admin/laporan' },
        { icon: <Settings size={20} />, label: 'Pengaturan', href: '/admin/pengaturan' },
    ];
    return (
        <nav className="flex-grow">
            <ul>
                {navItems.map((item, index) => (
                    <li key={index} className="mb-2">
                        {/* Di proyek lokal, gunakan kembali komponen <Link> */}
                        <a href={item.href} className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors">
                            {item.icon}
                            <span className="ml-4 font-medium">{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// Sidebar untuk Desktop
const DesktopSidebar: React.FC<{ isCollapsed: boolean; setCollapsed: (isCollapsed: boolean) => void; }> = ({ isCollapsed, setCollapsed }) => {
    const sidebarVariants = {
        collapsed: { width: '80px' },
        expanded: { width: '250px' },
    };

    return (
        <motion.div
            variants={sidebarVariants}
            animate={isCollapsed ? 'collapsed' : 'expanded'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative h-screen bg-slate-900 text-slate-200 p-4 flex-col shadow-lg hidden md:flex print:hidden"
        >
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-10`}>
                {!isCollapsed && <span className="text-xl font-bold">Admin Panel</span>}
            </div>
            <button onClick={() => setCollapsed(!isCollapsed)} className="absolute -right-3 top-8 bg-slate-700 hover:bg-blue-500 text-white rounded-full p-1.5 z-10"><ChevronLeft size={16} className={`transition-transform ${isCollapsed && "rotate-180"}`}/></button>
            <nav className="flex-grow">
                <ul>
                    {[
                        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/admin/dashboard' },
                        { icon: <Users size={20} />, label: 'Data Pegawai', href: '/admin/pegawai' },
                        { icon: <FileText size={20} />, label: 'Laporan Absensi', href: '/admin/laporan' },
                        { icon: <Settings size={20} />, label: 'Pengaturan', href: '/admin/pengaturan' },
                    ].map((item, index) => (
                        <li key={index} className="mb-2">
                             {/* Di proyek lokal, gunakan kembali komponen <Link> */}
                            <a href={item.href} className="flex items-center p-3 rounded-lg hover:bg-slate-700 transition-colors">
                                {item.icon}
                                {!isCollapsed && <motion.span initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="ml-4 font-medium">{item.label}</motion.span>}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.div>
    );
};

// Sidebar untuk Mobile (Overlay)
const MobileSidebar: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }> = ({ isOpen, setIsOpen }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden" />
                <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="fixed top-0 left-0 h-full w-64 bg-slate-900 text-slate-200 p-4 z-50 flex flex-col">
                    <div className="flex justify-between items-center mb-10"><span className="text-xl font-bold">Admin Panel</span><button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button></div>
                    <NavigationLinks />
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

const Header: React.FC<{ pageTitle: string; onMenuClick: () => void; }> = ({ pageTitle, onMenuClick }) => {
    return (
        <header className="bg-white dark:bg-slate-800/50 shadow-sm p-4 flex justify-between items-center print:hidden">
            <div className="flex items-center gap-4"><button onClick={onMenuClick} className="text-slate-600 dark:text-slate-300 md:hidden"><Menu size={24} /></button><h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">{pageTitle}</h1></div>
            <div className="flex items-center gap-2 md:gap-4">
                <div className="relative hidden sm:block"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" placeholder="Cari..." className="bg-slate-100 dark:bg-slate-700 rounded-full py-2 pl-10 pr-4 w-40 md:w-64 text-sm focus:ring-2 focus:ring-blue-500 outline-none"/></div>
                <button className="text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Bell size={22}/></button>
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">A</div>
            </div>
        </header>
    );
};

// Ekspor komponen AdminLayout agar bisa diimpor di file lain
export const AdminLayout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
    const [isDesktopCollapsed, setDesktopCollapsed] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex bg-slate-100 dark:bg-slate-900 min-h-screen">
            {/* <Head>
                <title>{pageTitle} - Admin Absensi</title>
            </Head> */}
            <MobileSidebar isOpen={isMobileMenuOpen} setIsOpen={setMobileMenuOpen} />
            <DesktopSidebar isCollapsed={isDesktopCollapsed} setCollapsed={setDesktopCollapsed} />
            <main className="flex-1 flex flex-col">
                <Header pageTitle={pageTitle} onMenuClick={() => setMobileMenuOpen(true)} />
                <div className="p-4 sm:p-6 md:p-8 flex-grow">
                    {children}
                </div>
            </main>
        </div>
    );
};
