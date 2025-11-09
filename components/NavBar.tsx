import { FilePlus } from "lucide-react";
import { Suspense } from "react";
import { UserSkelton } from "./Skeltons";
import UserAvator from "./UserAvator";

export default function NavBar() {
  return (
    <nav className="navbar navbar-dark flex items-center   min-h-[70px] ">
      <div className="h-full px-10 w-full  text-white text-sm  md:text-2xl flex items-center justify-between">
        <div className="flex items-center  gap-2">
          <FilePlus />
          <span className="navbar-brand mb-0 h1">FDA Compliance AI</span>
        </div>
        <Suspense fallback={<UserSkelton />}>
          <UserAvator />
        </Suspense>
      </div>
    </nav>
  );
}
