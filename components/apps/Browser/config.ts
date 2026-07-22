import { type ProxyState } from "components/apps/Browser/useProxyMenu";
import { get9pModifiedTime } from "contexts/fileSystem/core";
import { FAVICON_BASE_PATH } from "utils/constants";

type Bookmark = {
  icon: string;
  name: string;
  path?: string;
  url: string;
};

type WaybackUrlInfo = {
  archived_snapshots: { closest: { url: string } };
};

export const DINO_GAME = {
  icon: "/System/Icons/pinball.webp",
  name: "RR Game Tour",
  path: "/game-tour/index.html?mode=guided",
  url: "https://rahulrathnavel.dev/game-tour/index.html?mode=guided",
};

export const SURF_TO_MISC = {
  icon: "/System/Icons/marked.webp",
  name: "Omni RAG",
  path: "/Users/Public/Documents/Selected Work/04 Omni RAG.md",
  url: "https://huggingface.co/spaces/RathnavelRahul/omni",
};

export const bookmarks: Bookmark[] = [
  {
    icon: FAVICON_BASE_PATH,
    name: "Rahul Rathnavel Portfolio",
    url: "https://rahulrathnavel.dev/",
  },
  {
    icon: "/System/Icons/marked.webp",
    name: "GitHub",
    url: "https://github.com/rahulrathnavel",
  },
  {
    icon: "/System/Icons/marked.webp",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/rahulrathnavel/",
  },
  ...(get9pModifiedTime(SURF_TO_MISC.path) === -1 ? [] : [SURF_TO_MISC]),
  DINO_GAME,
  {
    icon: "/System/Icons/marked.webp",
    name: "Omni RAG live demo",
    url: "https://huggingface.co/spaces/RathnavelRahul/omni",
  },
];

export const HOME_PAGE = "https://rahulrathnavel.dev/";

export const NOT_FOUND =
  '<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN"><html><head><title>404 Not Found</title><style>h1{display:inline;}</style></head><body><h1>Not Found</h1><p>The requested URL was not found on this server.</p></body></html>';

const OLD_NET_PROXY =
  "https://theoldnet.com/get?scripts=true&decode=true&year=<year>&url=";

export const OLD_NET_SUPPORTED_YEARS = [
  1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
  2009, 2010, 2011, 2012,
];

const WAYBACK_URL_INFO = "https://archive.org/wayback/available?url=";

export const PROXIES: Record<
  ProxyState,
  ((url: string) => Promise<string> | string) | undefined
> = {
  ALL_ORIGINS: (url) => `https://api.allorigins.win/raw?url=${url}`,
  CORS: undefined,
  WAYBACK_MACHINE: async (url) => {
    try {
      const urlInfoResponse = await fetch(`${WAYBACK_URL_INFO}${url}`);
      const { archived_snapshots } =
        (await urlInfoResponse.json()) as WaybackUrlInfo;

      if (archived_snapshots.closest.url) {
        let addressUrl = archived_snapshots.closest.url;

        if (
          addressUrl.startsWith("http:") &&
          window.location.protocol === "https:"
        ) {
          addressUrl = addressUrl.replace("http:", "https:");
        }

        return addressUrl;
      }
    } catch {
      // Ignore failure to fetch url
    }

    return url;
  },
  ...Object.fromEntries(
    OLD_NET_SUPPORTED_YEARS.map((year) => [
      `OLD_NET_${year}`,
      (url) => `${OLD_NET_PROXY.replace("<year>", year.toString())}${url}`,
    ])
  ),
};
