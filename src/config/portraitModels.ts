/**
 * Swap a portrait without touching the page layout or 3D interaction code:
 * 1. Put the replacement .glb file in public/assets/models/.
 * 2. Update only the matching `src` value below.
 */
export const portraitModels = {
  hero: {
    alt: "Stylized 3D portrait of Rahul Rathnavel",
    cameraOrbit: "-12deg 78deg 108%",
    src: "/assets/models/rahul-blue-wall-selfie.glb",
  },
  contact: {
    alt: "Stylized 3D portrait of Rahul giving two thumbs up",
    cameraOrbit: "16deg 78deg 105%",
    src: "/assets/models/rahul-two-thumbs-up.glb",
  },
} as const;
