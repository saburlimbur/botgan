import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

function ModeToggle() {
  const [isDark, setIsDark] = React.useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  React.useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle Theme">
      {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-500" />}
    </Button>
  );
}

export default ModeToggle;
