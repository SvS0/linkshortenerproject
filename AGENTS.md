# Agent Instructions

This file serves as the main index for all coding standards and conventions for the Link Shortener project. When working on this codebase, AI agents and developers should consult these guidelines to ensure consistency and quality.

## ⚠️ CRITICAL REQUIREMENT

**BEFORE generating ANY code, you MUST read the relevant documentation file(s) from the `/docs` directory.**

This is **non-negotiable** and applies to:

- Creating new components
- Modifying existing code
- Writing database queries
- Implementing authentication
- Styling or UI work
- ANY code generation task

Failure to consult the appropriate documentation will result in code that doesn't follow project standards.

## Overview

This is a **Next.js 16** link shortener application built with:

- **TypeScript** (strict mode)
- **React 19**
- **Clerk** for authentication
- **Drizzle ORM** with Neon PostgreSQL
- **Tailwind CSS v4**
- **shadcn/ui** components

## Standards Documentation

All coding standards are organized in the `/docs` directory by topic:

### Core Standards

- **[TypeScript Standards](docs/typescript-standards.md)** — Type safety, path aliases, strict mode
- **[Next.js Patterns](docs/nextjs-patterns.md)** — App Router, Server/Client Components, data fetching
- **[Database Patterns](docs/database-patterns.md)** — Drizzle ORM, schema design, queries
- **[UI Components](docs/ui-components.md)** — shadcn/ui components, component patterns, styling standards
- **[Authentication](docs/authentication.md)** — Clerk integration and user management, route protection, and auth patterns
- **[Project Structure](docs/project-structure.md)** — File organization and naming conventions

## Quick Reference

### Golden Rules

1. **📖 READ DOCUMENTATION FIRST** — Before writing any code, consult the relevant `/docs` files. This is mandatory and cannot be skipped.
2. **TypeScript strict mode is always on** — No `any` types, no unsafe assertions
3. **Always use `@/` path aliases** — Never use relative imports like `../../../`
4. **Server Components by default** — Only add `"use client"` when necessary
5. **Colocate related code** — Keep components, types, and logic together
6. **Follow Next.js App Router conventions** — Use proper file naming and routing

### When in Doubt

- Check existing code for patterns
- Prefer type safety over convenience
- Write code that's easy to read and maintain

## Contributing

When adding new patterns or conventions:

1. Update the relevant document in `/docs`
2. Add examples showing both correct and incorrect usage
3. Keep documentation concise and actionable
