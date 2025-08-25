import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-ens animate-float"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              ENS Agents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#explore" className="text-muted-foreground hover:text-foreground transition-smooth">
              Explore Agents
            </a>
            <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-smooth">
              How It Works
            </a>
            <Link to="/chat" className={`transition-smooth ${location.pathname === '/chat' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
              Dashboard
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <Link to="/onboarding">
              <Button variant="hero" size="sm">
                Create Agent
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;