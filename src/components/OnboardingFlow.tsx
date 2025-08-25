import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Wallet, Bot, Users, Globe, DollarSign, Shield } from "lucide-react";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [ensName, setEnsName] = useState("");

  const steps = [
    { id: 1, title: "Connect Wallet", description: "Connect your Web3 wallet" },
    { id: 2, title: "Choose ENS Name", description: "Select your agent's ENS subname" },
    { id: 3, title: "Select Role", description: "Choose your agent's specialty" },
    { id: 4, title: "Configure", description: "Set up your agent preferences" },
    { id: 5, title: "Deploy", description: "Launch your AI agent" },
  ];

  const agentRoles = [
    {
      id: "payment",
      title: "Payment Agent",
      icon: DollarSign,
      description: "Handle payments, routing, and financial transactions with smart automation.",
      features: ["Split payments", "Privacy controls", "Rotating addresses", "Cross-chain support"],
      color: "from-green-500 to-emerald-600"
    },
    {
      id: "identity",
      title: "Identity Agent",
      icon: Shield,
      description: "Manage credentials, attestations, and verifiable identity records.",
      features: ["Credential storage", "Identity verification", "Privacy protection", "Attestation management"],
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: "community",
      title: "Community Agent",
      icon: Users,
      description: "Coordinate groups, DAOs, and community activities seamlessly.",
      features: ["DAO coordination", "Group messaging", "Voting automation", "Savings circles"],
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: "ai",
      title: "AI Assistant",
      icon: Bot,
      description: "General-purpose AI assistant for blockchain and Web3 interactions.",
      features: ["Smart contracts", "DeFi automation", "24/7 availability", "Multi-language support"],
      color: "from-orange-500 to-red-600"
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Wallet className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Connect your Web3 wallet to get started with creating your AI agent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="hero" size="lg">
                <Wallet className="w-5 h-5 mr-2" />
                Connect MetaMask
              </Button>
              <Button className="w-full" variant="outline" size="lg">
                WalletConnect
              </Button>
              <Button className="w-full" variant="outline" size="lg">
                Coinbase Wallet
              </Button>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Choose Your ENS Name</CardTitle>
              <CardDescription>
                Select a unique ENS subname for your AI agent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">ENS Subname</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="yourname"
                    value={ensName}
                    onChange={(e) => setEnsName(e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground">.agent.eth</span>
                </div>
                {ensName && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">{ensName}.agent.eth is available!</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Select Agent Role</h2>
              <p className="text-muted-foreground">Choose your agent's primary specialty and capabilities.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {agentRoles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <Card 
                    key={role.id} 
                    className={`cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-primary shadow-ens scale-105' : 'hover:shadow-card hover:scale-102'
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${role.color} shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{role.title}</CardTitle>
                          {isSelected && <Badge variant="default" className="mt-1">Selected</Badge>}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm mb-4">
                        {role.description}
                      </CardDescription>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Key Features:</p>
                        <ul className="space-y-1">
                          {role.features.map((feature, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-center">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <Bot className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle>Configure Your Agent</CardTitle>
              <CardDescription>
                Set up your agent's behavior and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Transaction ($)</label>
                    <Input type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Daily Limit ($)</label>
                    <Input type="number" placeholder="1000" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">AI Permissions</h3>
                <div className="space-y-3">
                  {[
                    "Send payments under $20",
                    "Update ENS records", 
                    "Join community actions",
                    "Respond to messages automatically"
                  ].map((permission, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <CardTitle>Deploy Your Agent</CardTitle>
              <CardDescription>
                Ready to launch {ensName}.agent.eth!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">ENS Name:</span>
                  <span className="text-sm font-mono">{ensName}.agent.eth</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Role:</span>
                  <span className="text-sm">{agentRoles.find(r => r.id === selectedRole)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Gas Fee:</span>
                  <span className="text-sm">~$5.23</span>
                </div>
              </div>
              <Button className="w-full" variant="hero" size="lg">
                Deploy Agent
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted-foreground text-muted-foreground'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-12">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Previous
            </Button>
          )}
          {currentStep < steps.length && (
            <Button 
              variant="ens" 
              onClick={nextStep}
              disabled={currentStep === 2 && !ensName || currentStep === 3 && !selectedRole}
            >
              {currentStep === steps.length - 1 ? 'Deploy' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;