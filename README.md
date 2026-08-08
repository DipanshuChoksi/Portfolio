# Portfolio

A fast, elegant personal site to showcase who I am, what I build, and what I know.  
Built with **Next.js 14**, **TypeScript**, and **shadcn/ui**. Deployed on **Vercel**.

> Performance first. Developer-friendly. Delightfully simple to maintain.

<p align="left">
  <a href="https://nextjs.org/"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white"></a>
  <a href="https://ui.shadcn.com/"><img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn/ui-Components-000?logo=radixui"></a>
  <a href="https://vercel.com/"><img alt="Vercel" src="https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel"></a>
</p>

---

## Why this exists

I wanted a portfolio that feels **modern**, loads **instantly**, and is **fun to build on** — without turning content updates into chores.

---

## Core Capabilities

- **Lightning-fast portfolio** with clean architecture
- **Search & filter** posts by tags or free-text query
- **Theme toggle** with persistent **Dark / Light** mode

---

## Tech Stack

| Category      | Stack                         |
| :------------ | :---------------------------- |
| **Languages** | TypeScript                    |
| **Frontend**  | Next.js, React, shadcn/ui     |
| **APIs**      | REST & GraphQL                |
| **Dev Tools** | Git, ESLint, Prettier, Vercel |

> Deployed on **Vercel** with edge caching and optimized assets out of the box.

---

## Features at a glance

- **Next.js 14 App Router** with file-based routing
- **Accessible UI** powered by **shadcn/ui** + **Radix** primitives
- **Responsive design** from mobile → ultrawide
- **SEO-friendly** meta + Open Graph defaults
- **Zero-layout shift** with skeleton shimmer loading
- **Type-safe** everything (props, data, utils)

---

## Project Structure

```text
├── app                       # Routes & pages (App Router)
│ └── archieve                # Archive listing
│   └── [host]
│      └── [slug]             # Dynamically render archive page here
│
├── components                # UI & layout components
│ └── ui                      # Reusable shadcn/ui wrappers
│
├── config                    # App/site config
├── consts                    # Global constants
├── hooks                     # Custom React hooks
├── interfaces                # Shared TypeScript interfaces
├── lib                       # Utilities (helpers, client/server)
├── public                    # Static assets (images, icons, etc.)
├── styles                    # Global styles (Tailwind CSS)
└── .root files               # Next.js, Tailwind, TS configs, etc.
```

## Local Development

Clone the repository, install dependencies, and start the development server with this command:

```bash
npm run dev

```

Then visit http://localhost:3000 to check out the website locally.
