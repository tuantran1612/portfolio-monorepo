"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@portfolio/types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  projects: Project[];
}

const config = {
  minSize: 0.1,
  growth: 0.25,
  aspect: 1 / 1.25,
};

export function FeaturedProjects({ projects }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1000px)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (!sectionRef.current || !sliderRef.current) return;

        const slider = sliderRef.current;

        const growthRatio = Math.exp(config.growth);

        const slideCount =
          Math.ceil(
            Math.log(1 + (growthRatio - 1) / config.minSize) / config.growth
          ) + 4;

        const edgeX = (pos: number, width: number) =>
          (width * config.minSize * (Math.pow(growthRatio, pos) - 1)) /
          (growthRatio - 1);

        const indices = Array.from({ length: slideCount }, (_, i) => i);

        let progress = 0;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * projects.length}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,

          onUpdate(self) {
            progress = self.progress * projects.length;
          },
        });

        function render() {
          const width = slider.clientWidth;

          const slides = slideRefs.current;

          slides.forEach((slide, i) => {
            if (!slide) return;

            let index = indices[i];

            while (edgeX(index + progress, width) > width) {
              index -= slideCount;
            }

            while (edgeX(index + progress + 1, width) < 0) {
              index += slideCount;
            }

            indices[i] = index;

            const left = edgeX(index + progress, width);
            const right = edgeX(index + progress + 1, width);

            const w = right - left;
            const h = w / config.aspect;

            gsap.set(slide, {
              x: left,
              width: w,
              height: h,
              zIndex: Math.round(right),
            });
          });
        }

        gsap.ticker.add(render);
        gsap.from(".heading-section", {
          opacity: 0,
          y: -100,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: document.body,
            start: "top 80%",
          },
        });
        return () => {
          gsap.ticker.remove(render);
          trigger.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [projects.length] }
  );

  const growthRatio = Math.exp(config.growth);

  const slideCount =
    Math.ceil(
      Math.log(1 + (growthRatio - 1) / config.minSize) / config.growth
    ) + 4;

  return (
    <section ref={sectionRef} className="relative pt-24 md:py-0">
      <h2 className="px-4 md:px-12 lg:absolute lg:top-[140px] heading-section text-2xl sm:text-3xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-3 md:mb-6 lg:mb-8">
        <span className="hero-line-1 block text-foreground">
          Featured <span className="text-sub">Work</span>
        </span>
      </h2>
      <div className="hidden lg:block h-pin overflow-hidden">
        <div
          ref={sliderRef}
          className="absolute inset-0 overflow-hidden spotlight-images">
          {Array.from({ length: slideCount }).map((_, i) => {
            const project = projects[i % projects.length];
            return (
              <div
                key={i}
                ref={(el) => {
                  slideRefs.current[i] = el;
                }}
                className="absolute bottom-0 -translate-y-1/2">
                <Link
                  href={`/projects/${project.slug}`}
                  className="spotlight-item">
                  <div className="relative h-full w-full spotlight-item-img">
                    <Image
                      fill
                      src={project.imageUrl || ""}
                      alt={project.title}
                      className="object-cover"
                      priority={i < 2}
                    />

                    <div className="absolute spotlight-item-title p-4">
                      <h3 className="font-medium">{project.title}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="lg:hidden px-4 sm:px-6">
        <Swiper
          slidesPerView={1.35}
          breakpoints={{
            425: {
              slidesPerView: 1.65,
              spaceBetween: 16,
            },
            540: {
              slidesPerView: 1.75,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
          }}
          spaceBetween={16}>
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <Link
                href={`/projects/${project.slug}`}
                className="block spotlight-item">
                <div className="relative spotlight-item-img max-lg:pt-[100%] overflow-hidden">
                  <Image
                    width="500"
                    height="400"
                    src={project.imageUrl || ""}
                    alt={project.title}
                    className="object-cover w-full h-full absolute inset-0"
                  />
                </div>
                <div className="spotlight-item-title">
                  <h3 className="font-medium">{project.title}</h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
