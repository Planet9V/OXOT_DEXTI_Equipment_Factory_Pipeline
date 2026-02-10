import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OXOT DEXPI Equipment Factory',
  description: 'DEXPI 2.0 Equipment Pipeline — Discover, create, and manage industrial equipment across 16 CISA critical infrastructure sectors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">DX</div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">DEXPI Equipment Factory</h1>
                    <p className="text-xs text-gray-400">OXOT Critical Infrastructure Pipeline</p>
                  </div>
                </div>
                <nav className="flex items-center gap-1">
                  <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">Dashboard</a>
                  <a href="/sectors" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">Sectors</a>
                  <a href="/equipment" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">Equipment</a>
                  <a href="/pipeline" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">Pipeline</a>
                  <a href="/coverage" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">Coverage</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
            OXOT DEXPI Equipment Factory v1.0.0 — DEXPI 2.0 Standard — 16 CISA Sectors
          </footer>
        </div>
      </body>
    </html>
  );
}
