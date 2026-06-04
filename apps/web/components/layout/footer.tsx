import Link from "next/link";
import { Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-sm font-medium">tuantran@email.com</span>
      <div className="flex items-center gap-6">
        <Link
          href="https://github.com/tuantran1612"
          target="_blank"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
          GitHub
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
          LinkedIn
        </Link>
        <Link
          href="mailto:your@email.com"
          className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">
          Email
        </Link>
      </div>
    </footer>
  );
}
