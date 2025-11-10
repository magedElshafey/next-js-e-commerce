"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

const LeftSide = () => {
  const pathname = usePathname();
  const isPasswordSuccess = pathname === "/reset-password-success";
  const isForgetPages =
    pathname === "/forget-password" ||
    pathname === "/forget-password-otp" ||
    pathname === "/reset-password";
  return (
    <div className="w-full flex justify-center mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 2xl:mb-9">
      {isPasswordSuccess ? (
        <Image
          alt="password-change-sucfully"
          src={"/images/Vector.png"}
          width={93}
          height={93}
          className="object-contain"
        />
      ) : isForgetPages ? (
        <Image
          unoptimized
          alt="loading"
          src={"/images/gifaya.gif"}
          className="object-contain"
          width={144}
          height={144}
        />
      ) : (
        <Image
          src={"/images/logo.png"}
          alt="website-logo"
          width={100}
          height={70}
          priority
        />
      )}
    </div>
  );
};

export default LeftSide;
