import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Moon, Sun, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  // isDarkTheme handles both 'coffee' and 'dark'
  const isDarkTheme = theme === "coffee" || theme === "dark";

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left side logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">RT Chat</h1>
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Dark/Light Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-ghost"
              title="Toggle Theme"
            >
              {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="hidden sm:inline">
                {isDarkTheme ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* Auth buttons */}
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
