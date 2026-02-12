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
  totalFacilities: number;
  pipelineRuns: number;
  pipelineHealth: number;
  dexpiCoverage: number;
  graphSource: string;
}

interface TreeNode {
  path: string;
  name: string;
  type: string;
  equipmentCount: number;
  vendorCount: number;
  children: TreeNode[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    sectors: 0,
    totalEquipment: 0,
    totalVendors: 0,
    totalFacilities: 0,
    pipelineRuns: 0,
    pipelineHealth: 0,
    dexpiCoverage: 0,
    graphSource: 'loading',
  });
  const [loading, setLoading] = useState(true);
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [initializing, setInitializing] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [treeRes, pipeRes] = await Promise.all([
        fetch('/api/tree').then(r => r.json()),
        fetch('/api/pipeline').then(r => r.json()).catch(() => ({ data: [] })),
      ]);
      const treeData: TreeNode[] = treeRes.data || [];
      const graphSource: string = treeRes.source || 'unknown';
      setTree(treeData);

      // Calculate real totals from tree data
      const totalEq = treeData.reduce((sum: number, s: TreeNode) => sum + s.equipmentCount, 0);
      const totalV = treeData.reduce((sum: number, s: TreeNode) => sum + s.vendorCount, 0);
      const totalFacilities = treeData.reduce(
        (sum: number, s: TreeNode) => sum + s.children.reduce(
          (sub: number, ss: TreeNode) => sub + ss.children.length, 0
        ), 0
      );

      // Real pipeline stats
      const runs = pipeRes.data || [];
      const successCount = runs.filter((r: any) => r.status === 'completed').length;
      const pipelineHealth = runs.length > 0 ? Math.round((successCount / runs.length) * 100) : 100;

      // Calculate real DEXPI coverage: % of facilities that have equipment
      let facilitiesWithEquipment = 0;
      for (const sector of treeData) {
        for (const sub of sector.children) {
          for (const fac of sub.children) {
            if (fac.equipmentCount > 0) facilitiesWithEquipment++;
          }
        }
      }
      const dexpiCoverage = totalFacilities > 0
        ? Math.round((facilitiesWithEquipment / totalFacilities) * 100)
        : 0;

      setStats({
        sectors: treeData.length,
        totalEquipment: totalEq,
        totalVendors: totalV,
        totalFacilities,
        pipelineRuns: runs.length,
        pipelineHealth,
        dexpiCoverage,
        graphSource,
      });
      if (treeData.length > 0) setInitialized(true);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleInit() {
    setInitializing(true);
    try {
      await fetch('/api/init', { method: 'POST' });
      setInitialized(true);
      await loadData();
    } catch { }
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
          Manage DEXPI 2.0 equipment across {stats.sectors > 0 ? stats.sectors : '...'} CISA critical infrastructure sectors
          {stats.graphSource && stats.graphSource !== 'loading' && (
            <span className="ml-2 text-xs opacity-50">({stats.graphSource === 'graph' ? '● Live' : '○ Cached'})</span>
          )}
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
          { label: 'Sectors', value: loading ? '...' : stats.sectors, Icon: Building2, color: 'text-accent-500' },
          { label: 'Equipment', value: loading ? '...' : stats.totalEquipment, Icon: Cog, color: 'text-green-400' },
          { label: 'Facilities', value: loading ? '...' : stats.totalFacilities, Icon: Factory, color: 'text-purple-400' },
          { label: 'Coverage', value: loading ? '...' : `${stats.dexpiCoverage}%`, Icon: BarChart3, color: 'text-yellow-400' },
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
        <a href="/wiki" className="glass-card p-6 hover:border-yellow-500/30 group cursor-pointer transition-all duration-500">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-5 h-5 text-yellow-400/70 group-hover:text-yellow-400 transition-colors" />
            <h3 className="text-lg font-heading font-semibold text-white group-hover:text-yellow-400 transition-colors">Wiki</h3>
          </div>
          <p className="text-sm text-gray-400">Browse DEXPI standards, equipment classes, and sector documentation</p>
          <div className="mt-4 flex items-center gap-2 text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Explore <ArrowRight className="w-4 h-4" />
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
            {tree.map((sector) => {
              const totalFac = sector.children.reduce((s: number, sub: any) => s + (sub.children?.length || 0), 0);
              return (
                <a
                  key={sector.path || sector.name}
                  href={`/wiki/sectors/${sector.path || sector.name}`}
                  className="p-3 bg-white/[0.03] rounded-lg hover:bg-white/[0.06] border border-white/[0.06] hover:border-accent-500/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-medium text-white text-sm">{sector.name}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'rgba(255, 107, 0, 0.1)', color: '#fb923c' }}>
                      {sector.equipmentCount}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    {sector.children.length} sub-sectors · {totalFac} facilities
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
