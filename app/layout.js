import "./globals.css";
import Head from 'next/head';
import Link from 'next/link';
import { routes } from '@/lib/globals/routes'

export default function RootLayout({ children, title }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <header>
          <nav id='navbar'>
            <Link className='nav-link' href={routes.root}>Home</Link>
            <Link className='nav-link' href={routes.root}>Profile</Link>
            <Link className='nav-link' href={routes.users._}>Users</Link>
            <Link className='nav-link' href={routes.root}>Sample</Link>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p>This is the layout footer.</p>
        </footer>
      </body>
    </html>
  );
}