import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OXOT | Predictive Cyber Assurance',
  description: 'Industrial cybersecurity and critical infrastructure protection — Equipment pipeline across 16 CISA sectors',
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
                <a href="/" className="flex flex-col group">
                  <span className="text-[22px] font-heading font-semibold text-white/90 tracking-[-0.02em] leading-none group-hover:text-white transition-colors duration-300">OXOT</span>
                  <span className="text-[9px] font-medium text-white/50 tracking-[0.15em] uppercase mt-0.5 leading-tight">Predictive Cyber Assurance</span>
                  <span className="text-[8px] font-mono font-medium tracking-[0.1em] mt-px leading-tight" style={{ color: '#ff6b00' }}>Industrial Cybersecurity</span>
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
                <div className="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF6B00, #ea580c)' }}>OX</div>
                <span className="text-xs text-gray-600">OXOT Predictive Cyber Assurance v1.0.0</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>Industrial Cybersecurity</span>
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
