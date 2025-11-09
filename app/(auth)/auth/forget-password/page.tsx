"use client";

import InputField from "@/components/InputField";
import { isUserExisted } from "@/lib/actions/send.action";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  // Step: 1 = send email, 2 = verify otp, 3 = reset password
  const [step, setStep] = useState<number>(1);

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSendOTP(e?: React.FormEvent) {
    e?.preventDefault();

    setError("");
    if (!email.trim()) {
      setError("Please provide your email to proceed.");
      return;
    }

    setIsLoading(true);
    // ensure the user exists before sending
    try {
      const exist = await isUserExisted(email);
      if (!exist.success) {
        toast.error("Invalid email. Please provide a registered email.");
        setIsLoading(false);
        return;
      }

      await authClient.forgetPassword.emailOtp({
        email,
        fetchOptions: {
          onRequest() {
            setIsLoading(true);
          },
          onError(ctx) {
            toast.error(ctx.error?.message || "Failed to send OTP");
            setIsLoading(false);
          },
          onSuccess() {
            toast.success("Successfully sent verification code to your email.");
            setIsLoading(false);
            setStep(2);
          },
          onResponse() {
            setIsLoading(false);
          },
        },
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Unexpected error");
      setIsLoading(false);
    }
  }

  async function handleVerifyOTP(e?: React.FormEvent) {
    e?.preventDefault();
    setError("");
    if (!otp.trim()) {
      setError("Please enter the verification code sent to your email.");
      return;
    }

    await authClient.emailOtp.checkVerificationOtp({
      email,
      otp: otp,
      type: "forget-password",
      fetchOptions: {
        onRequest() {
          setIsLoading(true);
        },
        onError(ctx: any) {
          toast.error(ctx.error?.message || "Invalid code");
          setIsLoading(false);
        },
        onSuccess() {
          toast.success("Code verified. You can reset your password now.");
          setIsLoading(false);
          setStep(3);
        },
        onResponse() {
          setIsLoading(false);
        },
      },
    });
  }

  async function handleResetPassword(e?: FormEvent) {
    e?.preventDefault();
    setError("");
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    await authClient.emailOtp.resetPassword({
      otp,
      email,
      password: newPassword,
      fetchOptions: {
        onRequest() {
          setIsLoading(true);
        },
        onError(ctx: any) {
          toast.error(ctx.error?.message || "Reset failed");
          setIsLoading(false);
        },
        onSuccess() {
          toast.success("Password reset successful. Please login.");
          setIsLoading(false);
          router.push("/auth/login");
        },
        onResponse() {
          setIsLoading(false);
        },
      },
    });
  }

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="w-full h-fit max-w-md p-6 shadow-sm bg-white rounded-[20px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Forget Password
        </h2>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-1/3 text-center ${step === 1 ? "font-semibold" : "text-gray-400"}`}
          >
            1. Send
          </div>
          <div
            className={`w-1/3 text-center ${step === 2 ? "font-semibold" : "text-gray-400"}`}
          >
            2. Verify
          </div>
          <div
            className={`w-1/3 text-center ${step === 3 ? "font-semibold" : "text-gray-400"}`}
          >
            3. Reset
          </div>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOTP} className="flex flex-col gap-3">
            <InputField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <button
              type="submit"
              className="mt-2 bg-indigo-600 text-white px-4 py-2 disabled:opacity-50 text-lg rounded-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send verification code"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOTP} className="flex flex-col gap-3">
            <InputField
              placeholder="Enter verification code"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              type="text"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-2 bg-gray-200 text-black px-4 py-2 text-lg rounded-full"
                disabled={isLoading}
              >
                Back
              </button>

              <button
                type="submit"
                className="mt-2 bg-indigo-600 text-white px-4 py-2 disabled:opacity-50 text-lg rounded-full ml-auto"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify code"}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-3">
            <InputField
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <InputField
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-2 bg-gray-200 text-black px-4 py-2 text-lg rounded-full"
                disabled={isLoading}
              >
                Back
              </button>

              <button
                type="submit"
                className="mt-2 bg-indigo-600 text-white px-4 py-2 disabled:opacity-50 text-lg rounded-full ml-auto"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
