import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonOwnProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
};

type ButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) &
  ButtonOwnProps;

export default function Button({ variant = "primary", size = "md", className, href, ...props }: ButtonProps) {
  const base = "btn transition-colors focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50 disabled:pointer-events-none";
  const sizes = { sm: "btn-sm", md: "", lg: "btn-lg" } as const;
  const variants = {
    primary: "bg-black text-white hover:bg-neutral-800",
    secondary: "border border-neutral-300 text-neutral-900 bg-white hover:bg-neutral-50",
  } as const;

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`.trim();

  if (href) {
    // Anchor styled as button for navigation
    return (
      <a href={href} className={cls} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }

  return <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
