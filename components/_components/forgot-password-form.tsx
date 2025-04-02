"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import GoogleIcon from "@/public/svg/google-icon";
import TwitterIcon from "@/public/svg/twitter-icon";

export function ForgotPasswordForm() {
  return (
    <div className="space-y-6">
      <Link
        href="/login"
        className="inline-flex items-center text-sm text-[#f3b409] hover:text-[#36cb4f]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to login
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">
          Forgot your password?
        </h1>
        <p className="text-gray-600">
          Don&apos;t worry, happens to all of us. Enter your email below to
          recover your password
        </p>
      </div>

      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-600">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@gmail.com"
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-[#36cb4f] hover:bg-[#36cb4fea] cursor-pointer text-white"
        >
          Submit
        </Button>
      </form>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or login with</span>
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
