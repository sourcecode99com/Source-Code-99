import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminLayout from '../src/components/Layout';
import { ThemeProvider } from '../src/context/ThemeContext';
import { Language } from '../translations';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [lang, setLang] = useState<Language>('ID');
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  useEffect(() => {
    // Handle scroll to top on route change
    window.scrollTo(0, 0);
  }, [router.pathname]);

  const content = <Component {...pageProps} lang={lang} setLang={setLang} />;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950 flex flex-col selection:bg-blue-600/30 selection:text-white">
        {!isAdminPage && <Navbar lang={lang} setLang={setLang} />}
        
        <main className="flex-grow">
          {isAdminPage && router.pathname !== '/admin/login' ? (
            <AdminLayout>{content}</AdminLayout>
          ) : (
            content
          )}
        </main>

        {!isAdminPage && <Footer lang={lang} setLang={setLang} />}
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
