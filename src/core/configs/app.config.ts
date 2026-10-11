export const appConfig = {
  name: 'boonyarit.me',
  url: new URL('https://boonyarit.me'),
  authors: [
    {
      name: 'Boonyarit Iamsa-ard',
      url: new URL('https://boonyarit.me'),
    },
  ],
  creator: '@boonyarit_iam',
  title: 'Boonyarit Iamsa-ard',
  description:
    'Software engineer in Bangkok, Thailand. Former aircraft mechanic building backend, web and mobile software that is checked before it ships.',
  resume: '/assets/boonyarit-iamsaard-2025-04-15.pdf',
  links: {
    linkedIn: 'https://www.linkedin.com/in/boonyarit-iamsaard/',
    github: 'https://github.com/boonyarit-iamsaard',
    email: 'mailto:boonyarit.iamsaard@gmail.com',
  },
  keywords: [
    // Primary Keywords
    'software engineer',
    'react developer',
    'next.js developer',
    'node.js developer',
    'typescript developer',
    'web developer portfolio',

    // Secondary Keywords
    'next.js portfolio website',
    'tailwind css developer',
    'frontend developer',
    'backend developer',
    'javascript developer',
    'web app developer',
    'api developer',
    'developer case studies',

    // Personal Branding Keywords
    'boonyarit iamsa-ard',
    'boonyarit.me',
    'boonyarit portfolio',
    'boonyarit software engineer',

    // Long-Tail Keywords
    'how to structure a next.js project',
    'best react portfolio templates',
    'next.js with typescript setup',
    'node.js authentication example',
    'seo for developer portfolios',
    'freelance react developer in thailand',
    'software engineer resume website',

    // Geo Keywords
    'developer in thailand',
    'thai web developer portfolio',
    'software engineer thailand',
  ],
  openGraph: {
    images: [],
  },
  twitter: {
    images: [],
  },
  icons: [],
};

export type AppConfig = typeof appConfig;
