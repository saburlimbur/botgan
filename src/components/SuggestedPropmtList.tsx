import { Button } from './ui/button';

function SuggestedPropmtList({ prompts, onSelect }: { prompts: string[]; onSelect: (p: string) => void }) {
  return (
    <div className="border-t p-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-muted-foreground mb-3">Coba tanyakan:</p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt, i) => (
            <Button key={i} variant="outline" size="sm" onClick={() => onSelect(prompt)} className="text-left text-xs h-auto py-2 px-3">
              {prompt}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedPropmtList;
