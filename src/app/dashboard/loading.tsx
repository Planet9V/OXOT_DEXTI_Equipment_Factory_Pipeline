/**
 * Dashboard loading skeleton.
 *
 * Renders animated placeholder cards while the Dashboard data is fetching.
 */
export default function DashboardLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            {/* Header skeleton */}
            <div className="mb-8">
                <div className="h-8 w-80 bg-white/[0.06] rounded-lg mb-2" />
                <div className="h-4 w-96 bg-white/[0.04] rounded-lg" />
            </div>

            {/* Stats grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-white/[0.08] rounded" />
                            <div>
                                <div className="h-7 w-16 bg-white/[0.08] rounded mb-1" />
                                <div className="h-3 w-20 bg-white/[0.04] rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card p-6">
                        <div className="h-5 w-40 bg-white/[0.08] rounded mb-2" />
                        <div className="h-3 w-full bg-white/[0.04] rounded" />
                    </div>
                ))}
            </div>

            {/* Sector overview skeleton */}
            <div className="glass-card p-6">
                <div className="h-5 w-40 bg-white/[0.08] rounded mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="p-3 bg-white/[0.03] rounded-lg border border-white/[0.06]">
                            <div className="h-4 w-24 bg-white/[0.08] rounded mb-1" />
                            <div className="h-3 w-32 bg-white/[0.04] rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
