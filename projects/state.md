# Portfolio Redesign State

## Completed Phases

- [x] Phase 1 — Hero Refactor
- [x] Phase 2 — How I Work Refactor (Bento Grid)
- [x] Phase 3 — Header & Navigation
- [x] Phase 4 — Blog System + Home Integration
- [x] Phase 5 — Testimonials (LinkedIn Shortcut Only)

## Current Phase

All phases complete.

## Notes

- Phase 1: removed DrawContainer dead code, refactored hero with eyebrow label, fluid display type for name, removed wave emoji
- Phase 2: replaced inline about-me bordered paragraphs with bento grid organism (HowIWorkView). 4 blocks: Think Beyond the Code (primary, lg:col-span-2), Fix & Stabilize Systems (accent tint), Design for Scale, Enable Teams (wide). Layout uses gap-px on bg-border-subtle for editorial separation. Removed unused yearsOfExperience / getLocale from page.tsx.
- Phase 3: replaced all-hamburger nav with sticky header — desktop shows inline nav (Home → #presentation, Testimonials → #references, Blog → /blog) + GET IN TOUCH pill button (→ #footer) on right; mobile keeps hamburger dropdown with same links. Updated en.json / pt.json link keys (home, testimonials, blog, get-in-touch).
- Phase 4: replaced dev.to API integration with static internal blog. Created src/data/blog-posts.ts (3 posts), src/services/blog.ts (getAllPosts, getPostBySlug, getLatestPosts, groupPostsByYearMonth). New routes: /blog (index grouped by year/month) and /blog/[slug] (post page with back nav). Updated ArticlesView + ArticlesList to use internal data. Removed dev.to external link from homepage; "View all posts" now links to /blog. Header Blog link updated to /blog.
- Phase 5: replaced async-fetch testimonials system (API route, context provider, skeleton, ShowMoreButton, TestimonialsList) with a single LinkedIn shortcut link card. Removed /api/testimonials/list route, api.testimonials service, and all related components/tests. TestimonialsView is now a simple server component rendering one styled anchor tag.
