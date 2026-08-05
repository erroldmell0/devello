import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, Bug } from "lucide-react";
import { UserButton } from "@clerk/react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-base-100 border-b-2 border-primary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="size-10 bg-primary border-2 border-primary flex items-center justify-center shrink-0 brut-press">
            <Bug className="size-6 text-primary-content" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono font-bold text-xl text-primary tracking-tight uppercase">Devello</span>
            <span className="brut-meta text-[0.6rem] text-base-content/50 -mt-0.5">Code Together</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* PROBLEMS PAGE LINK */}
          <Link to={"/problems"} className={`px-4 py-2 border-2 brut-press ${
                isActive("/problems")
                  ? "bg-primary text-primary-content border-primary"
                  : "border-primary/30 text-base-content/70 hover:text-primary hover:border-primary"
                  }`}>
            <div className="flex items-center gap-x-2.5">
              <BookOpenIcon className="size-4" />
              <span className="brut-meta hidden sm:inline">Problems</span>
            </div>
          </Link>

          {/* DASHBORD PAGE LINK */}
          <Link to={"/dashboard"} className={`px-4 py-2 border-2 brut-press ${
                isActive("/dashboard")
                  ? "bg-primary text-primary-content border-primary"
                  : "border-primary/30 text-base-content/70 hover:text-primary hover:border-primary"
              }`}
          >
            <div className="flex items-center gap-x-2.5">
              <LayoutDashboardIcon className="size-4" />
              <span className="brut-meta hidden sm:inline">Dashbord</span>
            </div>
          </Link>

          <div className="ml-3 flex items-center border-2 border-primary/30 p-1">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
