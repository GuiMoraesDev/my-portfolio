# Portfolio Redesign — Project Definition

You are a senior frontend engineer responsible for refactoring and evolving the portfolio website **guimoraes.dev**.

This project must be executed in a **structured, iterative, and review-driven workflow**.

---

# 🎯 PROJECT GOALS

- Improve layout clarity and space utilization
- Strengthen senior-level positioning and content signal
- Introduce a terminal-based interaction system
- Structure blog and testimonials as first-class content systems
- Add responsive navigation (header with mobile/desktop behavior)
- Maintain a clean, minimal, and engineered visual style

---

# 🧩 PHASES (DETAILED SPECIFICATION)

---

## 🔹 Phase 1 — Hero Refactor

### Goal

Remove decorative elements and increase **signal density and clarity**.

### Tasks

- Refactor layout to focus on text hierarchy

### Layout Rules

- Max width: ~60–75 characters per line
- Clear vertical rhythm:
  - Intro → Headline → Supporting text → CTA
- Avoid large empty vertical gaps

### Content Rules

- Headline must communicate:
  - system thinking
  - long-term impact
- Supporting text must:
  - mention stack (Next.js, TypeScript)
  - mention decision-making (architecture, tradeoffs)

### CTA Rules

- Keep:
  - GitHub
  - LinkedIn
  - Resume button
- Align horizontally on desktop
- Stack cleanly on mobile

### Output

- Updated Hero component
- Improved spacing and typography hierarchy

---

## 🔹 Phase 2 — How I Work Refactor (Bento Grid)

### Goal

Transform the section into a bento grid composition inspired by the provided reference image.

The layout must:

- communicate hierarchy through size and placement
- feel editorial and intentional (not component-based)
- prioritize message over symmetry

### Tasks

- Replace the current layout with a bento grid system
- Use asymmetrical layout with varied spans
- Introduce one dominant block (hero statement)

### Layout Model (based on reference)

Use a structure similar to:

- Top:
  - Large primary block (Core mentality / positioning)
  - Secondary supporting block (side panel)
- Bottom:
  - Medium block (design philosophy)
  - Large visual or supporting block (can include background image or emphasis area)

### Content Mapping

Map your ideas like this:

1. Primary (largest block)
   → Your core thinking (system-level thinking, reducing friction)
2. Secondary (top-right)
   → Fixing systems / stability / root causes
3. Medium block
   → Design for scale / architecture
4. Wide or visual block
   → Execution / workflow / enabling teams

### Content Rules

- Headings must be:
  - declarative
  - opinionated
  - non-generic

Bad:

- “I build scalable apps”

Good:

- “Design for Scale”
- “Fix & Stabilize Systems”
- “Think Beyond the Code”

### Copy Style

- Short paragraphs (2–3 lines max)
- No filler words
- Focus on:
  - cause → action → impact

### Visual Rules

- Avoid card-like styling
- No heavy borders or shadows
- Use:
  - subtle gradients
  - background contrast
  - spacing for separation

### Responsiveness

- Desktop:
  → Full bento layout (asymmetric)
- Tablet:
  → Simplified grid (2 columns)
- Mobile:
  → Vertical stack preserving hierarchy (largest first)

### Output

- Bento grid layout component
- Rewritten copy aligned with structure

## 🔹 Phase 3 — Header & Navigation

### Goal

Add minimal navigation without visual noise.

---

### Desktop

- No hamburger
- Inline navigation:
  - Home
  - Testimonials
  - Blog
- CTA: GET IN TOUCH

---

### Mobile

- Hamburger menu
- Menu contains:
  - Home
  - Testimonials
  - Blog
  - GET IN TOUCH

---

### Behavior

- GET IN TOUCH:
  - scroll to footer
  - if not on homepage → navigate then scroll

- Sticky header
- smooth scroll

---

### Accessibility

- keyboard navigation
- aria attributes

---

### Output

- Header component
- Mobile menu

---

## 🔹 Phase 4 — Blog System + Home Integration

### Goal

Turn the blog into a core content system and surface it directly on the homepage.

---

### Routes

- /blog
- /blog/[slug]

---

### Blog Index

- Group posts by:
  Year → Month → Posts

- Sorted descending

---

### Blog Post Page

Must include:

- Title
- Date
- Optional reading time
- Content
- Back navigation

---

### 🚨 Homepage Integration (MANDATORY)

Replace any external blog references.

#### Tasks

- REMOVE:
  - dev.to links
  - external blog shortcuts
- ADD:
  - Internal blog preview section

#### Homepage Blog Section

Must:

- Display latest 3 posts
- Each post includes:
  - Title
  - Short summary
  - Metadata (date or reading time)

#### Interaction

- Clicking item → /blog/[slug]
- Add link:
  → “View all posts” → /blog

### Layout Rules

- Avoid card-heavy UI
- Prefer:
  - clean list
  - subtle separators
  - strong typography

### Data Model

Each post:

- slug
- title
- date (ISO)
- summary
- content

---

### Constraints

- No CMS
- Static data or JSON
- Fast rendering

---

### Output

- Blog index page
- Blog post page
- Routing

---

## 🔹 Phase 5 — Testimonials (LinkedIn Shortcut Only)

### Goal

Reduce testimonials to lightweight credibility signals, avoiding duplication and overengineering.

## 🚨 Strategy Change (MANDATORY)

REMOVE completely:

- /testimonials route
- testimonial detail pages
- any internal navigation for testimonials

Replace With

- Homepage section (top 3 testimonials)
- External link to LinkedIn recommendations

### Tasks

- Select top 3 testimonials only
- Trim content to:
  - short excerpt
  - high-impact sentence

### Structure (Homepage)

Each testimonial must include:

- Name
- Role + company
- Short excerpt (max 2–3 lines)

### Interaction (IMPORTANT)

- Entire section OR each testimonial must link to:
  → LinkedIn profile or recommendations page

### Layout Rules

- Avoid dense text blocks
- Use:
  - vertical stack OR
  - 2-column layout (desktop)

### Visual Rules

- No heavy cards
- No large paragraphs
- Emphasize scannability

### Content Constraints

- Keep only what adds credibility
- Remove redundancy and filler

### Output

- Simplified testimonials section
- External LinkedIn link
- No internal routing

## 🔹 Phase 5 — Testimonials System

### Goal

Turn testimonials into **structured social proof**.

---

### Routes

- /testimonials
- /testimonials/[slug]

---

### Index Page

- Featured testimonial (top)
- List of others
- Optional grouping (role/company)

---

### Detail Page

Must include:

- Name
- Role + company
- Context (relationship)
- Highlight quote
- Full text

---

### Data Model

- slug
- name
- role
- company
- context
- highlight
- full text

---

### Output

- Testimonials index
- Detail page
- Routing

---

# 📁 STATE MANAGEMENT

You MUST create and maintain a `state.md` file at the root.

This file is the **single source of truth** for progress.

---

# 🔁 EXECUTION LOOP

For EVERY phase:

Read state.md
Identify the next incomplete phase
Execute ONLY that phase
STOP and request review

---

# 🛑 REVIEW PROCESS

After completing a phase, you MUST:

Summarize what was implemented
Explain key decisions briefly
Suggest a commit message

Example:

feat: refactor hero layout and remove profile image
Ask for approval explicitly

---

# ✅ AFTER APPROVAL

ONLY after approval:

Update state.md
Commit using approved message
Push changes
Clear context window

---

# 🧠 CONTEXT RESET RULE

After each commit:

Assume all previous context is lost
Rely ONLY on:
the codebase
state.md

---

# ⚙️ SCOPE CONTROL

Do NOT execute multiple phases at once
Do NOT skip phases
Do NOT modify unrelated code

---

# ❗ IF BLOCKED

If you cannot proceed:

Clearly explain the blocker
Propose 1–2 solutions
Ask for direction

---

# 🚫 DO NOT

Commit without approval
Invent requirements
Over-engineer beyond scope
Ignore state.md

---

# 🎯 EXPECTED BEHAVIOR

Operate like a disciplined senior engineer:

- incremental progress
- strong reasoning
- clean implementation
- no shortcuts
