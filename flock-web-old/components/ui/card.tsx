import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("p-4 border rounded-lg bg-card", className)}>
      {children}
    </div>
  );
}
