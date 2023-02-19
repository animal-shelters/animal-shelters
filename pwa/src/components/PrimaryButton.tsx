import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<string> {
  children: string;
  className?: string;
  onClick?: () => void;
  busy?: boolean;
  "data-bs-toggle"?: string;
  "data-bs-target"?: string;
}

function PrimaryButton(props: Props): JSX.Element {
  return (
    <button
      onClick={props.onClick}
      className={`${props.busy ? "bg-primary-hover dark:bg-primary-dark-hover" : "bg-primary dark:bg-primary-dark"} hover:bg-primary-hover dark:hover:bg-primary-dark-hover dark:text-white px-6 py-2 rounded-xl text-white ` + props.className}
      type={props.type}
      disabled={props.disabled || props.busy}
      data-bs-toggle={props["data-bs-toggle"]}
      data-bs-target={props["data-bs-target"]}
    >
      {props.children}
    </button>
  );
}

export default PrimaryButton;
