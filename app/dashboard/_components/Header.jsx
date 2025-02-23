"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src="/logo.svg" alt="Logo" width={200} height={100} priority />

      <ul className="hidden md:flex gap-6">
        <li 
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </li>
        <li 
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/question" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard/question")}
        >
          Questions
        </li>
        <li 
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/pricing" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/pricing")}
        >
          Upgrade
        </li>
        <li 
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/how" && "text-primary font-bold"
          }`}
          onClick={() => router.push("/dashboard/how")}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
}

export default Header;
