import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "../ui/link";

export function ShortBio() {
  return (
    <section className="py-16 border-t border-border/40 max-w-2xl">
      <h2 className="text-2xl font-bold tracking-tight mb-4">About me</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        I'm a mid-level full stack developer based in Ho Chi Minh City, Vietnam.
        I specialize in building RESTful APIs with NestJS and modern frontends
        with Next.js. I care about clean architecture, developer experience, and
        shipping products that work.
      </p>
      <LinkButton href="/about" variant="outline">
        More about me <ArrowRight className="ml-2 h-4 w-4" />
      </LinkButton>
    </section>
  );
}
