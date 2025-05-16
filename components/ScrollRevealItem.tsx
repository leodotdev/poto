"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealItemProps {
  children: React.ReactNode; // Content to animate
  delay?: number; // Optional delay in milliseconds
  className?: string; // Optional additional CSS classes
  threshold?: number; // Optional threshold for Intersection Observer (0 to 1)
  triggerOnce?: boolean; // Optional: if true, animation only runs once
}

const ScrollRevealItem: React.FC<ScrollRevealItemProps> = ({
  children,
  delay = 0,
  className = "",
  threshold = 0.1, // Trigger when 10% of the item is visible
  triggerOnce = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null); // Ref to the DOM element

  useEffect(() => {
    const currentRef = itemRef.current; // Capture ref value for cleanup
    if (!currentRef) {
      return; // Do nothing if the ref is not yet attached
    }

    // Create the Intersection Observer
    // The observer will call the 'entries' callback function
    // when the visibility of the observed element (currentRef) changes.
    const observer = new IntersectionObserver(
      (entries) => {
        // 'entries' is an array of observed elements. We only observe one.
        const entry = entries[0];
        if (entry.isIntersecting) {
          // If the element is intersecting (visible)
          setIsVisible(true); // Update state to trigger re-render with 'is-visible' class
          if (triggerOnce && currentRef) {
            // If triggerOnce is true, unobserve the element so animation doesn't repeat
            observer.unobserve(currentRef);
          }
        } else {
          // Optional: If you want the animation to reverse when scrolling out of view
          // and triggerOnce is false
          if (!triggerOnce) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: threshold, // How much of the item must be visible to trigger (0.0 to 1.0)
        // rootMargin: '0px 0px -50px 0px', // Optional: adjust the "bounds" of the viewport
      }
    );

    // Start observing the element
    observer.observe(currentRef);

    // Cleanup function: This runs when the component is unmounted
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); // Stop observing
      }
      observer.disconnect(); // Disconnect the observer entirely
    };
  }, [threshold, triggerOnce]); // Re-run effect if threshold or triggerOnce changes

  // Construct the CSS classes for the div
  const classes = `scroll-reveal-element ${
    isVisible ? "is-visible" : ""
  } ${className}`;

  return (
    <div
      ref={itemRef} // Attach the ref to this div
      className={classes}
      style={{ transitionDelay: `${delay}ms` }} // Apply delay as inline style
    >
      {children}
    </div>
  );
};

export default ScrollRevealItem;
