/**
 * Wiki page loading skeleton.
 *
 * Renders animated placeholders for the wiki content area.
 */
export default function WikiLoading() {
    return (
        <div className="animate-pulse py-8 px-4">
            {/* Title */}
            <div className="h-8 w-72 bg-white/[0.06] rounded-lg mb-4" />
            <div className="h-4 w-96 bg-white/[0.04] rounded-lg mb-8" />

            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="glass-card p-4">
                        <div className="h-6 w-12 bg-white/[0.08] rounded mb-1" />
                        <div className="h-3 w-24 bg-white/[0.04] rounded" />
                    </div>
                ))}
            </div>

            {/* Content blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-card p-5">
                        <div className="h-5 w-40 bg-white/[0.08] rounded mb-3" />
                        <div className="h-3 w-full bg-white/[0.04] rounded mb-2" />
                        <div className="h-3 w-3/4 bg-white/[0.04] rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
