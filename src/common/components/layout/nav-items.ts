export const navItems = [
  { href: '/projects', label: 'Projects' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
];

export function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
