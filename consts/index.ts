import { Mail, ExternalLink } from "lucide-react";

export const blogsList = ["create-your-own", "let-us-learn", "dsa-demystified", "my-learnings-004"];

export const tagsList = [
  { name: "introduction" },
  { name: "JavaScript" },
  { name: "conversation" },
];

export const aboutContent = [
  `I’m a passionate full-stack developer with a strong focus on building scalable, user-centric web applications and solving complex backend challenges. I enjoy turning ideas into real products that are not only functional but also efficient, maintainable, and impactful. My journey in software development has been driven by curiosity, consistency, and a deep interest in understanding how systems work beneath the surface.
My expertise primarily lies in backend development, distributed systems, and full-stack engineering, with hands-on experience in technologies like JavaScript, React, Node.js, Express.js, MongoDB, SQL, and modern frontend tools like shadcn/ui. I love designing clean architectures, optimizing performance, and building systems that can scale reliably. Alongside development, I continuously strengthen my problem-solving skills through Data Structures and Algorithms and core computer science subjects like OS, DBMS, CN, and system design.
I have worked on multiple ambitious projects, including social platforms, meeting applications, e-commerce systems, Reddit-style communities, vehicle maintenance platforms, and book-sharing applications like PageTalks. These projects helped me develop strong engineering thinking—from writing clean code and managing authentication flows to handling real-world challenges like state management, API design, and production-level architecture decisions.
My long-term goal is to grow into a Staff-level engineer by mastering backend systems, platform engineering, observability, and large-scale distributed architecture. I believe great engineers are not just builders, but problem solvers who create clarity in complexity. I’m always learning, building, and pushing myself toward deeper technical excellence while creating products that deliver meaningful value.`,
];

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#education", label: "Education" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
  { href: "/blogs", label: "Blog" },
];

export const socialsArr = [
  {
    name: "Twitter(X)",
    path: "/icon.twitter.svg",
    url: "https://x.com/dipanshuchoksi",
  },
  {
    name: "LinkedIn",
    path: "/icon.linkedin.svg",
    url: "https://linkedin.com/in/dipanshu-choksi",
  },
  {
    name: "Github",
    path: "/icon.github.svg",
    url: "https://github.com/dipanshuchoksi",
  },
];

export const educationContent = {
  description: `My educational background and continuous learning journey in software development.`,
  history: [
    {
      school: "ITM(sls) Baroda University",
      degree: "Bachelor of Computer Science Engineering",
      period: "2022 - June 2026",
      description:
        "Expected to graduate in june 2026 with focus on software engineering, data structures, and distributed systems.",
    },
    {
      school: "Sarwa Mangal School",
      degree: "High School",
      period: "2020 - 2022",
    },
  ],
};

export const projectContent = {
  description:
    "Here are some of my recent projects. Each one showcases different technologies and problem-solving approaches.",
  projects: [
    {
      title: "Influx",
      description:
        "A offline media server that let's you stream and share audio, video and files accross a group of devices inspired by Jellyfin.",
      image: "/placeholder.svg",
      tags: ["React", "Node.js", "MongoDB", "TypeScript"],
      links: {
        github: "https://github.com/DipanshuChoksi/Influx",
        live: "/#",
      },
    },
  ],
};

export const heroContent = {
  name: "Dipanshu Choksi",
  role: "Software Engineer",
  image_path: "/me.png",
  description:
    "I build beautiful, performant web applications with a focus on user experience and clean code. Passionate about open source and learning new frameworks and technologies.",
  call_to_action: [
    { name: "View My Work", url: "#projects", icon: ExternalLink },
    {
      name: " Get in Touch",
      url: "mailto:dipanshuchoksi@gmail.com",
      icon: Mail,
    },
  ],
};

export const interestContent = {
  description: "Areas I'm passionate about and actively exploring in my career.",
  interest_items: [
    {
      title: "Open Source",
      description:
        "Contributing to meaningful open source projects and helping the developer community.",
    },
    {
      title: "Cloud Architecture",
      description: "Exploring scalable cloud solutions and modern deployment strategies.",
    },
    {
      title: "AI & Machine Learning",
      description: "Interested in integrating AI/ML capabilities into web applications.",
    },
    {
      title: "Web Performance",
      description: "Optimizing applications for speed and delivering exceptional user experiences.",
    },
    {
      title: "DevOps",
      description: "Automating deployment pipelines and improving development workflows.",
    },
  ],
};

export const skillContent = {
  description:
    "I have experience with a diverse set of technologies and tools that I leverage to build robust, scalable applications.",
  skills_items: [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "C++", "GoLang", "Python"],
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js", "Tailwind CSS", "ShadCN"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js"],
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MongoDB", "Redis"],
    },
    {
      category: "Communication",
      skills: ["GraphQL", "RabbitMQ", "Socket.io"],
    },
    {
      category: "DevOps",
      skills: ["Docker", "Kubernetes"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code"],
    },
  ],
};
