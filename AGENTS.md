# Agent Instructions

This file serves as the main index for all coding standards and conventions for the Link Shortener project. When working on this codebase, AI agents and developers should consult these guidelines to ensure consistency and quality.

## Overview

This is a **Next.js 16** link shortener application built with:

- **TypeScript** (strict mode)
- **React 19**
- **Clerk** for authentication
- **Drizzle ORM** with Neon PostgreSQL
- **Tailwind CSS v4**
- **shadcn/ui** components

### Core Standards

- **[TypeScript Standards]()** — Type safety, path aliases, strict mode
- **[Next.js Patterns]()** — App Router, Server/Client Components, data fetching
- **[Database Patterns]()** — Drizzle ORM, schema design, queries
- **[Server Actions](.github/instructions/server-actions.instructions.md)** — Data mutations, validation, security patterns
- **[UI Components](d)** — shadcn/ui components, component patterns, styling standards
- **[Authentication]()** — Clerk integration and user management, route protection, and auth patterns
- **[Project Structure]()** — File organization and naming conventions

## Quick Reference

### Golden Rules

1. **TypeScript strict mode is always on** — No `any` types, no unsafe assertions
2. **Always use `@/` path aliases** — Never use relative imports like `../../../`
3. **Server Components by default** — Only add `"use client"` when necessary
4. **Colocate related code** — Keep components, types, and logic together
5. **Follow Next.js App Router conventions** — Use proper file naming and routing
6. **NEVER use middleware.ts** — This is deprecated in Next.js 16. Always use `proxy.ts` instead for middleware functionality
7. **All data mutations via Server Actions** — Named `actions.ts`, colocated, with Zod validation and auth checks

### When in Doubt

- Check existing code for patterns
- Prefer type safety over convenience
- Write code that's easy to read and maintain

## Contributing

When adding new patterns or conventions:

1. Add examples showing both correct and incorrect usage
2. Keep documentation concise and actionable
