# Pedido Senhor dos Aneis Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playful Next.js invitation page for Vercel with a fleeing `Nao` button and a romantic confirmation screen.

**Architecture:** Use a single App Router route with client-side interaction. Keep the button escape math in a small pure TypeScript module so it can be tested with Node's test runner.

**Tech Stack:** Next.js, React, TypeScript, CSS Modules/global CSS, Node test runner.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.mjs`
- Create: `.gitignore`

- [ ] Add minimal Next.js configuration and scripts for `dev`, `build`, `start`, `lint`, and `test`.
- [ ] Use `node --test` with `tsx` for TypeScript tests.

### Task 2: Button Motion Logic

**Files:**
- Create: `app/no-button-motion.ts`
- Create: `app/no-button-motion.test.ts`

- [ ] Write tests proving the escaped position stays in bounds and moves away from the pointer.
- [ ] Implement `getEscapedButtonPosition` with viewport, button size, current position, pointer position, margin, and escape distance inputs.

### Task 3: Invitation Page

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `public/foto-convite.jpg`

- [ ] Move the provided jpg into `public/foto-convite.jpg`.
- [ ] Build the initial invitation view with `Sim` and `Nao`.
- [ ] Wire pointer movement so `Nao` runs away.
- [ ] Show the photo and romantic message after `Sim` is clicked.

### Task 4: Verification

**Files:**
- Modify as needed based on verification output.

- [ ] Run `npm install` if dependencies are missing.
- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
