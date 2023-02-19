import { HTMLAttributes } from "react"

interface Props extends Omit<HTMLAttributes<HTMLTableCellElement>, "children"> {
    children: JSX.Element | string;
    scope?: string;
}

export default function Th({ scope, className, children }: Props) {
    return (
        <th scope={scope} className={`${className ? className : ""} text-sm font-medium text-gray-900 px-6 py-4 text-left`}>
            {children}
        </th>
    )
}
