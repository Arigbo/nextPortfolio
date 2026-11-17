import { Fragment } from "react";

/**
 * A heading whose words slide up out of a mask, one after another.
 * No JS of its own: the animation runs when an ancestor `.reveal` gets `.is-in`
 * (see components/Reveal.jsx and `.split-*` in globals.scss). Screen readers get
 * the plain text via aria-label.
 */
export default function SplitHeading({ as: Tag = "h2", text, className = "", ...rest }) {
  return (
    <Tag className={`split-heading ${className}`} aria-label={text} {...rest}>
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="split-mask" aria-hidden="true">
            <span className="split-word" style={{ "--w": i }}>{word}</span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
