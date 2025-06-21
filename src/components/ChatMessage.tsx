import type { ChatMessageProps } from '@/types';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Bot, Copy, ThumbsDown, ThumbsUp, User } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

function ChatMessage({ content, sender, timestamp, onCopy }: ChatMessageProps) {
  const isBot = sender === 'gemini';

  return (
    <div
      className={cn(
        'flex w-full gap-3 items-start',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      {isBot && (
        <Avatar className="w-9 h-9 mt-1 shrink-0">
          <AvatarFallback className="bg-primary text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <Card
        className={cn(
          'max-w-[85%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]',
          isBot ? 'bg-muted' : 'bg-primary text-primary-foreground',
          'rounded-2xl shadow-md'
        )}
      >
        <CardContent className="">
          <p className="whitespace-pre-wrap text-xs md:text-base leading-relaxed">
            {content}
          </p>
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-border/20 text-xs">
            <span className={cn(isBot ? 'text-muted-foreground' : 'text-primary-foreground/70')}>
              {timestamp}
            </span>
            {isBot && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={onCopy}>
                  <Copy className="w-2 h-2" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-2 h-2" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="w-2 h-2" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!isBot && (
        <Avatar className="w-9 h-9 mt-1 shrink-0">
          <AvatarFallback className="bg-secondary text-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export default ChatMessage;
