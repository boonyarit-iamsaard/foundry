export const appConfig = {
  name: 'boonyarit.me',
  url: new URL('https://boonyarit.me'),
  authors: [
    {
      name: 'Boonyarit Iamsa-ard',
      url: new URL('https://boonyarit.me'),
    },
  ],
  title: 'Boonyarit Iamsa-ard',
  description:
    'Software engineer in Bangkok, Thailand. Former aircraft mechanic building backend, web and mobile software that is checked before it ships.',
  resume: '/assets/boonyarit-iamsaard-2025-04-15.pdf',
  links: {
    linkedIn: 'https://www.linkedin.com/in/boonyarit-iamsaard/',
    github: 'https://github.com/boonyarit-iamsaard',
    email: 'mailto:boonyarit.iamsaard@gmail.com',
  },
};

export type AppConfig = typeof appConfig;
