import { useEffect } from "react";

type ErrorEraserProps = {
  targetElementSelector?: string;
  errorNodeSelector?: string;
};

const ErrorEraser = ({
  errorNodeSelector,
  targetElementSelector,
}: ErrorEraserProps) => {
  useEffect(() => {
    document
      .querySelectorAll<HTMLInputElement>(
        targetElementSelector ?? ".field_with_errors > input"
      )
      .forEach((node) => {
        const listener = () => {
          const errorNode = document.querySelector(
            errorNodeSelector ?? `[data-for-input='${node.name}']`
          );
          errorNode?.remove();
          node.removeEventListener("change", listener);
        };
        node.addEventListener("change", listener);
      });
  }, []);
};

export default ErrorEraser;
