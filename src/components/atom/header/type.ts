// types/nav.ts

export interface MainNavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: string
    label?: string
  }
  
  export interface SidebarNavItem {
    title: string
    items?: MainNavItem[]
    disabled?: boolean
  }
  
  export interface DocsSidebarNavItem extends SidebarNavItem {
    items?: MainNavItem[]
  }
  
  export interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: MainNavItem[]
    children?: React.ReactNode
  }
  
  export interface MobileLinkProps {
    onOpenChange?: (open: boolean) => void
    children: React.ReactNode
    className?: string
    href: string
  }

  // types/command-menu.ts

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    label?: string
  }
  
  export interface SidebarNavGroup {
    title: string
    items: NavItem[]
  }
  
  export interface ThemeItem {
    theme: 'light' | 'dark' | 'system'
    icon: React.ReactNode
    label: string
  }
  
  export interface CommandMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    // Add any additional props specific to CommandMenu
  }