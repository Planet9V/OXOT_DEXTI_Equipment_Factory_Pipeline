'use client';

import { useEffect } from 'react';

/**
 * Root error boundary for the DEXPI Equipment Factory Pipeline.
 *
 * Catches unhandled errors in any route segment and displays a
 * user-friendly error message with a retry button.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('[error-boundary]', error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="glass-card p-8 max-w-md text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-heading font-bold text-white mb-2">
                    Something went wrong
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                    {error.message || 'An unexpected error occurred. Please try again.'}
                </p>
                <button
                    onClick={reset}
                    className="btn-primary px-6 py-2.5"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
