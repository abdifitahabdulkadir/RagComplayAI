"use client";

import InputField from "@/components/InputField";
import SignWithGoogle from "@/components/SignWithGoogle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  formType: "login" | "register";
}
export default function AuthForm({ formType }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }

    if (formType === "register" && !name.length) {
      toast.error("Please Provide Your name");
      return;
    }

    if (formType === "register") {
      await authClient.signUp.email({
        name,
        email,
        password,
        fetchOptions: {
          onRequest() {
            setIsLoading(true);
          },
          onResponse() {
            setIsLoading(false);
          },
          onSuccess() {
            toast.success("You have Successfully Registed.");
            router.replace("/");
          },
          onError(context) {
            toast.error(context.error.message);
          },
        },
      });
    } else {
      await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onRequest() {
            setIsLoading(true);
          },
          onResponse() {
            setIsLoading(false);
          },
          onSuccess() {
            toast.success("You have Successfully Logged.");
            router.replace("/");
          },
          onError(context) {
            toast.error(context.error.message);
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex  items-center justify-center px-4">
      <div className="w-full h-fit max-w-md p-6  shadow-sm bg-white rounded-[20px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {formType == "login" ? "Sign In" : "Sign Up"}
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex  flex-col gap-3">
          {formType === "register" && (
            <InputField
              placeholder="Enter Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          )}
          <InputField
            placeholder="Enter Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <InputField
            showForgetPassword={formType === "login"}
            placeholder="Enter Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white px-4 py-2  disabled:opacity-50 text-lg rounded-full cursor-pointer"
            disabled={loading}
          >
            {loading
              ? formType === "login"
                ? "Sign In....."
                : "Signing up..."
              : formType === "login"
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <hr className="flex-1 text-black/10" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1 text-black/10" />
        </div>
        <SignWithGoogle type={formType === "login" ? "sign-in" : "sign-up"} />

        <p className="mt-4 text-sm text-center text-gray-600">
          {formType !== "login"
            ? "Already have an account?"
            : "Dont have an account?"}

          <Link
            href={formType === "login" ? "/auth/register" : "/auth/login"}
            className="text-indigo-600 ms-1 font-black"
          >
            {formType !== "login" ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
