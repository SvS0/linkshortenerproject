---
description: This file defines the server actions standards for the project, ensuring consistent data mutation patterns and security practices.
---

# Server Actions Standards

## Overview

All data mutations in this application **MUST** be performed via Server Actions. This ensures type safety, security, and consistent data validation patterns.

## Core Rules

### 1. Server Actions for All Mutations

- **ONLY use Server Actions** for data mutations (create, update, delete)
- Never perform mutations directly in components
- Server Actions provide a secure bridge between client and server

### 2. File Naming and Location

Server Action files **MUST**:

- Be named `actions.ts`
- Be colocated in the same directory as the component that calls them

**Example structure:**

```
app/
  dashboard/
    page.tsx          // Client component that calls actions
    actions.ts        // Server actions for dashboard
  links/
    create/
      page.tsx        // Client component
      actions.ts      // Server actions for link creation
```

### 3. Client Component Requirement

- Server Actions **MUST** be called from Client Components
- Add `"use client"` directive to components that call Server Actions

**Example:**

```tsx
"use client";

import { createLink } from "./actions";

export default function CreateLinkForm() {
  async function handleSubmit(data: CreateLinkInput) {
    await createLink(data);
  }
  // ...
}
```

### 4. Type Safety - NO FormData

- **DO NOT** use the `FormData` TypeScript type
- Define appropriate TypeScript interfaces/types for all action parameters
- Pass structured data, not FormData

**❌ WRONG:**

```tsx
export async function createLink(formData: FormData) {
  // Don't do this
}
```

**✅ CORRECT:**

```tsx
interface CreateLinkInput {
  url: string;
  slug?: string;
  description?: string;
}

export async function createLink(data: CreateLinkInput) {
  // Do this
}
```

### 5. Zod Validation

- **ALL data MUST be validated** using Zod schemas
- Validation happens at the beginning of the Server Action
- Return meaningful error messages

**Example:**

```tsx
"use server";

import { z } from "zod";

const createLinkSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  slug: z.string().min(3).optional(),
  description: z.string().max(500).optional(),
});

export async function createLink(data: unknown) {
  // Validate input
  const parsed = createLinkSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  const validatedData = parsed.data;
  // Continue with validated data...
}
```

### 6. Authentication Check

- **ALL Server Actions MUST** verify user authentication before database operations
- Use Clerk's `auth()` function
- Return early if user is not authenticated

**Example:**

```tsx
"use server";

import { auth } from "@clerk/nextjs/server";

export async function createLink(data: CreateLinkInput) {
  // 1. Check authentication FIRST
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // 2. Validate data
  const parsed = createLinkSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.message };
  }

  // 3. Perform database operation
  // ...
}
```

### 7. Database Operations via Helper Functions

- **NEVER** write Drizzle queries directly in Server Actions
- Use helper functions from the `/data` directory
- Helper functions wrap Drizzle queries and provide clean abstractions

### 8. Error Handling - Never Throw

- **NEVER throw errors** in Server Actions
- Always return an object with `error` or `success` properties
- Catch all errors and return them as part of the response object
- This ensures consistent error handling on the client side

**❌ WRONG:**

```tsx
"use server";

import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink(data: CreateLinkInput) {
  // Don't query the database directly
  await db.insert(links).values({...});
}
```

**✅ CORRECT:**

```tsx
"use server";

import { insertLink } from "@/data/links";

export async function createLink(data: CreateLinkInput) {
  // Use helper function
  await insertLink(validatedData);
}
```

**Error Handling Examples:**

**❌ WRONG - Throwing errors:**

```tsx
export async function createLink(data: unknown) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized"); // Don't throw!
  }

  const link = await insertLink(data); // Don't let errors bubble up!
  return link;
}
```

**✅ CORRECT - Returning error objects:**

```tsx
export async function createLink(data: unknown) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" }; // Return error object
  }

  try {
    const link = await insertLink(data);
    return { success: true, link }; // Return success object
  } catch (error) {
    return { error: "Failed to create link" }; // Catch and return
  }
}
```

## Complete Example

```tsx
// app/dashboard/links/create/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { insertLink } from "@/data/links";
import { revalidatePath } from "next/cache";

const createLinkSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  slug: z.string().min(3, "Slug must be at least 3 characters").optional(),
  description: z.string().max(500, "Description too long").optional(),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLink(data: unknown) {
  // 1. Authentication check
  const { userId } = await auth();

  if (!userId) {
    return { error: "You must be logged in to create a link" };
  }

- [ ] **NEVER throws errors** - always returns error/success objects
  // 2. Validation
  const parsed = createLinkSchema.safeParse(data);

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // 3. Database operation via helper
  try {
    const link = await insertLink({
      ...parsed.data,
      userId,
    });

    revalidatePath("/dashboard");

    return { success: true, data:link };
  } catch (error) {
    return { error: "Failed to create link" };
  }
}
```

## Summary Checklist

When creating a Server Action, ensure:

- [ ] File is named `actions.ts` and colocated with the component
- [ ] Called from a Client Component (`"use client"`)
- [ ] Uses typed parameters (not `FormData`)
- [ ] Validates data with Zod
- [ ] Checks authentication with `auth()` from Clerk
- [ ] Uses helper functions from `/data` for database operations
- [ ] Returns meaningful success/error responses
