import { Toaster } from 'react-hot-toast';
import './globals.css'
import { Work_Sans } from 'next/font/google';
import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';


const workSans = Work_Sans({
  subsets: ['latin'], // Latin karakterleri dahil et
  weight: ['400', '500', '700'], // Kullanacağın ağırlıkları ekle
  variable: '--font-work-sans', // CSS değişken adı
});

export const metadata = {
  title: "MetaBlog",
  description: "A modern blog site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="bg-gray-50 text-gray-800">
        
        <AuthProvider>
        <Toaster />
        {children}
        <Footer />
        </AuthProvider>
        
      </body>
    </html>
  );
}
