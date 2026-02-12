/**
 * Sectors page loading skeleton.
 *
 * Renders animated placeholder cards while sector data is fetching.
 */
export default function SectorsLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="h-7 w-72 bg-white/[0.06] rounded-lg mb-2" />
                    <div className="h-4 w-40 bg-white/[0.04] rounded-lg" />
                </div>
                <div className="h-9 w-28 bg-white/[0.08] rounded-lg" />
            </div>

            {/* Sector cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="glass-card p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-white/[0.08] rounded" />
                            <div>
                                <div className="h-5 w-48 bg-white/[0.08] rounded mb-1" />
                                <div className="h-3 w-36 bg-white/[0.04] rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
