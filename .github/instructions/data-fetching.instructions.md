---
description: Read this file to understand how fetch data in the project.
---

# Data Fetching guidelines

this file describes the guidelines for fetching data in the project. It covers best practices, common patterns, and tools that can be used for data fetching.

## 1. use server components for data fetching

In Next.js, ALWAYS use Server Components to fetch data. NEVER user Client Components to fetch data.

## 2. Data fetching methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.
