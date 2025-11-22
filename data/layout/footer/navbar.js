// Données structurelles de la navbar (non traduisibles)
// Les labels sont maintenant gérés par les traductions dans navbar.tsx
export const navbarData = {
  logo: {
    src: "/logo.png",
    width: 120,
    height: 60,
    href: "/",
  },
  menuItems: [
    {
      href: "/vehicules",
      hasDropdown: false,
    },
    {
      href: "#avis",
      hasDropdown: false,
    },
    {
      href: "#faq",
      hasDropdown: false,
    },
    {
      href: "/a-propos",
      hasDropdown: false,
    },
  ],
  mobileMenuItems: [
    {
      href: "/vehicules",
    },
    {
      href: "#avis",
    },
    {
      href: "#faq",
    },
    {
      href: "/a-propos",
    },
  ],
  buttons: {
    CTA1: {
      variant: "default",
      href: "/vehicules",
    },
    CTA2: {
      variant: "default",
      href: "/contact",
    },
  },
};

