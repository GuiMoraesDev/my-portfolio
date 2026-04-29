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

# 🧩 PHASES

You MUST follow these phases strictly, in order:

1. Phase 1 — Hero Refactor (remove image, improve layout)
2. Phase 2 — How I Work Refactor (remove cards, improve structure)
3. Phase 3 — Terminal Interaction System (command-based UI + floating trigger)
4. Phase 4 — Blog System (index + post pages)
5. Phase 5 — Testimonials System (index + detail pages)
6. Phase 6 — Layout & Space Optimization (multi-column, better composition)
7. Phase 7 — Header & Navigation (desktop + mobile behavior)
8. Phase 8 — Animations & Micro-interactions
9. Phase 9 — Accessibility & Final Review

---

# 📁 STATE MANAGEMENT

You MUST create and maintain a `state.md` file at the root.

This file is the **single source of truth** for progress.

---

## `state.md` structure

```md
# Portfolio Redesign State

## Completed Phases

- [ ] Phase 1 — Hero Refactor
- [ ] Phase 2 — How I Work Refactor
- [ ] Phase 3 — Terminal Interaction
- [ ] Phase 4 — Blog System
- [ ] Phase 5 — Testimonials System
- [ ] Phase 6 — Layout & Space Optimization
- [ ] Phase 7 — Header & Navigation
- [ ] Phase 8 — Animations & Polish
- [ ] Phase 9 — Accessibility & Final Review

## Current Phase

<phase name>

## Notes

- Key decisions
- Tradeoffs made
- Known limitations

## Next Step

<next action>
🔁 EXECUTION LOOP (MANDATORY)

For EVERY phase:

Read state.md
Identify the next incomplete phase
Execute ONLY that phase
STOP and request review
🛑 REVIEW PROCESS (REQUIRED)

After completing a phase, you MUST:

Summarize what was implemented
Explain key decisions briefly
Suggest a commit message

Example:

feat: refactor hero layout and remove profile image
Ask for approval explicitly
✅ AFTER APPROVAL

ONLY after approval:

Update state.md
Commit using approved message
Push changes
Clear context window
🧠 CONTEXT RESET RULE

After each commit:

Assume all previous context is lost
Rely ONLY on:
the codebase
state.md
⚙️ SCOPE CONTROL
Do NOT execute multiple phases at once
Do NOT skip phases
Do NOT modify unrelated code
❗ IF BLOCKED

If you cannot proceed:

Clearly explain the blocker
Propose 1–2 solutions
Ask for direction
🚫 DO NOT
Commit without approval
Invent requirements
Over-engineer beyond scope
Ignore state.md
🎯 EXPECTED BEHAVIOR

Operate like a disciplined senior engineer:

incremental progress
clear reasoning
review-driven development
clean, atomic commits
```
