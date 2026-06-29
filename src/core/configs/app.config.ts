// TODO: define missing images and icons
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
  title: 'Boonyarit Iamsa-ard — Software Engineer',
  description:
    'Boonyarit Iamsa-ard — a Bangkok software engineer who builds business systems people can rely on, across TypeScript and Java/Spring.',
  links: {
    linkedIn: 'https://www.linkedin.com/in/boonyarit-iamsaard/',
    github: 'https://github.com/boonyarit-iamsaard',
    email: 'mailto:boonyarit.iamsaard@gmail.com',
  },
  keywords: [
    // Role & expertise
    'software engineer',
    'full stack engineer',
    'system design',
    'backend engineer',

    // Stack
    'typescript',
    'react',
    'next.js',
    'node.js',
    'java',
    'spring boot',
    'microservices',
    'postgresql',

    // Domain
    'fintech',
    'enterprise systems',

    // Personal branding
    'boonyarit iamsa-ard',
    'boonyarit.me',

    // Geo
    'software engineer bangkok',
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
