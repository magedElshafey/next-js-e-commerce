"use client";
import Image from "next/image";
const RightSide = () => {
  return (
    <div className="w-full md:w-1/2 h-screen relative">
      <Image src="/images/auth-bg.png" alt="auth-background" fill priority />
    </div>
  );
};

export default RightSide;
