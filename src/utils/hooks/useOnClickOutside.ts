import React from "react";

/**
 * This hook allows you to detect clicks outside of a specified element.
 * Source: https://usehooks.com/useOnClickOutside/
 * @param ref {React.MutableRefObject<HTMLElement>} - reference to target object
 * @param handler {(e: Event) => void} - handler that runs after click outside ref
 */
export default function useOnClickOutside(
    ref: React.MutableRefObject<HTMLElement | null>,
    handler: (e: Event) => void
) {
    React.useEffect(
        () => {
            const listener = (event: Event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target as Node)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);

            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        /*
         * Add ref and handler to effect dependencies
         * It's worth noting that because passed in handler is a new ...
         * ... function on every render that will cause this effect ...
         * ... callback/cleanup to run every render. It's not a big deal ...
         * ... but to optimize you can wrap handler in useCallback before ...
         * ... passing it into this hook.
         */
        [ ref, handler ]
    );
}
