import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Bot } from 'lucide-react';

function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <Avatar className="w-8 h-8 mt-1">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <Card className="bg-muted">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
            </div>
            <span className="text-xs text-muted-foreground">AI sedang mengetik...</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TypingIndicator;
