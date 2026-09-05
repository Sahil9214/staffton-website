import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const GET_STARTED_FREE_LABEL = "Get Started Free";

const VARIANT_CLASS = {
  primary: "bg-accent text-white hover:bg-brand-hover",
  inverse: "bg-white text-accent hover:bg-teal-50",
} as const;

const BASE_CLASS =
  "inline-flex h-[46px] w-fit shrink-0 items-center justify-center gap-2 rounded-lg px-8 py-[14px] font-inter text-sm leading-[18px] font-semibold shadow-accent transition-colors duration-200";

type GetStartedFreeButtonProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  variant?: keyof typeof VARIANT_CLASS;
  external?: boolean;
};

const isExternalHref = (href: string) =>
  href.startsWith("http://") || href.startsWith("https://");

const GetStartedFreeButton = ({
  href,
  children = GET_STARTED_FREE_LABEL,
  className = "",
  variant = "primary",
  external = isExternalHref(href),
}: GetStartedFreeButtonProps) => {
  return (
    <Link
      href={href}
      className={`${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`.trim()}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
    </Link>
  );
};

export default GetStartedFreeButton;
