import React from "react";

function Statistics({ test }) {
  return (
    <div className='w-full mx-auto col-span-1 lg:col-span-2 rounded-lg border bg-card p-6 h shadow-sm'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-bold'>Statistics</h2>
          <p className='text-muted-foreground'>
            Review your typing performance and get insights.
          </p>
        </div>
        {/* <div className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                    View Report
                  </button>
                </div> */}
      </div>

      <div className='mt-6'>
        <div className='grid gap-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-medium'>Words Per Minute</h3>
              <p className='text-xs text-muted-foreground'>
                Your average typing speed
              </p>
            </div>

            <div className='text-3xl font-bold flex flex-col-reverse text-center justify-end'>
              <div className='bg-amber-300 h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                Top 0.1%
              </div>
              {test.results != undefined ? test.results.TrueWPM : 142.82}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-xl lg:text-lg font-medium'>Accuracy</h3>
              <p className='text-xs text-muted-foreground'>
                Percentage of correct letters
              </p>
            </div>
            <div className='text-4xl font-bold flex-col-reverse text-center flex justify-center'>
              <div className='bg-green-400 h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                Above Average
              </div>
              {test.results != undefined
                ? test.results.Accuracy.toFixed(1)
                : 98.8}
              %
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-lg font-medium'>Mistakes</h3>
              <p className='text-xs text-muted-foreground'>
                Number of mistakes made
              </p>
            </div>
            <div className='text-4xl font-bold flex flex-col-reverse text-center justify-center'>
              <div className='bg-red-400 h-6 w-32 justify-center text-black inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'>
                Below Average
              </div>
              {test.results != undefined ? test.results.Mistakes : 11}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
