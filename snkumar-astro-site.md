# Step-by-Step Guide: Deploying Astro to GitHub Pages

If you want your website URL to be the cleanest possible (e.g., `https://kumarshaz.github.io`), you MUST name your GitHub repository exactly `kumarshaz.github.io`. We will use this approach as it is the standard for personal branding.

## Step 1: Clean Up the Local Workspace
Right now, your files are in `c:\learnCoding\localrepo\content`. Let's rename that folder to something that represents the code repository.
1. Open your terminal (PowerShell).
2. Rename the folder: 
   ```powershell
   Rename-Item -Path "c:\learnCoding\localrepo\content" -NewName "kumarshaz.github.io"
   ```
3. Navigate into it: 
   ```powershell
   cd c:\learnCoding\localrepo\kumarshaz.github.io
   ```

## Step 2: Initialize the Astro Project
1. Run the Astro setup wizard: 
   ```bash
   npm create astro@latest ./
   ```
   *(The `./` tells Astro to install in the current directory).*
2. **Prompts**: 
   - Choose **"Use blog template"** (since you plan to write about architecture).
   - Choose **"Yes"** to install dependencies.
   - Choose **"Yes"** for TypeScript (Strict or Normal).
3. Once finished, Astro's template files will be placed alongside your `README.md` and `shashi-kumar.md`.

## Step 3: Configure Astro for GitHub Pages
1. Open the newly created `astro.config.mjs` file in your editor.
2. Add your site URL to the configuration so Astro knows how to generate links:
   ```javascript
   import { defineConfig } from 'astro/config';

   export default defineConfig({
     site: 'https://kumarshaz.github.io',
   });
   ```

## Step 4: Add the GitHub Actions Deployment File
GitHub Pages needs to know how to build an Astro site. We do this by giving it an instruction manual (a workflow).
1. In your project folder, create a new folder path exactly like this: `.github/workflows/`
2. Inside that folder, create a file named `deploy.yml`.
3. Paste the following official Astro deployment script into `deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout your repository using git
           uses: actions/checkout@v4
         - name: Install, build, and upload your site
           uses: withastro/action@v3

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

## Step 5: Push to GitHub
Now we send the code to GitHub.
1. Go to [github.com/new](https://github.com/new) and create a repository. 
   - **Repository name**: `kumarshaz.github.io`
   - Keep it **Public**. Do not add a README, `.gitignore`, or license (we already have them locally).
2. Go back to your terminal inside your renamed folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial Astro portfolio commit"
   git branch -M main
   git remote add origin https://github.com/kumarshaz/kumarshaz.github.io.git
   git push -u origin main
   ```

## Step 6: Activate GitHub Actions Deployment
1. Go to your new repository on GitHub: `https://github.com/kumarshaz/kumarshaz.github.io`
2. Click the **Settings** tab.
3. On the left sidebar, click **Pages**.
4. Under the **Build and deployment** section, look for the **Source** dropdown.
5. Change it from "Deploy from a branch" to **"GitHub Actions"**.
6. Wait 1–2 minutes! GitHub will automatically trigger the workflow we added and deploy your site to `https://kumarshaz.github.io`.

---

## Step 7: Publishing Learnings on Antigravity AI Skills

As you build and document your Custom AI Skills for Antigravity, you can create a dedicated content category in your Astro blog solely for "Agentic AI Engineering" or "Antigravity Engineering."

### Best Practices for Building Custom Antigravity Skills
When you build a new skill to package your architectural workflows, always follow this standardized structure so Antigravity can reliably understand and invoke it:

**1. Structure it as a Folder Module**
Every skill should be an isolated folder (e.g., `skill-review-lego-architecture/`). Antigravity expects all resources related to the task to live inside this boundary.

**2. The Core `SKILL.md` File**
This is the heart of the skill. You **must** create a `SKILL.md` file at the root of the skill folder containing YAML Frontmatter defining its identity.
```yaml
---
name: Review Architecture
description: Analyzes codebases against your "Lego Framework" and DDD principles.
---
```
Immediately below the frontmatter, write highly detailed, step-by-step markdown instructions for the agent. Treat it like writing a pristine standard operating procedure (SOP).

**3. Use Standardized Subdirectories**
To handle complex enterprise logic, don't shove everything into the `SKILL.md`. Break it out cleanly:
- **`scripts/`**: Include PowerShell, Bash, Python, or Node scripts the agent can run to automate local execution or query APIs.
- **`examples/`**: Provide files showing "Master Blacksmith" (bad) vs. "Master Goldsmith" (good) implementations so Antigravity can learn by example.
- **`resources/`**: Any external templates, JSON schemas, or mock data the agent may need to consume.

**4. Documentation Strategy on Astro**
When you write an Astro blog post sharing these skills:
1. Explain the **"Why"**: Detail the enterprise gap or effort-based labor the skill replaces.
2. Outline the **`SKILL.md` Constraints**: Explain how you prompted Antigravity to avoid hallucinations and follow logic.
3. Share the **Subdirectory Architecture**: Detail the helper scripts you gave it in the `scripts/` folder.
4. Open Source the Skill: Publish the skill folder to a public GitHub repository and link it from the Astro article!
