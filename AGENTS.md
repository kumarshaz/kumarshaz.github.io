# AGENTS.md — Operational Guide for Local & Remote Coding Agents

This file defines the mandatory repository workflows, authoring conventions, design system rules, and validation gates for any AI coding agent (local or remote) working in `kumarshaz/kumarshaz.github.io`.

---

## 1. Author Persona & Architectural Charter

Before writing content or modifying UI templates, read **[`docs/shashi-kumar.md`](docs/shashi-kumar.md)** to align with Shashi Kumar's architectural voice and philosophies:

- **Core Mission**: Transitioning engineering culture from **"Master Blacksmiths"** (manual, effort-based labor on boilerplate) to **"Master Goldsmiths"** (high-precision logic, spec-driven intent, and handling business uncertainty).
- **The "Lego" Framework**: Standardized, rigid skeletons (.NET, REST, SQL, internal NuGet/npm feeds) paired with modular joints defined via Spec-Driven Development (SDD) so features can be built and replaced ("plastic surgery") without compromising the core anatomy.
- **Architectural Focus**: Hexagonal (Ports & Adapters) architecture, DDD, CQRS, Packaged Business Capabilities (PBC), MACH architecture, Wardley Mapping, and pragmatic enterprise modernization.
- **Communication Style**: Prioritize **diagrams, structured lists, and executive technical clarity** over dense or casual hobbyist prose.

---

## 2. Workflow for Creating a New Blog Post

Whenever the user asks a local or remote agent to create or draft a new blog post, follow these steps strictly:

### Step 1: Create a New Topic Branch from `origin`

1. Fetch the latest state from `origin`:
   ```bash
   git fetch origin
   ```
2. Create and switch to a new branch based on `origin/main` using the naming pattern **`blogs/{topic-name}`** (or **`bolgs/{topic-name}`** if explicitly requested by the user), where `{topic-name}` is a lowercase kebab-case slug:
   ```bash
   git checkout -b blogs/{topic-name} origin/main
   ```
   > **Important**: Never commit directly to `main`. Pushing to `main` triggers the production GitHub Pages deployment workflow (`.github/workflows/deploy.yml`).

### Step 2: Activate Writing & Mermaid Diagramming Skills

Before drafting the article or its diagrams:

1. **Discover Installed Skills**:
   - If your agent environment provides skill discovery tools (`list_skills`, `lookup_skill`, `lookup_skills`), call them first and load any **writing**, **editorial**, or **Mermaid diagramming** skills available in the environment.
   - Check local/workspace skill directories if present (e.g., `.agent/skills/`, `.agents/skills/`, `~/.gemini/antigravity/skills/`, `~/.claude/skills/`).
2. **Apply the Mermaid Diagramming Skill**:
   - Use your Mermaid diagramming skill to translate architectural concepts, system topologies, evolutionary stages, and socio-technical flows into clear, well-structured Mermaid diagrams.
   - Pair visual diagrams with structured breakdowns and concise executive takeaways as modeled in [`src/content/blog/why-i-love-wardley-mapping.md`](src/content/blog/why-i-love-wardley-mapping.md) and [`src/content/blog/what-is-blacksmith-to-goldsmith.md`](src/content/blog/what-is-blacksmith-to-goldsmith.md).

### Step 3: Initialize the Markdown File with Standard Frontmatter

Create the post at `src/content/blog/{topic-name}.md`. Every blog post **must** begin with frontmatter conforming to the Zod schema in [`src/content.config.ts`](src/content.config.ts):

```markdown
---
title: "Your Architectural Title Here"
description: "A concise 1–2 sentence executive abstract summarizing the architectural thesis and value proposition."
pubDate: YYYY-MM-DD
heroImage: '../../assets/your-image.png'
category: "Essay"
tags: ["Architecture", "SDLC", "AI"]
readingTime: "6 min read"
status: "Published"
docId: "ARCH-YYYY-NN"
---
```

#### Frontmatter Field Reference

| Field | Required | Type / Allowed Values | Notes |
| :--- | :--- | :--- | :--- |
| `title` | Yes | `string` | Headline displayed in the article masthead and index ledger. |
| `description` | Yes | `string` | Executive abstract displayed under the title and in RSS/SEO metadata. |
| `pubDate` | Yes | `YYYY-MM-DD` | Publication date (coerced to `Date`). |
| `updatedDate` | No | `YYYY-MM-DD` | Optional last-updated date shown in the left metadata rail. |
| `heroImage` | No | Relative path (`../../assets/...`) | Optional hero diagram/illustration stored in `src/assets/`. |
| `category` | Yes | `"Essay"` \| `"Practitioner Note"` \| `"Research"` \| `"Perspective"` | Defaults to `"Essay"`. Use `"Practitioner Note"` for hands-on engineering patterns (do **not** use `"Field Note"`). |
| `tags` | Yes | `string[]` | Array of topic tags (e.g., `["Architecture", "DDD", "SDLC", "AI"]`). Generates `/blog/tag/[tag]/` routes automatically. |
| `readingTime` | Recommended | `string` (e.g., `"6 min read"`) | Displayed in the article masthead and blog index ledger. |
| `status` | Yes | `"Published"` \| `"Evergreen"` \| `"Draft"` | Defaults to `"Published"`. |
| `docId` | Recommended | `string` (e.g., `"ARCH-2026-04"`) | Sequential document identifier in `ARCH-YYYY-NN` format. |

### Step 4: Authoring Mermaid Diagrams & Code Blocks

- **Mermaid Diagrams**:
  - Write standard fenced ```` ```mermaid ```` code blocks directly in Markdown.
  - [`src/layouts/BlogPost.astro`](src/layouts/BlogPost.astro) automatically transforms every ```` ```mermaid ```` block into a `.mermaid-blueprint` figure container with a dot-matrix blueprint background, an `Architecture Diagram` header bar, an interactive `Expand`/`Collapse` toggle, and live Light/Dark theme token synchronization via Mermaid v11 (`theme: 'base'`).
  - Quote node labels that contain parentheses, colons, slashes, or special characters (e.g., `A["Domain Service (Hexagonal Port)"] --> B["Event Bus"]`).
  - Do **not** embed hardcoded theme overrides (`%%{init: {'theme': 'dark'}}%%`) that prevent automatic Light/Dark mode token synchronization.
- **Code & ASCII Blocks**:
  - Always include a language identifier on fenced blocks (e.g., ```` ```text ````, ```` ```csharp ````, ```` ```typescript ````, ```` ```yaml ````).
  - Syntax highlighting uses Shiki dual themes (`github-light` in Light Mode, `github-dark` in Dark Mode) configured in [`astro.config.mjs`](astro.config.mjs) and [`src/styles/global.css`](src/styles/global.css) to ensure high contrast on both surfaces.

### Step 5: Build, Validate, Commit, and Push

Before finishing the task, run the build and automated validation suite:

```bash
npm run build
npm run validate
```

Once all checks pass (`0 failed`), stage, commit, and push the topic branch to `origin`:

```bash
git add src/content/blog/{topic-name}.md
git commit -m "feat(blog): add {topic-name} post"
git push -u origin blogs/{topic-name}
```

---

## 3. Design System & UI Architecture ("Engineering Notebook" — Option D)

The site implements a **Token-Driven Editorial Design System** inspired by technical RFCs and architectural monographs, built on three CSS layers without heavy UI component libraries:

1. **Tier 1–3 Design Tokens ([`src/styles/tokens.css`](src/styles/tokens.css))**:
   - **Typography (SIL Open Font License 1.1)**:
     - `--font-display`: `'Space Mono', 'IBM Plex Mono', monospace` (headlines & mastheads)
     - `--font-sans`: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif` (long-form prose)
     - `--font-mono`: `'IBM Plex Mono', 'Space Mono', monospace` (metadata rails, badges, code, and Mermaid diagrams)
   - **Color Themes**:
     - **Light Mode (*Engineering Paper & Signal Rust*)**: Warm technical paper canvas (`#F2F1EC`), elevated surface (`#E7E5DD`), deep carbon ink (`#111111`), and signal rust accent (`#C84B20`).
     - **Dark Mode (*Anvil Carbon & Signal Amber*)**: Deep anvil carbon canvas (`#111214`), elevated slate surface (`#181A1E`), warm off-white ink (`#EFECE6`), and signal amber accent (`#E87A48`).
   - **Mermaid Tokens**: `--mermaid-node-bg`, `--mermaid-node-border`, `--mermaid-line`, `--mermaid-cluster-bg`.
2. **Layout Primitives ([`src/styles/layout.css`](src/styles/layout.css))**:
   - `.notebook-container`: Open `1120px` container without outer boxy wireframe walls.
   - `.architect-grid`, `.architect-rail`, `.architect-main`: Asymmetric 2-column specification layout (`230px` sticky left metadata/TOC rail + `72ch` main prose column) separated by a single interior hairline rule and anchored by bold `2px solid var(--border-strong)` horizontal section dividers.
   - `.mermaid-blueprint`: Dot-matrix technical figure container for Mermaid diagrams.
3. **UI Cleanliness Guardrails**:
   - Do **not** add decorative pseudo-code strings (such as `MONOGRAPH // SYS.ARCH`, `SECTION // TAXONOMY`, or `DOM-01` serial numbers) to the UI.
   - When adding or modifying categories in [`src/pages/blog/index.astro`](src/pages/blog/index.astro), ensure `categoryCounts` includes every category rendered in the filter rail so `.taxonomy-count` badges are always populated.

---

## 4. Commands & Validation Gate

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start the local Astro development server at `http://localhost:4321`. |
| `npm run build` | Build the production static site into `dist/`. |
| `npm run validate` | Run [`scripts/validate-ui.mjs`](scripts/validate-ui.mjs) (118 automated checks covering CSS token tiers, layout primitives, Zod content schema, static route generation, internal link integrity, taxonomy badge counts, Shiki dual-theme contrast, and Mermaid blueprint rendering). |
| `npm run check` | Convenience alias for `npm run build && npm run validate`. |
