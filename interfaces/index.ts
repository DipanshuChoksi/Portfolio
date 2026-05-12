import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";

export interface BlogNodeInterface {
  node: {
    id: string;
    slug: string;
    title: string;
    publication: {
      domainInfo: {
        hashnodeSubdomain: string;
      };
    };
    brief: string;
    tags: { name: string }[];
    readTimeInMinutes: number;
    publishedAt: string;
    coverImage: {
      url: string;
    };
  };
}

export interface BlogPageInterface {
  id: string;
  title: string;
  content: {
    markdown: string;
    html: string;
  };
  publishedAt: string;
  url: string;
  coverImage: {
    url: string;
  };
  tags: { name: string }[];
  readTimeInMinutes: number;
}

export interface educationSection {
  description: string;
  history: {
    school: string;
    degree: string;
    period: string;
    description?: string;
  }[];
}

export interface projectSection {
  description: string;
  projects: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    links: {
      github: string;
      live: string;
    };
    status: "Active" | "WIP";
  }[];
}

export interface heroSection {
  name: string;
  role: string;
  image_path: string;
  description: string;
  call_to_action: {
    name: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[];
}

export interface skillsSection {
  description: string;
  skills_items: { category: string; skills: string[] }[];
}

export type aboutSection = string[];

export interface achievementsSection {
  hackathons: {
    title: string;
    event: string;
    year: string;
    description: string;
    certificateUrl?: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
    description: string;
    certificateUrl?: string;
  }[];
}
