import React from 'react'

function Landing() {
    return (
        <div className='container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8'>
            <h1 className='text-4xl font-bold tracking-tight text-foreground'>Unlock Your Typing Potential</h1>
            <p className="mt-4 text-muted-foreground">
                Better Typing is an AI-powered typing test that helps you improve your typing speed and accuracy. By
                analyzing your typing patterns, our AI can provide personalized feedback and recommendations to help you
                become a more efficient typist.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
                <a
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Start Typing Test
                </a>
                <a
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                    Learn More
                </a>
            </div>
        </div>

    )
}

export default Landing