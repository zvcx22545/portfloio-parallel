import { Inter } from 'next/font/google';
import './globals.css';
import GlobalBackground from '@/components/GlobalBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Chisanupong Limsakul - Full Stack Developer Portfolio',
    description: 'Building scalable and maintainable web applications with Vue.js, React.js, Express.js, and Oracle/MySQL',
    keywords: ['Full Stack Developer', 'React', 'Vue.js', 'Express.js', 'Next.js', 'Portfolio', 'Chisanupong Limsakul'],
    authors: [{ name: 'Chisanupong Limsakul' }],
    openGraph: {
        title: 'Chisanupong Limsakul - Full Stack Developer Portfolio',
        description: 'Building scalable and maintainable web applications',
        type: 'website',
        locale: 'th_TH',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="th">
            <body className={inter.className} style={{ background: '#050510', minHeight: '100vh' }}>
                <GlobalBackground />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
