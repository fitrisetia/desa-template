// File: pages/index.tsx
// Kode ini disesuaikan untuk mengatasi error kompilasi di lingkungan pratinjau.
// Fungsionalitas spesifik Next.js (Link, Head) dan CountUp dinonaktifkan sementara.

import { motion, useInView } from 'framer-motion';
import { Clock, BarChart2, CheckSquare, Users, Briefcase, Percent } from 'lucide-react';
import React, { useRef } from 'react';
// import Link from 'next/link'; // Dinonaktifkan untuk kompatibilitas pratinjau
// import Head from 'next/head'; // Dinonaktifkan untuk kompatibilitas pratinjau
// import CountUp from 'react-countup'; // Dinonaktifkan untuk kompatibilitas pratinjau

// Interface untuk mendefinisikan tipe data props pada FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}

// Komponen untuk Kartu Fitur dengan tipe props yang sudah didefinisikan
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="transform rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        {icon}
      </div>
      <h3 className="mb-2 text-2xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </motion.div>
  );
};

// Interface untuk mendefinisikan tipe data props pada StatCard
interface StatCardProps {
    icon: React.ReactNode;
    end: number;
    suffix: string;
    title: string;
    delay: number;
}

// Komponen untuk Kartu Statistik dengan tipe props yang sudah didefinisikan
const StatCard: React.FC<StatCardProps> = ({ icon, end, suffix, title, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay } },
    };

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm"
        >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                {icon}
            </div>
            <div className="text-5xl font-extrabold text-white">
                {/* Animasi CountUp diganti dengan teks statis */}
                {end.toLocaleString('id-ID')}{suffix}
            </div>
            <p className="mt-2 text-lg font-medium text-green-200">{title}</p>
        </motion.div>
    );
};


// Komponen Utama Halaman
export default function PublicHomePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // Varian animasi yang disederhanakan untuk setiap item
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Komponen Head dinonaktifkan */}
      <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
        {/* ===== HERO SECTION ===== */}
        <header ref={heroRef} className="relative flex h-screen min-h-[700px] items-center justify-center overflow-hidden text-white">
          <div className="absolute inset-0 z-0">
            <img
              src="https://placehold.co/1920x1080/1a202c/ffffff?text=Kantor+Desa+Anda"
              alt="Suasana Kantor Desa"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-gray-900/60 to-black/80"></div>
          </div>
          
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Setiap item dianimasikan secara individual dengan delay berbeda */}
            <motion.h1 
              variants={itemVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl"
            >
              Sistem Absensi Digital <span className="text-green-400">Desa Maju Sejahtera</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl"
            >
              Mewujudkan tata kelola pemerintahan desa yang modern, transparan, dan akuntabel melalui teknologi.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Komponen Link diganti dengan tag <a> biasa */}
              <motion.a href="/login" className="mt-10 inline-block cursor-pointer rounded-lg bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300">
                Masuk ke Sistem
              </motion.a>
            </motion.div>
          </div>
        </header>

        <main>
          {/* ===== FITUR UNGGULAN SECTION ===== */}
          <section id="fitur" className="bg-gray-100 py-20 sm:py-24">
            <div className="container mx-auto max-w-6xl px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  Fitur Unggulan Sistem
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
                  Dirancang untuk kemudahan dan efisiensi, sistem kami memberikan solusi absensi terbaik untuk aparatur desa.
                </p>
              </motion.div>
              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <FeatureCard title="Efisiensi Waktu" icon={<Clock size={32} />} delay={0.1}>
                  Absensi cepat dan mudah langsung dari smartphone dengan validasi GPS dan foto selfie untuk akurasi maksimal.
                </FeatureCard>
                <FeatureCard title="Transparansi Data" icon={<BarChart2 size={32} />} delay={0.3}>
                  Laporan kehadiran, rekapitulasi, dan statistik dapat diakses secara real-time sesuai dengan hak akses masing-masing.
                </FeatureCard>
                <FeatureCard title="Akurasi Real-time" icon={<CheckSquare size={32} />} delay={0.5}>
                  Semua data kehadiran tercatat dan diperbarui secara langsung, mengurangi potensi kesalahan manual.
                </FeatureCard>
              </div>
            </div>
          </section>

          {/* ===== STATISTIK PUBLIK SECTION ===== */}
          <section id="statistik" className="bg-blue-900/90 bg-cover bg-center py-20 text-white sm:py-24" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
              <div className="container mx-auto max-w-6xl px-6">
                   <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7 }}
                      className="text-center"
                   >
                      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                          Data & Kinerja Terkini
                      </h2>
                      <p className="mx-auto mt-4 max-w-3xl text-lg text-green-200">
                          Lihat bagaimana kinerja aparatur desa secara transparan dalam angka.
                      </p>
                  </motion.div>
                  <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      <StatCard icon={<Users size={24} />} end={45} suffix="" title="Pegawai Aktif" delay={0.1} />
                      <StatCard icon={<Briefcase size={24} />} end={7200} suffix="+" title="Total Jam Kerja Bulan Ini" delay={0.3} />
                      <StatCard icon={<Percent size={24} />} end={98} suffix="%" title="Tingkat Kehadiran" delay={0.5} />
                  </div>
              </div>
          </section>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="bg-gray-900 text-gray-400">
          <div className="container mx-auto max-w-6xl px-6 py-12">
              <div className="text-center">
                  <p className="text-lg font-bold text-white">Pemerintah Desa Maju Sejahtera</p>
                  <p className="mt-2">Jl. Raya Pembangunan No. 123, Kecamatan Makmur, Kabupaten Sentosa</p>
                  <p className="mt-1">Email: kontak@majusejahtera.desa.id | Telp: (021) 123-4567</p>
                  <p className="mt-8 text-sm">&copy; {new Date().getFullYear()} Desa Maju Sejahtera. Dirancang dan dikembangkan dengan semangat digitalisasi.</p>
              </div>
          </div>
        </footer>
      </div>
    </>
  );
}
