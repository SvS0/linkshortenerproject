# Next.js Patterns

## Overview

This application uses **Next.js 16** with the **App Router**. All pages and layouts follow the App Router conventions with Server Components by default.

## Core Rules

### 1. App Router

All routing is handled by the Next.js App Router under the `app/` directory. Follow these file naming conventions:

- `page.tsx` — renders a route
- `layout.tsx` — shared UI wrapper for a route segment
- `loading.tsx` — loading UI for a route segment
- `error.tsx` — error UI for a route segment
- `not-found.tsx` — not-found UI

```
app/
  layout.tsx        # Root layout (applies to all routes)
  page.tsx          # Homepage: /
  dashboard/
    page.tsx        # Dashboard: /dashboard
```

### 2. Server Components by Default

All components are Server Components by default. Only add `"use client"` at the top of a file when the component needs:

- React state (`useState`, `useReducer`)
- React effects (`useEffect`)
- Browser APIs
- Event listeners
- Clerk client-side hooks (`useUser`, `useAuth`)

```tsx
// Server Component (default) - no directive needed
export default async function DashboardPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component - add directive at top of file
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 3. Data Fetching

Fetch data directly in Server Components using `async/await`:

```tsx
import db from "@/db";

export default async function DashboardPage() {
  const links = await db.query.links.findMany();

  return (
    <ul>
      {links.map((link) => (
        <li key={link.id}>{link.url}</li>
      ))}
    </ul>
  );
}
```

Do not use `useEffect` + `fetch` for initial data loading — prefer Server Components with direct database access.

### 4. Metadata

Export a `metadata` object or `generateMetadata` function from `page.tsx` or `layout.tsx` to set page metadata:

```tsx
import type { Metadata } from "next";

// Static metadata
export const metadata: Metadata = {
  title: "Dashboard | Link Shortener",
  description: "Manage your shortened links",
};

// Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug} | Link Shortener`,
  };
}
```

### 5. Route Protection

Protect pages by checking authentication at the top of the Server Component. See [Authentication Standards](authentication.md) for full details.

```tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Protected content
}
```

### 6. Fonts

Load fonts using `next/font/google` and apply them via CSS variables:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
```

## Common Patterns

### Root Layout

The root layout wraps all pages with `ClerkProvider` and shared header/footer:

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

### Server Actions

Use Server Actions for form mutations. Define them in a separate `actions.ts` file or inline with `"use server"`:

```ts
"use server";

import db from "@/db";
import { auth } from "@clerk/nextjs/server";

export async function createLink(url: string, slug: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.insert(links).values({ url, slug, userId });
}
```

## What NOT to Do

❌ **Never** use the `pages/` directory — this project uses the App Router  
❌ **Never** add `"use client"` unnecessarily — keep components as Server Components when possible  
❌ **Never** fetch data in `useEffect` when a Server Component can fetch it directly  
❌ **Never** use `getServerSideProps` or `getStaticProps` — these are Pages Router patterns  

## What TO Do

✅ **Always** use the App Router conventions (`app/` directory)  
✅ **Always** default to Server Components  
✅ **Always** fetch data directly in Server Components  
✅ **Always** protect routes with server-side auth checks  
