import { basename } from "path";
import { useCallback, useEffect } from "react";
import { type ContainerHookProps } from "components/system/Apps/AppContainer";
import useTitle from "components/system/Window/useTitle";
import { useFileSystem } from "contexts/fileSystem";
import { useProcesses } from "contexts/process";
import { loadFiles } from "utils/functions";
import { useLinkHandler } from "hooks/useLinkHandler";

export type MarkedOptions = {
  headerIds: boolean;
  mangle: boolean;
};

declare global {
  interface Window {
    DOMPurify: {
      sanitize: (text: string) => string;
    };
    marked: {
      parse: (markdownString: string, options: MarkedOptions) => string;
    };
  }
}

const useMarked = ({
  containerRef,
  id,
  loading,
  setLoading,
  url,
}: ContainerHookProps): void => {
  const { readFile } = useFileSystem();
  const { prependFileToTitle } = useTitle(id);
  const { processes: { [id]: { libs = [] } = {} } = {} } = useProcesses();
  const openLink = useLinkHandler();
  const getContainer = useCallback(
    (): HTMLElement | null =>
      containerRef.current?.querySelector("article") as HTMLElement,
    [containerRef]
  );
  const loadFile = useCallback(async () => {
    const container = getContainer();

    try {
      let markdown = (await readFile(url)).toString();

      if (!markdown.trim()) {
        const response = await fetch(encodeURI(url));

        if (!response.ok) throw new Error("Unable to load Markdown file.");

        markdown = await response.text();
      }

      if (!markdown.trim() || !window.DOMPurify || !window.marked) {
        throw new Error("Markdown renderer is unavailable.");
      }

      if (container instanceof HTMLElement) {
        container.classList.remove("drop");
        container.innerHTML = window.DOMPurify.sanitize(
          window.marked.parse(markdown, {
            headerIds: false,
            mangle: false,
          })
        );
        container
          .querySelectorAll("a")
          .forEach((link) =>
            link.addEventListener("click", (event) =>
              openLink(
                event,
                link.href || "",
                link.pathname,
                link.textContent || ""
              )
            )
          );
        container.scrollTop = 0;
      }
    } catch {
      if (container instanceof HTMLElement) {
        container.classList.remove("drop");
        container.textContent =
          "This document could not be loaded. Please try again.";
      }
    } finally {
      prependFileToTitle(basename(url));
    }
  }, [getContainer, openLink, prependFileToTitle, readFile, url]);

  useEffect(() => {
    if (loading) {
      loadFiles(libs)
        .catch(() => false)
        .finally(() => setLoading(false));
    }
  }, [libs, loading, setLoading]);

  useEffect(() => {
    if (!loading) {
      if (url) loadFile();
      else getContainer()?.classList.add("drop");
    }
  }, [getContainer, loadFile, loading, url]);
};

export default useMarked;
