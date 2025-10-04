import * as React from "react";

export function Select({ children, onValueChange, value }: { children: React.ReactNode; onValueChange?: (v: string)=>void; value?: string; }) {
  return <div data-select-value={value} onChange={()=>{}}>{children}</div>;
}
export function SelectTrigger({ children }: { children: React.ReactNode }) { return <div className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm flex items-center">{children}</div>; }
export function SelectValue({ placeholder }: { placeholder?: string }) { return <span className="text-muted-foreground">{placeholder ?? "Selecciona..."}</span>; }
export function SelectContent({ children }: { children: React.ReactNode }) { return <div className="hidden">{children}</div>; }
export function SelectItem({ children, value }: { children: React.ReactNode; value: string }) { return <div data-value={value} className="hidden">{children}</div>; }
