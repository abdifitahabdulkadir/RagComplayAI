import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import SignOut from "./SignOut";

export default async function UserAvator() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const user = data?.user;
  return (
    <div className="flex items-center text-white text-2xl gap-2">
      {user?.image ?
        <Image
          src={user.image}
          width={20}
          height={20}
          alt="User Avatar"
          className="h-10 w-10 rounded-full object-cover border-2 border-white"
        />
      : <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-bold uppercase">
          {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
        </div>
      }
      <span className="text-base hidden md:block font-medium">
        {user?.name ?? user?.email ?? "User"}
      </span>
      <SignOut />
    </div>
  );
}
