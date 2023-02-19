import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLTableCellElement> {
    className?: string;
}

export default function TR({ className, children }: Props) {
    return (
        <tr className={`${className ? className : ""} bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-left`}>
            {children}
        </tr>
    )
}
