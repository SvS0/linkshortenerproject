---
description: This file defines the UI component standards for the project, ensuring consistent use of shadcn/ui components.
---

# UI Component Standards

## Overview

All UI elements in this application **must use shadcn/ui components**. Do not create custom UI components when a shadcn/ui alternative exists.

## Core Rules

### 1. shadcn/ui Exclusivity

- **ALWAYS use shadcn/ui components** for all UI elements
- Never create custom button, input, card, dialog, or other components that shadcn/ui already provides
- If a component doesn't exist in shadcn/ui, consult the user before creating a custom one

### 2. Component Installation

shadcn/ui components are added individually as needed:

```bash
# Add a new component
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
```

Components are installed to `@/components/ui/` and can be customized if needed.

### 3. Importing Components

Always import from the `@/components/ui` path alias:

```tsx
// Correct
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Incorrect - never use relative paths
import { Button } from "../../components/ui/button";
```

## Common Patterns

### Using Buttons

```tsx
import { Button } from "@/components/ui/button";

// Standard button
<Button>Click me</Button>

// Button variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Using Cards

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Using Forms

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

<div className="space-y-4">
  <div>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </div>
  <Button type="submit">Submit</Button>
</div>;
```

### Using Dialogs

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>;
```

## What NOT to Do

❌ **Don't create custom UI components:**

```tsx
// INCORRECT - never create custom button components
export function CustomButton({ children, ...props }) {
  return <button className="px-4 py-2 bg-blue-500...">{children}</button>;
}
```

✅ **Use shadcn/ui instead:**

```tsx
// CORRECT - use shadcn/ui Button
import { Button } from "@/components/ui/button";

<Button>Click me</Button>;
```

## Available Components

Common shadcn/ui components you can use:

- **Buttons**: `button`
- **Forms**: `input`, `label`, `textarea`, `select`, `checkbox`, `radio-group`
- **Layout**: `card`, `separator`, `scroll-area`
- **Overlays**: `dialog`, `popover`, `tooltip`, `sheet`, `alert-dialog`
- **Feedback**: `toast`, `alert`, `badge`
- **Navigation**: `tabs`, `dropdown-menu`, `navigation-menu`
- **Data Display**: `table`, `avatar`, `skeleton`

[Full component list](https://ui.shadcn.com/docs/components)

## Customization

If you need to customize a shadcn/ui component:

1. Modify the component in `@/components/ui/` directly
2. Use the `className` prop to add Tailwind classes
3. Use the component's built-in variant props when available

```tsx
// Extend with Tailwind classes
<Button className="w-full mt-4">Full Width Button</Button>

// Use built-in variants
<Button variant="outline" size="lg">Large Outline</Button>
```

## When to Ask

If you need a UI element and you're unsure if shadcn/ui has it:

1. Check the [shadcn/ui documentation](https://ui.shadcn.com/docs/components)
2. Ask the user before creating a custom component
3. Consider if an existing component can be adapted
