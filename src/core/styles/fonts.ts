import localFont from 'next/font/local';

export const fontSans = localFont({
  src: [
    {
      path: '../assets/fonts/barlow-latin-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/barlow-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/barlow-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/barlow-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/barlow-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-sans',
});

export const fontDisplay = localFont({
  src: '../assets/fonts/big-shoulders-latin-variable.woff2',
  display: 'swap',
  variable: '--font-display',
  weight: '100 900',
});

export const fontStencil = localFont({
  src: '../assets/fonts/big-shoulders-stencil-latin-variable.woff2',
  display: 'swap',
  variable: '--font-stencil',
  weight: '100 900',
});

export const fontMono = localFont({
  src: '../assets/fonts/jetbrains-mono-latin-variable.woff2',
  display: 'swap',
  variable: '--font-mono',
  weight: '100 800',
});
