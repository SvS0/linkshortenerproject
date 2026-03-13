# Project Structure

## Overview

This is a **Next.js 16 App Router** application. Files are organized by purpose, with all source code at the project root (no separate `src/` directory).

## Directory Layout

```
linkshortenerproject/
├── app/                    # Next.js App Router (pages & layouts)
│   ├── globals.css         # Global CSS styles
│   ├── layout.tsx          # Root layout (ClerkProvider, shared header)
│   ├── page.tsx            # Homepage: /
│   └── dashboard/
│       └── page.tsx        # Dashboard page: /dashboard
├── components/
│   └── ui/                 # shadcn/ui components (auto-generated)
│       └── button.tsx
├── db/
│   ├── index.ts            # Drizzle ORM client instance
│   └── schema.ts           # Database schema definitions
├── docs/                   # Project standards documentation
│   ├── authentication.md
│   ├── database-patterns.md
│   ├── nextjs-patterns.md
│   ├── project-structure.md
│   ├── typescript-standards.md
│   └── ui-components.md
├── lib/
│   └── utils.ts            # Shared utility functions (cn helper)
├── public/                 # Static assets (images, icons)
├── AGENTS.md               # AI agent coding standards index
├── components.json         # shadcn/ui configuration
├── drizzle.config.ts       # Drizzle Kit configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── package.json
├── postcss.config.mjs      # PostCSS / Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Key Directories

### `app/`

All pages, layouts, and route-specific files. Follows Next.js App Router conventions:

- `layout.tsx` — shared UI for a route segment and its children
- `page.tsx` — the UI for a specific route
- Nested folders create nested routes (e.g., `app/dashboard/page.tsx` → `/dashboard`)

See [Next.js Patterns](nextjs-patterns.md) for details.

### `components/ui/`

shadcn/ui components are installed here and can be customized. Never create custom replacements for components that shadcn/ui already provides.

See [UI Component Standards](ui-components.md) for details.

### `db/`

All database-related code:

- `index.ts` — exports the Drizzle ORM client
- `schema.ts` — all table definitions

See [Database Patterns](database-patterns.md) for details.

### `lib/`

Shared utility functions used across the application:

- `utils.ts` — exports the `cn()` helper for merging Tailwind class names

### `docs/`

Standards documentation for developers and AI agents. Always consult the relevant doc before writing code.

### `public/`

Static assets served at the root URL (e.g., `/favicon.ico`).

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Route files | lowercase kebab-case directories | `app/dashboard/page.tsx` |
| Component files | PascalCase | `components/ui/button.tsx` |
| Utility files | camelCase | `lib/utils.ts` |
| Database files | camelCase | `db/schema.ts`, `db/index.ts` |
| Config files | camelCase or kebab-case | `drizzle.config.ts`, `eslint.config.mjs` |

## Adding New Routes

Create a new folder under `app/` with a `page.tsx` file:

```
app/
  links/
    page.tsx     # /links
    [slug]/
      page.tsx   # /links/[slug] (dynamic route)
```

## Adding New Components

Install shadcn/ui components with:

```bash
npx shadcn@latest add <component-name>
```

This installs the component into `components/ui/`. Import it using the `@/components/ui/` alias.

## What NOT to Do

❌ **Never** create a `src/` directory — all source files are at the root  
❌ **Never** put page files outside of `app/`  
❌ **Never** put shadcn/ui components outside of `components/ui/`  
❌ **Never** put database logic outside of `db/`  

## What TO Do

✅ **Always** follow the directory layout described above  
✅ **Always** use `@/` path aliases for imports  
✅ **Always** colocate related files within the same route segment  
✅ **Always** consult `/docs` before adding new files or patterns  
