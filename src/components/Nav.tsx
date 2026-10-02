import styles from "./Nav.module.css";

const LINKS = [
  { href: "#craft", label: "Work" },
  { href: "#studio", label: "Studio" },
  { href: "#whispers", label: "Whispers" },
];

export function Nav() {
  return (
    <header className={styles.nav}>
      {/* The logo SVG carries its own shutter-flash animation, so it stays an <img>. */}
      <a className={styles.logo} href="#top" aria-label="Botlane Studios home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Botlane Studios" width={897} height={100} />
      </a>
      <nav className={styles.links} aria-label="Main">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className={styles.contact} href="#contact">
        Contact
      </a>
    </header>
  );
}
