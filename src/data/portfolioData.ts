import { Project, Experience, Achievement, Stat } from "../types";

export const personalInfo = {
  name: "Vaibhav Dinkar",
  firstName: "Vaibhav",
  title: "Software Engineer & Founder",
  roles: [
    "Software Engineer @ Stashfin",
    "Founder @ Outlynk",
    "Freelance AI Specialist",
    "Full-Stack · React · TypeScript · Node",
    "LLM Evaluation & Benchmarks",
  ],
  tagline:
    "I build production fintech platforms, AI products and the benchmarks that train frontier models.",
  bio: [
    "I'm a Software Engineer and Founder with 4+ years of experience across production fintech platforms, AI products and LLM training. I like owning things end to end: the architecture, the UI people actually touch, and the rollout that keeps it all running in production.",
    "Right now I'm an SDE at Stashfin, where I'm rebuilding the Loan Management System operator portal on React, TypeScript and a Fastify BFF, along with SAML SSO, SQL-backed RBAC and a Kafka-driven comments pipeline on AWS. Before that I built Bachatt's investment onboarding flow from scratch in under a month, including an AI assistant called Ria.",
    "I also run Outlynk, a staff-augmentation and project-execution studio. Through it I lead AI training and evaluation projects for frontier AI labs with 300+ contributors per project. As a freelance AI specialist I author agentic coding benchmarks (Terminal-Bench, SWE-bench) for Anthropic, Snorkel, Alibaba, Mercor and others, with a 90%+ acceptance rate.",
    "Underneath it all is a love for fundamentals: 800+ DSA problems solved, Rank 1 in the ConnectWise × GFG Engineering Intern Contest, and a habit of mentoring the people I work with.",
  ],
  avatar: "/avatar_vaibhav.jpg",
  photo: "/photo_vaibhav.jpg",
  location: "India",
  email: "vaibhavdinkar2536@gmail.com",
  workEmail: "vaibhav.dinkar@outlynk.in",
  phone: "+91-9759678791",
  website: "https://outlynk.in",
  availability: "Shipping @ Stashfin · Outlynk",
};

export const stats: Stat[] = [
  { value: "4+", label: "Years building" },
  { value: "300+", label: "Contributors led / project" },
  { value: "90%+", label: "Benchmark acceptance" },
  { value: "800+", label: "DSA problems solved" },
];

export const currentlyDoing = [
  { label: "Working", value: "Software Engineer @ Stashfin" },
  { label: "Running", value: "Outlynk: AI training & staff augmentation" },
  { label: "Freelancing", value: "AI Specialist" },
];

export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  institution: "Indian Institute of Information Technology, Sonepat",
  duration: "2021 - 2025",
  cgpa: "8.2/10",
};

export const resume = {
  file: "/Vaibhav_Dinkar_Resume.pdf",
  downloadName: "Vaibhav_Dinkar_Resume.pdf",
  updated: "Nov 2026",
};

export const experiences: Experience[] = [
  {
    id: "outlynk",
    title: "Founder",
    company: "Outlynk",
    duration: "Apr 2025 - Present",
    type: "Founder",
    current: true,
    link: "https://outlynk.in",
    accent: "from-fuchsia-500 to-violet-600",
    summary:
      "Founded and scaled a studio for staff augmentation and end-to-end project execution, with AI training programs for frontier labs at its core.",
    achievements: [
      "Offer **staff augmentation** (senior engineers matched within **72 hours**) and **end-to-end project execution** with milestone billing, integrated QA and documented handover.",
      "Led **7-10 AI training & evaluation projects** for frontier AI labs as the client-facing lead, owning delivery quality and technical mentorship for **300+ contributors per project**.",
      "Lead distributed engineering teams across **US and EU time zones** on B2B SaaS, platform modernization and data-quality programs, setting the hiring bar, quality standards and security practices.",
    ],
    tech: ["Leadership", "Client Delivery", "AI Training", "LLM Evaluation", "Hiring", "QA"],
  },
  {
    id: "stashfin",
    title: "Software Development Engineer",
    company: "Stashfin",
    duration: "Aug 2026 - Present",
    type: "Full-time",
    current: true,
    accent: "from-sky-500 to-blue-600",
    summary:
      "Rebuilding the Loan Management System operator portal: frontend, BFF, auth, permissions and event pipelines.",
    achievements: [
      "Rebuilt the **LMS operator portal** with React, TypeScript and a Fastify BFF aggregating **7 upstream services**; merged **22 legacy tabs into 13** with URL-synced state and cut upstream calls per view from **13 to 6** via request de-duplication.",
      "Built **SAML 2.0 SSO** on Google Workspace (httpOnly JWT sessions, CSRF checks) and SQL-backed **RBAC with 6 roles and 144 permission grants**, audit logging and a shadow-to-enforce rollout; shipped on AWS ECS with Secrets Manager.",
      "Designed an **event-driven comments pipeline**: a Kafka (AWS MSK, IAM auth) consumer persists to S3 with immutable keys and conditional writes, served via cursor-paginated APIs, backed by **2,200+ automated tests**.",
    ],
    tech: ["React", "TypeScript", "Fastify", "Kafka", "AWS ECS", "MSK", "S3", "SAML", "RBAC", "Vitest"],
  },
  {
    id: "bachatt",
    title: "Software Development Engineer",
    company: "Bachatt",
    duration: "Apr 2026 - Jul 2026",
    type: "Full-time",
    accent: "from-emerald-500 to-teal-600",
    summary:
      "Built a web investment onboarding flow and an AI assistant, shipped inside the Bachatt Android app.",
    achievements: [
      "Built the web investment onboarding flow **from scratch in under a month**, from landing to SIP activation across **3 products** (Wealth, Insta FD, Gold & Silver), shipped inside the Android app as a WebView.",
      "Architected a BFF proxy layer, Zustand state and **AI assistant Ria** (RAG-based Q&A, Gemini 2.0 Flash streaming chat, Cartesia TTS), with an **AI Marker Protocol** that lets the AI open modals, pre-fill forms and navigate steps.",
      "Integrated **DigiLocker KYC, UPI mandates** and analytics (Meta Pixel, GA4, CleverTap, AppsFlyer); shipped native features with **Kotlin & Kotlin Multiplatform**.",
    ],
    tech: ["React", "Zustand", "BFF", "RAG", "Gemini", "Kotlin", "KMP", "UPI", "KYC"],
  },
  {
    id: "freelance",
    title: "Freelance AI Specialist",
    company: "Anthropic, Snorkel, Alibaba, Mercor & more",
    duration: "Apr 2022 - Present",
    type: "Freelance",
    current: true,
    accent: "from-amber-500 to-orange-600",
    summary:
      "Writing the hard problems that agentic coding models are trained and benchmarked on.",
    achievements: [
      "Authored high-difficulty tasks for agentic coding benchmarks, including **Terminal-Bench 2.0, 3.0 & 4.0** and **SWE-bench**, delivered in bulk with a **90%+ acceptance rate**.",
      "Delivered AI evaluation, LLM evaluation, prompt engineering and data annotation for **6+ AI labs and data platforms** (Anthropic, Snorkel, Alibaba, Mercor, Handshake, Afterquery), plus expert STEM assessment corpora.",
      "Wrote structured documentation and quality reviews for LLM refinement, upholding standardized quality practices with consistently high accuracy.",
    ],
    tech: ["Python", "Bash", "Docker", "LLM Eval", "Prompt Engineering", "Benchmarks"],
  },
  {
    id: "zingbus",
    title: "Associate Software Development Engineer",
    company: "Zingbus",
    duration: "Aug 2025 - Mar 2026",
    type: "Full-time",
    accent: "from-rose-500 to-pink-600",
    summary:
      "Owned UI development and API integration across B2C and B2B products on mobile and desktop web.",
    achievements: [
      "Owned end-to-end UI development and API integration across **B2C and B2B applications** on both MWeb and DWeb.",
      "Led high-impact modules from scratch (B2C Home Page revamp, Lounge Pass, Trip-Tile price streamlining, Upgrade Journey) which generated **₹10+ lakhs in revenue within 2 months** of launch.",
      "Built and enhanced backend APIs and resolved JIRA-driven frontend and backend bugs to improve performance and stability.",
    ],
    tech: ["React", "Next.js", "Node.js", "REST APIs", "Analytics"],
  },
  {
    id: "turing",
    title: "SDE Intern",
    company: "Turing",
    duration: "Mar 2025 - Jul 2025",
    type: "Internship",
    accent: "from-indigo-500 to-purple-600",
    summary: "AI training documentation for Anthropic's models.",
    achievements: [
      "Developed high-quality PRDs for Anthropic's AI training with **95% technical accuracy**.",
      "Engineered structured documentation to train and refine LLMs like **Claude**.",
      "Collaborated with cross-functional teams on standardized documentation practices.",
    ],
    tech: ["LLM Training", "Technical Writing", "PRDs"],
  },
  {
    id: "codefeast",
    title: "SDE Intern",
    company: "Codefeast",
    duration: "Jul 2024 - Dec 2024",
    type: "Internship",
    accent: "from-cyan-500 to-sky-600",
    summary: "Full-stack MERN development, microservices and deployment automation.",
    achievements: [
      "Built full-stack MERN applications with optimized database schemas, **improving performance by 35%**.",
      "Designed RESTful microservices handling **1,000+ daily user interactions**.",
      "Automated deployments with **CI/CD pipelines** using Docker and AWS.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "Docker", "AWS", "CI/CD"],
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "DocTalk - Healthcare Management System",
    description: "Developed a secure healthcare platform with user authentication and access control for patients and doctors. Created an electronic health record system that safely stores and manages medical data for 1,000+ users. Implemented performance optimizations using Redis caching, reducing page load times by 60%.",
    techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "Redis", "JWT Authentication"],
    liveUrl: "https://vaibhav2536.github.io/Doctalk_Main_Frontend/",
    githubUrl: "https://github.com/vaibhav2536/Doctalk_Main_Backend",
    image: "/doctalk.png"
  },
  {
    id: "2",
    title: "Natours - Travel Booking Platform",
    description: "Built a travel booking website with Stripe payment integration for secure transaction processing. Designed efficient APIs for tour searching, filtering, and booking management with faster response times. Set up an automated email system for sending booking confirmations and travel updates to customers.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API", "Email Integration"],
    liveUrl: "https://natours-jzik.onrender.com",
    githubUrl: "https://github.com/vaibhav2536/Natours",
    image: "/natours.png"
  },
  {
    id: "3",
    title: "TwitClone - Social Media Platform",
    description: "Created a Twitter-like platform with features for posts, comments, likes, and user profiles. Implemented real-time chat and notifications using Socket.IO for instant user interactions. Developed a scalable image and video storage system using AWS S3 for user-generated content.",
    techStack: ["React.js", "Node.js", "Socket.IO", "MongoDB", "AWS S3", "Real-time Features"],
    liveUrl: "https://vaibhav2536.github.io/social-media-web-app/",
    githubUrl: "https://github.com/vaibhav2536/social-media-web-app",
    image: "/TwitClone.png"
  },
  {
    id: "4",
    title: "Pharmacy ML System",
    description: "Machine learning-powered pharmacy management system with predictive analytics for inventory management, drug interaction checking, and automated prescription processing.",
    techStack: ["Python", "Machine Learning", "Flask", "React"],
    liveUrl: "https://pharmacy-ml-1.onrender.com",
    githubUrl: "https://github.com/vaibhav2536/Pharmacy-ML",
    image: "/Pharmacy ML System.png"
  },
  {
    id: "5",
    title: "Chat-GPT Clone",
    description: "A comprehensive ChatGPT clone built with modern technologies. Features include AI-powered conversations, real-time chat interface, and responsive design for seamless user experience.",
    techStack: ["React", "Node.js", "OpenAI API", "JavaScript", "CSS"],
    liveUrl: "https://vercel.com/vaibhav-dinkars-projects/chat-gpt-clone",
    githubUrl: "https://github.com/vaibhav2536/Chat-GPT-Clone",
    image: "/Chat-GPT Clone.png"
  },
  {
    id: "6",
    title: "Madhyasth",
    description: "Madhyasth is a real-time hand gesture recognition system designed to assist deaf and hard-of-hearing individuals in communicating using sign language. Built using Python, the project uses computer vision to detect and classify ASL-inspired gestures such as A, B, D, F, M, W, Y, as well as actions like Victory, Forward, Backward, Left, Right, Like (Good), and Dislike (Bad). Each gesture is identified based on hand landmark positions using MediaPipe and OpenCV, with real-time visual feedback through webcam video.",
    techStack: ["Python", "OpenCV", "MediaPipe", "NumPy", "Streamlit"],
    githubUrl: "https://github.com/vaibhav2536/Madhyasth",
    image: "/madhyasth.png"
  },
  {
    id: "7",
    title: "TrafficScope",
    description: "TrafficScope is a full-stack application designed to detect and analyze road traffic using modern web technologies and AI-powered backend logic. It features a Python-based backend and a Next.js frontend to deliver a responsive and intelligent traffic monitoring solution.",
    techStack: ["Next.js", "TypeScript", "Python", "OpenCV", "Computer Vision"],
    githubUrl: "https://github.com/vaibhav2536/TrafficScope",
    image: "/TrafficScope.jpg"
  }
];

export const achievements: Achievement[] = [
  {
    id: "coding-champion",
    title: "Coding Champion · Rank 1",
    description: "Secured Rank 1 in the ConnectWise × GeeksforGeeks Engineering Intern Contest.",
    date: "2024",
    type: "award",
    featured: true,
    link: "https://practice.geeksforgeeks.org/contest/engineering-intern-contest-connectwise-x-gfg/leaderboard"
  },
  {
    id: "micro1",
    title: "micro1 Certified SDE",
    description: "Passed micro1's AI Interview and was officially certified as a Software Development Engineer.",
    date: "May 2026",
    type: "certification",
    featured: true,
    link: "https://drive.google.com/file/d/1nD6RrsYK82l-9HsdahkGSVOXYEQP0PhJ/view?usp=drive_link"
  },
  {
    id: "benchmarks",
    title: "90%+ Benchmark Acceptance",
    description: "Authored high-difficulty Terminal-Bench 2.0/3.0/4.0 and SWE-bench tasks with a 90%+ acceptance rate.",
    date: "2022 - Present",
    type: "milestone"
  },
  {
    id: "dsa",
    title: "800+ DSA Problems Solved",
    description: "800+ data structures & algorithms problems solved across coding platforms.",
    date: "Ongoing",
    type: "milestone",
    link: "https://codolio.com/profile/vaibhavdinkar"
  },
  {
    id: "aws",
    title: "AWS Cloud Foundations",
    description: "AWS Academy Cloud Foundations certified, covering core AWS services, architecture and security.",
    date: "2024",
    type: "certification",
    link: "https://drive.google.com/file/d/1pwM7f4PDZbrILnb5SqXHBU6Cxz3lUZse/view"
  },
  {
    id: "lor",
    title: "Letter of Recommendation",
    description: "Outstanding recommendation from the Codefeast Founder, rated 9/10 for dedication and technical skill.",
    date: "2024",
    type: "recognition",
    link: "https://drive.google.com/file/d/17IjJ1nTO0K-LrhRGprBoVDCxTU_6Rvxz/view"
  },
  {
    id: "impact-club",
    title: "Technical Lead · Impact Club",
    description: "Managed technical infrastructure for 500+ students at IIIT Sonepat.",
    date: "2022 - 2024",
    type: "recognition"
  },
  {
    id: "sports-club",
    title: "General Secretary · Sports Club",
    description: "Led a 20-member team and managed a ₹1,00,000+ budget at IIIT Sonepat.",
    date: "2022 - 2024",
    type: "recognition"
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/vaibhav2536",
    icon: "Github",
    handle: "@vaibhav2536"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vaibhav-dinkar-80810622b/",
    icon: "Linkedin",
    handle: "in/vaibhav-dinkar"
  },
  {
    name: "Twitter",
    url: "https://x.com/Vaibhav_2536?t=jbhhCp2LC9i9JSDv5ESiEQ&s=08",
    icon: "Twitter",
    handle: "@Vaibhav_2536"
  },
  {
    name: "Codolio",
    url: "https://codolio.com/profile/vaibhavdinkar",
    icon: "Code",
    handle: "Coding profiles"
  },
  {
    name: "Outlynk",
    url: "https://outlynk.in",
    icon: "Rocket",
    handle: "outlynk.in"
  },
  {
    name: "Personal Email",
    url: "mailto:vaibhavdinkar2536@gmail.com",
    icon: "Mail",
    handle: "vaibhavdinkar2536@gmail.com"
  },
  {
    name: "Work Email",
    url: "mailto:vaibhav.dinkar@outlynk.in",
    icon: "AtSign",
    handle: "vaibhav.dinkar@outlynk.in"
  }
];

export const technicalSkills = {
  frontend: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Zustand", "HTML5", "CSS3", "Bootstrap", "Kotlin", "Kotlin Multiplatform", "Web Performance"],
  backend: ["Node.js", "Express.js", "Fastify", "RESTful APIs", "BFF", "Microservices", "Kafka", "MongoDB", "Mongoose", "SQL", "SAML 2.0 SSO", "JWT", "RBAC"],
  aiLlm: ["Python", "LLM Evaluation", "AI Benchmarking", "Prompt Engineering", "RAG", "Data Annotation", "Business Analysis", "Machine Learning", "NumPy", "Pandas", "OpenCV", "MediaPipe"],
  cloudDevOps: ["AWS ECS", "S3", "MSK", "Secrets Manager", "IAM", "EC2", "Docker", "Linux", "Bash", "Git", "CI/CD", "Vitest", "React Testing Library"],
  coreCS: ["Data Structures & Algorithms", "OOPs", "Operating Systems", "System Design", "C", "C++", "SDLC", "Agile"],
  leadership: ["Team Leadership", "Mentorship", "Client Delivery", "Hiring", "Cross-functional Collaboration", "Technical Writing"]
};

/** Short list used in the desktop marquee */
export const coreStack = [
  "React", "TypeScript", "Next.js", "Node.js", "Fastify", "Kafka", "AWS", "Docker",
  "Python", "RAG", "LLM Eval", "Zustand", "Kotlin", "SQL", "MongoDB", "Vitest",
];
