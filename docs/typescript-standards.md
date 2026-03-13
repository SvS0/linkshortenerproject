# TypeScript Standards

## Overview

All code in this application is written in **TypeScript with strict mode enabled**. These standards ensure type safety, consistency, and maintainability across the codebase.

## Core Rules

### 1. Strict Mode

TypeScript strict mode is always on. The following strict checks are enabled via `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

This means:
- No implicit `any` types
- Strict null checks
- Strict function types
- No implicit `this`

### 2. No `any` Types

Never use `any`. Use proper types, `unknown`, or generics instead:

```ts
// Incorrect
function process(data: any) { ... }

// Correct
function process(data: unknown) { ... }

// Correct - use generics
function process<T>(data: T): T { ... }
```

### 3. Path Aliases

Always use the `@/` path alias instead of relative imports:

```ts
// Correct
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import db from "@/db";

// Incorrect
import { cn } from "../../lib/utils";
import { Button } from "../components/ui/button";
```

The alias is configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 4. Type Annotations

Prefer explicit type annotations for function parameters and return types:

```ts
// Correct
export async function getLinks(userId: string): Promise<Link[]> { ... }

// Avoid - return type is implicit
export async function getLinks(userId: string) { ... }
```

### 5. Interface vs Type

Use `type` for object shapes and unions; use `interface` only when extension is needed:

```ts
// Preferred for simple shapes
type Link = {
  id: number;
  url: string;
  slug: string;
  userId: string;
  createdAt: Date;
};

// Use interface when extending
interface AdminLink extends Link {
  adminNote: string;
}
```

### 6. Readonly Props

Use `Readonly` for component props that should not be mutated:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { ... }
```

## What NOT to Do

❌ **Never** use `any` — use `unknown` or proper types instead  
❌ **Never** use relative import paths — always use `@/`  
❌ **Never** disable TypeScript with `@ts-ignore` or `@ts-expect-error` without a comment explaining why  
❌ **Never** use non-null assertion (`!`) unless the value is guaranteed non-null by surrounding logic  

## What TO Do

✅ **Always** write TypeScript with strict mode  
✅ **Always** use `@/` path aliases  
✅ **Always** type function parameters and return types explicitly  
✅ **Always** prefer `unknown` over `any` when the type is genuinely unknown  
