import localFont from 'next/font/local';

export const fontSans = localFont({
  src: '../assets/fonts/inter-latin-variable.woff2',
  display: 'swap',
  variable: '--font-sans',
  weight: '100 900',
});

export const fontMono = localFont({
  src: '../assets/fonts/jetbrains-mono-latin-variable.woff2',
  display: 'swap',
  variable: '--font-mono',
  weight: '100 800',
});
