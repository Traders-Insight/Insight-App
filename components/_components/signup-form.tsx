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

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [signupErrorMessage, setSignupErrorMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state for error message
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setErrorMessage("Please fill in all required fields."); // Custom error message
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match"); // Set error message
      return;
    }

    setErrorMessage(null); // Clear error message if all checks pass
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    if (!/\d/.test(formData.password)) {
      setErrorMessage("Password must contain at least one number");
      return;
    }
    if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(formData.password)) {
      setErrorMessage(
        "Password can only contain letters, numbers, and special characters"
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to create user");

      setShowPopup(true);
      router.push("/app");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSignupErrorMessage(err.message);
      } else {
        setSignupErrorMessage("An unknown error occurred");
      }
    }
  };

  return (
    <div className="space-y-6 relative pverflow-hidden">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800 underline decoration-[#f3b409] underline-offset-8">
          Sign up
        </h1>
        <p className="text-gray-600">
          Let&apos;s get you all set up so you can access your personal account.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm text-gray-600">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="john.doe@gmail.com"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm text-gray-600">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="john.doe@gmail.com"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {signupErrorMessage && ( // Conditionally render error message under email
              <p className="text-red-500 text-sm">{signupErrorMessage}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-600">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="john.doe@gmail.com"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
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
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
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

        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm text-gray-600">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••••••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon size={20} />
              ) : (
                <EyeIcon size={20} />
              )}
            </button>
          </div>
          {errorMessage && ( // Conditionally render error message
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            required
            className="mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to all the{" "}
            <Link href="#" className="text-[#f3b409] hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#f3b409] hover:underline">
              Privacy Policies
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#36cb4f] hover:bg-[#36cb4fea] cursor-pointer text-white"
        >
          Create account
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#f3b409] hover:underline">
            Login
          </Link>
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or Sign up with</span>
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
          <DialogTitle>Success!</DialogTitle>
          <DialogDescription>
            Your account has been created successfully!
          </DialogDescription>
          <DialogDescription>
            You will be redirected to the dashboard shortly.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
