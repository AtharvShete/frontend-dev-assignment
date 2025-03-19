"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  href?: string;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  // Function to find the current section based on URL hash
  const findActiveTabFromHash = () => {
    // Get the hash or empty string if there's no hash
    const hash = window.location.hash;

    // If there's no hash or we're at the root path, don't highlight any tab
    if (!hash || hash === '') {
      return null;
    }

    // Find matching tab based on href
    const matchingTab = propTabs.find(tab => tab.href === hash);
    return matchingTab || null;
  };

  // Set active tab based on URL on initial load
  useEffect(() => {
    const currentTab = findActiveTabFromHash();
    if (currentTab) {
      setActive(currentTab);
      moveSelectedTabToTop(propTabs.findIndex(tab => tab.value === currentTab.value));
    }
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const currentTab = findActiveTabFromHash();

      // Only update if we found a matching tab
      if (currentTab) {
        setActive(currentTab);
        moveSelectedTabToTop(propTabs.findIndex(tab => tab.value === currentTab.value));
      } else if (!window.location.hash || window.location.hash === '') {
        // Reset tab selection if we're back at the home page (no hash)
        setTabs([...propTabs]);
        setActive(propTabs[0]);
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    // Setup scroll observer to update active tab when scrolling to sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id) {
              const matchingTab = propTabs.find(tab => tab.href === `#${id}`);
              if (matchingTab && matchingTab.value !== active.value) {
                setActive(matchingTab);
                moveSelectedTabToTop(propTabs.findIndex(tab => tab.value === matchingTab.value));
              }
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' } // Adjusted for better detection
    );

    // Observe all sections
    propTabs.forEach(tab => {
      if (tab.href && tab.href.startsWith('#') && tab.href !== '#') {
        const section = document.querySelector(tab.href);
        if (section) {
          observer.observe(section);
        }
      }
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [propTabs, active]);

  const moveSelectedTabToTop = (idx: number) => {
    if (idx < 0) return;

    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  const handleTabClick = (idx: number, tab: Tab) => {
    moveSelectedTabToTop(idx);

    // Handle navigation if href is provided
    if (tab.href) {
      const element = document.querySelector(tab.href);
      if (element) {
        // Smooth scroll to the element
        element.scrollIntoView({ behavior: 'smooth' });
        // Update URL without full page reload
        history.pushState(null, '', tab.href);
      } else if (tab.href === '#') {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', tab.href);
      }
    }
  };

  // Check if a tab should be visually highlighted
  const isTabActive = (tabValue: string) => {
    // If we have a hash in the URL, only highlight the matching tab
    if (window.location.hash) {
      return active.value === tabValue;
    }
    // If no hash, don't highlight any tab
    return false;
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => handleTabClick(idx, tab)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {isTabActive(tab.value) && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-32", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
