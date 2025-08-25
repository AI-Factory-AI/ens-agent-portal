import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import AgentCard from "./AgentCard";
import { Search, Filter, Users, Bot, Wallet, Globe } from "lucide-react";

const AgentsDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const agents = [
    {
      name: "Alex Chen",
      ensName: "alex.agent.eth",
      role: "Payment Agent",
      rating: 4.9,
      reviews: 127,
      badges: ["Verified Vendor", "Trusted Farmer"],
      isOnline: true,
      description: "Specialized in cross-border payments and DeFi integrations with 5+ years experience.",
    },
    {
      name: "Kwame Asante",
      ensName: "kwame.agent.eth",
      role: "AI Assistant",
      rating: 4.8,
      reviews: 89,
      badges: ["Code Expert", "24/7 Available"],
      isOnline: true,
      description: "Advanced AI assistant for smart contract interactions and blockchain automation.",
    },
    {
      name: "Sarah Kim",
      ensName: "sarah.agent.eth",
      role: "Identity Agent",
      rating: 4.9,
      reviews: 156,
      badges: ["KYC Verified", "Privacy Expert"],
      isOnline: false,
      description: "Identity verification and credential management specialist with strong privacy focus.",
    },
    {
      name: "Diego Santos",
      ensName: "diego.agent.eth",
      role: "Community Agent",
      rating: 4.7,
      reviews: 203,
      badges: ["DAO Leader", "Community Builder"],
      isOnline: true,
      description: "Community coordination and DAO governance expert helping organizations scale.",
    },
    {
      name: "Ama Osei",
      ensName: "ama.agent.eth",
      role: "Payment Agent",
      rating: 5.0,
      reviews: 78,
      badges: ["Verified Vendor", "Local Expert"],
      isOnline: true,
      description: "Local payment specialist focusing on African markets and mobile money integration.",
    },
    {
      name: "Wei Zhang",
      ensName: "wei.agent.eth",
      role: "AI Assistant",
      rating: 4.8,
      reviews: 94,
      badges: ["DeFi Expert", "Multilingual"],
      isOnline: true,
      description: "Multilingual AI assistant specialized in DeFi protocols and yield optimization strategies.",
    },
  ];

  const roles = ["all", "Payment Agent", "AI Assistant", "Identity Agent", "Community Agent"];
  const roleIcons = {
    "Payment Agent": Wallet,
    "AI Assistant": Bot,
    "Identity Agent": Users,
    "Community Agent": Globe,
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.ensName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.badges.some(badge => badge.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRole = selectedRole === "all" || agent.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Explore{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              AI Agents
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and connect with AI-powered agents across various specialties. 
            Each agent has a unique Flow identity and proven track record.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search agents by name, ENS, or badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {roles.map((role) => {
              const Icon = role === "all" ? Filter : roleIcons[role as keyof typeof roleIcons];
              return (
                <Button
                  key={role}
                  variant={selectedRole === role ? "ens" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRole(role)}
                  className="whitespace-nowrap"
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {role === "all" ? "All Roles" : role}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>


      </div>
    </section>
  );
};

export default AgentsDirectory;