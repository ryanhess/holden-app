import RootLayout from "@/app/layout";
import { routes } from "@/lib/globals/routes";
import Link from "next/link";

export const metadata = {
  title: "Holden App"
};

export default function Home() {
  return (
    <>
      <h1>Welcome to the Baby App.</h1>
      <ul>
        <li><Link href={routes.tools.ctxTimer}>Contraction Timer</Link></li>
        <li><Link href={routes.users._}>List of Users</Link></li>
      </ul>
    </>
  );
}
