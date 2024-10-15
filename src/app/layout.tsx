
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Pranav Gunhal | Developer Portfolio',
  description: 'AI Developer & Web Enthusiast Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-dark text-white font-sans">
        <nav className="bg-background-light text-white p-4 fixed w-full top-0 z-10 shadow-md flex justify-between items-center">
          <div className="flex items-center">
          <h1 className="text-6xl font-bold typing">Hi, I'm Pranav Gunhal</h1>          
          </div>
          <ul className="flex space-x-6 text-lg">
            <li><a href="#about" className="hover:text-lime-green transition-colors duration-200">About</a></li>
            <li><a href="#projects" className="hover:text-lime-green transition-colors duration-200">Projects</a></li>
            <li><a href="#contact" className="hover:text-lime-green transition-colors duration-200">Contact</a></li>
          </ul>
          <a href="#contact" className="bg-lime-green px-6 py-3 rounded-full hover:bg-white hover:text-background-dark transition-colors duration-200">Get In Touch</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
