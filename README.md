# Shashi Kumar - Professional Portfolio & Tech Blog

Welcome to the repository for my personal branding website! This site is built using [Astro](https://astro.build/), focusing on blazingly fast performance and modern web standards.

## 🎯 Project Goals

This project serves as the foundation for my professional portfolio as a Product Architect (Solution/Application Architect). The goal is to share my architectural philosophies, focusing on transitioning engineering teams from "Master Blacksmiths" (effort-based labor) to "Master Goldsmiths" (high-precision logic handling business uncertainty). 

I am continuously contributing meaningful code check-ins here to grow my portfolio at [github.com/kumarshaz](https://github.com/kumarshaz/).

## 🧠 Core Architectural Philosophies

My approach is deeply rooted in structured, business-aligned architecture. Some key concepts I advocate for include:

- **The "Lego" Framework**: Building standardized skeletons with company-proven patterns (.NET, REST, SQL) and using Spec-Driven Development (SDD) for modular joints.
- **Hexagonal & Hybrid Microservices**: Leveraging Port and Adapter architecture, DDD, and CQRS for complex domain APIs, balancing idealism with pragmatic enterprise constraints.
- **Modern Standards**: Emphasizing SOLID and CUPID principles, CI/CD readiness, stringent test coverage, and internal package reuse via NuGet and npm feeds.
- **AI as the "Great Teacher"**: Using AI as an engine for the structural 90% tasks, allowing humans to focus on the final 10% of refinement and business alignment.

*(My full architectural constitution and professional details are continuously documented in [`docs/shashi-kumar.md`](docs/shashi-kumar.md), and instructions for AI coding agents are defined in [`AGENTS.md`](AGENTS.md).)*

---

## 🏛️ Design System: The "Engineering Notebook" Architecture

Instead of a generic starter blog template, this site uses a custom **Token-Driven Editorial Design System** where long-form Markdown prose, layout structure, syntax-highlighted code blocks, and Mermaid v11 diagrams share a single CSS token source of truth:

- **3-Tier Design Token Foundation ([`src/styles/tokens.css`](src/styles/tokens.css))**:
  - **Light Mode (*Engineering Paper & Signal Rust*)**: Warm technical paper canvas (`#F2F1EC`), stone surface (`#E7E5DD`), carbon ink (`#111111`), and signal rust accents (`#C84B20`).
  - **Dark Mode (*Anvil Carbon & Signal Amber*)**: Deep anvil carbon canvas (`#111214`), slate surface (`#181A1E`), warm off-white ink (`#EFECE6`), and signal amber accents (`#E87A48`).
- **Open-Source Technical Typography**:
  - **Display & Mastheads**: `Space Mono`
  - **Editorial Prose**: `IBM Plex Sans`
  - **Metadata Rails, Code & Diagrams**: `IBM Plex Mono`
  - *(All fonts are licensed under the SIL Open Font License 1.1; zero proprietary assets are used.)*
- **Open Engineering Notebook Layout ([`src/styles/layout.css`](src/styles/layout.css))**:
  - Open `1120px` reading container anchored by bold `2px` horizontal masthead and section rules.
  - Asymmetric 2-column article workspace ([`src/layouts/BlogPost.astro`](src/layouts/BlogPost.astro)) pairing a `230px` sticky left rail (`Published`, `Category`, `ON THIS PAGE` table of contents, and `TAGS`) with a `72ch` main prose stream.
- **Token-Synced Mermaid v11 Blueprints**:
  - Standard fenced ```` ```mermaid ```` blocks in Markdown are automatically wrapped in `.mermaid-blueprint` containers with a dot-matrix technical background, an `Expand`/`Collapse` toggle, and live Light/Dark CSS variable synchronization (`theme: 'base'`).
- **Dual-Theme Code Highlighting**:
  - Configured with Shiki dual themes (`github-light` and `github-dark`) in [`astro.config.mjs`](astro.config.mjs) and [`src/styles/global.css`](src/styles/global.css) for WCAG AA+ readability across both Light and Dark modes.
- **Structured Knowledge Taxonomy ([`src/content.config.ts`](src/content.config.ts))**:
  - Articles are organized into **Essays**, **Practitioner Notes**, **Research**, and **Perspectives** with interactive category filtering and populated badge counts on `/blog`.

---

## 🤖 Agent-Assisted Blog Authoring (`AGENTS.md`)

Local and remote AI coding agents follow the operational rules in **[`AGENTS.md`](AGENTS.md)**:

1. **Branching**: New blog posts are always created on a fresh branch from `origin/main` named **`blogs/{topic-name}`** (never committed directly to `main`).
2. **Frontmatter Contract**: Every Markdown file in `src/content/blog/{topic-name}.md` is initialized with the Zod-validated frontmatter structure (`title`, `description`, `pubDate`, `heroImage`, `category`, `tags`, `readingTime`, `status`, `docId`).
3. **Skills & Visual Strategy**: Agents leverage configured writing and **Mermaid diagramming** skills alongside [`docs/shashi-kumar.md`](docs/shashi-kumar.md) to produce visual-first architectural analysis.
4. **Validation Gate**: Every change is verified via `npm run build` and `npm run validate` ([`scripts/validate-ui.mjs`](scripts/validate-ui.mjs)) before pushing.

---

## 🛠️ Local Development & Validation

```bash
# Install dependencies
npm ci

# Start local dev server at http://localhost:4321
npm run dev

# Build static production output and run all 118 UI & content validation checks
npm run check
```

---

## 🔗 Connect with Me

- **GitHub**: [github.com/kumarshaz](https://github.com/kumarshaz/)
- **LinkedIn**: [Shashi Kumar](https://www.linkedin.com/in/shashinkumar/)

