import "./globals.css";
import Head from 'next/head';
import Link from 'next/link';
import routes from '@/lib/routes'

export default function RootLayout({ children, title }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
      </head>
      <body>
        <header className='header'>
          <nav>
            <Link href={routes.root}>Home</Link>|
            <Link href={routes.root}>Profile</Link>|
            <Link href={routes.root}>Users</Link>|
            <Link href={routes.root}>Sample</Link>
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