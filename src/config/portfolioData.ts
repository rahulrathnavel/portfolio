export const profile = {
  email: "rahulrathnavell5@gmail.com",
  github: "https://github.com/rahulrathnavel",
  headline: "Applied AI/ML engineer and data-driven product builder.",
  leetcode: "https://leetcode.com/rahulrathnavel",
  linkedin: "https://www.linkedin.com/in/rahulrathnavel/",
  name: "Rahul Rathnavel K",
  resume: "/resume/Rahul-Rathnavel-Resume.pdf",
  shortName: "Rahul Rathnavel",
  tagline: "Useful intelligent systems for the real world.",
} as const;

export const links = {
  ragCode: "https://github.com/rahulrathnavel/Multimodel-Rag-",
  ragLive: "https://huggingface.co/spaces/RathnavelRahul/omni",
  rakiApk: "https://github.com/rahulrathnavel/Raki-Chatapp/blob/main/RaKi.apk",
  rakiCode: "https://github.com/rahulrathnavel/Raki-Chatapp",
  voiceApk: "https://github.com/rahulrathnavel/voice-surrogate/releases/download/v1.0.0/app-debug.apk",
  voiceCode: "https://github.com/rahulrathnavel/voice-surrogate",
  votingCode: "https://github.com/rahulrathnavel/BlockChain_Voting_System...",
} as const;

export type ExternalLink = {
  href: string;
  label: string;
};

export type Project = {
  cover?: string;
  id: string;
  kind: string;
  links?: ExternalLink[];
  problem: string;
  role: string;
  stack: string[];
  title: string;
  verdict: string;
};

export const projects: Project[] = [
  {
    cover: "/assets/proof/techgium-finals.jpg",
    id: "smartops",
    kind: "AIOps / national finalist prototype",
    problem:
      "Cloud incidents still force engineers to correlate logs, alerts, root causes, and recovery steps under pressure.",
    role:
      "Led the AI/backend work: model and pipeline development, training, cloud deployment, and the operating flow behind the proof of concept.",
    stack: ["AIOps", "spatio-temporal GNN", "Qwen", "EKS", "Terraform", "Prometheus"],
    title: "SmartOps — turn an incident into an answer.",
    verdict:
      "National finalist: one of 34 teams selected from 62,000+ registrations across 540+ institutes.",
  },
  {
    cover: "/assets/proof/amazon-rank-83.jpg",
    id: "amazon",
    kind: "Machine learning / competition system",
    problem:
      "Predict prices reliably when the leaderboard changes expose what a model has not learned yet.",
    role:
      "Led model development, training, submissions, deployment, and the AI/backend work for Cyber Titans.",
    stack: ["DeBERTa-v3-base", "hybrid pooling", "Log-MAE", "IQR clipping", "NLP regression"],
    title: "Amazon ML Challenge — Rank 900 was only the start.",
    verdict:
      "Cyber Titans finished at Rank 83 with a 45.35 SMAPE final submission after repeated evaluation and tuning rounds.",
  },
  {
    cover: "/assets/projects/smart-glass-hardware.jpeg",
    id: "smart-glass",
    kind: "Edge AI / accessibility prototype",
    problem:
      "Assistive vision should work with real hardware constraints and without treating privacy as an afterthought.",
    role:
      "Built the application and assisted the system integration for the wearable visual-input and mobile experience.",
    stack: ["ESP32-CAM", "Flutter", "object detection", "OCR", "face recognition"],
    title: "Smart Glass Assistant — useful vision, closer to the edge.",
    verdict:
      "A privacy-conscious assistive prototype combining wearable visual input with a mobile application.",
  },
  {
    id: "omni-rag",
    kind: "Live multimodal RAG",
    links: [
      { href: links.ragLive, label: "Open live demo" },
      { href: links.ragCode, label: "View source" },
    ],
    problem:
      "An answer is only useful when a user can inspect the evidence that supports it.",
    role:
      "Built the retrieval and evidence-oriented product flow as a public live prototype.",
    stack: ["RAG", "dense retrieval", "sparse retrieval", "FAISS", "BM25", "PDF evidence"],
    title: "Omni RAG — answers should show their evidence.",
    verdict:
      "Combines dense and sparse retrieval, then returns the exact PDF evidence alongside the answer.",
  },
  {
    id: "voice-surrogate",
    kind: "Android / accessibility",
    links: [
      { href: links.voiceCode, label: "View source" },
      { href: links.voiceApk, label: "Download APK" },
    ],
    problem:
      "A conversation should not need a cloud connection to become accessible.",
    role: "Built the Android accessibility prototype and its bilingual, on-device interaction flow.",
    stack: ["Android", "on-device ML", "bilingual replies", "TTS"],
    title: "Voice Surrogate — give a conversation a voice.",
    verdict:
      "Offline bilingual smart replies and text-to-speech for non-speaking individuals.",
  },
  {
    id: "raki",
    kind: "Mobile / real-time systems",
    links: [
      { href: links.rakiCode, label: "View source" },
      { href: links.rakiApk, label: "Download APK" },
    ],
    problem: "A chat app is a good test of whether a mobile architecture stays understandable as features accumulate.",
    role: "Built the native Android client and its maintainable application structure.",
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM", "real-time messaging"],
    title: "Raki — a real-time chat app with a clean spine.",
    verdict:
      "A native Kotlin and Jetpack Compose chat application with Firebase authentication and messaging.",
  },
  {
    id: "voting",
    kind: "Research / hardware-software prototype",
    links: [{ href: links.votingCode, label: "View source" }],
    problem: "Auditability, identity verification, and physical interfaces all become complicated when they meet in one voting prototype.",
    role: "Built the prototype as an exploratory system, not a production voting claim.",
    stack: ["Next.js", "Solidity", "Flask", "biometric verification", "Arduino"],
    title: "Biometric Voting — explore auditable flows carefully.",
    verdict:
      "A controlled research prototype combining blockchain auditability, biometric verification, and hardware input.",
  },
];

export type Proof = {
  accent: string;
  href?: string;
  image: string;
  label: string;
  linkLabel?: string;
  text: string;
};

export const proofs: Proof[] = [
  {
    accent: "83",
    image: "/assets/proof/amazon-rank-83.jpg",
    label: "Amazon ML Challenge 2025",
    text: "Cyber Titans reached Rank 83 with a 45.35 SMAPE final result after a real iteration cycle: #900 → #83 → #190 → #83.",
  },
  {
    accent: "34",
    image: "/assets/proof/techgium-finals.jpg",
    label: "TECHgium 2026",
    text: "SmartOps was one of 34 national finalist teams selected from 62,000+ registrations.",
  },
  {
    accent: "4×",
    image: "/assets/proof/keras-pr.png",
    label: "Maintainer-merged open source",
    text: "Merged contributions across Keras, SciPy, Matplotlib, and Statsmodels — small, reviewed fixes where correctness matters.",
  },
  {
    accent: "816",
    href: profile.leetcode,
    image: "/assets/proof/leetcode-profile.png",
    label: "LeetCode discipline",
    linkLabel: "Open LeetCode profile",
    text: "Knight level, 816 solved, 2,570 submissions across 351 active days in the supplied profile evidence.",
  },
];

export const openSourcePulls = [
  {
    href: "https://github.com/keras-team/keras/pull/22844",
    image: "/assets/proof/keras-pr.png",
    library: "Keras",
    number: "#22844",
    summary: "Made IoU metric validation safer around out-of-bounds class IDs.",
  },
  {
    href: "https://github.com/scipy/scipy/pull/25209",
    image: "/assets/proof/scipy-pr.png",
    library: "SciPy",
    number: "#25209",
    summary: "Suppressed an unknown pytest marker warning through safer backend handling.",
  },
  {
    href: "https://github.com/matplotlib/matplotlib/pull/31707",
    image: "/assets/proof/matplotlib-pr.png",
    library: "Matplotlib",
    number: "#31707",
    summary: "Prevented a violinplot crash when an input dataset is empty.",
  },
  {
    href: "https://github.com/statsmodels/statsmodels/pull/9812",
    image: "/assets/proof/statsmodels-pr.png",
    library: "Statsmodels",
    number: "#9812",
    summary: "Corrected residual behavior for UECM results.",
  },
] as const;

export const privateWork = [
  {
    label: "Trust / job-signal verification",
    text: "A private workflow for classifying suspicious job listings and matching opportunities to a supplied resume. Client and data remain confidential.",
  },
  {
    label: "Health research / decision support",
    text: "A research prototype combining tabular and image-led signals with nearby-care discovery. It is not a diagnostic product or medical advice.",
  },
  {
    label: "Field telemetry / agriculture",
    text: "A mobile view of wirelessly collected Arduino sensor readings so growers can check field conditions remotely.",
  },
  {
    label: "Privacy research / smart-grid ML",
    text: "An ML workflow exploring predictions over protected smart-grid data without exposing sensitive source information.",
  },
] as const;
