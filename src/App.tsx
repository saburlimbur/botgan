import React from 'react';
import type { MessageProps } from './types';
import ChatHeader from './components/ChatHeader';
import { ScrollArea } from './components/ui/scroll-area';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import SuggestedPropmtList from './components/SuggestedPropmtList';
import ChatInput from './components/ChatInput';
import { SendMessageGemini } from './service/connector';

const suggestedPrompts = ['Buatkan saya artikel tentang AI', 'Jelaskan cara kerja machine learning', 'Buat kode React component'];

const App = () => {
  const [messages, setMessages] = React.useState<MessageProps[]>([
    {
      id: '1',
      content: 'Halo! Saya adalah AI Assistant yang siap membantu Anda. Apa yang bisa saya bantu hari ini?',
      timestamp: new Date().toLocaleTimeString(),
      sender: 'gemini',
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const container = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: MessageProps = {
      id: Date.now().toString(),
      content: input,
      timestamp: new Date().toLocaleTimeString(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await SendMessageGemini(input);

      const botMessage: MessageProps = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        sender: 'gemini',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: 'Terjadi kesalahan saat menghubungi AI.',
          timestamp: new Date().toLocaleTimeString(),
          sender: 'gemini',
        },
      ]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: 'Halo! Saya adalah AI Assistant yang siap membantu Anda. Apa yang bisa saya bantu hari ini?',
        timestamp: new Date().toLocaleTimeString(),
        sender: 'gemini',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader onClear={clearChat} />

      <ScrollArea 
        ref={scrollAreaRef} 
        className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              content={msg.content} 
              sender={msg.sender} 
              timestamp={msg.timestamp} 
              onCopy={() => copyToClipboard(msg.content)} 
              />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </ScrollArea>

      {messages.length === 1 && <SuggestedPropmtList prompts={suggestedPrompts} onSelect={handleSuggestedPrompt} />}

      <ChatInput 
        input={input} 
        onChange={setInput} 
        onSubmit={handleSendMessage} 
        onKeyPress={handleKeyPress} 
        disabled={isLoading} 
        />

      <footer className="text-center text-xs text-muted-foreground py-4 bg-background border-t">
        &copy; {new Date().getFullYear()} <a href="https://alifdwirahman-db9c9.firebaseapp.com">Alif Dwi Rahman</a>. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
