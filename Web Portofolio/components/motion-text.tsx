import { Fragment } from "react";

// React owns every word node, so changing language never competes with a
// text-splitting plugin that replaces React's DOM. Whitespace stays intact.
export function MotionText({ text }: { text: string }) {
  return (
    <span className="motion-text">
      {text.split(/(\s+)/).map((part, index) => (
        /^\s+$/.test(part)
          ? <Fragment key={index}>{part}</Fragment>
          : <span className="motion-word" key={index}>{part}</span>
      ))}
    </span>
  );
}
