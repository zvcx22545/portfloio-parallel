import { Inter } from 'next/font/google';
import './globals.css';
import GlobalBackground from '@/components/GlobalBackground';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Chisanupong Limsakul - Programmer / Developer Portfolio',
    description: 'พัฒนาเว็บแอปพลิเคชันด้วย HTML, CSS, JavaScript, Vue.js, React, Next.js, PHP และฐานข้อมูล MySQL / Oracle',
    keywords: ['Programmer', 'Developer', 'React', 'Vue.js', 'Next.js', 'Portfolio', 'Chisanupong Limsakul'],
    authors: [{ name: 'Chisanupong Limsakul' }],
    openGraph: {
        title: 'Chisanupong Limsakul - Programmer / Developer',
        description: 'Portfolio เว็บไซต์สำหรับสมัครงาน - Programmer / Developer',
        type: 'website',
        locale: 'th_TH',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="th">
            <body className={inter.className} style={{ background: '#050510', minHeight: '100vh' }}>
                <LanguageProvider>
                    <GlobalBackground />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {children}
                    </div>
                </LanguageProvider>
            </body>
        </html>
    );
}
