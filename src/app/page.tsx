'use client';

import { useEffect, useState } from 'react';

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
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">DEXPI Equipment Factory Dashboard</h2>
        <p className="text-gray-400">Manage DEXPI 2.0 equipment across 16 CISA critical infrastructure sectors</p>
      </div>

      {!initialized && (
        <div className="card mb-8 text-center py-12">
          <div className="text-6xl mb-4">🏭</div>
          <h3 className="text-xl font-semibold text-white mb-2">Initialize Equipment Library</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">Create the directory structure for all 16 CISA sectors, sub-sectors, and facility types.</p>
          <button onClick={handleInit} disabled={initializing} className="btn-primary text-lg px-8 py-3">
            {initializing ? 'Initializing...' : 'Initialize Data Directory'}
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Sectors', value: stats.sectors, icon: '🏗️', color: 'text-blue-400' },
          { label: 'Equipment Cards', value: stats.totalEquipment, icon: '⚙️', color: 'text-green-400' },
          { label: 'Vendor Variations', value: stats.totalVendors, icon: '🏭', color: 'text-purple-400' },
          { label: 'Pipeline Runs', value: stats.pipelineRuns, icon: '🔄', color: 'text-yellow-400' },
        ].map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <a href="/pipeline" className="card hover:border-blue-500/50 group cursor-pointer">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">Generate Equipment</h3>
          <p className="text-sm text-gray-400">Run the AI pipeline to discover and create new DEXPI equipment cards</p>
        </a>
        <a href="/equipment" className="card hover:border-green-500/50 group cursor-pointer">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">Browse Library</h3>
          <p className="text-sm text-gray-400">Search, filter, and manage equipment across all sectors</p>
        </a>
        <a href="/coverage" className="card hover:border-purple-500/50 group cursor-pointer">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">Coverage Analysis</h3>
          <p className="text-sm text-gray-400">Identify gaps in equipment coverage by sector and facility</p>
        </a>
      </div>

      {/* Sector Overview */}
      {tree.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Sector Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tree.map((sector) => (
              <a key={sector.name} href={`/sectors/${sector.name}`} className="p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white text-sm">{sector.name}</span>
                  <span className="badge-blue">{sector.equipmentCount}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {sector.children.length} sub-sectors · {sector.vendorCount} vendors
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
