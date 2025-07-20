import { useState, useEffect } from "react";

/**
 * A simple hook to get the current window location's pathname.
 * This is useful for determining the active link in a navigation component.
 */
export const useLocation = () => {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    // In a real SPA with a router (like React Router), you would listen
    // for route changes here. For Storybook and simple apps, this is sufficient.
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return { pathname };
};
