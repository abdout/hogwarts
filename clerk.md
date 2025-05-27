# Clerk Authentication Implementation

## Overview

This school management system uses **Clerk** for authentication and authorization, providing role-based access control for different user types: `admin`, `teacher`, `student`, and `parent`. The implementation leverages both `@clerk/nextjs` and `@clerk/elements` packages to provide a complete authentication solution.

## Dependencies

```json
{
  "@clerk/elements": "^0.14.6",
  "@clerk/nextjs": "^5.4.1"
}
```

## Architecture Overview

The Clerk authentication system is integrated throughout the application with the following key components:

1. **ClerkProvider** - Wraps the entire application
2. **Middleware** - Handles route protection and role-based redirects
3. **Authentication Pages** - Custom sign-in using Clerk Elements
4. **Role-Based Access Control** - Throughout components and pages
5. **User Session Management** - Server and client-side user data access

## Core Implementation

### 1. Provider Setup

**File**: `src/app/layout.tsx`

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            {children}
            <ToastContainer position="bottom-right" theme="dark" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### 2. Middleware Configuration

**File**: `src/middleware.ts`

The middleware implements role-based route protection:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

export default clerkMiddleware((auth, req) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
  }
});
```

**Route Access Configuration** (`src/lib/settings.ts`):

```typescript
export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/student(.*)": ["student"],
  "/teacher(.*)": ["teacher"],
  "/parent(.*)": ["parent"],
  "/list/teachers": ["admin", "teacher"],
  "/list/students": ["admin", "teacher"],
  "/list/parents": ["admin", "teacher"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin", "teacher"],
  "/list/exams": ["admin", "teacher", "student", "parent"],
  "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/list/results": ["admin", "teacher", "student", "parent"],
  "/list/attendance": ["admin", "teacher", "student", "parent"],
  "/list/events": ["admin", "teacher", "student", "parent"],
  "/list/announcements": ["admin", "teacher", "student", "parent"],
};
```

### 3. Custom Authentication UI

**File**: `src/app/[[...sign-in]]/page.tsx`

Uses Clerk Elements for a custom sign-in experience:

```tsx
"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step name="start" className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="" width={24} height={24} />
            SchooLama
          </h1>
          <h2 className="text-gray-400">Sign in to your account</h2>
          
          <Clerk.GlobalError className="text-sm text-red-400" />
          
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">Password</Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};
```

## User Session Management

### Server-Side Authentication

Used in server components and API routes:

```typescript
import { auth, currentUser } from "@clerk/nextjs/server";

// Get auth data
const { userId, sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;

// Get current user
const user = await currentUser();
const userRole = user?.publicMetadata.role as string;
```

### Client-Side Authentication

Used in client components:

```typescript
import { useUser, useClerk } from "@clerk/nextjs";

const { user, isLoaded, isSignedIn } = useUser();
const { signOut } = useClerk();
const role = user?.publicMetadata.role as string;
```

## Role-Based Access Control

### 1. Navigation Menu (Server-Side)

**File**: `src/components/Menu.tsx`

```typescript
const Menu = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};
```

### 2. Sidebar Navigation (Client-Side)

**File**: `src/components/atom/sidebar/sidebar.tsx`

```typescript
export function DocsSidebarNav({ config }: DocsSidebarNavProps) {
  const { user } = useUser();
  const role = user?.publicMetadata.role as string | undefined;
  const pathname = usePathname();

  return (
    <div className="w-full border-r border-border/40">
      {config.sidebarNav.map((section) => (
        <div key={section.title} className="pb-4">
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {section.items.map((item) => {
              const isVisible = item.visible && role && item.visible.includes(role);
              
              if (isVisible) {
                return item.href && !item.disabled ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      pathname === item.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span key={item.title} className="flex w-full cursor-not-allowed items-center">
                    {item.title}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 3. Data Filtering Based on Role

**Example**: `src/components/Announcements.tsx`

```typescript
const Announcements = async () => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  return (
    // Render announcements
  );
};
```

## UI Components

### 1. User Profile Display

**File**: `src/components/Navbar.tsx`

```typescript
const Navbar = async () => {
  const user = await currentUser();
  
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">
            {user?.publicMetadata?.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};
```

### 2. User Navigation Dropdown

**File**: `src/components/atom/header/user-nav.tsx`

```typescript
export function UserNav() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 px-0">
          <Avatar className="h-4 w-4">
            {user.imageUrl ? (
              <AvatarImage 
                src={user.imageUrl} 
                alt={user.fullName ?? "@user"} 
              />
            ) : (
              <AvatarFallback>
                {/* Default avatar */}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.fullName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="text-red-600 focus:text-red-600"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Form Authorization

**File**: `src/components/FormContainer.tsx`

```typescript
const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  // Role-based data filtering for forms
  if (type !== "delete") {
    switch (table) {
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
          },
          select: { id: true, name: true },
        });
        relatedData = { lessons: examLessons };
        break;
      // ... other cases
    }
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};
```

## Role-Based Pages

### Teacher Dashboard

**File**: `src/app/(platform)/teacher/page.tsx`

```typescript
const TeacherPage = () => {
  const { userId } = auth();
  
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};
```

## Key Features

### 1. **Automatic Role-Based Redirects**
- Users are automatically redirected to their role-specific dashboard after login
- Middleware prevents access to unauthorized routes and redirects to appropriate role pages

### 2. **Public Metadata for Roles**
- User roles are stored in Clerk's `publicMetadata.role` field
- Accessible on both server and client-side
- Used for authorization throughout the application

### 3. **Conditional UI Rendering**
- Navigation menus show/hide items based on user role
- Forms and data are filtered based on user permissions
- Components check authentication status before rendering

### 4. **Server and Client-Side Auth**
- Server components use `auth()` and `currentUser()` for authentication
- Client components use `useUser()` and `useClerk()` hooks
- Consistent authentication patterns across the application

### 5. **Custom Authentication UI**
- Uses Clerk Elements for customizable sign-in forms
- Maintains brand consistency with custom styling
- Handles form validation and error display

## Security Considerations

1. **Middleware Protection**: All protected routes are secured via middleware
2. **Data Filtering**: Database queries are filtered based on user role and ID
3. **Role Validation**: User roles are validated on both server and client-side
4. **Session Management**: Handled securely by Clerk's infrastructure

## Environment Configuration

While not visible in the codebase, the application would require the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Usage Patterns

### Server Components
```typescript
import { auth, currentUser } from "@clerk/nextjs/server";

const { userId, sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
```

### Client Components
```typescript
import { useUser, useClerk } from "@clerk/nextjs";

const { user, isLoaded, isSignedIn } = useUser();
const role = user?.publicMetadata.role as string;
```

### Role-Based Conditional Rendering
```typescript
{role === "admin" && <AdminOnlyComponent />}
{["admin", "teacher"].includes(role) && <TeacherAccessComponent />}
```

This implementation provides a robust, role-based authentication system that scales well with the school management application's requirements while maintaining security and user experience standards. 