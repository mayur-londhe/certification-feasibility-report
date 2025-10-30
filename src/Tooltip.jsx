import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const handleMouseEnter = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX + rect.width / 2,
    });

    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}

      {isVisible &&
        createPortal(
          <div
            role="tooltip"
            className="absolute max-w-xs bg-gray-700 text-white text-xs rounded-md p-2 z-50
                     whitespace-normal break-words text-left
                     transition-opacity duration-150"
            style={{
              top: position.top,
              left: position.left,

              transform: "translate(-50%, -100%) translateY(-8px)",
              pointerEvents: "none",
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
