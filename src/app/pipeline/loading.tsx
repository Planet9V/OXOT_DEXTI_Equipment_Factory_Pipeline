/**
 * Pipeline page loading skeleton.
 *
 * Renders an animated placeholder for the pipeline form and status area.
 */
export default function PipelineLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            {/* Header */}
            <div className="mb-8">
                <div className="h-8 w-64 bg-white/[0.06] rounded-lg mb-2" />
                <div className="h-4 w-80 bg-white/[0.04] rounded-lg" />
            </div>

            {/* Pipeline form skeleton */}
            <div className="glass-card p-6 mb-6">
                <div className="h-5 w-36 bg-white/[0.08] rounded mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="h-10 bg-white/[0.06] rounded-lg" />
                    <div className="h-10 bg-white/[0.06] rounded-lg" />
                    <div className="h-10 bg-white/[0.08] rounded-lg" />
                </div>
            </div>

            {/* Stage progress skeleton */}
            <div className="glass-card p-6">
                <div className="h-5 w-32 bg-white/[0.08] rounded mb-4" />
                <div className="flex gap-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex-1 h-16 bg-white/[0.04] rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}
