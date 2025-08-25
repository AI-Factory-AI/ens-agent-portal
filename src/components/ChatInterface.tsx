import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Send, Bot, User, ExternalLink, CheckCircle, Search, Plus, Bell, ShoppingCart, Settings, Sun, Moon, Paperclip, Mic, FileText, ChevronDown, Menu, MoreHorizontal, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Transactions from "./pages/Transactions";
import Identity from "./pages/Identity";
import NewAgent from "./pages/NewAgent";
import Credentials from "./pages/Credentials";
import SettingsPage from "./pages/Settings";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  actions?: {
    type: 'transaction' | 'update';
    description: string;
    txHash?: string;
    status: 'pending' | 'completed' | 'failed';
  }[];
}


interface RecentActivity {
  id: string;
  title: string;
  description: string;
  type: 'transaction' | 'credential' | 'payment';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
              content: "Hello! I'm your Flow AI Agent. I can help you with payments, identity management, and blockchain interactions. What would you like to do?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: '2',
      content: "Send 5 USDC to kwame.agent.eth",
      sender: 'user',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
    },
    {
      id: '3',
      content: "I'll send 5 USDC to kwame.agent.eth for you. Checking balances and initiating transaction...",
      sender: 'ai',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      actions: [
        {
          type: 'transaction',
          description: 'Send 5 USDC to kwame.agent.eth',
          txHash: '0x742d35Cc6548Bb1067b3B0a1e0e2c7B5d3e8F9c4',
          status: 'completed'
        }
      ]
    },
    {
      id: '4',
      content: "What credentials does Ama have?",
      sender: 'user',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: '5',
              content: "Based on ama.agent.eth's Flow records, she has the following verified credentials: Verified Vendor badge from Ghana DAO, Trusted Farmer certification from Agriculture Alliance, and a 5-star community rating with 78 reviews.",
      sender: 'ai',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
    }
  ]);


  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      title: 'Payment to kwame.agent.eth',
      description: 'Successfully sent 5 USDC to kwame.agent.eth',
      type: 'payment',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Credential verification',
      description: 'Checked ama.agent.eth credentials',
      type: 'credential',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: '3',
              title: 'Flow record update',
      description: 'Updated payment preferences',
      type: 'transaction',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
    },
    {
      id: '4',
      title: 'Savings group join',
      description: 'Joined Ghana DAO savings pool',
      type: 'transaction',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: '5',
      title: 'Identity verification',
      description: 'Completed KYC verification',
      type: 'credential',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<'chat' | 'transactions' | 'identity' | 'newAgent' | 'credentials' | 'settings'>('chat');

  // Initialize theme on component mount and listen for theme changes
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Listen for theme changes from other components
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,

      timestamp: new Date(),
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. Let me process that for you...",

        timestamp: new Date(),
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const suggestedPrompts = [
    { text: "Send payment", icon: "💰", color: "bg-yellow-100 text-yellow-800" },
    { text: "Check credentials", icon: "🆔", color: "bg-blue-100 text-blue-800" },
          { text: "Update Flow records", icon: "📝", color: "bg-green-100 text-green-800" },
    { text: "Join savings group", icon: "🏦", color: "bg-purple-100 text-purple-800" },
    { text: "Verify identity", icon: "✅", color: "bg-emerald-100 text-emerald-800" },
    { text: "Check balance", icon: "💳", color: "bg-pink-100 text-pink-800" },
  ];

  return (

    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out`}>
        {/* Header with Logo and Collapse Button */}
        <div className="px-4 py-4 border-b border-border">
          <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">

              <div 
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 relative group cursor-pointer"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed ? (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <PanelLeftOpen className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <span className="text-white font-bold text-lg">E</span>
                )}
              </div>

            </div>
            {!isSidebarCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="h-8 w-8 p-0 hover:bg-muted/50"
              >
                <PanelLeftClose className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="relative">
            {!isSidebarCollapsed ? (
              <>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search"
                  className="pl-10 bg-muted/50"
                />
              </>
            ) : (
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 mx-auto hover:bg-muted/50">
                <Search className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'w-8 h-8 p-0 mx-auto' : 'w-full'} justify-start hover:bg-muted/50`}
            onClick={() => setCurrentPage('chat')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isSidebarCollapsed ? 'mr-3' : ''} ${currentPage === 'chat' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <Bot className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && <span>AI Chat</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'w-8 h-8 p-0 mx-auto' : 'w-full'} justify-start hover:bg-muted/50`}
            onClick={() => setCurrentPage('transactions')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isSidebarCollapsed ? 'mr-3' : ''} ${currentPage === 'transactions' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <FileText className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && <span>Transactions</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'w-8 h-8 p-0 mx-auto' : 'w-full'} justify-start hover:bg-muted/50`}
            onClick={() => setCurrentPage('identity')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isSidebarCollapsed ? 'mr-3' : ''} ${currentPage === 'identity' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <User className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && <span>Identity</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'w-8 h-8 p-0 mx-auto' : 'w-full'} justify-start hover:bg-muted/50`}
            onClick={() => setCurrentPage('newAgent')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isSidebarCollapsed ? 'mr-3' : ''} ${currentPage === 'newAgent' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <Plus className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && <span>New Agent</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'w-8 h-8 p-0 mx-auto' : 'w-full'} justify-start hover:bg-muted/50`}
            onClick={() => setCurrentPage('credentials')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isSidebarCollapsed ? 'mr-3' : ''} ${currentPage === 'credentials' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <CheckCircle className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && <span>Credentials</span>}
          </Button>
          <Button 
            variant="ghost" 
            className={`${isSidebarCollapsed ? 'w-8 h-8 p-0 mx-auto' : 'w-full'} justify-start hover:bg-muted/50`}
            onClick={() => setCurrentPage('settings')}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${!isSidebarCollapsed ? 'mr-3' : ''} ${currentPage === 'settings' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              <Settings className="w-4 h-4" />
            </div>
            {!isSidebarCollapsed && <span>Settings</span>}
          </Button>
        </nav>



        {/* User Profile */}
        <div className="px-4 py-4 border-t border-border">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src="/api/placeholder/32/32" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">U</AvatarFallback>
          </Avatar>

            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">alex.agent.eth</p>
                <p className="text-xs text-muted-foreground truncate">alex@example.com</p>
              </div>
            )}
            </div>

        </div>


      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Dynamic Header */}
        {currentPage === 'chat' && (
          <div className="border-b border-border px-4 py-4 bg-card">
            <div className="flex items-center pb-2 space-x-3">
              <div className="flex-1">
                <h3 className="font-semibold">AI Agent</h3>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            <Bot className="w-3 h-3 mr-1" />
            AI Agent
          </Badge>
        </div>
      </div>

        )}

        {/* Page Content */}
        {currentPage === 'chat' && (
          <>
            {/* Welcome Section */}
            {messages.length <= 5 && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
                <h1 className={`text-4xl font-bold font-serif ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  Welcome to Flow
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Get started by asking your agent to perform blockchain tasks. Not sure where to start?
                </p>
                
                {/* Suggested Prompts */}
                <div className="grid grid-cols-3 gap-3 max-w-2xl">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto p-4 flex flex-col items-center space-y-2 ${prompt.color} border-0 hover:scale-105 transition-transform`}
                      onClick={() => setNewMessage(prompt.text)}
                    >
                      <span className="text-2xl">{prompt.icon}</span>
                      <span className="text-sm font-medium">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

      {/* Chat Messages */}

            {messages.length > 5 && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="max-w-4xl mx-auto w-full">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                {message.sender === 'user' ? (
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                ) : (
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white"><Bot className="w-4 h-4" /></AvatarFallback>
                )}
              </Avatar>
              
              <div className="space-y-2">

                          <div className={`rounded-2xl px-4 py-3 ${
                            message.sender === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                
                {/* Action Results */}
                {message.actions && message.actions.map((action, index) => (
                  <div key={index} className="bg-card border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{action.description}</span>
                      <Badge 
                        variant={action.status === 'completed' ? 'default' : action.status === 'pending' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {action.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {action.status}
                      </Badge>
                    </div>
                    {action.txHash && (
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>Tx: {action.txHash.slice(0, 10)}...{action.txHash.slice(-8)}</span>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

              </div>
            )}
          </>
        )}

        {currentPage === 'transactions' && (
          <div className="flex-1 overflow-hidden">
            <Transactions />
          </div>
        )}
        {currentPage === 'identity' && (
          <div className="flex-1 overflow-hidden">
            <Identity />
          </div>
        )}
        {currentPage === 'newAgent' && (
          <div className="flex-1 overflow-hidden">
            <NewAgent />
          </div>
        )}
        {currentPage === 'credentials' && (
          <div className="flex-1 overflow-hidden">
            <Credentials />
          </div>
        )}
        {currentPage === 'settings' && (
          <div className="flex-1 overflow-hidden">
            <SettingsPage />
          </div>
        )}

        {/* Chat Input - Only show on chat page */}
        {currentPage === 'chat' && (
      <div className="border-t border-border p-4 bg-card">

            <div className="max-w-2xl mx-auto w-full">
              <div className="relative">
          <Input
            placeholder="Ask your agent anything..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}

                  className="w-full pr-24 h-12 text-base"
                />
                
                {/* Action Icons Inside Input */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted/50">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted/50">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted/50">
                    <FileText className="w-4 h-4" />
                  </Button>
                  <Button 
                    onClick={sendMessage} 
                    disabled={!newMessage.trim()}
                    className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
            <Send className="w-4 h-4" />
          </Button>

                </div>
              </div>
              
              {/* Character Count and Disclaimer */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-muted-foreground">
                  {newMessage.length}/3,000
                </span>
                <p className="text-xs text-muted-foreground">
                  Flow Agent may generate inaccurate information about blockchain transactions, addresses, or facts.
                </p>
              </div>
            </div>
          </div>
        )}
        </div>
        

      {/* Right Panel - Recent Activities */}
      {!isRightPanelCollapsed ? (
        <div className="w-80 bg-card border-l border-border p-4 transition-all duration-300 ease-in-out">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activities ({recentActivities.length})</h3>
            <Button

              variant="ghost" 
              size="sm"

              className="h-8 w-8 p-0 hover:bg-muted/50"
              onClick={() => setIsRightPanelCollapsed(true)}
            >

              <MoreHorizontal className="w-4 h-4" />
            </Button>

          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'credential' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>

      ) : (
        <div className="w-16 bg-card border-l border-border p-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center space-y-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-muted/50"
              onClick={() => setIsRightPanelCollapsed(false)}
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-2"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ChatInterface;