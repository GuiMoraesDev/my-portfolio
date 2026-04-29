You are a senior frontend engineer refactoring a developer portfolio to improve clarity, interaction quality, and space usage.

Focus ONLY on the following changes. Do not modify unrelated parts of the code.

---

# 🎯 OBJECTIVES

1. Remove the hero image and improve layout balance
2. Refactor the 3 “How I work” items (currently card-like)
3. Add a floating terminal trigger (iTerm2-inspired)
4. Transform the terminal into a real command-line interaction (not an email form)

---

# ⚙️ TASK 1 — Remove Hero Image & Rebalance Layout

## Goal

Improve signal density and eliminate decorative space usage.

## Actions

- Remove the hero/profile image completely
- Refactor hero layout to use space more effectively:
  - Increase emphasis on headline
  - Improve vertical rhythm
  - Limit text width for readability (~60–75ch max)
- Introduce better spacing between:
  - intro line
  - main statement
  - supporting bullets

## Optional Enhancements

- Slightly increase font size/weight of main statement
- Add subtle max-width container for better composition

---

# ⚙️ TASK 2 — Refactor “How I Work” Section

## Goal

Remove “card UI” feeling and make content feel more editorial and intentional.

## Actions

- Remove card containers (no borders, no heavy backgrounds)
- Convert into a vertical or stacked layout

### Structure:

Each item should be:

- Small icon (low visual weight)
- Strong leading sentence
- Supporting sentence (optional, shorter)

Example structure:

[icon]  
Strong statement  
Short supporting explanation

## Layout

- Use spacing instead of boxes
- Align content consistently (left-aligned)
- Increase vertical rhythm between items

---

# ⚙️ TASK 3 — Floating Terminal Trigger (iTerm2-inspired)

## Goal

Create a persistent, subtle entry point for interaction.

## Actions

- Add a floating button:
  - Fixed position (bottom-right)
  - Circular or slightly rounded square
  - Inspired by terminal apps (iTerm2 style, not literal copy)

## Behavior

- Opens terminal modal on click
- Has hover + active states
- Subtle elevation/shadow

## Constraints

- Must not obstruct content
- Must be accessible (keyboard + aria-label)

---

# ⚙️ TASK 4 — Refactor Terminal into Real Command Interface

## Goal

Make terminal feel like a real tool, not a themed contact form.

---

## Terminal Behavior

Replace current email-based interaction with command-driven interface.

---

## Commands to Support

Implement a simple command system:

### Required commands:

- help  
  → lists available commands

- whoami  
  → returns name + short description

- contact  
  → shows links (GitHub, LinkedIn)

- clear  
  → clears terminal

- echo [text]  
  → prints text

---

## Optional (nice to have)

- open github
- open linkedin

---

## Input Behavior

- Single-line input (like terminal)
- Press Enter to execute
- Maintain command history
- Support arrow up/down navigation (if feasible)

---

## Output Behavior

- Append responses to terminal log
- Keep scroll at bottom
- Monospace font

---

## UI Details

- Blinking cursor
- Clean dark background
- Subtle borders (no heavy styling)
- Feels fast and responsive

---

## Constraints

- No heavy libraries
- Keep logic simple and readable
- Focus on UX, not completeness

---

# ♿ Accessibility

- Terminal must be keyboard accessible
- Focus should move into terminal when opened
- Escape key closes modal
- Proper aria roles for modal

---

# 🚫 DO NOT

- Reintroduce card-heavy UI
- Add unnecessary animations
- Overcomplicate command system
- Use terminal as email sender

---

# ✅ OUTPUT FORMAT

1. Show updated components:
   - Hero
   - HowIWork section
   - FloatingTerminalButton
   - TerminalModal (refactored)

2. Brief explanation of key decisions

---

# ⛔ IMPORTANT

Do NOT commit changes yet.

Present everything for review first.
Wait for approval before applying changes.
