import { HTMLAttributes } from "react";

interface Props extends Omit<HTMLAttributes<HTMLTableCellElement>, "children"> {
    className?: string;
    children?: JSX.Element | string;
}

export default function TD({ className, children }: Props) {
    return (
        <td className={`${className ? className : ""} text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap`}>
            {children}
        </td>
    )
}
