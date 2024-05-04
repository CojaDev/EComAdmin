import './globals.css';
import { Inter } from 'next/font/google';
import SessionWrapper from './components/SessionWrapper';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-montserrat',
});
export const metadata = {
  title: 'E-commerce Admin',
  description: 'E-commerce',
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${montserrat.variable} font-sans`}>
          <Toaster position="top-center" />

          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
