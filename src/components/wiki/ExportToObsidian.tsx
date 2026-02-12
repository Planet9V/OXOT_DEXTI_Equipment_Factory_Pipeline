'use client';

/**
 * Export to Obsidian Button.
 *
 * Client component that triggers the Obsidian export pipeline via
 * the API endpoint and downloads the resulting .md file. Displays
 * real-time stage progress during the AI conversion process.
 *
 * @module components/wiki/ExportToObsidian
 */

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/** Export processing stages. */
type ExportStage = 'idle' | 'extracting' | 'converting' | 'auditing' | 'done' | 'error';

/** Stage display labels and order. */
const STAGE_LABELS: Record<ExportStage, string> = {
    idle: 'Export to Obsidian',
    extracting: 'Extracting content…',
    converting: 'Converting diagrams…',
    auditing: 'Auditing compliance…',
    done: 'Download ready',
    error: 'Export failed',
};

/**
 * Derives the wiki slug from a pathname.
 *
 * @param pathname - The current URL path.
 * @returns The slug portion after /wiki/, or null if not a wiki page.
 */
function getSlugFromPath(pathname: string): string | null {
    const match = pathname.match(/^\/wiki\/(.+)/);
    if (!match) return null;
    return match[1];
}

/**
 * Export to Obsidian button component.
 *
 * Renders a styled button that, when clicked:
 * 1. Calls POST /api/wiki/export-obsidian with the current page slug
 * 2. Shows animated stage progress
 * 3. Downloads the resulting .md file
 *
 * @returns The ExportToObsidian React component.
 */
export default function ExportToObsidian() {
    const pathname = usePathname();
    const [stage, setStage] = useState<ExportStage>('idle');
    const [error, setError] = useState<string | null>(null);
    const [auditScore, setAuditScore] = useState<number | null>(null);

    const slug = getSlugFromPath(pathname);

    const handleExport = useCallback(async () => {
        if (!slug || stage === 'extracting' || stage === 'converting' || stage === 'auditing') {
            return;
        }

        setStage('extracting');
        setError(null);
        setAuditScore(null);

        // Simulate stage transitions while waiting for API
        const stageTimer1 = setTimeout(() => setStage('converting'), 8000);
        const stageTimer2 = setTimeout(() => setStage('auditing'), 18000);

        try {
            const response = await fetch('/api/wiki/export-obsidian', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug }),
            });

            clearTimeout(stageTimer1);
            clearTimeout(stageTimer2);

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData?.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            setAuditScore(data.audit?.score ?? null);
            setStage('done');

            // Trigger file download
            const blob = new Blob([data.markdown], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = data.filename || 'export.md';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Reset after download
            setTimeout(() => {
                setStage('idle');
                setAuditScore(null);
            }, 3000);
        } catch (err) {
            clearTimeout(stageTimer1);
            clearTimeout(stageTimer2);
            const message = err instanceof Error ? err.message : String(err);
            console.error(`[ExportToObsidian] ${message}`);
            setError(message);
            setStage('error');

            // Reset after error display
            setTimeout(() => {
                setStage('idle');
                setError(null);
            }, 5000);
        }
    }, [slug, stage]);

    // Don't render on the wiki home page (no slug)
    if (!slug) return null;

    const isProcessing = stage === 'extracting' || stage === 'converting' || stage === 'auditing';
    const isDone = stage === 'done';
    const isError = stage === 'error';

    return (
        <button
            onClick={handleExport}
            disabled={isProcessing}
            title={error || (auditScore !== null ? `Audit score: ${auditScore}/100` : 'Export this page to Obsidian Markdown')}
            className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                transition-all duration-300 border
                ${isProcessing
                    ? 'border-purple-500/30 text-purple-400 bg-purple-500/10 cursor-wait'
                    : isDone
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : isError
                            ? 'border-red-500/30 text-red-400 bg-red-500/10'
                            : 'border-white/[0.08] text-gray-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5'
                }
            `}
        >
            {/* Obsidian vault icon */}
            {isProcessing ? (
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="8" />
                </svg>
            ) : isDone ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,8 7,12 13,4" />
                </svg>
            ) : isError ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="4" x2="12" y2="12" />
                    <line x1="12" y1="4" x2="4" y2="12" />
                </svg>
            ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.5 1C3.67 1 3 1.67 3 2.5v11c0 .83.67 1.5 1.5 1.5h7c.83 0 1.5-.67 1.5-1.5v-8L8.5 1H4.5zM8 2l4 4h-2.5c-.83 0-1.5-.67-1.5-1.5V2zM5 9h6v1H5V9zm0 2h4v1H5v-1z" />
                </svg>
            )}
            <span>{STAGE_LABELS[stage]}</span>
            {auditScore !== null && isDone && (
                <span className="text-[10px] text-emerald-500/80 font-mono">{auditScore}%</span>
            )}
        </button>
    );
}
