import React, { useState } from "react";
import {
  Home,
  Settings,
  Users,
  BarChart2,
  Layers,
  Menu,
  Plus,
  FileText,
  Mail,
  Bell,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Button } from "../Button/Button"; // Assuming you have a Button component

export default {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A responsive sidebar navigation component with collapsible state and mobile support. Supports nested menu items and customizable branding.",
      },
    },
  },
  argTypes: {
    navItems: {
      control: { type: "object" },
      description:
        "Array of navigation items with optional children for nested menus",
    },
    user: {
      control: { type: "object" },
      description: "User information for the footer section",
    },
    isCollapsed: {
      control: { type: "boolean" },
      description: "Controls the collapsed state of the sidebar",
    },
    isMobileOpen: {
      control: { type: "boolean" },
      description: "Controls the mobile visibility of the sidebar",
    },
    onToggleCollapse: {
      action: "toggleCollapse",
      description: "Callback when collapse/expand is triggered",
    },
    onToggleMobile: {
      action: "toggleMobile",
      description: "Callback when mobile menu is toggled",
    },
  },
};

// --- Mock Data ---
const baseNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Team",
    href: "/team",
    icon: Users,
    children: [
      { name: "Members", href: "/team/members" },
      { name: "Roles", href: "/team/roles" },
      { name: "Permissions", href: "/team/permissions" },
    ],
  },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Settings", href: "/settings", icon: Settings, target: "_blank" },
];

const extendedNavItems = [
  ...baseNavItems,
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Messages", href: "/messages", icon: Mail, badge: "3" },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: "12+" },
];

const mockUser = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
};

const adminUser = {
  name: "Admin User",
  email: "admin@example.com",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e",
};

const Logo = ({ isSmall = false }) => (
  <div
    style={{
      color: "white",
      fontWeight: "bold",
      fontSize: isSmall ? "1rem" : "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}
  >
    <div
      style={{
        width: isSmall ? "24px" : "32px",
        height: isSmall ? "24px" : "32px",
        backgroundColor: "#3b82f6",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "white", fontSize: isSmall ? "0.75rem" : "1rem" }}>
        AC
      </span>
    </div>
    {!isSmall && <span>ACME Corp</span>}
  </div>
);

const Template = (args) => {
  const [isCollapsed, setIsCollapsed] = useState(args.isCollapsed || false);
  const [isMobileOpen, setIsMobileOpen] = useState(args.isMobileOpen || false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile-only toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        style={{
          position: "fixed",
          top: "1rem",
          left: "1rem",
          zIndex: 50,
          display: "none",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        className="mobile-only-button"
        aria-label="Toggle menu"
      >
        <Menu />
      </button>

      <Sidebar
        {...args}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onToggleMobile={() => setIsMobileOpen(!isMobileOpen)}
      />

      <main
        style={{
          flex: 1,
          marginLeft: isCollapsed
            ? "var(--sidebar-width-collapsed)"
            : "var(--sidebar-width-expanded)",
          transition: "margin-left 0.2s ease-in-out",
          padding: "2rem",
          background: "#f9fafb",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <Button variant="primary" icon={<Plus size={16} />}>
            New Project
          </Button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "2rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Main Content Area</h2>
          <p>This area adjusts its margin based on the sidebar state.</p>
          <p>Current sidebar state: {isCollapsed ? "Collapsed" : "Expanded"}</p>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <Button onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? "Expand" : "Collapse"} Sidebar
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              Toggle Mobile Menu
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  navItems: baseNavItems,
  user: mockUser,
  logoSmall: <Logo isSmall />,
  logoLarge: <Logo />,
};

export const ExpandedByDefault = Template.bind({});
ExpandedByDefault.args = {
  ...Default.args,
  isCollapsed: false,
};

export const CollapsedByDefault = Template.bind({});
CollapsedByDefault.args = {
  ...Default.args,
  isCollapsed: true,
};

export const WithExtendedMenu = Template.bind({});
WithExtendedMenu.args = {
  ...Default.args,
  navItems: extendedNavItems,
};

export const WithAdminUser = Template.bind({});
WithAdminUser.args = {
  ...Default.args,
  user: adminUser,
};

export const MobileView = Template.bind({});
MobileView.args = {
  ...Default.args,
};
MobileView.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const WithActiveState = Template.bind({});
WithActiveState.args = {
  ...Default.args,
  navItems: baseNavItems.map((item) =>
    item.name === "Dashboard" ? { ...item, isActive: true } : item
  ),
};

export const Playground = Template.bind({});
Playground.args = {
  ...Default.args,
};
Playground.parameters = {
  docs: {
    description: {
      story:
        "Interact with the sidebar using the controls below to see different states and configurations.",
    },
  },
};
