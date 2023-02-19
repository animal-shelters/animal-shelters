import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<string> {
  children: string;
  className?: string;
  onClick?: () => void;
  busy?: boolean;
  "data-bs-toggle"?: string;
  "data-bs-target"?: string;
}

function SecondaryButton(props: Props): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={`${props.busy ? "bg-primary-hover dark:bg-secondary-dark-hover" : "bg-primary dark:bg-secondary-dark"} hover:bg-primary-hover dark:hover:bg-secondary-dark-hover dark:text-white px-6 py-2 rounded-xl text-white ` + props.className}
      type={props.type}
      disabled={props.disabled || props.busy}
      data-bs-toggle={props["data-bs-toggle"]}
      data-bs-target={props["data-bs-target"]}
    >
      {props.children}
    </button>
  );
}

export default SecondaryButton;
