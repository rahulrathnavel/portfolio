"use client";

import { useEffect, useRef, useState, type ComponentType, type HTMLAttributes, type Ref } from "react";

type ModelPortraitProps = {
  alt: string;
  cameraOrbit: string;
  className?: string;
  loading?: "eager" | "lazy";
  src: string;
};

type OrbitGoal = {
  phi: number;
  radius: string;
  theta: number;
};

type ModelViewerElement = HTMLElement & {
  cameraOrbit: string;
  getCameraOrbit?: () => {
    phi: number;
    radius: number;
    theta: number;
  };
  loaded?: boolean;
};

type ModelViewerProps = HTMLAttributes<ModelViewerElement> & {
  alt: string;
  src: string;
  exposure?: string;
  "camera-controls"?: boolean;
  "camera-orbit"?: string;
  "camera-target"?: string;
  "disable-pan"?: boolean;
  "disable-tap"?: boolean;
  "disable-zoom"?: boolean;
  "environment-image"?: string;
  "field-of-view"?: string;
  "interpolation-decay"?: string;
  "interaction-prompt"?: "auto" | "none";
  loading?: "auto" | "eager" | "lazy";
  ref?: Ref<ModelViewerElement>;
  "shadow-intensity"?: string;
};

const ModelViewer = "model-viewer" as unknown as ComponentType<ModelViewerProps>;

const HORIZONTAL_LOOK_RANGE = 8;
const VERTICAL_LOOK_RANGE = 4.5;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function parseCameraOrbit(value: string): OrbitGoal {
  const [theta = "0deg", phi = "75deg", radius = "105%"] = value.trim().split(/\s+/);

  return {
    phi: Number.parseFloat(phi),
    radius,
    theta: Number.parseFloat(theta),
  };
}

function formatCameraOrbit({ phi, radius, theta }: OrbitGoal) {
  return `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg ${radius}`;
}

/**
 * Client-only wrapper around the browser's <model-viewer> custom element.
 * Loading it dynamically keeps WebGL out of the server render and lets the
 * portfolio remain useful when a visitor has a constrained device.
 */
export default function ModelPortrait({
  alt,
  cameraOrbit,
  className = "",
  loading = "lazy",
  src,
}: ModelPortraitProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [cursorMotionEnabled, setCursorMotionEnabled] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const initialOrbit = parseCameraOrbit(cameraOrbit);
  const baseOrbitRef = useRef<OrbitGoal>(initialOrbit);
  const draggingRef = useRef(false);
  const pendingOrbitRef = useRef<OrbitGoal>(initialOrbit);
  const viewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    let isCurrent = true;

    void import("@google/model-viewer").catch(() => {
      if (isCurrent) setLoadFailed(true);
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const markLoaded = () => setIsLoaded(true);
    const markFailed = () => setLoadFailed(true);

    viewer.addEventListener("load", markLoaded);
    viewer.addEventListener("error", markFailed);
    if (viewer.loaded) markLoaded();

    return () => {
      viewer.removeEventListener("load", markLoaded);
      viewer.removeEventListener("error", markFailed);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setCursorMotionEnabled(!mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const nextOrbit = parseCameraOrbit(cameraOrbit);
    baseOrbitRef.current = nextOrbit;
    pendingOrbitRef.current = nextOrbit;

    if (isLoaded && viewerRef.current) {
      viewerRef.current.cameraOrbit = formatCameraOrbit(nextOrbit);
    }
  }, [cameraOrbit, isLoaded]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !isLoaded || !cursorMotionEnabled) return;

    const queueCameraOrbit = (orbit: OrbitGoal) => {
      pendingOrbitRef.current = orbit;

      if (animationFrameRef.current !== null) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        animationFrameRef.current = null;
        if (viewerRef.current) viewerRef.current.cameraOrbit = formatCameraOrbit(pendingOrbitRef.current);
      });
    };

    const resetCursorOrbit = () => {
      if (!draggingRef.current) queueCameraOrbit(baseOrbitRef.current);
    };

    const followCursor = (event: PointerEvent) => {
      if (draggingRef.current || event.pointerType !== "mouse" || event.buttons !== 0) return;

      const bounds = viewer.getBoundingClientRect();
      const horizontal = clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1);
      const vertical = clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1);
      const baseOrbit = baseOrbitRef.current;

      queueCameraOrbit({
        phi: clamp(baseOrbit.phi + vertical * VERTICAL_LOOK_RANGE, 8, 172),
        radius: baseOrbit.radius,
        theta: baseOrbit.theta - horizontal * HORIZONTAL_LOOK_RANGE,
      });
    };

    const beginManualOrbit = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      draggingRef.current = true;
    };

    const finishManualOrbit = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      requestAnimationFrame(() => {
        const liveOrbit = viewerRef.current?.getCameraOrbit?.();

        if (liveOrbit) {
          baseOrbitRef.current = {
            phi: liveOrbit.phi * (180 / Math.PI),
            radius: `${liveOrbit.radius}m`,
            theta: liveOrbit.theta * (180 / Math.PI),
          };
        }

        draggingRef.current = false;
      });
    };

    viewer.addEventListener("pointerdown", beginManualOrbit);
    viewer.addEventListener("pointercancel", finishManualOrbit);
    viewer.addEventListener("pointerleave", resetCursorOrbit);
    viewer.addEventListener("pointermove", followCursor);
    viewer.addEventListener("pointerup", finishManualOrbit);
    viewer.addEventListener("mouseleave", resetCursorOrbit);

    return () => {
      viewer.removeEventListener("pointerdown", beginManualOrbit);
      viewer.removeEventListener("pointercancel", finishManualOrbit);
      viewer.removeEventListener("pointerleave", resetCursorOrbit);
      viewer.removeEventListener("pointermove", followCursor);
      viewer.removeEventListener("pointerup", finishManualOrbit);
      viewer.removeEventListener("mouseleave", resetCursorOrbit);
    };
  }, [cursorMotionEnabled, isLoaded]);

  return (
    <div
      aria-busy={!isLoaded && !loadFailed}
      className={`model-portrait ${className} ${isLoaded ? "is-loaded" : ""} ${loadFailed ? "has-error" : ""}`}
    >
      <ModelViewer
        alt={alt}
        camera-controls
        camera-orbit={cameraOrbit}
        camera-target="auto auto auto"
        className="model-portrait-viewer"
        disable-pan
        disable-tap
        disable-zoom
        environment-image="neutral"
        exposure="1.06"
        field-of-view="30deg"
        interpolation-decay="110"
        interaction-prompt="none"
        loading={loading}
        ref={viewerRef}
        shadow-intensity="0.72"
        src={src}
      />
      <span aria-live="polite" className="model-portrait-status">
        {loadFailed ? "3D preview unavailable" : "Loading 3D portrait"}
      </span>
    </div>
  );
}
