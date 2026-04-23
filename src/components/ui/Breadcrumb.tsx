import { Link } from "react-router-dom";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Navegação estrutural" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              <li className={isLast ? "text-brand-primary font-medium" : ""}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && <li aria-hidden="true">/</li>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
