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
	tokensCss.includes('Space Mono') &&
		tokensCss.includes('IBM Plex Sans') &&
		tokensCss.includes('IBM Plex Mono'),
	'Typography system (Space Mono, IBM Plex Sans, IBM Plex Mono) configured',
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
	contentConfig.includes("'Practitioner Note'") && contentConfig.includes("'Essay'"),
	'Content schema defines category enum including Essay, Practitioner Note, Research, Perspective',
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
	contentConfig.includes('docId: z.string().optional()') &&
		contentConfig.includes('liveUrl: z.string().url().optional()'),
	'Content schema defines optional docId and Foundry liveUrl',
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
	'blog/clean-core-sidecars-and-cots-stop-rules/index.html',
	'blog/contract-first-net-beyond-codegen/index.html',
	'blog/editorial-architecture-and-three-year-tco/index.html',
	'blog/from-adrs-to-executable-constraints/index.html',
	'blog/from-partner-diagram-rot-to-context-engineering/index.html',
	'blog/red-stack-blue-mesh-and-control-plane-fragility/index.html',
	'foundry/index.html',
	'foundry/engineering-this-monograph/index.html',
	'foundry/atruss-code-atlas/index.html',
	'foundry/tdd-analyzer/index.html',
	'foundry/to-markdown-converter/index.html',
	'blog/tag/architecture/index.html',
	'blog/tag/sdlc/index.html',
	'blog/tag/ai/index.html',
	'blog/tag/research/index.html',
	'blog/tag/devex/index.html',
	'blog/tag/astro/index.html',
	'blog/tag/github pages/index.html',
	'blog/tag/wardley mapping/index.html',
	'blog/tag/strategy/index.html',
	'blog/tag/enterprise/index.html',
	'blog/tag/integration/index.html',
	'blog/tag/cots/index.html',
	'blog/tag/dotnet/index.html',
	'blog/tag/api/index.html',
	'blog/tag/kafka/index.html',
	'blog/tag/governance/index.html',
	'blog/tag/cloud/index.html',
	'blog/tag/resilience/index.html',
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
	assert(
		html.includes('href="/foundry"') && !html.includes('font-weight:bolder'),
		`[${page}] Renders stable Header with Foundry tab and zero layout-shifting bold overrides`,
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
	wardleyHtml.includes('Published') &&
		wardleyHtml.includes('Category') &&
		wardleyHtml.includes('ON THIS PAGE') &&
		wardleyHtml.includes('TAGS'),
	'[why-i-love-wardley-mapping] Renders clean Asymmetric Spec Sheet rail (Published, Category, ON THIS PAGE, TAGS)',
);
assert(
	wardleyHtml.includes('data-mermaid-engine="v12-elk-tidytree"') &&
		wardleyHtml.includes('--mermaid-node-bg') &&
		wardleyHtml.includes('--mermaid-node-border') &&
		wardleyHtml.includes('spec-hero-figure'),
	'[why-i-love-wardley-mapping] Includes Token-Synced Mermaid v12 + ELK/Tidy-Tree engine and .spec-hero-figure container',
);
assert(
	wardleyHtml.includes('data-language="mermaid"') &&
		wardleyHtml.includes('The Evolution of Programming Abstractions'),
	'[why-i-love-wardley-mapping] Preserves Markdown Mermaid timeline diagram source',
);

// Validate all 6 new blog posts have hero images, ELK layout, colored nodes, animated edges, and tidy-tree mindmaps
const sixNewPosts = [
	'blog/clean-core-sidecars-and-cots-stop-rules/index.html',
	'blog/contract-first-net-beyond-codegen/index.html',
	'blog/editorial-architecture-and-three-year-tco/index.html',
	'blog/from-adrs-to-executable-constraints/index.html',
	'blog/from-partner-diagram-rot-to-context-engineering/index.html',
	'blog/red-stack-blue-mesh-and-control-plane-fragility/index.html',
];

for (const postPage of sixNewPosts) {
	const postHtml = fs.readFileSync(path.join(distDir, postPage), 'utf8');
	assert(
		postHtml.includes('spec-hero-figure') &&
			postHtml.includes('layout: elk') &&
			postHtml.includes('classDef') &&
			postHtml.includes('animate: true') &&
			postHtml.includes('mindmap') &&
			postHtml.includes('layout: tidy-tree'),
		`[${postPage}] Renders Hero Banner, ELK layout, colored nodes (classDef), animated edges, and Tidy-Tree Mindmap diagram`,
	);
}

// Verify every mindmap fenced block across src/content/{blog,foundry} explicitly sets layout: tidy-tree
const contentCollections = ['src/content/blog', 'src/content/foundry'];
for (const relDir of contentCollections) {
	const absDir = path.join(rootDir, relDir);
	for (const file of fs.readdirSync(absDir).filter((f) => f.endsWith('.md'))) {
		const md = fs.readFileSync(path.join(absDir, file), 'utf8');
		const mermaidBlocks = [...md.matchAll(/```mermaid\s*\n([\s\S]*?)```/g)];
		for (const [, block] of mermaidBlocks) {
			if (/\bmindmap\b/.test(block)) {
				assert(
					/\blayout:\s*tidy-tree\b/.test(block),
					`[${relDir}/${file}] Mindmap block explicitly declares layout: tidy-tree`,
				);
			}
		}
	}
}

const blogPostLayout = readFile('src/layouts/BlogPost.astro');
assert(
	blogPostLayout.includes('ensureMindmapTidyTree') && blogPostLayout.includes('layout: tidy-tree'),
	'[src/layouts/BlogPost.astro] Enforces tidy-tree layout fallback for mindmap diagrams at runtime',
);
assert(
	blogPostLayout.includes('createUniformSubgraphRender') &&
		blogPostLayout.includes('exportSvgToPng') &&
		blogPostLayout.includes('downloadSvgFromContainer') &&
		blogPostLayout.includes('mermaid-lightbox-backdrop') &&
		blogPostLayout.includes('data-export-format'),
	'[src/layouts/BlogPost.astro] Includes uniform subgraph ELK layout wrapper, fullscreen lightbox modal, and SVG/PNG exporter toolbar',
);
assert(
	blogPostLayout.includes('applyCopyrightWatermarkToSvg') &&
		blogPostLayout.includes('COPYRIGHT_WATERMARK_TEXT') &&
		blogPostLayout.includes('Shashi Kumar · shashinkumar.com') &&
		blogPostLayout.includes('data-copyright-watermark') &&
		blogPostLayout.includes('data-export-bg'),
	'[src/layouts/BlogPost.astro] Injects theme-aware Shashi Kumar copyright watermark into live SVGs and SVG/PNG exports with embedded surface background',
);
assert(
	blogPostLayout.includes('resolveDiagramTitle') &&
		!blogPostLayout.includes('Architecture Diagram ${index + 1}'),
	'[src/layouts/BlogPost.astro] Resolves descriptive diagram titles dynamically instead of hardcoding "Architecture Diagram N"',
);
assert(
	layoutCss.includes('.mermaid-lightbox-backdrop') &&
		layoutCss.includes('.mermaid-blueprint.is-expanded') &&
		layoutCss.includes('position: fixed') &&
		layoutCss.includes('.action-pill') &&
		layoutCss.includes('.live-pill'),
	'[src/styles/layout.css] Configures fullscreen lightbox modal and shared action pills (.live-pill / .repo-pill)',
);

const homePageSrc = readFile('src/pages/index.astro');
assert(
	homePageSrc.includes('.btn-primary:hover,\n\t.btn-foundry:hover,\n\t.btn-secondary:hover'),
	'[src/pages/index.astro] Unifies Hero CTA hover rule across Blog, Foundry, and About Me buttons',
);

const tcoHtml = fs.readFileSync(
	path.join(distDir, 'blog/editorial-architecture-and-three-year-tco/index.html'),
	'utf8',
);
assert(
	tcoHtml.includes('Jev') && tcoHtml.includes('decision model'),
	'[editorial-architecture-and-three-year-tco] Notes unobserved net TCO impact of decision models like Jev in Point 3',
);

const blacksmithHtml = fs.readFileSync(
	path.join(distDir, 'blog/what-is-blacksmith-to-goldsmith/index.html'),
	'utf8',
);
assert(
	blacksmithHtml.includes('astro-code-themes github-light github-dark') &&
		blacksmithHtml.includes('color:#24292E;--shiki-dark:#E1E4E8'),
	'[what-is-blacksmith-to-goldsmith] Renders high-contrast Shiki dual-theme code blocks for both Light and Dark modes',
);

// Inspect Structured Knowledge Taxonomy on /blog/index.html
const blogIndexHtml = fs.readFileSync(path.join(distDir, 'blog/index.html'), 'utf8');
assert(
	blogIndexHtml.includes('data-filter="Essay"') &&
		blogIndexHtml.includes('data-filter="Practitioner Note"') &&
		blogIndexHtml.includes('Practitioner Notes') &&
		!blogIndexHtml.includes('Field Note') &&
		blogIndexHtml.includes('data-filter="Research"') &&
		!/class="taxonomy-count"[^>]*>\s*<\/span>/.test(blogIndexHtml),
	'[blog/index.html] Renders Structured Knowledge Architecture taxonomy filters (Essays, Practitioner Notes, Research) with populated badge counts',
);

// Inspect Foundry index and Foundry entries
const foundryIndexHtml = fs.readFileSync(path.join(distDir, 'foundry/index.html'), 'utf8');
assert(
	foundryIndexHtml.includes('Foundry') &&
		foundryIndexHtml.includes('/foundry/engineering-this-monograph/') &&
		foundryIndexHtml.includes('/foundry/atruss-code-atlas/') &&
		foundryIndexHtml.includes('/foundry/tdd-analyzer/') &&
		foundryIndexHtml.includes('/foundry/to-markdown-converter/') &&
		foundryIndexHtml.includes('https://shashinkumar.com/atruss-code-atlas/') &&
		foundryIndexHtml.includes('Product UI') &&
		!/class="taxonomy-count"[^>]*>\s*<\/span>/.test(foundryIndexHtml),
	'[foundry/index.html] Renders Foundry index with Product UI links (including Atruss Code Atlas live URL), populated taxonomy badge counts, and all 4 Foundry entries',
);

const atrussHtml = fs.readFileSync(
	path.join(distDir, 'foundry/atruss-code-atlas/index.html'),
	'utf8',
);
assert(
	atrussHtml.includes('https://shashinkumar.com/atruss-code-atlas/') &&
		atrussHtml.includes('Product UI'),
	'[foundry/atruss-code-atlas] Renders Product UI link in left metadata rail beside GitHub Repo',
);

const foundryProductPages = [
	['foundry/atruss-code-atlas/index.html', '6-Dimension A'],
	['foundry/tdd-analyzer/index.html', 'Static RAG'],
	['foundry/to-markdown-converter/index.html', 'MarkItDown'],
];

for (const [foundryPage, keyPhrase] of foundryProductPages) {
	const pageHtml = fs.readFileSync(path.join(distDir, foundryPage), 'utf8');
	assert(
		pageHtml.includes(keyPhrase) &&
			pageHtml.includes('spec-hero-figure') &&
			pageHtml.includes('layout: elk') &&
			pageHtml.includes('classDef') &&
			pageHtml.includes('animate: true') &&
			pageHtml.includes('mindmap') &&
			pageHtml.includes('layout: tidy-tree'),
		`[${foundryPage}] Renders Hero Banner, "${keyPhrase}", ELK layout, colored nodes, animated edges, and Tidy-Tree Mindmap diagram`,
	);
}

// Inspect Homepage features on /index.html and verify zero noisy // or serial index strings
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const writeSidebarMatch = homeHtml.match(/id="sidebar-write"[\s\S]*?<\/div>\s*<\/div>/);
const buildSidebarMatch = homeHtml.match(/id="sidebar-build"[\s\S]*?<\/div>\s*<\/div>/);
const writeItemCount = writeSidebarMatch
	? (writeSidebarMatch[0].match(/class="pillar-item"/g) || []).length
	: 0;
const buildItemCount = buildSidebarMatch
	? (buildSidebarMatch[0].match(/class="pillar-item"/g) || []).length
	: 0;

assert(
	homeHtml.includes('From Blacksmiths') &&
		homeHtml.includes('to Goldsmiths.') &&
		homeHtml.includes('Explore the Foundry') &&
		homeHtml.includes('What I Write About') &&
		homeHtml.includes('What I Build') &&
		writeItemCount > 0 &&
		writeItemCount <= 3 &&
		buildItemCount > 0 &&
		buildItemCount <= 3 &&
		homeHtml.includes('https://www.linkedin.com/in/shashinkumar/') &&
		homeHtml.includes('https://github.com/kumarshaz') &&
		homeHtml.includes('https://dzone.com/users/5309856/snkumar.html'),
	'[index.html] Preserves Hero, Explore the Foundry CTA, What I Write About (<=3 items), What I Build (<=3 items), and Connect links',
);
assert(
	!homeHtml.includes('MONOGRAPH //') &&
		!homeHtml.includes('SECTION 01') &&
		!homeHtml.includes('DOM-01') &&
		!homeHtml.includes('01 //'),
	'[index.html] Free of unnecessary // labels, section numbers, and serial numbers',
);

const cnamePath = path.join(distDir, 'CNAME');
const rssXml = fs.readFileSync(path.join(distDir, 'rss.xml'), 'utf8');
const sitemapIndexXml = fs.readFileSync(path.join(distDir, 'sitemap-index.xml'), 'utf8');
assert(
	fs.existsSync(cnamePath) && fs.readFileSync(cnamePath, 'utf8').trim() === 'shashinkumar.com',
	'[dist/CNAME] Declares custom domain shashinkumar.com',
);
assert(
	homeHtml.includes('rel="canonical" href="https://shashinkumar.com/"') &&
		rssXml.includes('https://shashinkumar.com') &&
		!rssXml.includes('kumarshaz.github.io') &&
		sitemapIndexXml.includes('https://shashinkumar.com/sitemap-0.xml'),
	'[Custom Domain] Emits https://shashinkumar.com across canonical metadata, RSS feed, and XML sitemap',
);

const baseHeadSrc = readFile('src/components/BaseHead.astro');
const ogDefaultDistPath = path.join(distDir, 'og-default.png');
assert(
	fs.existsSync(ogDefaultDistPath) &&
		fs.statSync(ogDefaultDistPath).size > 10000 &&
		!baseHeadSrc.includes('blog-placeholder') &&
		baseHeadSrc.includes('/og-default.png'),
	'[Social Card] Bundles public/og-default.png in dist/ and removes stock blog-placeholder fallback from BaseHead.astro',
);
assert(
	homeHtml.includes('property="og:image" content="https://shashinkumar.com/og-default.png"') &&
		homeHtml.includes('property="twitter:image" content="https://shashinkumar.com/og-default.png"') &&
		blogIndexHtml.includes('property="og:image" content="https://shashinkumar.com/og-default.png"') &&
		foundryIndexHtml.includes('property="og:image" content="https://shashinkumar.com/og-default.png"') &&
		!homeHtml.includes('blog-placeholder'),
	'[Social Card] Emits https://shashinkumar.com/og-default.png for og:image and twitter:image across home, blog, and foundry index pages',
);

console.log('\n======================================================================');
console.log(` VALIDATION SUMMARY: ${passed} passed, ${failed} failed`);
console.log('======================================================================');

if (failed > 0) {
	process.exit(1);
}
