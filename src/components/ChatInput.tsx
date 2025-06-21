import type { ChatInputProps } from '@/types';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

function ChatInput({ input, onChange, onSubmit, onKeyPress, disabled }: ChatInputProps) {
  return (
    <div className="w-full border-t bg-background px-4 py-3 sm:py-4 sticky bottom-0 z-10">
      <div className="max-w-4xl mx-auto w-full">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyPress}
            disabled={disabled}
            placeholder="Ketik pesan Anda..."
            className="w-full resize-none min-h-[80px] max-h-[200px] pr-14 text-sm sm:text-base border border-border rounded-2xl px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
          />

          <Button
            onClick={onSubmit}
            disabled={!input.trim() || disabled}
            size="icon"
            className="absolute bottom-2.5 right-2.5 p-2 h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90 transition"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-2">
          Tekan <kbd className="px-1 py-0.5 border rounded">Enter</kbd> untuk kirim, <kbd className="px-1 py-0.5 border rounded">Shift</kbd>+<kbd className="px-1 py-0.5 border rounded">Enter</kbd> untuk baris baru
        </p>
      </div>
    </div>
  );
}

export default ChatInput;
