import { memo, useEffect, useRef, useState } from "react";
import StyledRecycleBin from "components/apps/RecycleBin/StyledRecycleBin";
import { type ComponentProcessProps } from "components/system/Apps/RenderComponent";

type DialogState = "closed" | "check" | "secret";
type AdminResponse = "yes" | "no";

const PREFERENCES_KEY = "rahul-os:preferences:v1";
const SECRET_MESSAGE =
  "I knew you would open this. I also know you are not the admin. This is my secret file\u2014but I do not have secrets or API keys hiding here. Just a portfolio trying to make you smile.";

const isSoundEnabled = (): boolean => {
  try {
    const storedPreferences = window.localStorage.getItem(PREFERENCES_KEY);

    if (!storedPreferences) return false;

    const parsedPreferences: unknown = JSON.parse(storedPreferences);

    return (
      typeof parsedPreferences === "object" &&
      parsedPreferences !== null &&
      "soundEnabled" in parsedPreferences &&
      parsedPreferences.soundEnabled === true
    );
  } catch {
    return false;
  }
};

const playWhoosh = (): boolean => {
  try {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startTime = context.currentTime;
    const endTime = startTime + 0.24;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(310, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(75, endTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.075, startTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(endTime);

    return true;
  } catch {
    return false;
  }
};

const RecycleBin: FC<ComponentProcessProps> = () => {
  const [adminResponse, setAdminResponse] = useState<AdminResponse>("no");
  const [dialogState, setDialogState] = useState<DialogState>("closed");
  const [isEmpty, setIsEmpty] = useState(false);
  const [status, setStatus] = useState(
    "Recycle Bin is practically empty. One harmless file remains."
  );
  const primaryDialogActionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (dialogState !== "closed") primaryDialogActionRef.current?.focus();
  }, [dialogState]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setDialogState("closed");
    };

    if (dialogState !== "closed") {
      window.addEventListener("keydown", closeOnEscape);
    }

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [dialogState]);

  const openSecretCheck = (): void => {
    if (!isEmpty) setDialogState("check");
  };

  const revealSecret = (response: AdminResponse): void => {
    setAdminResponse(response);
    setDialogState("secret");
  };

  const closeDialog = (): void => {
    setDialogState("closed");
  };

  const emptyRecycleBin = (): void => {
    const soundEnabled = isSoundEnabled();
    const playedWhoosh = soundEnabled && playWhoosh();

    setDialogState("closed");
    setIsEmpty(true);
    setStatus(
      playedWhoosh
        ? "Recycle Bin emptied. A tiny desktop whoosh played."
        : soundEnabled
          ? "Recycle Bin emptied. Sound was enabled, but this browser kept it quiet."
          : "Recycle Bin emptied. Sound is off in Settings, so it stayed politely quiet."
    );
  };

  return (
    <StyledRecycleBin aria-label="Recycle Bin">
      <header className="recycle-bin__header">
        <div>
          <p className="recycle-bin__eyebrow">System storage</p>
          <h1>Recycle Bin</h1>
        </div>
        <button
          className="recycle-bin__empty-button"
          disabled={isEmpty}
          onClick={emptyRecycleBin}
          type="button"
        >
          Empty Recycle Bin
        </button>
      </header>

      <section
        aria-labelledby="recycle-bin-summary"
        className="recycle-bin__content"
      >
        <div className="recycle-bin__summary">
          <span aria-hidden="true" className="recycle-bin__summary-mark" />
          <div>
            <h2 id="recycle-bin-summary">
              {isEmpty
                ? "Nothing to recover"
                : "Nothing important is deleted here"}
            </h2>
            <p>
              {isEmpty
                ? "The bin is empty. Even the joke has been responsibly recycled."
                : "One small file is waiting. It insists it is not a security incident."}
            </p>
          </div>
        </div>

        {!isEmpty && (
          <ul aria-label="Recycle Bin files" className="recycle-bin__file-list">
            <li>
              <button
                className="recycle-bin__file"
                onDoubleClick={openSecretCheck}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openSecretCheck();
                  }
                }}
                type="button"
              >
                <span aria-hidden="true" className="recycle-bin__file-icon">
                  TXT
                </span>
                <span className="recycle-bin__file-details">
                  <strong>secrets.txt</strong>
                  <span>1 KB / system note / double-click to inspect</span>
                </span>
              </button>
            </li>
          </ul>
        )}

        <p aria-live="polite" className="recycle-bin__status" role="status">
          {status}
        </p>
      </section>

      {dialogState !== "closed" && (
        <div className="recycle-bin__dialog-backdrop">
          <div
            aria-describedby="recycle-bin-dialog-copy"
            aria-labelledby="recycle-bin-dialog-title"
            aria-modal="true"
            className="recycle-bin__dialog"
            role="dialog"
          >
            <div className="recycle-bin__dialog-topline">
              <span>System access</span>
              <button
                aria-label="Close dialog"
                className="recycle-bin__dialog-close"
                onClick={closeDialog}
                type="button"
              >
                &times;
              </button>
            </div>

            {dialogState === "check" ? (
              <>
                <h2 id="recycle-bin-dialog-title">Administrator check</h2>
                <p id="recycle-bin-dialog-copy">
                  This file is marked for system administrators only. Are you a
                  system administrator?
                </p>
                <div className="recycle-bin__dialog-actions">
                  <button
                    ref={primaryDialogActionRef}
                    className="recycle-bin__primary-action"
                    onClick={() => revealSecret("yes")}
                    type="button"
                  >
                    Yes, I am
                  </button>
                  <button
                    className="recycle-bin__secondary-action"
                    onClick={() => revealSecret("no")}
                    type="button"
                  >
                    No, but I am curious
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 id="recycle-bin-dialog-title">secrets.txt</h2>
                <p className="recycle-bin__dialog-response">
                  {adminResponse === "yes"
                    ? "Access granted. Briefly."
                    : "Honesty noted. Curiosity is still allowed."}
                </p>
                <p id="recycle-bin-dialog-copy">{SECRET_MESSAGE}</p>
                <div className="recycle-bin__dialog-actions">
                  <button
                    ref={primaryDialogActionRef}
                    className="recycle-bin__primary-action"
                    onClick={closeDialog}
                    type="button"
                  >
                    Close file
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </StyledRecycleBin>
  );
};

export default memo(RecycleBin);
