'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Cpu, Database, Layers, Factory, Zap } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function HeroPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase" style={{ background: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.2)', color: '#fb923c' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
                DEXPI 2.0 Equipment Lifecycle Management
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6">
              <span className="text-white">Industrial Equipment</span>
              <br />
              <span className="text-gradient-orange">Factory Pipeline</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Discover, create, and manage DEXPI 2.0 compliant equipment cards across all 16 CISA critical infrastructure sectors. AI-powered pipeline with automated research, generation, validation, and cataloging.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <a href="/dashboard" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-3.5">
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/pipeline" className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-3.5">
                Run Pipeline <Zap className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: '16', label: 'CISA Sectors', icon: Shield },
              { value: '222+', label: 'Equipment Types', icon: Factory },
              { value: '5-Stage', label: 'AI Pipeline', icon: Cpu },
              { value: 'DEXPI 2.0', label: 'Standard', icon: Database },
            ].map((stat, i) => (
              <div key={stat.label} className="glass-card p-5 text-center group hover:border-accent-500/20 transition-all duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                <stat.icon className="w-6 h-6 mx-auto mb-3 text-accent-500/70 group-hover:text-accent-500 transition-colors" />
                <div className="text-2xl font-heading font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Glow divider */}
      <div className="glow-line" />

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Complete Equipment Lifecycle
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From research to deployment — manage every aspect of industrial equipment specification and standardization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: 'AI-Powered Discovery',
                description: 'Google Gemini researches equipment specifications, materials, standards, and manufacturers across all CISA sectors.',
                href: '/pipeline',
              },
              {
                icon: Layers,
                title: 'DEXPI 2.0 Compliant',
                description: 'Full DEXPI standard compliance with RDL URIs, ISA tag naming, structured specifications, nozzle schedules, and material callouts.',
                href: '/equipment',
              },
              {
                icon: Shield,
                title: 'Coverage Analysis',
                description: 'Gap analysis across all 16 sectors identifies missing equipment types and tracks coverage progress for each facility.',
                href: '/coverage',
              },
            ].map((feature, i) => (
              <motion.a
                key={feature.title}
                href={feature.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 group cursor-pointer hover:border-accent-500/20"
              >
                <feature.icon className="w-10 h-10 text-accent-500/70 group-hover:text-accent-500 transition-colors mb-5" />
                <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                <div className="mt-5 flex items-center gap-2 text-accent-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Stages Section */}
      <section className="py-24 relative section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              5-Stage AI Pipeline
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Automated end-to-end equipment card creation with AI research, generation, validation, deduplication, and persistent storage.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-2">
            {[
              { num: '01', name: 'Research', desc: 'AI researches specifications, materials, manufacturers, and standards', icon: '🔍' },
              { num: '02', name: 'Generate', desc: 'Creates DEXPI 2.0 compliant equipment cards in batches', icon: '⚙️' },
              { num: '03', name: 'Validate', desc: 'ISA tag format, schema validation, plausibility checks, scoring', icon: '✅' },
              { num: '04', name: 'Catalog', desc: 'Duplicate detection by tag and content hash, suffix resolution', icon: '📋' },
              { num: '05', name: 'Store', desc: 'Persist validated cards to filesystem with full metadata', icon: '💾' },
            ].map((stage, i) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 w-full"
              >
                <div className="glass-card p-6 relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{stage.icon}</span>
                    <div>
                      <span className="text-accent-500 text-xs font-mono font-bold">{stage.num}</span>
                      <h3 className="text-lg font-heading font-semibold text-white">{stage.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{stage.desc}</p>
                </div>
                {i < 4 && (
                  <div className="hidden md:flex justify-center py-2">
                    <div className="w-px h-0 md:w-full md:h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              Ready to Build Your Equipment Library?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Initialize the sector structure and start generating DEXPI 2.0 equipment cards with AI.
            </p>
            <a href="/dashboard" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
              Open Dashboard <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
