import { Bot, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import ModeToggle from './ModeToggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

function ChatHeader({ onClear }: { onClear: () => void }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-primary">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight">Bot Gan</h1>
            <p className="text-xs text-muted-foreground">Powered by Gemini API</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onClear}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Clear Chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}

export default ChatHeader;
