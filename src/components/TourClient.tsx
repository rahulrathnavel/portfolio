"use client";

import { ArrowLeft, ArrowRight, Home, Moon, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";

const stations = [
  {
    year: "2022",
    code: "START",
    title: "The route begins with curiosity.",
    detail: "AI and Data Science at Anna University Regional Campus, Coimbatore. The brief was simple: build things, understand the hard parts, keep going.",
    color: "#72d1af",
  },
  {
    year: "2025",
    code: "RANK 83",
    title: "Iteration beats a perfect first attempt.",
    detail: "Amazon ML Challenge: Cyber Titans moved from Rank 900 to 83, through model changes, evaluation discipline, and a final 45.35 SMAPE submission.",
    color: "#ffb347",
  },
  {
    year: "2026",
    code: "SMARTOPS",
    title: "An incident is a system asking for help.",
    detail: "SmartOps reached the TECHgium national finals as one of 34 selected teams. The prototype kept humans in the loop while an AI workflow observed, diagnosed, and proposed remediation.",
    color: "#ef6347",
  },
  {
    year: "NOW",
    code: "SHIP",
    title: "Proof lives in the details.",
    detail: "Merged open-source pull requests, live RAG experiments, mobile systems, edge-AI prototypes, and a habit of making the work visible.",
    color: "#a99dff",
  },
];

function ping() {
  const AudioContextConstructor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) return;
  const context = new AudioContextConstructor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(390, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(650, context.currentTime + 0.09);
  gain.gain.setValueAtTime(0.05, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.16);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.16);
}

export default function TourClient() {
  const [station, setStation] = useState(0);
  const [audio, setAudio] = useState(false);
  const [night, setNight] = useState(false);
  const [toast, setToast] = useState("Use arrow keys or choose a signal marker.");
  const timeoutRef = useRef<number | null>(null);
  const current = stations[station];

  function goTo(next: number) {
    const safeNext = Math.min(Math.max(next, 0), stations.length - 1);
    if (safeNext === station) return;
    setStation(safeNext);
    setToast(`${stations[safeNext].code} unlocked — ${stations[safeNext].year}`);
    if (audio) ping();
  }

  function reset() {
    setStation(0);
    setNight(false);
    setToast("Route reset. The next marker is waiting.");
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(station + 1);
      if (event.key === "ArrowLeft") goTo(station - 1);
      if (event.key.toLowerCase() === "r") reset();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setNight(true);
      setToast("The route has become a night drive. Nothing changed — only the mood.");
    }, 120000);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <main className={`tour-shell ${night ? "is-night" : ""}`}>
      <header className="tour-header">
        <a className="tour-brand" href="/" rel="noreferrer" target="_blank">RR / SIGNAL ROUTE</a>
        <div className="tour-tools">
          <button aria-label={audio ? "Mute route sound" : "Enable gentle route sound"} onClick={() => setAudio((currentAudio) => !currentAudio)} type="button">
            {audio ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {audio ? "Sound on" : "Sound off"}
          </button>
          <button onClick={reset} type="button"><RotateCcw size={15} /> Reset</button>
        </div>
      </header>

      <section className="tour-main">
        <div className="tour-copy">
          <p className="tour-kicker">Interactive resume / no driving licence required</p>
          <p className="tour-index">{String(station + 1).padStart(2, "0")} / {String(stations.length).padStart(2, "0")}</p>
          <h1>{current.title}</h1>
          <p>{current.detail}</p>
          <div className="tour-actions">
            <button disabled={station === 0} onClick={() => goTo(station - 1)} type="button"><ArrowLeft size={17} /> Back</button>
            <button className="tour-next" disabled={station === stations.length - 1} onClick={() => goTo(station + 1)} type="button">
              Next signal <ArrowRight size={17} />
            </button>
          </div>
          <p aria-live="polite" className="tour-toast">{toast}</p>
        </div>

        <div className="tour-map" style={{ "--marker-color": current.color } as CSSProperties}>
          <div className="tour-sky" />
          <div className="tour-hills hill-one" />
          <div className="tour-hills hill-two" />
          <div className="tour-road">
            <span className="road-dash" />
            <span className="road-dash" />
            <span className="road-dash" />
          </div>
          <div className="tour-rover" style={{ left: `calc(${14 + station * 24}% - 2.5rem)` }}>
            <span className="rover-window" />
            <span className="rover-light" />
            <i />
            <i />
          </div>
          <div className="tour-stations">
            {stations.map((item, index) => (
              <button
                aria-current={index === station ? "step" : undefined}
                aria-label={`Go to ${item.code}, ${item.year}`}
                className={index === station ? "active" : index < station ? "visited" : ""}
                key={item.code}
                onClick={() => goTo(index)}
                style={{ left: `${14 + index * 24}%`, "--station-color": item.color } as CSSProperties}
                type="button"
              >
                <span>{item.code}</span>
                <small>{item.year}</small>
              </button>
            ))}
          </div>
          <div className="tour-sign" style={{ "--sign-color": current.color } as CSSProperties}>
            <span>{current.code}</span>
            <small>{current.year}</small>
          </div>
          <div className="tour-moon" aria-hidden="true"><Moon size={27} /></div>
        </div>
      </section>

      <footer className="tour-footer">
        <span>ARROWS / move</span>
        <span>R / reset</span>
        <span>2 minutes / night mode</span>
        <a href="/" rel="noreferrer" target="_blank"><Home size={15} /> Main portfolio</a>
      </footer>
    </main>
  );
}
