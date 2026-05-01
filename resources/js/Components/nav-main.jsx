import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"
import { Link } from "@inertiajs/react"

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administración</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasItems = item.items && item.items.length > 0;

          return (
            <SidebarMenuItem key={item.title}>
              {hasItems ? (
                <Collapsible defaultOpen={item.isActive} className="group/collapsible">
                  <div className="flex items-center gap-2 relative">
                    <SidebarMenuButton 
                      render={
                        <Link href={item.url}>
                          {item.icon && <item.icon className="size-4" />}
                          <span>{item.title}</span>
                        </Link>
                      } 
                      tooltip={item.title} 
                    />
                    <SidebarMenuAction 
                      render={<CollapsibleTrigger />} 
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                    >
                      <ChevronRightIcon />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </div>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton 
                            render={
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            } 
                          />
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton 
                  render={
                    <Link href={item.url}>
                      {item.icon && <item.icon className="size-4" />}
                      <span>{item.title}</span>
                    </Link>
                  } 
                  tooltip={item.title} 
                />
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
