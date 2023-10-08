"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function NavLink({ href, className, children }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const splitLink = href.split("/");
    // (() => {
    //   console.log(
    //     "navLINK: ",
    //     href.split("/"),
    //     splitLink[splitLink.length - 1]
    //   );

    //   if (pathname.includes(href)) {
    //     console.log("PATHNAME INCLUDES: ", href, pathname.includes(href));
    //     return setIsActive(true);
    //   } else if (pathname.includes(splitLink[splitLink.length - 1])) {
    //     console.log("PATHNAME INCLUDES: ", href, pathname.includes(href));

    //     return setIsActive(true);
    //   } else if (pathname.includes(splitLink[splitLink.length - 2])) {
    //     console.log("PATHNAME INCLUDES: ", href, pathname.includes(href));

    //     return setIsActive(true);
    //   } else {
    //     return setIsActive(false);
    //   }
    // })();
    pathname.includes(href) ? setIsActive(true) : setIsActive(false);
  }, [href, pathname]);

  return (
    <Link href={href} className={className}>
      {children({ isActive })}
    </Link>
  );
}

export default NavLink;
