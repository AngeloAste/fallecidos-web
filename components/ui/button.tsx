import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" };

export function Button({ variant = "default", className = "", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none";
  const styles = variant === "outline" ? "border bg-white hover:bg-slate-50" : "bg-slate-900 text-white hover:opacity-90";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
