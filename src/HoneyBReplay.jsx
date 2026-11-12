import { useState } from 'react';

const steps = [
  {
    title: 'Visibility drops',
    controller: 'Fog enters the simulated airport. The controller view shows the reduced visibility.',
    pilot: 'The cockpit view receives the same weather update.',
    state: 'Monitoring',
  },
  {
    title: 'Priority flight identified',
    controller: 'The controller reviews the flagged flight and sends a proposed action.',
    pilot: 'The cockpit view receives the pending action.',
    state: 'Sent',
  },
  {
    title: 'Pilot acknowledges',
    controller: 'The controller view receives the acknowledgement.',
    pilot: 'The pilot confirms receipt of the action.',
    state: 'Acknowledged',
  },
  {
    title: 'Both views update',
    controller: 'The shared command record shows the action in progress.',
    pilot: 'The cockpit view shows the same command status.',
    state: 'Executing',
  },
];

export default function HoneyBReplay() {
  const [index, setIndex] = useState(0);
  const step = steps[index];

  return (
    <section id="honey-b-replay" aria-labelledby="honey-b-title" className="mb-12 scroll-mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8">
      <p className="mb-2 text-sm font-medium text-cyan-300">Illustrated replay · Synthetic Dubai fog scenario</p>
      <h3 id="honey-b-title" className="text-3xl font-bold text-white">Honey B</h3>
      <p className="mt-2 max-w-prose text-zinc-300">Step through how an aviation decision-support prototype keeps controller and pilot views synchronized.</p>
      <label htmlFor="honey-b-step" className="mt-6 block text-sm text-zinc-300">Replay step {index + 1} of {steps.length}</label>
      <input id="honey-b-step" type="range" min="0" max={steps.length - 1} step="1" value={index}
        aria-valuetext={step.title} onChange={(event) => setIndex(Number(event.target.value))}
        className="mt-2 w-full accent-cyan-400" />
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {steps.map((item, position) => (
          <button type="button" key={item.title} aria-pressed={index === position}
            onClick={() => setIndex(position)}
            className={`rounded-lg border px-3 py-2 text-sm ${index === position ? 'border-cyan-400 bg-cyan-400/10 text-cyan-100' : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'}`}>
            {item.title}
          </button>
        ))}
      </div>
      <div className="mt-6" aria-live="polite" aria-atomic="true">
        <p className="mb-3 text-sm text-cyan-300">Shared state · {step.state}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
            <h4 className="font-semibold text-white">Controller</h4>
            <p className="mt-1 text-zinc-300">{step.controller}</p>
          </div>
          <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
            <h4 className="font-semibold text-white">Pilot</h4>
            <p className="mt-1 text-zinc-300">{step.pilot}</p>
          </div>
        </div>
      </div>
      <p className="mt-5 max-w-prose text-sm text-zinc-300">The ground server owns the command lifecycle and publishes each state change to both clients over WebSockets.</p>
      <a className="mt-3 inline-block text-cyan-300 underline" href="https://github.com/Sedulous-sedu/Honey_B">View the Honey B source</a>
    </section>
  );
}
