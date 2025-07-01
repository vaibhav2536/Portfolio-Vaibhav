import { Project, Experience, Achievement } from '../types';

export const personalInfo = {
  name: "Vaibhav Dinkar",
  title: "Software Developer",
  bio: "I'm a passionate Software Developer with hands-on experience in building robust and scalable applications using the MERN stack and AWS. I enjoy crafting efficient systems and optimizing performance across the stack, with a proven ability to boost application speed and reliability. With over 400+ DSA problems solved at a 90%+ success rate, I bring strong problem-solving skills and a solid grasp of core computer science fundamentals. My growing interest in Data Science complements my development skills, allowing me to approach problems with both engineering precision and data-driven insight. I've contributed to fast-paced teams and companies where I built and maintained high-quality software solutions while fostering collaboration and technical excellence. I also have experience leading teams and managing technical initiatives—balancing code with communication and impact. Let's build something meaningful and innovative together!",
  avatar: "/photo_vaibhav.jpg",
  location: "India",
  email: "vaibhavdinkar2536@gmail.com",
  phone: "+91-9759678791"
};

export const education = {
  degree: "Bachelor of Technology in Computer Science & Engineering",
  institution: "Indian Institute of Information Technology, Sonepat",
  duration: "2021 - 2025",
  cgpa: "8.2/10"
};

export const experiences: Experience[] = [
  {
    id: "1",
    title: "Software Development Engineer",
    company: "Turing",
    duration: "Mar 2025 - Present",
    description: "Developing high-quality, technically robust Product Requirement Documents (PRDs) for Anthropic's AI training initiatives",
    achievements: [
      "Creating structured PRDs that successfully pass multiple technical test cases with 95% accuracy standards",
      "Engineering specialized documentation used to train and refine Large Language Models (LLMs) like Claude",
      "Collaborating with cross-functional teams to ensure comprehensive and precise documentation standards",
      "Applying prompt engineering techniques to design inputs that align with intended AI behavior and edge-case handling"
    ]
  },
  {
    id: "2",
    title: "Software Development Engineer",
    company: "Codefeast",
    duration: "Jul 2024 - Dec 2024",
    description: "Developed full-stack web applications using MERN stack, improving system performance and user experience",
    achievements: [
      "Developed full-stack web applications using MERN stack, improving system performance and user experience",
      "Implemented microservices architecture with RESTful APIs, handling 1,000+ daily user interactions",
      "Designed and optimized database schemas using MongoDB, reducing query response times by 35%",
      "Established robust CI/CD pipelines using Docker and AWS services, streamlining deployment processes"
    ]
  }
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
    id: "1",
    title: "Coding Champion - Rank 1",
    description: "Secured Rank 1 in ConnectWise x GFG Engineering Intern Contest, demonstrating exceptional problem-solving skills",
    date: "2024",
    type: "award",
    link: "https://practice.geeksforgeeks.org/contest/engineering-intern-contest-connectwise-x-gfg/leaderboard"
  },
  {
    id: "2",
    title: "AWS Cloud Certification",
    description: "AWS Academy Cloud Foundations certified, demonstrating proficiency in cloud technologies",
    date: "2024",
    type: "certification",
    link: "https://drive.google.com/file/d/1pwM7f4PDZbrILnb5SqXHBU6Cxz3lUZse/view"
  },
  {
    id: "3",
    title: "Technical Lead - Impact Club, IIIT Sonepat",
    description: "Managed technical infrastructure for 500+ students as Technical Lead",
    date: "2022-2024",
    type: "recognition"
  },
  {
    id: "4",
    title: "General Secretary - Sports Club, IIIT Sonepat",
    description: "Led 20-member team and managed 100,000+ budget as General Secretary",
    date: "2022-2024",
    type: "recognition"
  }
];

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/vaibhav2536",
    icon: "Github"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/vaibhav-dinkar-80810622b/",
    icon: "Linkedin"
  },
  {
    name: "Twitter",
    url: "https://x.com/Vaibhav_2536?t=jbhhCp2LC9i9JSDv5ESiEQ&s=08",
    icon: "Twitter"
  },
  {
    name: "Codelio",
    url: "https://codolio.com/profile/vaibhavdinkar",
    icon: "Code"
  }
];

export const technicalSkills = {
  frontend: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap", "Web Optimization"],
  backend: ["Node.js", "Express.js", "RESTful APIs", "Mongoose", "MongoDB", "SQL", "Database Design"],
  cloudDevOps: ["AWS (EC2, S3, IAM)", "Docker", "Git", "CI/CD", "System Architecture"],
  coreCS: ["Data Structure", "Algorithm", "OOP", "Operating Systems", "C", "C++", "Python", "SDLC"],
  dataScience: ["Python", "Machine Learning", "Computer Vision", "OpenCV", "MediaPipe", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "Data Analysis", "Image Processing", "Real-time Detection", "Statistical Analysis"],
  softSkills: ["Problem Solving", "Team Leadership", "Communication", "Time Management", "Collaboration"]
};