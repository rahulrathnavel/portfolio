/* eslint-disable @next/next/no-img-element -- Local evidence images are intentionally served by the static GitHub Pages export. */
"use client";

import ContactForm from "@/components/ContactForm";
import ModelPortrait from "@/components/ModelPortrait";
import { portraitModels } from "@/config/portraitModels";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Gamepad2,
  Layers3,
  Mail,
  RotateCcw,
  Route,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
  openSourcePulls,
  privateWork,
  profile,
  projects,
  proofs,
} from "@/config/portfolioData";
import type { AppId, Language } from "./types";

type AppContentProps = {
  language: Language;
  onDismissWelcome: () => void;
  onOpenApp: (app: AppId) => void;
  onResetWorkspace: () => void;
  onSetLanguage: (language: Language) => void;
};

function ExternalAction({ href, children }: { children: React.ReactNode; href: string }) {
  return (
    <a className="rr-action rr-action-secondary" href={href} rel="noreferrer" target="_blank">
      {children}
      <ArrowUpRight aria-hidden="true" size={15} />
    </a>
  );
}

function SignalTag({ children }: { children: React.ReactNode }) {
  return <span className="rr-signal-tag">{children}</span>;
}

export function WelcomeApp({ language, onDismissWelcome, onOpenApp }: AppContentProps) {
  const tamil = language === "ta";
  const [casualGreeting, setCasualGreeting] = useState(false);
  const copy = tamil
    ? {
      contact: "Rahul-kitta connect",
      explore: "Workstation-a explore pannunga",
      intro: "Cloud reliability, RAG, accessibility tools, open source - ellam real constraints-oda build pannina work.",
      quickBrief: "Quick brief - 60 sec",
      role: "Applied AI/ML engineer. Messy problem-ah useful product-aa maathuren.",
      resume: "Resume PDF",
    }
    : {
      contact: "Contact Rahul",
      explore: "Explore workstation",
      intro: "A practical desktop of real work: resilient cloud operations, evidence-first RAG, accessibility tools, and maintainer-reviewed open source.",
      quickBrief: "Quick brief - 60 sec",
      role: profile.headline,
      resume: "Resume PDF",
    };

  return (
    <div className="rr-welcome-app">
      <div className="rr-welcome-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="rr-welcome-copy">
        <p className="rr-kicker">RR / WORKSTATION 01</p>
        {tamil && (
          <button
            aria-label="Double click for a more casual Tamil greeting"
            className="rr-tamil-greeting"
            onDoubleClick={() => setCasualGreeting((current) => !current)}
            type="button"
          >
            {casualGreeting ? "வணக்கம் da மாப்ள!" : "வணக்கம் நண்பா"}
          </button>
        )}
        <h1>{profile.shortName}</h1>
        <p className="rr-welcome-role">{copy.role}</p>
        <p className="rr-welcome-intro">{copy.intro}</p>
        <div className="rr-welcome-actions">
          <button className="rr-action rr-action-primary" onClick={onDismissWelcome} type="button">
            <Sparkles aria-hidden="true" size={16} />
            {copy.quickBrief}
          </button>
          <button className="rr-action rr-action-secondary" onClick={() => onOpenApp("work")} type="button">
            {copy.explore} <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
        <div className="rr-welcome-links" aria-label="Quick actions">
          <button onClick={() => onOpenApp("resume")} type="button">
            <FileText aria-hidden="true" size={15} /> {copy.resume}
          </button>
          <button onClick={() => onOpenApp("contact")} type="button">
            <Mail aria-hidden="true" size={15} /> {copy.contact}
          </button>
        </div>
      </div>
      <aside className="rr-signal-receipt" aria-label="Selected proof points">
        <span>signal receipt</span>
        <strong>Rank 83</strong>
        <small>Amazon ML Challenge</small>
        <strong>34 finalists</strong>
        <small>TECHgium national stage</small>
        <strong>4 libraries</strong>
        <small>maintainer-merged PRs</small>
      </aside>
    </div>
  );
}

function AboutApp({ language, onOpenApp }: AppContentProps) {
  const tamil = language === "ta";

  return (
    <div className="rr-app-grid rr-about-app">
      <div className="rr-about-copy">
        <p className="rr-kicker">ABOUT_RAHUL.md</p>
        <h2>{tamil ? "Useful-aa build panradhu first. Appuram AI." : "Useful systems need more than a clever model."}</h2>
        {!tamil && (
          <p>
          Rahul is an applied AI/ML engineer who turns messy problems into working products.
          His work moves between cloud reliability, retrieval systems, mobile apps, and edge
          AI—where the constraints are part of the job, not a footnote.
          </p>
        )}
        {tamil && <p>Rahul applied AI/ML engineer. Messy problem-a working product-a maathuradhu dhaan avar work - cloud reliability, retrieval systems, mobile apps, edge AI ellam real-world constraints-oda.</p>}
        <div className="rr-role-list" aria-label="Target roles">
          <SignalTag>AI/ML Engineer</SignalTag>
          <SignalTag>Data Scientist</SignalTag>
          <SignalTag>Product Engineer</SignalTag>
        </div>
        <div className="rr-command-row">
          <button className="rr-action rr-action-primary" onClick={() => onOpenApp("work")} type="button">
            <Layers3 aria-hidden="true" size={16} /> {tamil ? "Selected work open pannunga" : "Open selected work"}
          </button>
          <button className="rr-text-button" onClick={() => onOpenApp("proof")} type="button">
            {tamil ? "Proof paakalaam" : "View the receipts"} <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
        <dl className="rr-fact-grid">
          <div>
            <dt>Focus</dt>
            <dd>{tamil ? "Explain panna mudiyum, use panna easy-a irukkura AI systems." : "AI systems that stay explainable and usable."}</dd>
          </div>
          <div>
            <dt>Working style</dt>
            <dd>{tamil ? "Seekiram prototype, honest-a measure, apram hard-a iterate." : "Prototype early, measure honestly, iterate hard."}</dd>
          </div>
          <div>
            <dt>Looking for</dt>
            <dd>{tamil ? "Real problem solve panna virumbura product teams." : "Ambitious product teams with real problems."}</dd>
          </div>
        </dl>
      </div>
      <aside className="rr-about-portrait" aria-label="Interactive 3D portrait of Rahul Rathnavel">
        <span className="rr-portrait-label">RAHUL / FIELD MODE</span>
        <ModelPortrait
          alt={portraitModels.hero.alt}
          cameraOrbit={portraitModels.hero.cameraOrbit}
          className="workstation-portrait"
          loading="lazy"
          src={portraitModels.hero.src}
        />
        <p>{tamil ? "Cursor-a portrait mela move pannunga - konjam follow pannum." : "Move your cursor across the portrait. It will follow gently."}</p>
      </aside>
    </div>
  );
}

function WorkApp({ language }: Pick<AppContentProps, "language">) {
  const tamil = language === "ta";

  return (
    <div className="rr-work-app">
      <header className="rr-app-intro">
        <p className="rr-kicker">SELECTED_WORK / VERIFIED NOTES</p>
        <h2>{tamil ? "Real constraint irukkura edathula build pannina systems." : "Systems built where the constraints are real."}</h2>
        <p>
          {tamil
            ? "Problem, Rahul ownership, technical choice, available proof - ellam orae place-la. Made-up result illa. Generic project card illa."
            : "The stories keep the problem, Rahul's ownership, technical choices, and available proof together. No invented outcomes. No generic project cards."}
        </p>
      </header>
      <div className="rr-project-list">
        {projects.map((project, index) => (
          <article className="rr-project-card" id={project.id} key={project.id}>
            <div className="rr-project-index">{String(index + 1).padStart(2, "0")}</div>
            {project.cover && <img alt="" className="rr-project-cover" src={project.cover} />}
            <div className="rr-project-main">
              <p className="rr-project-kind">{project.kind}</p>
              <h3>{project.title}</h3>
              <p className="rr-project-verdict">{project.verdict}</p>
              <div className="rr-project-detail-grid">
                <div>
                  <span>{tamil ? "PROBLEM" : "THE PROBLEM"}</span>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <span>{tamil ? "RAHUL ROLE" : "RAHUL'S ROLE"}</span>
                  <p>{project.role}</p>
                </div>
              </div>
              <div className="rr-tag-list">
                {project.stack.map((item) => <SignalTag key={item}>{item}</SignalTag>)}
              </div>
              {project.links && (
                <div className="rr-project-actions">
                  {project.links.map((link) => <ExternalAction href={link.href} key={link.href}>{link.label}</ExternalAction>)}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
      <section className="rr-private-work">
        <div>
          <p className="rr-kicker">PRIVATE_WORK / NAMES RESPECTFULLY WITHHELD</p>
          <h3>{tamil ? "Quiet builds. Real constraints." : "Quiet builds. Real constraints."}</h3>
          <p>
            These projects are presented at the problem-space level only. Client names, data,
            and anything confidential remain out of the workstation.
          </p>
        </div>
        <div className="rr-private-list">
          {privateWork.map((entry) => (
            <article key={entry.label}>
              <strong>{entry.label}</strong>
              <p>{entry.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProofApp({ language }: Pick<AppContentProps, "language">) {
  const tamil = language === "ta";

  return (
    <div className="rr-proof-app">
      <header className="rr-app-intro">
        <p className="rr-kicker">PROOF_DESK / RECEIPTS, NOT NOISE</p>
        <h2>{tamil ? "Nalla work-a inspect panna mudiyanum." : "Good work should be inspectable."}</h2>
        <p>{tamil ? "Competition outcome, shipped prototype, maintainer-reviewed change - evidence pakkathula irukku." : "Competition outcomes, shipped prototypes, and maintainer-reviewed changes sit next to their evidence."}</p>
      </header>
      <div className="rr-proof-grid">
        {proofs.map((proof) => (
          <article className="rr-proof-card" key={proof.label}>
            <div className="rr-proof-number">{proof.accent}</div>
            <img alt="" src={proof.image} />
            <div>
              <h3>{proof.label}</h3>
              <p>{proof.text}</p>
              {proof.href && <ExternalAction href={proof.href}>{proof.linkLabel ?? "Open supporting record"}</ExternalAction>}
            </div>
          </article>
        ))}
      </div>
      <section className="rr-oss-desk">
        <div className="rr-oss-desk-heading">
          <div>
            <p className="rr-kicker">OPEN_SOURCE / REVIEWED BY MAINTAINERS</p>
            <h3>Small fixes. Mature codebases. Real review.</h3>
          </div>
          <Code2 aria-hidden="true" size={26} />
        </div>
        <div className="rr-pr-list">
          {openSourcePulls.map((pull) => (
            <a href={pull.href} key={pull.href} rel="noreferrer" target="_blank">
              <img alt="" src={pull.image} />
              <div>
                <strong>{pull.library} <span>{pull.number}</span></strong>
                <p>{pull.summary}</p>
              </div>
              <ExternalLink aria-hidden="true" size={17} />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function ResumeApp({ language }: Pick<AppContentProps, "language">) {
  const tamil = language === "ta";

  return (
    <div className="rr-resume-app">
      <div>
        <p className="rr-kicker">PUBLIC_FILE / RECRUITER READY</p>
        <h2>Rahul Rathnavel - Resume</h2>
        {!tamil && (
          <p>
          The same concise public resume is available to read or download. The workstation does
          not expose internal research material or alternate drafts.
          </p>
        )}
        {tamil && <p>Indha concise public resume-a read pannalaam illa download pannalaam. Internal research material inga expose panna maatom.</p>}
        <div className="rr-command-row">
          <ExternalAction href={profile.resume}><FileText aria-hidden="true" size={16} /> {tamil ? "Resume PDF open pannunga" : "Open resume PDF"}</ExternalAction>
          <a className="rr-text-button" download href={profile.resume}>
            <Download aria-hidden="true" size={15} /> {tamil ? "Copy download pannunga" : "Download a copy"}
          </a>
        </div>
      </div>
      <div className="rr-resume-file" aria-label="Resume file">
        <FileText aria-hidden="true" size={82} strokeWidth={1.25} />
        <strong>RAHUL_RATHNAVEL_RESUME.pdf</strong>
        <span>Approved public version</span>
      </div>
    </div>
  );
}

function ContactApp({ language }: Pick<AppContentProps, "language">) {
  const tamil = language === "ta";

  return (
    <div className="rr-contact-app">
      <div className="rr-contact-copy">
        <p className="rr-kicker">CONTACT_RAHUL / NO CEREMONY REQUIRED</p>
        <h2>{tamil ? "Useful-aa edhaavadhu build pannalaam." : "Let's make something useful."}</h2>
        {!tamil && (
          <p>
          A product idea, an AI system that needs a sanity check, or a film recommendation—Rahul
          reads every thoughtful note.
          </p>
        )}
        {tamil && <p>Product idea, sanity check venum AI system, illa movie recommendation - thoughtful note ellam Rahul padippaar.</p>}
        <div className="rr-contact-links">
          <a href={profile.github} rel="noreferrer" target="_blank"><Code2 aria-hidden="true" size={17} /> GitHub</a>
          <a href={profile.linkedin} rel="noreferrer" target="_blank"><ExternalLink aria-hidden="true" size={17} /> LinkedIn</a>
          <a href={`mailto:${profile.email}?subject=Hello%20Rahul`}><Mail aria-hidden="true" size={17} /> Email app</a>
        </div>
        <div className="rr-contact-portrait" aria-hidden="true">
          <ModelPortrait
            alt=""
            cameraOrbit={portraitModels.contact.cameraOrbit}
            className="workstation-contact-portrait"
            loading="lazy"
            src={portraitModels.contact.src}
          />
        </div>
      </div>
      <div className="rr-contact-form-wrap">
        <ContactForm language={language} />
      </div>
    </div>
  );
}

function GameTourApp({ language, onOpenApp }: Pick<AppContentProps, "language" | "onOpenApp">) {
  const tamil = language === "ta";

  return (
    <div className="rr-game-app">
      <div className="rr-game-map" aria-hidden="true">
        <span className="rr-game-route rr-route-one" />
        <span className="rr-game-route rr-route-two" />
        <span className="rr-game-node rr-node-one">SmartOps</span>
        <span className="rr-game-node rr-node-two">Rank 83</span>
        <span className="rr-game-node rr-node-three">OSS</span>
        <span className="rr-game-car">RR</span>
      </div>
      <div className="rr-game-copy">
        <p className="rr-kicker">RR_GAME_TOUR.APP / OPTIONAL DETOUR</p>
        <h2>{tamil ? "Drive pannalaam. Aana driving compulsory illa." : "Drive through the work - without making driving a requirement."}</h2>
        {!tamil && (
          <p>
          The 3D world is a separate, deliberate experience. The entire portfolio remains readable
          here, and the tour now gives you an easier control layer after launch.
          </p>
        )}
        {tamil && <p>3D world separate optional experience. Full portfolio inga readable-aa irukkum; launch panna easy controls ready.</p>}
        <div className="rr-game-actions">
          <a className="rr-action rr-action-primary" href="/game-tour/index.html?mode=guided" rel="noreferrer" target="_blank">
            <Route aria-hidden="true" size={16} /> Guided route — recommended
          </a>
          <a className="rr-action rr-action-secondary" href="/game-tour/index.html" rel="noreferrer" target="_blank">
            <Gamepad2 aria-hidden="true" size={16} /> Drive it myself
          </a>
          <button className="rr-text-button" onClick={() => onOpenApp("work")} type="button">
            Skip driving — open work list <ArrowRight aria-hidden="true" size={15} />
          </button>
        </div>
        <ul className="rr-game-checklist">
          <li>New tab, so the workstation stays exactly where you left it.</li>
          <li>Keyboard plus a simple mouse/touch on-screen drive pad.</li>
          <li>Mute remains opt-in. No sound starts by itself.</li>
        </ul>
      </div>
    </div>
  );
}

function SettingsApp({ language, onResetWorkspace, onSetLanguage }: AppContentProps) {
  return (
    <div className="rr-settings-app">
      <div>
        <p className="rr-kicker">CONTROL_CENTER / PREFERENCES</p>
        <h2>Make the workstation yours.</h2>
        <p>Preferences are local to this browser. They do not change Rahul&apos;s public evidence or send data anywhere.</p>
      </div>
      <div className="rr-settings-list">
        <section>
          <div>
            <Settings2 aria-hidden="true" size={18} />
            <strong>Language</strong>
            <p>Friendly Tamil mode keeps familiar technical English where it helps.</p>
          </div>
          <div className="rr-segmented-control" aria-label="Language setting">
            <button aria-pressed={language === "en"} onClick={() => onSetLanguage("en")} type="button">English</button>
            <button aria-pressed={language === "ta"} onClick={() => onSetLanguage("ta")} type="button">தமிழ்</button>
          </div>
        </section>
        <section>
          <div>
            <BookOpenCheck aria-hidden="true" size={18} />
            <strong>Credits &amp; source notes</strong>
            <p>Open licensing and derivative notices are visible rather than hidden.</p>
          </div>
          <a className="rr-text-button" href="/CREDITS.md" rel="noreferrer" target="_blank">Open credits <ArrowUpRight aria-hidden="true" size={15} /></a>
        </section>
        <section>
          <div>
            <RotateCcw aria-hidden="true" size={18} />
            <strong>Reset workspace</strong>
            <p>Show the welcome window again and clear local workstation preferences.</p>
          </div>
          <button className="rr-text-button rr-danger-button" onClick={onResetWorkspace} type="button">Reset locally</button>
        </section>
      </div>
    </div>
  );
}

export function AppContent({ app, ...props }: AppContentProps & { app: AppId }) {
  switch (app) {
    case "welcome":
      return <WelcomeApp {...props} />;
    case "about":
      return <AboutApp {...props} />;
    case "work":
      return <WorkApp language={props.language} />;
    case "proof":
      return <ProofApp language={props.language} />;
    case "resume":
      return <ResumeApp language={props.language} />;
    case "contact":
      return <ContactApp language={props.language} />;
    case "game":
      return <GameTourApp language={props.language} onOpenApp={props.onOpenApp} />;
    case "settings":
      return <SettingsApp {...props} />;
    default:
      return null;
  }
}

export const appDescriptions: Record<AppId, string> = {
  about: "A short, recruiter-first introduction.",
  contact: "Send Rahul a note or open a direct connection.",
  game: "An optional 3D route through the work.",
  proof: "Competition, open-source, and consistency evidence.",
  resume: "The approved public recruiter resume.",
  settings: "Language, credits, and local preferences.",
  welcome: "Start here: the short route through Rahul's work.",
  work: "Evidence-led case notes for Rahul's selected systems.",
};
