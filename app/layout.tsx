import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Humna Ishfaq | Senior Software Quality Assurance Engineer',
  description: "Humna Ishfaq is a Senior Software Quality Assurance Engineer specializing in manual QA, SaaS and mobile testing, test design, defect management, and AI chatbot validation.",
  metadataBase: new URL('https://humnaishfaq06.vercel.app'),
  openGraph: { title: 'Humna Ishfaq | Senior Software Quality Assurance Engineer', description: 'Manual QA, SaaS and mobile testing, defect management, and AI chatbot validation.', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Humna Ishfaq | Senior Software Quality Assurance Engineer', description: 'Manual QA and AI chatbot testing professional.' },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
