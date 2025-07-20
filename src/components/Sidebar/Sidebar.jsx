import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { ChevronDown, LogOut, Search, Menu, X } from "lucide-react";
import { useLocation } from "../../hooks/useLocation";
import { Avatar } from "../Avatar/Avatar";
import "./Sidebar.css";

// interface NavItem {
//   label?: string;
//   name?: string;
//   href?: string;
//   url?: string;
//   path?: string;
//   target?: string;
//   icon?: React.ComponentType<{ className?: string }>;
//   children?: NavItem[];
// }

// interface SidebarProps {
//   navItems?: NavItem[];
//   isCollapsed?: boolean;
//   onToggleCollapse?: () => void;
//   isMobileOpen?: boolean;
//   onToggleMobile?: () => void;
//   logoSmall?: React.ReactNode;
//   logoLarge?: React.ReactNode;
//   user?: {
//     avatar?: string,
//     name: string,
//     email: string,
//   };
// }

const findActiveItem = (items, pathname) => {
  for (const item of items) {
    const itemPath = item.href || item.url || item.path;
    if (itemPath === pathname) return item;
    if (item.children) {
      const activeChild = findActiveItem(item.children, pathname);
      if (activeChild) return item;
    }
  }
  return null;
};

const NavItem = ({ item, isCollapsed, level = 0 }) => {
  const { pathname } = useLocation();
  const itemPath = item.href || item.url || item.path;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const Icon = item.icon;

  // Auto-expand if active or has active child
  useEffect(() => {
    if (findActiveItem([item], pathname)) {
      setIsSubMenuOpen(true);
    }
  }, [item, pathname]);

  const isActive = pathname === itemPath;
  const isParentActive = !isActive && !!findActiveItem([item], pathname);

  const handleToggleSubMenu = (e) => {
    e.preventDefault();
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div
      className={classNames("nav-item-container", {
        "nav-item-container--parent-active": isParentActive,
        [`nav-item-container--level-${level}`]: level > 0,
      })}
    >
      <a
        href={itemPath}
        target={item.target}
        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
        className={classNames("nav-item", {
          "nav-item--active": isActive,
          "nav-item--collapsed": isCollapsed,
        })}
        aria-current={isActive ? "page" : undefined}
      >
        {Icon && <Icon className="nav-icon" aria-hidden="true" />}
        <span className="nav-label">{item.label || item.name}</span>
        {item.children && (
          <button
            className="nav-chevron-button"
            onClick={handleToggleSubMenu}
            aria-expanded={isSubMenuOpen}
            aria-label={isSubMenuOpen ? "Collapse menu" : "Expand menu"}
          >
            <ChevronDown
              className={classNames("nav-chevron", {
                "nav-chevron--open": isSubMenuOpen,
              })}
            />
          </button>
        )}
      </a>
      {item.children && (
        <div
          className={classNames("sub-menu", {
            "sub-menu--open": isSubMenuOpen,
            "sub-menu--collapsed": isCollapsed,
          })}
          aria-hidden={!isSubMenuOpen || isCollapsed}
        >
          {item.children.map((child) => (
            <NavItem
              key={child.label || child.name}
              item={child}
              isCollapsed={isCollapsed}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar = ({
  navItems = [],
  isCollapsed = false,
  onToggleCollapse,
  isMobileOpen = false,
  onToggleMobile,
  logoSmall,
  logoLarge,
  user = { name: "", email: "" },
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={onToggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={classNames("sidebar", {
          "sidebar--collapsed": isCollapsed,
          "sidebar--mobile-open": isMobileOpen,
        })}
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {isCollapsed ? logoSmall : logoLarge}
          </div>

          {!isCollapsed && (
            <div className="sidebar-search-container">
              <Search className="sidebar-search-icon" />
              <input
                type="text"
                className="sidebar-search"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="collapse-button desktop-only"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <Menu /> : <X />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="Primary">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => (
              <li key={item.label || item.name}>
                <NavItem item={item} isCollapsed={isCollapsed} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <Avatar src={user.avatar} name={user.name} size="medium" />
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
          <button
            className="logout-button"
            aria-label="Log out"
            onClick={() => console.log("Logout clicked")}
          >
            <LogOut />
          </button>
        </div>
      </aside>
    </>
  );
};
