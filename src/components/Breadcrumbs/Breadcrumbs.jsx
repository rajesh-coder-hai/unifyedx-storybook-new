import { ChevronRight } from "lucide-react";
import React, { Fragment } from "react";
import "./Breadcrumbs.css";

export const Breadcrumbs = ({ crumbs = [], ...props }) => {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav" {...props}>
      <ol className="breadcrumbs-list">
        {crumbs.map((crumb, index) => {
          const isCurrentPage = index === crumbs.length - 1;

          return (
            <li key={index} className="breadcrumb-item">
              <a
                href={crumb.href}
                className="breadcrumb-link"
                aria-current={isCurrentPage ? "page" : undefined}
              >
                {crumb.icon && <crumb.icon className="breadcrumb-icon" />}
                {crumb.label}
              </a>
              {!isCurrentPage && (
                <ChevronRight
                  className="breadcrumb-separator"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
