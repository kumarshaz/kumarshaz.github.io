#!/usr/bin/env node
/**
 * Automated UI Attribute & Feature Regression Validation Suite
 * Target: "Architectural Monograph" Design System Overhaul
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

let passed = 0;
let failed = 0;

function assert(condition, message) {
	if (condition) {
		passed++;
		console.log(`  ✓ ${message}`);
	} else {
		failed++;
		console.error(`  ✗ FAILED: ${message}`);
	}
}

function readFile(relPath) {
	const fullPath = path.join(rootDir, relPath);
	if (!fs.existsSync(fullPath)) {
		throw new Error(`Missing expected file: ${relPath}`);
	}
	return fs.readFileSync(fullPath, 'utf8');
}

console.log('======================================================================');
console.log(' ARCHITECTURAL MONOGRAPH — UI & FEATURE REGRESSION VALIDATION SUITE');
console.log('======================================================================\n');

// ---------------------------------------------------------------------------
// 1. Validate 3-Tier Design Tokens (src/styles/tokens.css)
// ---------------------------------------------------------------------------
console.log('[Gate 1] Auditing 3-Tier Design Tokens (src/styles/tokens.css)...');
const tokensCss = readFile('src/styles/tokens.css');

const requiredTokens = [
	'--palette-paper-50',
	'--palette-paper-100',
	'--palette-slate-800',
	'--palette-slate-900',
	'--palette-slate-500',
	'--palette-indigo-600',
	'--palette-amber-600',
	'--font-display',
	'--font-sans',
	'--font-mono',
	'--bg-canvas',
	'--bg-surface',
	'--text-primary',
	'--text-muted',
	'--accent-primary',
	'--accent-secondary',
	'--border-grid',
	'--border-strong',
	'--mermaid-node-bg',
	'--mermaid-node-border',
	'--mermaid-line',
	'--mermaid-cluster-bg',
];

for (const token of requiredTokens) {
	assert(tokensCss.includes(token), `Token defined: ${token}`);
}
assert(
	tokensCss.includes('Newsreader') &&
		tokensCss.includes('Plus Jakarta Sans') &&
		tokensCss.includes('JetBrains Mono'),
	'3-Font typography system (Newsreader, Plus Jakarta Sans, JetBrains Mono) configured',
);
assert(
	tokensCss.includes('[data-theme="dark"]'),
	'Dark mode ("Carbon Blueprint") [data-theme="dark"] selector configured',
);

// ---------------------------------------------------------------------------
// 2. Validate Swiss Grid & Blueprint Layout Primitives (src/styles/layout.css)
// ---------------------------------------------------------------------------
console.log('\n[Gate 2] Auditing Swiss Grid & Blueprint Primitives (src/styles/layout.css)...');
const layoutCss = readFile('src/styles/layout.css');

assert(
	layoutCss.includes('.architect-grid') && layoutCss.includes('grid-template-columns: 240px 1fr'),
	'.architect-grid defines asymmetric 240px 1fr 2-column grid',
);
assert(
	layoutCss.includes('.architect-rail') && layoutCss.includes('border-right: 1px solid var(--border-grid)'),
	'.architect-rail defines exposed 1px hairline right border',
);
assert(
	layoutCss.includes('.architect-main') && layoutCss.includes('max-width: 76ch'),
	'.architect-main constrains prose width to 76ch',
);
assert(
	layoutCss.includes('.mermaid-blueprint') &&
		layoutCss.includes('radial-gradient(var(--border-grid) 1px, transparent 1px)') &&
		layoutCss.includes('border-left: 3px solid var(--accent-primary)'),
	'.mermaid-blueprint defines dot-matrix radial grid and 3px primary accent border',
);
assert(
	layoutCss.includes('@media (max-width: 900px)'),
	'Responsive breakpoint @media (max-width: 900px) collapses grid to single column',
);

// ---------------------------------------------------------------------------
// 3. Validate Content Collection Schema (src/content.config.ts)
// ---------------------------------------------------------------------------
console.log('\n[Gate 3] Auditing Content Schema (src/content.config.ts)...');
const contentConfig = readFile('src/content.config.ts');

assert(
	contentConfig.includes("z.enum(['Essay', 'Architecture Note', 'Research', 'Perspective'])"),
	'Content schema defines category enum (Essay, Architecture Note, Research, Perspective)',
);
assert(
	contentConfig.includes('readingTime: z.string().optional()'),
	'Content schema defines optional readingTime',
);
assert(
	contentConfig.includes("status: z.enum(['Draft', 'Evergreen', 'Published'])"),
	'Content schema defines status enum (Draft, Evergreen, Published)',
);
assert(
	contentConfig.includes('docId: z.string().optional()'),
	'Content schema defines optional docId',
);

// ---------------------------------------------------------------------------
// 4. Validate Built Static Output & Feature Preservation (dist/)
// ---------------------------------------------------------------------------
console.log('\n[Gate 4] Auditing Built Static Pages & UI Attributes (dist/)...');

const expectedPages = [
	'index.html',
	'about/index.html',
	'blog/index.html',
	'blog/what-is-blacksmith-to-goldsmith/index.html',
	'blog/why-astro-and-gh-pages/index.html',
	'blog/why-i-love-wardley-mapping/index.html',
	'blog/tag/architecture/index.html',
	'blog/tag/sdlc/index.html',
	'blog/tag/ai/index.html',
	'blog/tag/research/index.html',
	'blog/tag/devex/index.html',
	'blog/tag/astro/index.html',
	'blog/tag/github pages/index.html',
	'blog/tag/wardley mapping/index.html',
	'blog/tag/strategy/index.html',
	'rss.xml',
	'sitemap-index.xml',
];

for (const page of expectedPages) {
	const full = path.join(distDir, page);
	assert(fs.existsSync(full), `Generated static route exists: dist/${page}`);
}

// Inspect HTML pages for common UI attributes & accessibility features
const htmlPages = expectedPages.filter((p) => p.endsWith('.html'));
const internalHrefRegex = /href="(\/[^"#?]*)"/g;
const brokenLinks = [];

for (const page of htmlPages) {
	const html = fs.readFileSync(path.join(distDir, page), 'utf8');

	assert(
		html.includes('family=JetBrains+Mono') &&
			html.includes('family=Newsreader') &&
			html.includes('family=Plus+Jakarta+Sans'),
		`[${page}] Loads 3-Font Google Fonts stylesheet`,
	);
	assert(
		html.includes('class="skip-link"') && html.includes('id="main-content"'),
		`[${page}] Preserves accessible skip-link and #main-content landmark`,
	);
	assert(
		html.includes('id="theme-toggle"') && html.includes("setAttribute('data-theme'"),
		`[${page}] Includes #theme-toggle and data-theme synchronizer`,
	);
	assert(
		html.includes('architect-grid') && html.includes('architect-rail'),
		`[${page}] Renders Swiss Grid (.architect-grid + .architect-rail)`,
	);

	// Check internal links resolve to files in dist/
	let match;
	while ((match = internalHrefRegex.exec(html)) !== null) {
		const rawHref = decodeURIComponent(match[1]);
		if (rawHref.startsWith('//')) continue;
		const candidateFile = path.join(distDir, rawHref);
		const candidateIndex = path.join(distDir, rawHref, 'index.html');
		if (!fs.existsSync(candidateFile) && !fs.existsSync(candidateIndex)) {
			brokenLinks.push(`${page} -> ${rawHref}`);
		}
	}
}

assert(
	brokenLinks.length === 0,
	`Zero broken internal links across all ${htmlPages.length} HTML pages${
		brokenLinks.length ? ' (' + brokenLinks.join(', ') + ')' : ''
	}`,
);

// Inspect Spec Sheet layout on blog post & about pages
const wardleyHtml = fs.readFileSync(
	path.join(distDir, 'blog/why-i-love-wardley-mapping/index.html'),
	'utf8',
);
assert(
	wardleyHtml.includes('DOC ID:') &&
		wardleyHtml.includes('ARCH-2026-03') &&
		wardleyHtml.includes('PUBLISHED:') &&
		wardleyHtml.includes('ON THIS PAGE') &&
		wardleyHtml.includes('TAGS'),
	'[why-i-love-wardley-mapping] Renders full Asymmetric Spec Sheet rail (DOC ID, PUBLISHED, ON THIS PAGE, TAGS)',
);
assert(
	wardleyHtml.includes("theme: 'base'") &&
		wardleyHtml.includes('--mermaid-node-bg') &&
		wardleyHtml.includes('--mermaid-node-border') &&
		wardleyHtml.includes('mermaid-blueprint'),
	'[why-i-love-wardley-mapping] Includes Token-Synced Mermaid v11 base theme initializer and .mermaid-blueprint wrapper',
);
assert(
	wardleyHtml.includes('data-language="mermaid"') &&
		wardleyHtml.includes('The Evolution of Programming Abstractions'),
	'[why-i-love-wardley-mapping] Preserves Markdown Mermaid timeline diagram source',
);

// Inspect Structured Knowledge Taxonomy on /blog/index.html
const blogIndexHtml = fs.readFileSync(path.join(distDir, 'blog/index.html'), 'utf8');
assert(
	blogIndexHtml.includes('data-filter="Essay"') &&
		blogIndexHtml.includes('data-filter="Architecture Note"') &&
		blogIndexHtml.includes('data-filter="Research"'),
	'[blog/index.html] Renders Structured Knowledge Architecture taxonomy filters (Essays, Field Notes / ADRs, Publications)',
);

// Inspect Homepage features on /index.html
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
assert(
	homeHtml.includes('From Blacksmiths') &&
		homeHtml.includes('to Goldsmiths.') &&
		homeHtml.includes('/blog/tag/architecture') &&
		homeHtml.includes('/blog/tag/sdlc') &&
		homeHtml.includes('/blog/tag/ai') &&
		homeHtml.includes('/blog/tag/research') &&
		homeHtml.includes('https://www.linkedin.com/in/shashinkumar/') &&
		homeHtml.includes('https://github.com/kumarshaz') &&
		homeHtml.includes('https://dzone.com/users/5309856/snkumar.html'),
	'[index.html] Preserves Hero, 4 Domain Pillars, Recent Posts Ledger, and Connect links',
);

console.log('\n======================================================================');
console.log(` VALIDATION SUMMARY: ${passed} passed, ${failed} failed`);
console.log('======================================================================');

if (failed > 0) {
	process.exit(1);
}
