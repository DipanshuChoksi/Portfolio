import { Mail, ExternalLink } from "lucide-react";

export const blogsList = [
  "create-your-own",
  "let-us-learn",
  "dsa-demystified",
  "my-learnings-004",
];

export const tagsList = [
  { name: "introduction" },
  { name: "JavaScript" },
  { name: "conversation" },
];

export const aboutContent = [
  `I'm an aspiring Software Engineer who loves solving complex problems and building systems that scale gracefully. I focus on writing clean, maintainable, and high-performance code guided by solid design principles. My mission is to engineer software that's not only functional but also meaningful and delightful to use.`,
  `When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.I'm always eager to collaborate and learn from other talented developers.`,
];

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/blogs", label: "Blog" },
  { href: "/#contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export const adminNavLinks = [
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/blogs", label: "Blog" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/theme", label: "Theme" },
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
  image_path: "/me.jpeg",
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
  description:
    "Areas I'm passionate about and actively exploring in my career.",
  interest_items: [
    {
      title: "Open Source",
      description:
        "Contributing to meaningful open source projects and helping the developer community.",
    },
    {
      title: "Cloud Architecture",
      description:
        "Exploring scalable cloud solutions and modern deployment strategies.",
    },
    {
      title: "AI & Machine Learning",
      description:
        "Interested in integrating AI/ML capabilities into web applications.",
    },
    {
      title: "Web Performance",
      description:
        "Optimizing applications for speed and delivering exceptional user experiences.",
    },
    {
      title: "DevOps",
      description:
        "Automating deployment pipelines and improving development workflows.",
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
