"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import GoogleIcon from "@/public/svg/google-icon";
import TwitterIcon from "@/public/svg/twitter-icon";

export function VerifyForm() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && index > 0 && verificationCode[index] === "") {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/forgot-password"
        className="inline-flex items-center text-sm text-[#f3b409] hover:text-[#36cb4f]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Verify your email</h1>
        <p className="text-gray-600">
          We&apos;ve sent a verification code to your email. Please enter the
          code below to verify your account.
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="code-0" className="text-sm text-gray-600">
            Verification Code
          </Label>
          <div className="flex justify-center gap-2">
            {verificationCode.map((digit, index) => (
              <Input
                key={index}
                id={`code-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                maxLength={1}
              />
            ))}
          </div>
          <p className="text-sm text-center text-gray-500">
            Didn&apos;t receive a code?{" "}
            <Link href="#" className="text-[#f3b409] hover:underline">
              Resend
            </Link>
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#36cb4f] hover:bg-[#36cb4fea] cursor-pointer text-white"
        >
          Verify
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or verify with</span>
          </div>
        </div>

        <div className="flex gap-3 items-center justify-center">
          <Button variant="outline" className="border-gray-300 cursor-pointer">
            <GoogleIcon />
          </Button>
          <Button variant="outline" className="border-gray-300 cursor-pointer">
            <TwitterIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
