/* eslint-disable @next/next/no-img-element -- GitHub Pages uses a static export and these are local evidence assets. */
"use client";

import ContactForm from "@/components/ContactForm";
import ModelPortrait from "@/components/ModelPortrait";
import { portraitModels } from "@/config/portraitModels";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Moon,
  Route,
  Sun,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CSSProperties, useEffect, useState } from "react";

type Language = "en" | "ta";
type Sidekick = "think" | "approved" | null;

const external = {
  github: "https://github.com/rahulrathnavel",
  linkedin: "https://linkedin.com/in/rahulrathnavel",
  leetcode: "https://leetcode.com/rahulrathnavel",
  ragLive: "https://huggingface.co/spaces/RathnavelRahul/omni",
  ragCode: "https://github.com/rahulrathnavel/Multimodel-Rag-",
  voiceCode: "https://github.com/rahulrathnavel/voice-surrogate",
  voiceApk: "https://github.com/rahulrathnavel/voice-surrogate/releases/download/v1.0.0/app-debug.apk",
  rakiCode: "https://github.com/rahulrathnavel/Raki-Chatapp",
  rakiApk: "https://github.com/rahulrathnavel/Raki-Chatapp/blob/main/RaKi.apk",
  votingCode: "https://github.com/rahulrathnavel/BlockChain_Voting_System...",
};

const projectTags = {
  smartops: ["AIOps", "GNN", "Qwen", "EKS"],
  amazon: ["NLP", "DeBERTa-v3", "PyTorch", "SMAPE"],
  glass: ["Edge AI", "Flutter", "ESP32-CAM", "Vision"],
  rag: ["RAG", "FAISS", "BM25", "Llama 3"],
};

const strings = {
  en: {
    status: "Available for ambitious product work",
    heroLead: "I build useful",
    heroAccent: "intelligent systems",
    heroEnd: "that survive the real world.",
    intro:
      "Rahul is an applied AI/ML engineer who turns messy problems into working products — from resilient cloud operations and multimodal RAG to offline accessibility tools.",
    work: "See selected work",
    tour: "Drive the game tour",
    proof: "Evidence, not noise",
    proofTitle: "The work has receipts.",
    proofIntro: "Awards matter. Working prototypes, merged PRs, and repeatable technical decisions matter more.",
    projects: "Selected systems",
    projectsTitle: "Built where the constraints are real.",
    projectsIntro: "Each story starts with the problem, keeps the hard parts visible, and avoids claims the evidence cannot support.",
    opensource: "Open source",
    sourceTitle: "Maintainer-reviewed, not just published.",
    sourceIntro: "Small, precise fixes across mature Python libraries — the kind of work where the details actually matter.",
    contact: "Let’s make something useful.",
    contactIntro: "A product idea, an AI system that needs a sanity check, or a film recommendation — Rahul reads every thoughtful note.",
  },
  ta: {
    status: "Product work-ku ready",
    heroLead: "Naan build pannradhu",
    heroAccent: "useful AI systems",
    heroEnd: "real world-la work aaganum.",
    intro:
      "Rahul oru applied AI/ML engineer. Confusing problem-a working product-aa maathradhu dhaan main work — cloud incidents-la irundhu offline accessibility tools varaikkum.",
    work: "Best work paarunga",
    tour: "Game tour-la polaam",
    proof: "Proof irukku, noise illa",
    proofTitle: "Idhellam real evidence.",
    proofIntro: "Awards nalla vishayam. Aana working prototype, merged PR, and clear technical decisions innum strong.",
    projects: "Selected systems",
    projectsTitle: "Real constraints irukkura place-la build pannadhu.",
    projectsIntro: "Every story problem-la start aagum. Hard parts visible-aa irukkum. Proof illaama claim panna maatom.",
    opensource: "Open source",
    sourceTitle: "Maintainer review pass pannadhu.",
    sourceIntro: "Mature Python libraries-la small but precise fixes — inga details dhaan main.",
    contact: "Useful-a edhaavadhu build pannalaam.",
    contactIntro: "Product idea, AI system sanity-check, illa movie recommendation kooda okay. Rahul thoughtful notes ellam padipaar.",
  },
} as const;

function ExternalArrow() {
  return <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.4} />;
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="tag-row">
      {tags.map((tag) => (
        <span className="tag" key={tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function PortfolioClient() {
  const [language, setLanguage] = useState<Language>("en");
  const [greetingLevel, setGreetingLevel] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [night, setNight] = useState(12);
  const [sidekick, setSidekick] = useState<Sidekick>(null);
  const text = strings[language];

  useEffect(() => {
    let active = true;
    (document.fonts?.ready ?? Promise.resolve()).finally(() => {
      if (active) setIsBooting(false);
    });

    return () => {
      active = false;
    };
  }, []);

  function showSidekick(kind: Exclude<Sidekick, null>) {
    setSidekick(kind);
    window.setTimeout(() => setSidekick(null), 3600);
  }

  const shellStyle = { "--night": night } as CSSProperties;

  return (
    <main className="portfolio-shell" style={shellStyle}>
      <a className="skip-link" href="#main-content">
        Skip to work
      </a>

      <AnimatePresence>
        {isBooting && (
          <motion.div
            animate={{ opacity: 1 }}
            className="boot-screen"
            exit={{ opacity: 0, pointerEvents: "none" }}
            initial={{ opacity: 1 }}
            transition={{ duration: 0.28 }}
          >
            <div>
              <div className="boot-hex">RR</div>
              <p>finding the signal</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="site-header">
        <a aria-label="Rahul Rathnavel home" className="brand-mark" href="#top">
          RR
        </a>
        <nav aria-label="Main navigation" className="top-nav">
          <a href="#work">Work</a>
          <a href="#proof">Proof</a>
          <a href="#open-source">Open source</a>
          <a href="#contact">Contact</a>
          <button onClick={() => showSidekick("think")} type="button">
            Definitely not a button
          </button>
        </nav>
        <div className="nav-tools">
          <button
            aria-label="Toggle English and Tamil"
            className="language-toggle"
            onClick={() => setLanguage((current) => (current === "en" ? "ta" : "en"))}
            type="button"
          >
            {language === "en" ? "த" : "EN"}
          </button>
          <button
            aria-label="Adjust page light level"
            className="mode-toggle"
            onClick={() => setNight((current) => (current > 45 ? 12 : 76))}
            type="button"
          >
            {night > 45 ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">{text.status}</p>
          {language === "ta" && (
            <button
              aria-label="Double tap for a more informal Tamil greeting"
              className="tamil-greeting"
              onDoubleClick={() => setGreetingLevel((current) => current + 1)}
              type="button"
            >
              <span>double-tap if we know each other</span>
              <strong>{greetingLevel > 0 ? "வணக்கம் டா மாப்ள!" : "வணக்கம் நண்பா"}</strong>
            </button>
          )}
          <h1>
            {text.heroLead} <span className="accent">{text.heroAccent}</span> {text.heroEnd}
          </h1>
          <p className="hero-copy">{text.intro}</p>
          <div className="hero-actions">
            <a className="button signal" href="#work">
              {text.work} <ArrowDown size={16} />
            </a>
            <a className="button secondary" href="/game-tour/" rel="noreferrer" target="_blank">
              <Route size={16} /> {text.tour}
            </a>
          </div>
          <div className="hero-footnotes" aria-label="Highlights">
            <span>Rank 83 / 4,000+</span>
            <span>TECHgium national finalist</span>
            <span>Maintainer-merged PRs</span>
          </div>
        </div>

        <section
          aria-label="Interactive portrait of Rahul Rathnavel"
          className="portrait-stage"
        >
          <span className="portrait-label">Rahul / field mode</span>
          <span className="portrait-cursor">Move around me</span>
          <span className="portrait-glow" />
          <ModelPortrait
            alt={portraitModels.hero.alt}
            cameraOrbit={portraitModels.hero.cameraOrbit}
            className="hero-model"
            loading="eager"
            src={portraitModels.hero.src}
          />
          <label className="signal-slider">
            <Sun size={15} />
            <input
              aria-label="Light to night setting"
              max="100"
              min="0"
              onChange={(event) => setNight(Number(event.target.value))}
              type="range"
              value={night}
            />
            <Moon size={15} />
          </label>
        </section>
      </section>

      <div id="main-content">
        <section className="section" id="proof">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{text.proof}</p>
              <h2>{text.proofTitle}</h2>
            </div>
            <p className="section-intro">{text.proofIntro}</p>
          </div>
          <div className="proof-grid">
            <article className="proof-card">
              <span className="proof-number">83</span>
              <h3>Amazon ML Challenge</h3>
              <p>Cyber Titans reached Rank 83 with a 45.35 SMAPE final submission after repeated model and evaluation iterations.</p>
              <span aria-hidden="true" className="proof-scribble" />
            </article>
            <article className="proof-card">
              <span className="proof-number">34</span>
              <h3>TECHgium finalist teams</h3>
              <p>SmartOps reached the national final stage after a nine-month innovation journey.</p>
              <span aria-hidden="true" className="proof-scribble" />
            </article>
            <article className="proof-card">
              <span className="proof-number">816</span>
              <h3>Problems solved</h3>
              <p>Knight level. 2,570 submissions across 351 active days.</p>
              <span aria-hidden="true" className="proof-scribble" />
            </article>
          </div>
        </section>

        <section className="section" id="work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{text.projects}</p>
              <h2>{text.projectsTitle}</h2>
            </div>
            <p className="section-intro">{text.projectsIntro}</p>
          </div>
          <div className="work-grid">
            <article className="work-card wide">
              <img alt="Brothers of Creations at the TECHgium SmartOps finals" className="work-image" src="/assets/proof/techgium-finals.jpg" />
              <div className="work-card-content">
                <span className="project-type">01 / AIOps prototype</span>
                <h3>SmartOps: turn an incident into an answer.</h3>
                <p>Designed a human-reviewed AI operations loop that observes failures, diagnoses the likely cause, proposes a fix, and learns from the SRE team’s feedback.</p>
                <ProjectTags tags={projectTags.smartops} />
              </div>
            </article>

            <article className="work-card narrow">
              <img alt="Amazon ML Challenge leaderboard showing Cyber Titans at rank 83" className="work-image" src="/assets/proof/amazon-rank-83.jpg" />
              <div className="work-card-content">
                <span className="project-type">02 / Machine learning</span>
                <h3>Rank 900 was only the start.</h3>
                <p>A price-prediction system refined through leaderboard drops, better pooling, outlier control, and a final Rank 83.</p>
                <ProjectTags tags={projectTags.amazon} />
              </div>
            </article>

            <article className="work-card narrow">
              <img alt="ESP32-CAM smart glass prototype" className="work-image" src="/assets/projects/smart-glass-hardware.jpeg" />
              <div className="work-card-content">
                <span className="project-type">03 / Edge AI accessibility</span>
                <h3>A smarter pair of glasses should protect privacy too.</h3>
                <p>An offline assistive prototype pairing wearable visual input with a Flutter app for object, text, and face assistance.</p>
                <ProjectTags tags={projectTags.glass} />
              </div>
            </article>

            <article className="work-card wide" style={{ background: "#273455" }}>
              <div className="work-card-content">
                <span className="project-type">04 / Live multimodal RAG</span>
                <h3>Answers should show their evidence.</h3>
                <p>Omni RAG combines dense and sparse retrieval, then returns an answer alongside the exact PDF page that supports it — because confidence without evidence is not enough.</p>
                <ProjectTags tags={projectTags.rag} />
                <div className="card-actions">
                  <a className="button secondary" href={external.ragLive} rel="noreferrer" target="_blank">
                    Live demo <ExternalArrow />
                  </a>
                  <a className="button secondary" href={external.ragCode} rel="noreferrer" target="_blank">
                    Source <Code2 size={15} />
                  </a>
                </div>
              </div>
              <div aria-hidden="true" className="rover-mini" style={{ left: "74%", top: "24%" }} />
            </article>
          </div>
        </section>

        <section className="section" aria-label="Visual evidence">
          <div className="proof-shelf">
            <a className="proof-shot" href={external.leetcode} rel="noreferrer" target="_blank">
              <img alt="Rahul's LeetCode profile showing Knight level" src="/assets/proof/leetcode-profile.png" />
              <span>816 solved / Knight level <ExternalArrow /></span>
            </a>
            <a className="proof-shot" href="https://github.com/keras-team/keras/pull/22844" rel="noreferrer" target="_blank">
              <img alt="Merged Keras pull request" src="/assets/proof/keras-pr.png" />
              <span>Keras / merged PR #22844 <ExternalArrow /></span>
            </a>
            <a className="proof-shot" href="https://github.com/matplotlib/matplotlib/pull/31707" rel="noreferrer" target="_blank">
              <img alt="Merged Matplotlib pull request" src="/assets/proof/matplotlib-pr.png" />
              <span>Matplotlib / merged PR #31707 <ExternalArrow /></span>
            </a>
            <a className="proof-shot" href="https://github.com/scipy/scipy/pull/25209" rel="noreferrer" target="_blank">
              <img alt="Merged SciPy pull request" src="/assets/proof/scipy-pr.png" />
              <span>SciPy / merged PR #25209 <ExternalArrow /></span>
            </a>
          </div>
        </section>

        <section className="section" id="open-source">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{text.opensource}</p>
              <h2>{text.sourceTitle}</h2>
            </div>
            <p className="section-intro">{text.sourceIntro}</p>
          </div>
          <div className="open-source-list">
            {[
              ["Keras", "#22844", "Made IoU metric validation safer around out-of-bounds class IDs.", "https://github.com/keras-team/keras/pull/22844"],
              ["SciPy", "#25209", "Suppressed an unknown pytest marker warning through safer backend handling.", "https://github.com/scipy/scipy/pull/25209"],
              ["Matplotlib", "#31707", "Prevented a violinplot crash when an input dataset is empty.", "https://github.com/matplotlib/matplotlib/pull/31707"],
              ["Statsmodels", "#9812", "Corrected residual behavior for UECM results.", "https://github.com/statsmodels/statsmodels/pull/9812"],
            ].map(([library, pull, description, href]) => (
              <a className="open-source-item" href={href} key={library} rel="noreferrer" target="_blank">
                <div>
                  <strong>{library}</strong>
                  <small> — {description}</small>
                </div>
                <span>{pull}</span>
                <ExternalArrow />
              </a>
            ))}
          </div>
        </section>

        <section className="section route-section">
          <div className="route-card">
            <div>
              <p className="section-kicker">Interactive detour</p>
              <h2>Drive through the work.</h2>
              <p className="section-intro">Take Rahul&apos;s interactive game tour: a keyboard-friendly 3D world of the work, timeline, and proof points. It opens separately, so this page stays exactly where you left it.</p>
              <div className="hero-actions">
                <a className="button signal" href="/game-tour/" rel="noreferrer" target="_blank">
                  <Route size={16} /> Open game tour
                </a>
              </div>
            </div>
            <div className="route-preview" aria-hidden="true">
              <div className="route-line">
                <span className="rover-mini" />
                <span className="route-stop" data-label="2022" />
                <span className="route-stop" data-label="Rank 83" />
                <span className="route-stop" data-label="SmartOps" />
                <span className="route-stop" data-label="Now" />
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Other selected work">
          <div className="lab-grid">
            <article className="lab-card">
              <span className="lab-index">05 / Android</span>
              <h3>Voice Surrogate</h3>
              <p>On-device bilingual smart replies for non-speaking individuals. Speech in, a considered response out — without handing a conversation to the cloud.</p>
              <div className="card-actions">
                <a className="button secondary" href={external.voiceCode} rel="noreferrer" target="_blank">Source <Code2 size={15} /></a>
                <a className="button secondary" href={external.voiceApk} rel="noreferrer" target="_blank">APK <ExternalArrow /></a>
              </div>
            </article>
            <article className="lab-card">
              <span className="lab-index">06 / Mobile</span>
              <h3>Raki Chat</h3>
              <p>A Kotlin and Jetpack Compose chat app built around Firebase authentication, real-time messaging, MVVM, and a deliberately maintainable structure.</p>
              <div className="card-actions">
                <a className="button secondary" href={external.rakiCode} rel="noreferrer" target="_blank">Source <Code2 size={15} /></a>
                <a className="button secondary" href={external.rakiApk} rel="noreferrer" target="_blank">APK <ExternalArrow /></a>
              </div>
            </article>
            <article className="lab-card">
              <span className="lab-index">07 / Research prototype</span>
              <h3>Biometric Voting</h3>
              <p>A controlled voting-system prototype exploring Solidity auditability alongside biometric verification, a Next.js interface, Flask services, and Arduino hardware.</p>
              <div className="card-actions">
                <a className="button secondary" href={external.votingCode} rel="noreferrer" target="_blank">Source <Code2 size={15} /></a>
              </div>
            </article>
          </div>
        </section>

        <section className="section private-work" aria-label="Private independent work">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Independent work / names respectfully withheld</p>
              <h2>Quiet builds. Real constraints.</h2>
            </div>
            <p className="section-intro">A few projects were delivered privately, so the portfolio shows the problem space and the engineering work — never a client name, dataset, or claim that should stay confidential.</p>
          </div>
          <div className="private-grid">
            <article className="private-card">
              <span>01 / Trust</span>
              <h3>Job-signal verification</h3>
              <p>A workflow for classifying suspicious job listings and matching opportunities to a supplied résumé, with structured extraction from public job links.</p>
            </article>
            <article className="private-card">
              <span>02 / Health research</span>
              <h3>Breast-cancer decision-support prototype</h3>
              <p>A research prototype combining tabular classification and image-led signals with nearby-care discovery. It is not a diagnostic product or medical advice.</p>
            </article>
            <article className="private-card">
              <span>03 / Field telemetry</span>
              <h3>Farm conditions, on a phone</h3>
              <p>A mobile view of wirelessly collected Arduino sensor readings so growers can check humidity and related field conditions without standing beside the hardware.</p>
            </article>
            <article className="private-card">
              <span>04 / Privacy research</span>
              <h3>Encrypted smart-grid prediction</h3>
              <p>An ML research workflow exploring predictions over protected smart-grid data, designed around the requirement that sensitive data should not be exposed just to make a model useful.</p>
            </article>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="contact-grid">
            <div className="contact-card">
              <p className="section-kicker">Contact / no forms of ceremony required</p>
              <h2>{text.contact}</h2>
              <p>{text.contactIntro}</p>
              <ContactForm />
            </div>
            <aside className="contact-sidekick">
              <p>“Let&apos;s discuss software, LLMs where they fail… and maybe cinema.”</p>
              <ModelPortrait
                alt={portraitModels.contact.alt}
                cameraOrbit={portraitModels.contact.cameraOrbit}
                className="contact-model"
                src={portraitModels.contact.src}
              />
            </aside>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <span>© 2026 Rahul Rathnavel. Built with evidence, curiosity, and a tiny bit of chaos.</span>
        <span>
          <a href={external.github} rel="noreferrer" target="_blank">GitHub</a> / {" "}
          <a href={external.linkedin} rel="noreferrer" target="_blank">LinkedIn</a> / {" "}
          <a href="/resume/Rahul-Rathnavel-Resume.pdf" rel="noreferrer" target="_blank">Resume</a>
        </span>
      </footer>

      <AnimatePresence>
        {sidekick && (
          <motion.aside
            animate={{ opacity: 1, x: 0, y: 0 }}
            className="sidekick-toast"
            exit={{ opacity: 0, x: -30, y: 16 }}
            initial={{ opacity: 0, x: -30, y: 16 }}
            role="status"
          >
            <img
              alt=""
              src={sidekick === "think" ? "/assets/portraits/rahul-think.jpeg" : "/assets/portraits/rahul-approved.jpeg"}
            />
            <div className="sidekick-bubble">
              {sidekick === "think" ? "That control is only here to see if you are curious. Nice try — now explore the real work." : "Signal received. That was smart of you."}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

    </main>
  );
}
