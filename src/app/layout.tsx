import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Pranav Gunhal | Developer Portfolio',
  description: 'AI Developer & NLP Researcher Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0a' }}>
        <main>{children}</main>
      </body>
    </html>
  );
}