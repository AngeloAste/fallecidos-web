import * as React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400" {...props} />;
}
