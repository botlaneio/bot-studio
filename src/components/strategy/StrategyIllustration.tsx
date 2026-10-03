import styles from "./Strategy.module.css";

export function StrategyIllustration({ kind, compact = false }: { kind: string; compact?: boolean }) {
  return <svg className={compact ? styles.serviceIcon : styles.processArt} viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "Launching" && <g><path d="M53 99V24" /><path className={styles.paperFill} d="M54 25C75 13 84 40 113 25V68C86 81 74 55 54 69Z" /><path className={styles.blueStroke} d="M37 99H74 M123 19V31 M117 25H129" /></g>}
    {kind === "Repositioning" && <g><path className={styles.paperFill} d="M45 29L99 20L115 91L61 100Z" /><path d="M62 44L90 39 M66 60L96 55 M70 77L87 74" /><path className={styles.blueStroke} d="M34 62C17 43 33 23 45 24 M34 62L35 48 M34 62L22 58" /></g>}
    {kind === "Planning a website" && <g><rect className={styles.paperFill} x="29" y="26" width="102" height="70" rx="5" /><path d="M29 43H131 M43 61H75 M43 75H69" /><rect className={styles.blueFill} x="92" y="58" width="24" height="23" rx="2" /><path d="M41 34H42 M49 34H50" /></g>}
    {kind === "Listen" && <g><path className={styles.paperFill} d="M31 28H108C115 28 120 33 120 40V74C120 81 115 86 108 86H60L40 102V86C34 86 28 80 28 74V40C28 34 29 30 31 28Z" /><path d="M46 48H102 M46 62H85" /><path className={styles.blueStroke} d="M127 47H135V94H119L108 104" /></g>}
    {kind === "Examine" && <g><path className={styles.paperFill} d="M37 18H104V100H37Z" /><path d="M51 37H88 M51 50H78 M51 64H66" /><circle className={styles.paperFill} cx="100" cy="73" r="22" /><path className={styles.blueStroke} d="M116 90L133 107 M90 73H110 M100 63V83" /></g>}
    {kind === "Decide" && <g><path className={styles.paperFill} d="M34 23L108 17L115 96L41 102Z" /><path d="M53 42L85 39 M55 57L77 55" /><path className={styles.blueStroke} d="M57 77L67 86L87 65" /><path d="M113 45L123 37L132 47L108 76L99 78L100 68Z" /></g>}
    {kind === "Align" && <g><path d="M37 29L108 22L114 91L44 99Z" /><path className={styles.paperFill} d="M48 21L118 29L110 99L40 91Z" /><path d="M61 42L98 46 M59 56L88 60" /><circle className={styles.blueFill} cx="79" cy="79" r="15" /><path className={styles.checkStroke} d="M72 79L77 84L86 74" /></g>}
  </svg>;
}
