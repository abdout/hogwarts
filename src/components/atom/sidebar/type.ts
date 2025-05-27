export interface MenuItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
  visible: string[]
}

export interface MenuSection {
  title: string
  items: MenuItem[]
}

export interface DocsConfig {
  sidebarNav: MenuSection[]
}