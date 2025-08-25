import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Globe, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ens-agents.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Bot className="w-8 h-8 text-primary opacity-20" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <Globe className="w-6 h-6 text-accent opacity-20" />
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <Zap className="w-5 h-5 text-primary-glow opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Your{" "}
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  AI Agent
                </span>
                ,{" "}
                <br className="hidden sm:block" />
                Powered by{" "}
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  ENS
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Create an ENS subname tied to an AI-powered assistant for identity, payments, and coordination. 
                Your decentralized agent for the future of web3.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/onboarding">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  Create My Agent
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="ai" size="lg" className="text-lg px-8 py-4">
                Explore Agents
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,247</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.4M</div>
                <div className="text-sm text-muted-foreground">Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-ens">
              <img 
                src={heroImage} 
                alt="ENS AI Agents Hub"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating agent cards */}
            <div className="absolute -top-4 -left-4 agent-card w-48 animate-float">
              <div className="text-sm font-semibold">alex.agent.eth</div>
              <div className="text-xs text-muted-foreground">Payment Agent</div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 agent-card w-48 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="text-sm font-semibold">kwame.agent.eth</div>
              <div className="text-xs text-muted-foreground">AI Assistant</div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span className="text-xs">Processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;