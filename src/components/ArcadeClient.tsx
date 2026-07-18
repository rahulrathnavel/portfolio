"use client";

import { ArrowRight, Home, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Level = {
  title: string;
  prompt: string;
  mode: "tap" | "hold" | "choice" | "sequence" | "double" | "ghost";
  answer?: string;
  options?: string[];
};

const levels: Level[] = [
  { title: "Wake the signal", prompt: "A good first click is never wasted.", mode: "tap" },
  { title: "Steady hands", prompt: "Hold the contact pad until it trusts you.", mode: "hold" },
  { title: "Tiny memory", prompt: "The camera saw CAT, then MOUSE, then LIZARD. What appeared first?", mode: "choice", answer: "CAT", options: ["MOUSE", "CAT", "LIZARD"] },
  { title: "Sequence", prompt: "Tap the short code in order: A → I → R.", mode: "sequence" },
  { title: "Not impossible", prompt: "This button is being dramatic. Click it once, kindly.", mode: "tap" },
  { title: "A polite jump scare", prompt: "Tap the anomaly. It will vanish before it becomes annoying.", mode: "ghost" },
  { title: "Double-check", prompt: "Some systems need a deliberate second tap.", mode: "double" },
  { title: "Signal sorting", prompt: "Choose the thing that belongs in a model evaluation loop.", mode: "choice", answer: "METRIC", options: ["VIBES", "METRIC", "MAYBE"] },
  { title: "Hold the line", prompt: "One last calm press. Keep holding for one second.", mode: "hold" },
  { title: "Ship it", prompt: "You found every signal. Tap the final stamp.", mode: "tap" },
];

function playTone() {
  const Ctx = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 540;
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.11);
}

export default function ArcadeClient() {
  const [level, setLevel] = useState(0);
  const [audio, setAudio] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [ghost, setGhost] = useState(false);
  const [message, setMessage] = useState("Ten tiny challenges. No rage quit required.");
  const holdTimer = useRef<number | null>(null);
  const progressTimer = useRef<number | null>(null);
  const current = levels[level];
  const complete = level === levels.length;

  useEffect(() => () => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    if (progressTimer.current) window.clearInterval(progressTimer.current);
  }, []);

  function advance() {
    if (audio) playTone();
    setLevel((currentLevel) => currentLevel + 1);
    setSequence([]);
    setHoldProgress(0);
    setMessage(level + 1 === levels.length ? "Signal route complete. You are officially impossible-button certified." : "Nice. The next signal is ready.");
  }

  function stopHold() {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    if (progressTimer.current) window.clearInterval(progressTimer.current);
    holdTimer.current = null;
    progressTimer.current = null;
    setHoldProgress(0);
  }

  function startHold() {
    stopHold();
    const started = Date.now();
    progressTimer.current = window.setInterval(() => setHoldProgress(Math.min(100, ((Date.now() - started) / 1000) * 100)), 20);
    holdTimer.current = window.setTimeout(() => {
      stopHold();
      advance();
    }, 1000);
  }

  function choose(option: string) {
    if (option === current.answer) {
      advance();
    } else {
      setMessage("Good hypothesis. Not this signal — try once more.");
    }
  }

  function addSequence(key: string) {
    const expected = ["A", "I", "R"];
    const next = [...sequence, key];
    if (key !== expected[sequence.length]) {
      setSequence([]);
      setMessage("Sequence reset. Small mistakes are just data.");
      return;
    }
    if (next.length === expected.length) {
      advance();
    } else {
      setSequence(next);
    }
  }

  function activateGhost() {
    setGhost(true);
    window.setTimeout(() => {
      setGhost(false);
      advance();
    }, 700);
  }

  function reset() {
    setLevel(0);
    setSequence([]);
    setHoldProgress(0);
    setGhost(false);
    setMessage("Fresh start. The buttons forgive you.");
  }

  return (
    <main className="arcade-shell">
      <header className="arcade-header">
        <a href="/" rel="noreferrer" target="_blank">RR / ARCADE</a>
        <div>
          <button aria-label={audio ? "Mute arcade sound" : "Enable arcade sound"} onClick={() => setAudio((isOn) => !isOn)} type="button">{audio ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
          <button onClick={reset} type="button"><RotateCcw size={16} /> Reset</button>
        </div>
      </header>

      <section className="arcade-main">
        <aside className="arcade-sidebar">
          <p className="arcade-kicker">RR signal hunt</p>
          <h1>Playful, but not pointless.</h1>
          <p>This is the small side quest. The main portfolio remains serious; these ten original levels are here because building can be fun too.</p>
          <div className="level-list" aria-label="Level progress">
            {levels.map((item, index) => (
              <span className={index < level ? "done" : index === level ? "current" : ""} key={item.title}>
                {String(index + 1).padStart(2, "0")} <i />
              </span>
            ))}
          </div>
          <a className="arcade-home" href="/" rel="noreferrer" target="_blank"><Home size={16} /> Back to the serious stuff</a>
        </aside>

        <div className="arcade-stage">
          {complete ? (
            <div className="final-stamp">
              <span>RR</span>
              <h2>Signal hunter certified.</h2>
              <p>You completed every tiny obstacle. The actual portfolio is still waiting in the tab you came from.</p>
              <button onClick={reset} type="button">Run it again <RotateCcw size={16} /></button>
            </div>
          ) : (
            <>
              <p className="arcade-level">LEVEL {String(level + 1).padStart(2, "0")} / 10</p>
              <h2>{current.title}</h2>
              <p className="arcade-prompt">{current.prompt}</p>
              <div className="arcade-puzzle">
                {current.mode === "tap" && <button className="puzzle-button pulse" onClick={advance} type="button">Press the signal <ArrowRight size={18} /></button>}
                {current.mode === "hold" && (
                  <button
                    className="hold-button"
                    onPointerCancel={stopHold}
                    onPointerDown={startHold}
                    onPointerLeave={stopHold}
                    onPointerUp={stopHold}
                    type="button"
                  >
                    <span style={{ width: `${holdProgress}%` }} />
                    <b>Hold steady</b>
                    <small>{Math.round(holdProgress)}%</small>
                  </button>
                )}
                {current.mode === "choice" && (
                  <div className="choice-grid">
                    {current.options?.map((option) => <button key={option} onClick={() => choose(option)} type="button">{option}</button>)}
                  </div>
                )}
                {current.mode === "sequence" && (
                  <div className="sequence-puzzle">
                    <div aria-label="Entered sequence" className="sequence-display">{sequence.length ? sequence.join(" ") : "_ _ _"}</div>
                    {["A", "I", "R"].map((key) => <button key={key} onClick={() => addSequence(key)} type="button">{key}</button>)}
                  </div>
                )}
                {current.mode === "double" && <button className="puzzle-button double" onDoubleClick={advance} type="button">Double tap me</button>}
                {current.mode === "ghost" && <button className="puzzle-button anomaly" onClick={activateGhost} type="button">Tap the anomaly</button>}
              </div>
            </>
          )}
          <p aria-live="polite" className="arcade-message">{message}</p>
        </div>
      </section>

      {ghost && <div aria-live="assertive" className="ghost-layer">SYSTEM<br />STILL<br />CALM</div>}
    </main>
  );
}
