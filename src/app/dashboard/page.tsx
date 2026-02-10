'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Cog, Factory, RefreshCw, ArrowRight, Sparkles, BookOpen, BarChart3 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

interface Stats {
  sectors: number;
  totalEquipment: number;
  totalVendors: number;
  pipelineRuns: number;
}

interface TreeNode {
  name: string;
  type: string;
  equipmentCount: number;
  vendorCount: number;
  children: TreeNode[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ sectors: 0, totalEquipment: 0, totalVendors: 0, pipelineRuns: 0 });
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [initializing, setInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [treeRes, pipeRes] = await Promise.all([
        fetch('/api/tree').then(r => r.json()),
        fetch('/api/pipeline').then(r => r.json()),
      ]);
      const treeData: TreeNode[] = treeRes.data || [];
      setTree(treeData);
      const totalEq = treeData.reduce((sum: number, s: TreeNode) => sum + s.equipmentCount, 0);
      const totalV = treeData.reduce((sum: number, s: TreeNode) => sum + s.vendorCount, 0);
      setStats({
        sectors: treeData.length,
        totalEquipment: totalEq,
        totalVendors: totalV,
        pipelineRuns: pipeRes.data?.length || 0,
      });
      if (treeData.length > 0) setInitialized(true);
    } catch {}
  }

  async function handleInit() {
    setInitializing(true);
    try {
      await fetch('/api/init', { method: 'POST' });
      setInitialized(true);
      await loadData();
    } catch {}
    setInitializing(false);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mb-8"
      >
        <motion.h2 variants={fadeInUp} className="text-3xl font-heading font-bold text-white mb-2">
          DEXPI Equipment Factory Dashboard
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-gray-400">
          Manage DEXPI 2.0 equipment across 16 CISA critical infrastructure sectors
        </motion.p>
      </motion.div>

      {/* Initialize Card */}
      {!initialized && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card mb-8 text-center py-12 px-6"
        >
          <div className="text-6xl mb-4">🏭</div>
          <h3 className="text-xl font-heading font-semibold text-white mb-2">Initialize Equipment Library</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Create the directory structure for all 16 CISA sectors, sub-sectors, and facility types.</p>
          <button onClick={handleInit} disabled={initializing} className="btn-primary text-lg px-8 py-3">
            {initializing ? 'Initializing...' : 'Initialize Data Directory'}
          </button>
        </motion.div>
      )}

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Sectors', value: stats.sectors, Icon: Building2, color: 'text-accent-500' },
          { label: 'Equipment Cards', value: stats.totalEquipment, Icon: Cog, color: 'text-green-400' },
          { label: 'Vendor Variations', value: stats.totalVendors, Icon: Factory, color: 'text-purple-400' },
          { label: 'Pipeline Runs', value: stats.pipelineRuns, Icon: RefreshCw, color: 'text-yellow-400' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="glass-card p-5 group hover:border-accent-500/20 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <stat.Icon className={`w-6 h-6 ${stat.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
              <div>
                <p className={`text-2xl font-heading font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <a href="/pipeline" className="glass-card p-6 hover:border-accent-500/30 group cursor-pointer transition-all duration-500">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-accent-500/70 group-hover:text-accent-500 transition-colors" />
            <h3 className="text-lg font-heading font-semibold text-white group-hover:text-accent-400 transition-colors">Generate Equipment</h3>
          </div>
          <p className="text-sm text-gray-400">Run the AI pipeline to discover and create new DEXPI equipment cards</p>
          <div className="mt-4 flex items-center gap-2 text-accent-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Open Pipeline <ArrowRight className="w-4 h-4" />
          </div>
        </a>
        <a href="/equipment" className="glass-card p-6 hover:border-green-500/30 group cursor-pointer transition-all duration-500">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-green-400/70 group-hover:text-green-400 transition-colors" />
            <h3 className="text-lg font-heading font-semibold text-white group-hover:text-green-400 transition-colors">Browse Library</h3>
          </div>
          <p className="text-sm text-gray-400">Search, filter, and manage equipment across all sectors</p>
          <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Browse <ArrowRight className="w-4 h-4" />
          </div>
        </a>
        <a href="/coverage" className="glass-card p-6 hover:border-purple-500/30 group cursor-pointer transition-all duration-500">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
            <h3 className="text-lg font-heading font-semibold text-white group-hover:text-purple-400 transition-colors">Coverage Analysis</h3>
          </div>
          <p className="text-sm text-gray-400">Identify gaps in equipment coverage by sector and facility</p>
          <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Analyze <ArrowRight className="w-4 h-4" />
          </div>
        </a>
      </motion.div>

      {/* Sector Overview */}
      {tree.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-heading font-semibold text-white mb-4">Sector Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tree.map((sector) => (
              <a
                key={sector.name}
                href={`/sectors/${sector.name}`}
                className="p-3 bg-white/[0.03] rounded-lg hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent-500/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-heading font-medium text-white text-sm">{sector.name}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255, 107, 0, 0.1)', color: '#fb923c' }}>
                    {sector.equipmentCount}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {sector.children.length} sub-sectors · {sector.vendorCount} vendors
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
