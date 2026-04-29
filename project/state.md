# Project State — feature/terminal-and-hero-refactor

Branch: `feature/terminal-and-hero-refactor`
Based on: `homolog`

---

## Tasks from definition.md

### ✅ TASK 1 — Remove Hero Image & Rebalance Layout
**Status: DONE — awaiting review**

Changes in `src/app/[locale]/page.tsx`:
- Removed `import Image from "next/image"`
- Removed the entire image `<section>` (profile.png container)
- Removed `md:flex-row` from the presentation `SessionWrapper` — now single column
- `SessionWrapper` overridden with `items-start` — full left alignment
- Section is now `w-full` with no max-width constraint, using full available width
- `h2` title capped at `max-w-[20ch]` to keep it punchy
- Subtitle capped at `max-w-[56ch]` for readability, both left-aligned
- `SocialMedia` forced left with `justify-start`
- Increased vertical gap: `gap-8 md:gap-12`
- Collapsed the two `<SocialMedia>` instances (hidden/shown at breakpoints) into one unconditional render

---

### ✅ TASK 2 — Refactor "How I Work" Section
**Status: DONE — awaiting review**

Changes in `src/app/[locale]/page.tsx`:
- `NarrativeBlock`: removed `border-l border-border-strong pl-5` (the card-left-border feel)
- Icon size reduced from `md` to `sm` (lower visual weight)
- Grid gap increased: `gap-8 → gap-14` on mobile, `gap-6 → gap-10` on desktop
- No boxes, no backgrounds — pure spacing and typography

---

### ✅ TASK 3 — Floating Terminal Trigger
**Status: DONE — awaiting review**

Changes in `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx`:
- Floating button is `fixed bottom-6 right-6 z-40`, circular (`rounded-full`), `h-12 w-12`
- Label: `>_` in accent color, monospace font
- Hover: border accent glow + shadow; active: `scale-95`
- `aria-label="Open terminal"`, keyboard accessible
- `<TerminalContact />` moved to root of `<main>` in `page.tsx` (renders the floating button globally)

---

### ✅ TASK 4 — Real Command Interface
**Status: DONE — awaiting review**

Full rewrite of `TerminalContact.tsx`:
- No props — self-contained command system
- Commands: `help`, `whoami`, `contact`, `clear`, `echo [text]`, `open github`, `open linkedin`
- Single-line `<input>`, Enter to execute
- Command history: ↑/↓ arrow navigation
- Output log: appends lines, auto-scrolls to bottom
- Line types: `input` (prompt echo), `output` (plain), `error` (red), `link` (clickable accent)
- `clear` resets to welcome message
- Escape closes modal; Tab cycles focus; first dot button closes on click
- Dark background `#0d0d0d`, macOS-style traffic-light header
- `open github` / `open linkedin` open in new tab

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/[locale]/page.tsx` | Hero refactor, NarrativeBlock update, TerminalContact moved to root |
| `src/components/organisms/TerminalContact/src/views/TerminalContact.tsx` | Full rewrite |

---

## Pending

- [ ] **User review** — visual check in browser before committing
- [ ] Commit once approved
- [ ] PR to `homolog`
