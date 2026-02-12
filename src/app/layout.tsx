import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OXOT DEXPI Equipment Factory',
  description: 'DEXPI 2.0 Equipment Pipeline — Discover, create, and manage industrial equipment across 16 CISA critical infrastructure sectors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050507] text-gray-200 antialiased font-body">
        <div className="min-h-screen flex flex-col relative">
          {/* Ambient background effects */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="ambient-orb ambient-orb-orange w-[600px] h-[600px] -top-[200px] -right-[200px] fixed" />
            <div className="ambient-orb ambient-orb-blue w-[400px] h-[400px] top-[60%] -left-[150px] fixed" />
          </div>

          {/* Header */}
          <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(5, 5, 7, 0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #ea580c 100%)' }}>
                    <span className="relative z-10">DX</span>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #fb923c 0%, #FF6B00 100%)' }} />
                  </div>
                  <div>
                    <h1 className="text-base font-heading font-semibold text-white tracking-tight">DEXPI Equipment Factory</h1>
                    <p className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">OXOT Critical Infrastructure</p>
                  </div>
                </a>

                {/* Navigation */}
                <nav className="flex items-center gap-0.5">
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/dashboard', label: 'Dashboard' },
                    { href: '/sectors', label: 'Sectors' },
                    { href: '/equipment', label: 'Equipment' },
                    { href: '/pipeline', label: 'Pipeline' },
                    { href: '/coverage', label: 'Coverage' },
                    { href: '/wiki', label: 'Wiki' },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 relative z-10">{children}</main>

          {/* Footer */}
          <footer className="relative z-10 border-t border-white/[0.04] py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF6B00, #ea580c)' }}>DX</div>
                <span className="text-xs text-gray-600">OXOT DEXPI Equipment Factory v1.0.0</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>DEXPI 2.0 Standard</span>
                <span className="w-px h-3 bg-white/[0.06]" />
                <span>16 CISA Sectors</span>
                <span className="w-px h-3 bg-white/[0.06]" />
                <span>Critical Infrastructure Protection</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
