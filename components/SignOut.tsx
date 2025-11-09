"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignOut() {
  const router = useRouter();

  async function handleLogut() {
    await authClient.signOut({
      fetchOptions: {
        onError(context) {
          toast.error(context.error.message);
        },
        onSuccess() {
          router.replace("/auth/login");
          toast.success("Successfully Logged out.");
        },
      },
    });
  }
  return (
    <button
      onClick={handleLogut}
      type="submit"
      className="px-3 flex py-2 items-center  bg-red-600 hover:bg-red-700 rounded-[12px] cursor-pointer text-white text-sm font-semibold"
    >
      <LogOut />
      Logout
    </button>
  );
}
