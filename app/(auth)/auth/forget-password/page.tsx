"use client";

import InputField from "@/components/InputField";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit() {
    if (!email.length) {
      setError("Please provide your email to proceed.");
      return;
    }

    await authClient.forgetPassword.emailOtp({
      email: email,
      fetchOptions: {
        onRequest() {
          setIsLoading(true);
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
        onSuccess() {
          toast.success("Successfully Sent Email Verification");
        },
        onResponse() {
          setIsLoading(true);
        },
      },
    });
  }

  return (
    <div className="h-screen flex  items-center justify-center px-4">
      <div className="w-full h-fit max-w-md p-6  shadow-sm bg-white rounded-[20px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forget Password
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex  flex-col gap-3">
          <InputField
            placeholder="Enter Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <button
            type="submit"
            className="mt-2 bg-indigo-600 text-white px-4 py-2  disabled:opacity-50 text-lg rounded-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Sending...." : "Get OTP Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
