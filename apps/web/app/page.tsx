import { projectService } from "@/services/project.service";
import { categoryService } from "@/services/category.service";
import { Hero } from "@/components/homepage/hero";
import { FeaturedProjects } from "@/components/homepage/featured-project";
import { Values } from "@/components/homepage/value";
import { CategoryBrowse } from "@/components/homepage/category-browse";
import { ShortBio } from "@/components/homepage/short-bio";
import { PersonJsonLd } from "@/components/seo/json-ld";

export default async function HomePage() {
  const [featuredProjects, categories] = await Promise.all([
    projectService.getFeatured().catch(() => []),
    categoryService.getAll().catch(() => []),
  ]);

  return (
    <>
      <PersonJsonLd />
      <Hero />
      <section className="">
        <FeaturedProjects projects={featuredProjects} />
        <ShortBio />
        <Values />
      </section>
    </>
  );
}
