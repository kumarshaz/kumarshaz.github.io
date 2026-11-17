import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			// Branding & Taxonomy additions:
			category: z
				.enum(['Essay', 'Practitioner Note', 'Architecture Note', 'Research', 'Perspective'])
				.default('Essay'),
			tags: z.array(z.string()).default([]),
			readingTime: z.string().optional(),
			status: z.enum(['Draft', 'Evergreen', 'Published']).default('Published'),
			docId: z.string().optional(),
		}),
});

const foundry = defineCollection({
	// Load Markdown and MDX files in the `src/content/foundry/` directory.
	loader: glob({ base: './src/content/foundry', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			category: z
				.enum(['Platform', 'Architecture Toolkit', 'Developer Tool', 'Open Source'])
				.default('Architecture Toolkit'),
			tags: z.array(z.string()).default([]),
			readingTime: z.string().optional(),
			status: z.enum(['Active', 'Evergreen', 'Production', 'Open Source']).default('Active'),
			repoUrl: z.string().url().optional(),
			liveUrl: z.string().url().optional(),
			docId: z.string().optional(),
		}),
});

export const collections = { blog, foundry };

