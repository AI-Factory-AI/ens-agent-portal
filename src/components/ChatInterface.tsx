import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, ExternalLink, CheckCircle } from "lucide-react";

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

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your ENS AI Agent. I can help you with payments, identity management, and blockchain interactions. What would you like to do?",
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
      content: "Based on ama.agent.eth's ENS records, she has the following verified credentials: Verified Vendor badge from Ghana DAO, Trusted Farmer certification from Agriculture Alliance, and a 5-star community rating with 78 reviews.",
      sender: 'ai',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I understand your request. Let me process that for you...",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="gradient-ens text-primary-foreground">AI</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">alex.agent.eth</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Online • Payment Agent</span>
            </div>
          </div>
          <Badge variant="outline" className="border-primary text-primary">
            <Bot className="w-3 h-3 mr-1" />
            AI Agent
          </Badge>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <Avatar className="w-8 h-8 flex-shrink-0">
                {message.sender === 'user' ? (
                  <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                ) : (
                  <AvatarFallback className="gradient-ai"><Bot className="w-4 h-4" /></AvatarFallback>
                )}
              </Avatar>
              
              <div className="space-y-2">
                <div className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
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

      {/* Chat Input */}
      <div className="border-t border-border p-4 bg-card">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask your agent anything..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1"
          />
          <Button onClick={sendMessage} variant="ens" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            "Send payment",
            "Check credentials",
            "Update records",
            "Join savings group"
          ].map((action) => (
            <Button
              key={action}
              variant="outline"
              size="sm"
              onClick={() => setNewMessage(action)}
              className="text-xs"
            >
              {action}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;