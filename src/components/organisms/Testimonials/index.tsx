"use client";

import Image from "next/image";
import { forwardRef, useRef, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  relationship: string;
  content: string;
  cols?: number;
  rows?: number;
};
const allTestimonials: Array<Testimonial> = [
  {
    name: "Antoine Meunier",
    role: "Product manager | Designer",
    company: "Blissbook",
    cols: 3,
    relationship:
      "Antoine was senior to Guilherme but didn't manage Guilherme directly",
    content: `I had the pleasure of working with Guilherme on several projects at Blissbook, and it was an amazing experience. Guilherme is a talented front-end developer whose skills and dedication are truly exceptional. His knack for crafting engaging and intuitive user experiences stands out, making every project we worked on together not just a success, but a blast. 
    Guilherme's approach to front-end challenges is innovative and effective, ensuring that all user interactions are smooth and enjoyable. I am confident that he'll go far in his career, bringing his unique blend of talent and passion to every endeavour. It was a blast to work alongside him, and I look forward to seeing where his talents will take him next! ✨🚀`,
  },
  {
    name: "Pierre-Alexandre St-Jean",
    role: "Tech Lead",
    company: "Blissbook",
    relationship: "Pierre-Alexandre managed Guilherme directly",
    content:
      "Guilherme is awesome teammate and great employee, always making sure he understands where we are going with the projects and really open to feedback as to grow, he has great sens of shipping quality stuff and I really enjoy working with him.",
  },
  {
    name: "Emanoel Faria",
    role: "Backend Software Engineer",
    cols: 2,
    company: "Media Contactless",
    relationship: "Emanoel worked with Guilherme on the same team",
    content:
      "I worked for more than 2 years on the same team as Guilherme. I had an incredible work experience with him; he was very helpful and available, engaged in solving the proposed problems and always questioning, trying to find the real impact of the activities he carried out, always very concerned with quality and deadlines. I would be very happy working with him again on the team because I know he will deliver great work.",
  },
  {
    name: "Joe Carvalho",
    role: "Jornalista | Criador de conteúdo digital | Audiovisual | Roteirista apaixonado por histórias",
    company: "ProEnem",
    relationship: "Joe worked with Guilherme on the same team",
    content:
      "Um profissional muito dedicado e inteligente. Sempre apresentando a melhor forma de conduzir diversos projetos. Seriedade, profissionalismo e foco são 3 características que posso ressaltar sobre o tempo que trabalhamos juntos.",
  },
  {
    name: "Saulo Bulhões",
    role: "UX Designer",
    company: "ProEnem",

    relationship: "Saulo worked with Guilherme on the same team",
    content:
      "Guilherme é um profissional extremamente competente, apaixonado pelo que faz, apresentando resultados de qualidade e excelência. Em todo projeto que se dedica apresenta boas soluções, observando e sugerindo pontos que podem ser melhorados no processo e no produto. Inteligente, proativo, criativo e perspicaz, sempre trata a equipe com muito carinho, respeito e profissionalismo. Está sempre em busca de superar qualquer desafio.",
  },
  {
    name: "Vitor Leonardo Cardoso",
    role: "Designer gráfico | Ilustrador",
    company: "ProEnem",
    relationship: "Vitor Leonardo worked with Guilherme on the same team",
    content:
      "Além de um excelente colega de equipe, é uma pessoa muito sensata e responsável. seu trabalho é sempre muito eficiente e também muito assertivo. Possui uma sincronia ótima com a equipe e é muito dedicado em seus projetos.",
  },
  {
    name: "Osmane FonsecaOsmane Fonseca",
    role: "Web Designer | Publicitário | Analista de Marketing",
    company: "ProEnem",
    cols: 3,
    relationship: "Osmane worked with Guilherme on the same team",
    content:
      "Guilherme possui um amplo conhecimento técnico como front-end, mas o que me surpreendeu é como agregou na arquitetura de sites, pensando sempre na experiência do usuário voltado para os objetivos do projeto. Guilherme não só atua como desenvolvedor com bastante técnica como deixa a navegação fácil de entender e ações simples de realizar.",
  },
];

export const Testimonials = () => {
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const testimonials = showAll ? allTestimonials : allTestimonials.slice(0, 3);

  const handleToggleShowMore = (currState: boolean) => {
    setShowAll((state) => !state);

    if (currState) {
      return firstRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    lastRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="grid flex-1 grid-cols-3 flex-wrap gap-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.name}
            testimonial={testimonial}
            ref={
              index === 0
                ? firstRef
                : index === testimonials.length - 1
                  ? lastRef
                  : null
            }
          />
        ))}
      </section>

      <section className="flex flex-col items-center justify-between gap-4">
        <a
          href="https://www.linkedin.com/in/guimoraesdev/details/recommendations/"
          className="ml-auto"
        >
          <button className="rounded-sm p-3 text-center text-sm font-medium leading-tight text-plum-200 hover:underline">
            Have you work with me? Leave a recommendation! 📝
          </button>
        </a>

        <button
          onClick={() => handleToggleShowMore(showAll)}
          className="rounded-sm bg-white p-3 text-center text-sm font-medium leading-tight text-plum-500"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </section>
    </div>
  );
};

type TestimonialCardProps = {
  testimonial: Testimonial;
};

const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ testimonial, ...props }, ref) => {
    return (
      <div
        className="flex w-full flex-1 flex-col items-center justify-between gap-6 rounded-md bg-plum-500/90 p-4 text-white backdrop-blur-sm"
        style={{
          gridColumn: `span ${testimonial.cols}`,
          gridRow: `span ${testimonial.rows}`,
        }}
        {...props}
        ref={ref}
      >
        <div className="flex w-full items-start justify-start gap-2">
          <Image
            src="/testimonial/avatar-1.png"
            width={50}
            height={50}
            className="aspect-square h-auto select-none object-contain"
            priority
            alt="Guilherme Moraes"
          />

          <section className="flex w-full flex-col items-start justify-start gap-1">
            <strong className="text-lg font-bold leading-tight">
              {testimonial.name}
            </strong>

            <p className="text-xs font-medium leading-tight">
              <b>{testimonial.role}</b> at {testimonial.company}
            </p>
          </section>
        </div>

        <p className="inline-flex h-max w-full items-start justify-start px-2 leading-tight tracking-wide lg:h-full">
          {testimonial.content}
        </p>
      </div>
    );
  },
);

TestimonialCard.displayName = "TestimonialCard";
