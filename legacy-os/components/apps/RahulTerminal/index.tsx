import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import StyledRahulTerminal from "components/apps/RahulTerminal/StyledRahulTerminal";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useProcesses } from "contexts/process";

type LineTone = "input" | "output" | "success" | "warning";

type TerminalLine = {
  id: number;
  text: string;
  tone: LineTone;
};

type NewTerminalLine = Omit<TerminalLine, "id">;

const EMAIL_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=rahulrathnavell5%40gmail.com&su=Hello%20Rahul";
const GITHUB_URL = "https://github.com/rahulrathnavel";
const LEETCODE_URL = "https://leetcode.com/rahulrathnavel";
const LINKEDIN_URL = "https://www.linkedin.com/in/rahulrathnavel/";
const RESUME_URL = "/Users/Public/Documents/Rahul-Rathnavel-Resume.pdf";
const ROOT_DIRECTORY = "/Users/Public/Portfolio";

const MATRIX_COLUMNS = [
  { id: "binary-a", text: "01\n10\n11\n01\n00\n10" },
  { id: "ai-a", text: "ai\nml\n01\n10\n11\n00" },
  { id: "syntax-a", text: "{}\n[]\n<>\n//\n==\n=>" },
  { id: "binary-b", text: "10\n01\n11\n00\n10\n01" },
  { id: "ai-b", text: "ml\nai\n++\n--\n==\n!=" },
  { id: "binary-c", text: "00\n11\n01\n10\n00\n11" },
  { id: "syntax-b", text: "::\n//\n{}\n[]\n<>\n()" },
  { id: "binary-d", text: "11\n10\n01\n00\n11\n10" },
  { id: "ai-c", text: "ai\n01\nml\n10\n++\n{}" },
  { id: "binary-e", text: "01\n00\n11\n10\n01\n00" },
  { id: "syntax-c", text: "<>\n{}\n[]\n()\n//\n::" },
  { id: "binary-f", text: "10\n11\n00\n01\n10\n11" },
  { id: "ai-d", text: "ml\nai\n10\n01\n{}\n[]" },
  { id: "binary-g", text: "00\n01\n10\n11\n00\n01" },
  { id: "syntax-d", text: "//\n<>\n{}\n[]\n()\n==" },
  { id: "binary-h", text: "11\n00\n10\n01\n11\n00" },
  { id: "ai-e", text: "ai\nml\n++\n--\n01\n10" },
  { id: "binary-i", text: "01\n10\n00\n11\n01\n10" },
];

const DIRECTORY_NAMES: Record<string, string> = {
  achievements: "Achievements",
  certificates: "Certificates",
  failures: "Failures",
  hackathons: "Hackathons",
  "lessons-learned": "Lessons Learned",
  "open-source": "Open Source",
  projects: "Projects",
  research: "Research",
};

const FILES: Record<string, string> = {
  "about.md":
    "Rahul Rathnavel K\nApplied AI/ML engineer working across ML, data systems, mobile products, cloud deployment, and open source.",
  "achievements.md":
    "Proof points\n* Amazon ML Challenge 2025 - Rank 83 / Top 2%\n* TECHgium 2026 - National finalist / Top 1%\n* Maintainer-merged open-source contributions\nUse the Proof & Achievements folder for the full evidence.",
  "contact.txt":
    "Email: rahulrathnavell5@gmail.com\nLinkedIn: linkedin.com/in/rahulrathnavel\nGitHub: github.com/rahulrathnavel",
  "lessons-learned.txt":
    "Build a working system early. Measure honestly. Fix what fails. Keep the result understandable enough for people to use.",
  "projects.md":
    "Selected work\n* SmartOps - autonomous incident-resolution concept\n* Omni RAG - multimodal retrieval application\n* Raki - chat application\n* Voice Surrogate - assistive mobile app\n* Blockchain Voting - secure voting prototype\nOpen the Selected Work folder for the case notes and links.",
  "readme.md":
    "Rahul Rathnavel Portfolio\nA compact desktop for work, proof, and a few thoughtful easter eggs. Type help to explore.",
  "resume.txt":
    "Verified recruiter resume available at /Users/Public/Documents/Rahul-Rathnavel-Resume.pdf",
};

const initialLines: TerminalLine[] = [
  {
    id: 0,
    text: "Rahul Terminal v2.6 - portfolio shell ready.",
    tone: "success",
  },
  {
    id: 1,
    text: "Type help for commands. This terminal opens only Rahul's approved portfolio links.",
    tone: "output",
  },
];

const openExternal = (url: string): void => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const normalizeDirectory = (value: string): string =>
  value.trim().toLowerCase().replaceAll(" ", "-").replaceAll("/", "");

const normalizeFile = (value: string): string => {
  const filename = value.trim().split("/").findLast(Boolean) || "";

  return filename.toLowerCase();
};

const scrollToBottom = (element: HTMLDivElement | null): void => {
  element?.scrollIntoView({ block: "end" });
};

const RahulTerminal: FC<ComponentProcessProps> = ({ id }) => {
  const { closeWithTransition } = useProcesses();
  const [command, setCommand] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState(ROOT_DIRECTORY);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>();
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineIdRef = useRef(2);

  const appendLines = useCallback((nextLines: NewTerminalLine[]): void => {
    setLines((currentLines) => [
      ...currentLines,
      ...nextLines.map((line) => ({
        ...line,
        id: lineIdRef.current++,
      })),
    ]);
  }, []);

  const executeCommand = useCallback(
    (rawCommand: string): void => {
      const trimmedCommand = rawCommand.trim();

      if (!trimmedCommand) return;

      const [firstWord = "", ...arguments_] = trimmedCommand.split(/\s+/);
      const operation = firstWord.toLowerCase();
      const argument = arguments_.join(" ");

      if (operation === "clear") {
        setLines([]);
        return;
      }

      appendLines([
        {
          text: `${currentDirectory}$ ${trimmedCommand}`,
          tone: "input",
        },
      ]);

      switch (operation) {
        case "help":
          appendLines([
            {
              text: "Explore: about | projects | skills | resume | contact\nNavigate: ls | cd <folder> | cat <file>\nLinks: github | linkedin | ping leetcode\nSystem: clear | matrix | whoami | pwd | sudo hire rahul | hack | exit\nBonus: iddqd | coffee | rm -rf bugs",
              tone: "output",
            },
          ]);
          break;
        case "about":
          appendLines([{ text: FILES["about.md"], tone: "output" }]);
          break;
        case "projects":
          appendLines([{ text: FILES["projects.md"], tone: "output" }]);
          break;
        case "resume":
          openExternal(RESUME_URL);
          appendLines([
            {
              text: "Opening Rahul's verified resume in a new tab.",
              tone: "success",
            },
          ]);
          break;
        case "skills":
          appendLines([
            {
              text: "AI/ML engineering | data science & applied modelling | software/product engineering\nWorking strengths: retrieval systems, model evaluation, cloud deployment, mobile apps, observability, and clear product thinking.",
              tone: "output",
            },
          ]);
          break;
        case "contact":
          openExternal(EMAIL_URL);
          appendLines([
            {
              text: "Opening Gmail compose in a new tab. Thoughtful notes are welcome.",
              tone: "success",
            },
          ]);
          break;
        case "matrix":
          setMatrixEnabled((enabled) => !enabled);
          window.dispatchEvent(new CustomEvent("portfolio:matrix"));
          appendLines([
            {
              text: "Matrix rain toggled. The terminal remains fully usable.",
              tone: "success",
            },
          ]);
          break;
        case "sudo":
          if (argument.toLowerCase() === "hire rahul") {
            window.dispatchEvent(
              new CustomEvent("portfolio:cheat", {
                detail: { code: "sudo hire rahul" },
              })
            );
            appendLines([
              {
                text: "Access granted.\nHiring decision: APPROVED\n(That was the easy part.)",
                tone: "success",
              },
            ]);
          } else {
            appendLines([
              {
                text: "sudo: Rahul's portfolio shell accepts one friendly escalation: sudo hire rahul",
                tone: "warning",
              },
            ]);
          }
          break;
        case "whoami":
          appendLines([
            {
              text: "rahul - applied AI/ML engineer and product-minded builder",
              tone: "output",
            },
          ]);
          break;
        case "pwd":
          appendLines([{ text: currentDirectory, tone: "output" }]);
          break;
        case "hack":
          appendLines([
            {
              text: "Ethical mode enabled. The only thing being hacked is a clearer path to the work.",
              tone: "success",
            },
          ]);
          break;
        case "github":
          openExternal(GITHUB_URL);
          appendLines([
            { text: "Opening GitHub in a new tab.", tone: "success" },
          ]);
          break;
        case "linkedin":
          openExternal(LINKEDIN_URL);
          appendLines([
            { text: "Opening LinkedIn in a new tab.", tone: "success" },
          ]);
          break;
        case "exit":
          closeWithTransition(id);
          break;
        case "ls":
          appendLines([
            {
              text: "Projects/  Certificates/  Hackathons/  Research/  Open Source/\nAchievements/  Failures/  Lessons Learned/\nREADME.md  about.md  projects.md  achievements.md  contact.txt  resume.txt",
              tone: "output",
            },
          ]);
          break;
        case "cd": {
          const folder = normalizeDirectory(argument);

          if (["", "~", "root", ".."].includes(folder)) {
            setCurrentDirectory(ROOT_DIRECTORY);
            appendLines([{ text: ROOT_DIRECTORY, tone: "output" }]);
          } else if (DIRECTORY_NAMES[folder]) {
            const nextDirectory = `${ROOT_DIRECTORY}/${DIRECTORY_NAMES[folder]}`;

            setCurrentDirectory(nextDirectory);
            appendLines([{ text: nextDirectory, tone: "output" }]);
          } else {
            appendLines([
              {
                text: `cd: no portfolio folder named '${argument}'. Run ls to browse the available folders.`,
                tone: "warning",
              },
            ]);
          }
          break;
        }
        case "cat": {
          const filename = normalizeFile(argument);
          const file = FILES[filename];

          if (file) {
            appendLines([{ text: file, tone: "output" }]);
          } else if (filename) {
            appendLines([
              {
                text: `cat: '${argument}' is not a readable portfolio note. Run ls to browse files.`,
                tone: "warning",
              },
            ]);
          } else {
            appendLines([
              {
                text: "cat: choose a file, for example: cat projects.md",
                tone: "warning",
              },
            ]);
          }
          break;
        }
        case "ping":
          if (argument.toLowerCase() === "leetcode") {
            openExternal(LEETCODE_URL);
            appendLines([
              {
                text: "Live LeetCode lookup is unavailable in this local portfolio shell. Opening Rahul's profile in a new tab instead - no contest rating guessed.",
                tone: "warning",
              },
            ]);
          } else {
            appendLines([{ text: "Usage: ping leetcode", tone: "warning" }]);
          }
          break;
        case "iddqd":
          window.dispatchEvent(
            new CustomEvent("portfolio:cheat", { detail: { code: "iddqd" } })
          );
          appendLines([
            {
              text: "Invincible mode enabled. The portfolio was already carefully tested.",
              tone: "success",
            },
          ]);
          break;
        case "coffee":
          window.dispatchEvent(
            new CustomEvent("portfolio:cheat", { detail: { code: "coffee" } })
          );
          appendLines([
            {
              text: "Coding speed +300%. Hydration still recommended.",
              tone: "success",
            },
          ]);
          break;
        case "rm":
          if (argument === "-rf bugs") {
            window.dispatchEvent(
              new CustomEvent("portfolio:cheat", {
                detail: { code: "rm -rf bugs" },
              })
            );
            appendLines([
              {
                text: "Scanning... bugs removed from the fictional directory. Production work still gets tests.",
                tone: "success",
              },
            ]);
          } else {
            appendLines([
              {
                text: "rm: this portfolio shell only understands: rm -rf bugs",
                tone: "warning",
              },
            ]);
          }
          break;
        default:
          window.dispatchEvent(
            new CustomEvent("portfolio:bsod", {
              detail: { code: "ERR_COFFEE_NOT_FOUND" },
            })
          );
          appendLines([
            {
              text: `${firstWord}: command not found. Type help for the useful commands.`,
              tone: "warning",
            },
          ]);
      }
    },
    [appendLines, closeWithTransition, currentDirectory, id]
  );

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:terminal-open"));
    inputRef.current?.focus();
  }, []);

  const submitCommand = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      const nextCommand = command.trim();

      if (!nextCommand) return;

      setHistory((currentHistory) => [
        ...currentHistory.filter((item) => item !== nextCommand),
        nextCommand,
      ]);
      setHistoryIndex(undefined);
      executeCommand(nextCommand);
      setCommand("");
    },
    [command, executeCommand]
  );

  const cycleHistory = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

      event.preventDefault();

      if (history.length === 0) return;

      const currentIndex = historyIndex ?? history.length;
      const nextIndex =
        event.key === "ArrowUp"
          ? Math.max(0, currentIndex - 1)
          : Math.min(history.length, currentIndex + 1);

      setHistoryIndex(nextIndex);
      setCommand(nextIndex === history.length ? "" : history[nextIndex] || "");
    },
    [history, historyIndex]
  );

  return (
    <StyledRahulTerminal
      aria-label="Rahul Terminal"
      onClick={() => inputRef.current?.focus()}
    >
      {matrixEnabled && (
        <div aria-hidden="true" className="terminal-matrix">
          {MATRIX_COLUMNS.map(({ id: columnId, text }) => (
            <span key={columnId} className="terminal-matrix-column">
              {text}
            </span>
          ))}
        </div>
      )}
      <header className="terminal-header">
        <span aria-hidden="true" className="terminal-led" />
        <span className="terminal-title">Rahul Terminal</span>
        <span className="terminal-status">
          {matrixEnabled ? "matrix mode" : "portfolio shell"}
        </span>
      </header>
      <section aria-live="polite" className="terminal-body" role="log">
        {lines.map(({ id: lineId, text, tone }) => (
          <div key={lineId} className={`terminal-line terminal-line-${tone}`}>
            {tone === "input" ? (
              <>
                <span className="terminal-prompt">{text.split("$ ")[0]}$ </span>
                <span className="terminal-command">
                  {text.split("$ ").slice(1).join("$ ")}
                </span>
              </>
            ) : (
              text
            )}
          </div>
        ))}
        <form className="terminal-form" onSubmit={submitCommand}>
          <label className="terminal-prompt" htmlFor={`rahul-terminal-${id}`}>
            {currentDirectory}$
          </label>
          <input
            ref={inputRef}
            aria-label="Type a Rahul Terminal command"
            autoCapitalize="none"
            autoComplete="off"
            className="terminal-input"
            id={`rahul-terminal-${id}`}
            onChange={({ currentTarget: { value } }) => setCommand(value)}
            onKeyDown={cycleHistory}
            placeholder="help"
            spellCheck="false"
            value={command}
          />
          <button className="terminal-run" type="submit">
            Run
          </button>
        </form>
        <div key={lines.length} ref={scrollToBottom} />
      </section>
      <footer className="terminal-footer">
        <span>Ctrl + Alt + T opens this shell</span>
        <span>Enter a command | Up/Down history</span>
      </footer>
    </StyledRahulTerminal>
  );
};

export default memo(RahulTerminal);
