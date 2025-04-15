"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import GoogleIcon from "@/public/svg/google-icon";
import TwitterIcon from "@/public/svg/twitter-icon";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      setShowPopup(true);
      router.push("/app");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 underline decoration-[#f3b409] underline-offset-8">
          Login
        </h1>
        <p className="text-gray-600">Login to access your InSight account</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-gray-600">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
          {errorMessage && ( // Conditionally render error message
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-gray-600">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••••••••••••"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-[#f3b409] hover:underline"
          >
            Forgot Password
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#36cb4f] hover:bg-[#36cb4fea] cursor-pointer text-white"
        >
          Login
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#f3b409] hover:underline">
            Sign up
          </Link>
        </p>
      </div>

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
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        {/* <Dialog.Overlay /> */}
        <DialogContent>
          <DialogTitle>Successfully Logged-In!</DialogTitle>
          <DialogDescription>
            You will be redirected to your dashboard shortly.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
