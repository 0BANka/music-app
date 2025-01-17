import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    to: string;
    children: ReactNode;
}


export function NavigationItem({ to, children }: Props) {
    return (
        <li className="NavigationItem">
            <Link href={to}>{children}</Link>
        </li>
    );
}