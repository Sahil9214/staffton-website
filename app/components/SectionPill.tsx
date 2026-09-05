import type { LucideIcon } from "lucide-react";

const VARIANT_CLASS = {
  soft: {
    root: "inline-flex w-fit items-center gap-2 rounded-full bg-badge-soft px-4 py-1.5",
    icon: "h-3.5 w-3.5 shrink-0 text-accent",
    label:
      "font-inter text-xs font-bold uppercase leading-[15px] tracking-[1px] text-accent",
    dot: "h-1.5 w-1.5 shrink-0 rounded-full bg-accent",
    iconStroke: 2.5,
  },
  mint: {
    root: "inline-flex w-fit items-center gap-2 rounded-full bg-badge-mint px-3 py-1",
    icon: "h-[13px] w-[13px] shrink-0 text-accent",
    label:
      "font-inter text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-accent",
    dot: "h-1.5 w-1.5 shrink-0 rounded-full bg-accent",
    iconStroke: 2,
  },
  teal: {
    root: "inline-flex h-6 w-fit items-center gap-2 rounded-full bg-accent-mint px-3 py-1",
    icon: "h-[13px] w-[13px] shrink-0 text-accent-teal-dark",
    label:
      "font-inter text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-accent-teal-dark",
    dot: "h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal-dark",
    iconStroke: 2,
  },
  softTeal: {
    root: "inline-flex h-6 w-fit items-center gap-2 rounded-full bg-badge-soft px-3 py-1",
    icon: "h-3 w-3 shrink-0 text-accent",
    label:
      "font-inter text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-accent-teal-dark",
    dot: "h-1.5 w-1.5 shrink-0 rounded-full bg-accent-teal-dark",
    iconStroke: 2,
  },
} as const;

type SectionPillProps = {
  children: React.ReactNode;
  icon?: LucideIcon;
  showDot?: boolean;
  variant?: keyof typeof VARIANT_CLASS;
  className?: string;
};

const SectionPill = ({
  children,
  icon: Icon,
  showDot = false,
  variant = "soft",
  className = "",
}: SectionPillProps) => {
  const styles = VARIANT_CLASS[variant];

  return (
    <div className={`${styles.root} ${className}`.trim()}>
      {Icon ? (
        <Icon
          className={styles.icon}
          strokeWidth={styles.iconStroke}
          aria-hidden
        />
      ) : showDot ? (
        <span className={styles.dot} aria-hidden />
      ) : null}
      <span className={styles.label}>{children}</span>
    </div>
  );
};

export default SectionPill;
