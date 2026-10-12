'use client';

import { useSyncExternalStore } from 'react';

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/common/helpers/cn';

const themes = [
  { value: 'light', label: 'Day', icon: SunIcon },
  { value: 'dark', label: 'Night', icon: MoonIcon },
  { value: 'system', label: 'Match system', icon: MonitorIcon },
];

// The mounted flag never changes after hydration, so there is nothing to
// subscribe to.
function subscribe() {
  return () => {};
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  // The stored theme is only known in the browser; render no selection on the
  // server so the markup matches during hydration.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <fieldset className="flex items-center rounded-sm border-2 border-paint p-0.5">
      <legend className="sr-only">Theme</legend>
      {themes.map(({ value, label, icon: Icon }) => {
        const selected = mounted && theme === value;

        return (
          <label
            key={value}
            title={label}
            className={cn(
              'relative flex size-8 cursor-pointer items-center justify-center rounded-[2px] transition-colors duration-200 has-focus-visible:outline-2 has-focus-visible:outline-ring has-focus-visible:outline-offset-2',
              selected
                ? 'bg-paint text-paint-ink'
                : 'text-foreground hover:bg-foreground/8',
            )}
          >
            <input
              type="radio"
              name="theme"
              value={value}
              checked={selected}
              onChange={() => setTheme(value)}
              className="sr-only"
            />
            <Icon className="size-4" aria-hidden="true" />
            <span className="sr-only">{label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
