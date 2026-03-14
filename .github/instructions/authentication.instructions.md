---
description: This file defines the authentication standards for the project, ensuring consistent use of Clerk for all auth-related functionality.
---

# Authentication Standards

## Overview

All authentication in this application is handled exclusively by **Clerk**. No other authentication methods or libraries should be used.

## Core Rules

### 1. Clerk Exclusivity

- **ONLY use Clerk** for all authentication and user management
- Never implement custom auth logic or use alternative auth libraries
- All user session management must go through Clerk's APIs

### 2. Protected Routes

The `/dashboard` page is a protected route:

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Dashboard content
}
```

### 3. Homepage Redirect

If a logged-in user attempts to access the homepage (`/`), redirect them to `/dashboard`:

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  // Homepage content for non-authenticated users
}
```

### 4. Modal Authentication

Sign-in and sign-up flows **must always launch as modals**, not full-page redirects:

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs';

// Correct: Modal mode
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>

//Incorrect: other
<SignInButton>
  <button>Sign In</button>
</SignInButton>

<SignUpButton>
  <button>Sign Up</button>
</SignUpButton>

```

## Common Patterns

### Server Component Auth Check

```tsx
import { auth } from "@clerk/nextjs/server";

export default async function MyServerComponent() {
  const { userId } = await auth();

  if (!userId) {
    // Handle unauthenticated state
  }
}
```

### Client Component User Info

```tsx
"use client";

import { useUser } from "@clerk/nextjs";

export function MyClientComponent() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <div>Not signed in</div>;

  return <div>Hello {user.firstName}</div>;
}
```

## What NOT to Do

❌ **Never** use NextAuth, Supabase Auth, or any other auth library  
❌ **Never** implement custom JWT handling  
❌ **Never** use full-page redirects for sign-in/sign-up  
❌ **Never** bypass Clerk's middleware for protected routes

## What TO Do

✅ **Always** use Clerk's built-in components and hooks  
✅ **Always** use modal mode for authentication flows  
✅ **Always** implement proper redirects for auth state  
✅ **Always** use server-side auth checks for protected pages
