"use client";

import { useEffect, useState, type HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": HTMLAttributes<HTMLElement> & {
        alt: string;
        src: string;
        exposure?: string;
        "auto-rotate"?: boolean;
        "auto-rotate-delay"?: string;
        "camera-controls"?: boolean;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "disable-zoom"?: boolean;
        "environment-image"?: string;
        "field-of-view"?: string;
        "interaction-prompt"?: "auto" | "none";
        loading?: "auto" | "eager" | "lazy";
        "rotation-per-second"?: string;
        "shadow-intensity"?: string;
      };
    }
  }
}

type ModelPortraitProps = {
  alt: string;
  autoRotate?: boolean;
  cameraOrbit: string;
  className?: string;
  loading?: "eager" | "lazy";
  src: string;
};

/**
 * Client-only wrapper around the browser's <model-viewer> custom element.
 * Loading it dynamically keeps WebGL out of the server render and lets the
 * portfolio remain useful when a visitor has a constrained device.
 */
export default function ModelPortrait({
  alt,
  autoRotate = true,
  cameraOrbit,
  className = "",
  loading = "lazy",
  src,
}: ModelPortraitProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [shouldAutoRotate, setShouldAutoRotate] = useState(false);

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
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateRotationPreference = () => setShouldAutoRotate(autoRotate && !mediaQuery.matches);

    updateRotationPreference();
    mediaQuery.addEventListener("change", updateRotationPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateRotationPreference);
    };
  }, [autoRotate]);

  return (
    <div
      aria-busy={!isLoaded && !loadFailed}
      className={`model-portrait ${className} ${isLoaded ? "is-loaded" : ""} ${loadFailed ? "has-error" : ""}`}
    >
      <model-viewer
        alt={alt}
        auto-rotate-delay="6000"
        camera-controls
        camera-orbit={cameraOrbit}
        camera-target="auto auto auto"
        className="model-portrait-viewer"
        disable-zoom
        environment-image="neutral"
        exposure="1.06"
        field-of-view="30deg"
        interaction-prompt="none"
        loading={loading}
        rotation-per-second="14deg"
        shadow-intensity="0.72"
        src={src}
        {...(shouldAutoRotate ? { "auto-rotate": true } : {})}
        onError={() => setLoadFailed(true)}
        onLoad={() => setIsLoaded(true)}
      />
      <span aria-live="polite" className="model-portrait-status">
        {loadFailed ? "3D preview unavailable" : "Loading 3D portrait"}
      </span>
    </div>
  );
}
