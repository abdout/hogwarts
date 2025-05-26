'use client';
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { useCurrentUser } from "@/components/auth/use-current-user"
import { useCurrentRole } from "@/components/auth/use-current-role"
import { DocsConfig } from "./type";

export interface DocsSidebarNavProps {
  config: DocsConfig
}

export function DocsSidebarNav({ config }: DocsSidebarNavProps) {
  const user = useCurrentUser()
  const role = useCurrentRole()
  const pathname = usePathname()

  // Debug logging
  console.log("Sidebar Debug:", { user, role, pathname });

  // Temporary: Use ADMIN role if no role is detected for testing
  const effectiveRole = role || "ADMIN";

  return (
    <div className="w-full border-r border-border/40">
      {config.sidebarNav.map((section) => (
        <div key={section.title} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {section.title}
          </h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {section.items.map((item) => {
              // Check if visible array exists and contains the role
              const isVisible = item.visible && effectiveRole && item.visible.includes(effectiveRole);
              
              // Debug logging for each item
              console.log(`Item: ${item.title}, Role: ${effectiveRole}, Visible: ${item.visible}, IsVisible: ${isVisible}`);
              
              if (isVisible) {
                return item.href && !item.disabled ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      item.disabled && "cursor-not-allowed opacity-60",
                      pathname === item.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                    target={item.external ? "_blank" : ""}
                    rel={item.external ? "noreferrer" : ""}
                  >
                  
                    {item.title}
                    {item.label && (
                      <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                        {item.label}
                      </span>
                    )}
                  </Link>
                ) : (
                  <span
                    key={item.title}
                    className={cn(
                      "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
                      item.disabled && "cursor-not-allowed opacity-60"
                    )}
                  >
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                    )}
                    {item.title}
                    {item.label && (
                      <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                        {item.label}
                      </span>
                    )}
                  </span>
                )
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  )
}