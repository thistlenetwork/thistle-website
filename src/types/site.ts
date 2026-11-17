export type NavLink = {
  id: string;
  text: string;
  link: string;
};

export type FooterLink = NavLink;

export type FooterColumn = {
  id: string;
  header: string;
  links: FooterLink[];
};
