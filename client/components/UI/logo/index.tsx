import { ILogoProps } from "@/types/ui/ILogo";
import { Dancing_Script } from "next/font/google";
// import Dancing_Script from "next/font/google";
import Link from "next/link";
import React from "react";
const dancingScript = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
const Logo: React.FC<ILogoProps> = ({ children, href, className }) => {
  return (
    <>
      <Link
        className={`${className} ${dancingScript.className}`}
        href={href}
        // style={{ fontFamily: roboto.style.fontFamily }}
      >
        {children}
      </Link>
    </>
  );
};

export default Logo;
