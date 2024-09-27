import React from 'react'

function Landing() {
    return (
        <div className="container mx-auto my-24 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Unlock Your Typing Potential</h1>
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
                            Take a Sample Test
                        </a>
                        <a
                            href="#"
                            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* SOMETHING HERE */}
                <div className="flex flex-col items-start justify-center">



                </div>
            </div>

            <div className="container grid items-center gap-12 my-32">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Hear from our satisfied users about how our AI typing test has helped them improve their skills.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border bg-background p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">MO</span>
                            </span>
                            <div>
                                <h4 className="text-sm font-semibold">Miles Oncken</h4>
                                <p className="text-xs text-muted-foreground">Software Developer</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">
                            "Better Typing has increased my WPM by over 30 in the last six months of development. It's amazing how powerful this tool really is!"
                        </p>
                    </div>
                    <div className="rounded-lg border bg-background p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">AR</span>
                            </span>
                            <div>
                                <h4 className="text-sm font-semibold">Alan Reyes</h4>
                                <p className="text-xs text-muted-foreground">Software Engineer</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">
                            "I was struggling with my typing skills, but the AI typing test has helped me improve my speed and
                            accuracy. It's been an lifesaver for my job!"
                        </p>
                    </div>
                    <div className="rounded-lg border bg-background p-6 shadow-sm">
                        <div className="flex items-center space-x-4">
                            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">S</span>
                            </span>
                            <div>
                                <h4 className="text-sm font-semibold">Seven</h4>
                                <p className="text-xs text-muted-foreground">Customer Service Representative</p>
                            </div>
                        </div>
                        <p className="mt-4 text-muted-foreground">
                            "The AI typing test has been an invaluable tool for me. It's helped me improve my typing speed and
                            accuracy, which has made me more efficient in my job."
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Landing