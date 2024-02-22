import Image from "next/image";
import { useTranslations } from "next-intl";

export const Testimonials = () => {
  const t = useTranslations("buzz-about-me");
  return (
    <>
      <TestimonialCard
        name="Saulo Bulhões"
        role={t("testimonials.saulo-bulhoes.role")}
        content={t("testimonials.saulo-bulhoes.text")}
      />
      <TestimonialCard
        name="Osmane Fonseca"
        role={t("testimonials.osmane-fonseca.role")}
        content={t("testimonials.osmane-fonseca.text")}
      />
      <TestimonialCard
        name="Vitor Leonardo"
        role={t("testimonials.vitor-leonardo.role")}
        content={t("testimonials.vitor-leonardo.text")}
      />
    </>
  );
};

type TestimonialCardProps = {
  name: string;
  role: string;
  content: string;
};

const TestimonialCard = ({ name, role, content }: TestimonialCardProps) => (
  <div className="mt-8 flex h-auto w-full max-w-xs border-collapse flex-col items-center justify-between rounded-md bg-plum-500/95 px-3 text-white backdrop-blur-sm md:max-w-[45%] md:justify-between lg:h-full lg:max-w-xs lg:flex-1">
    <Image
      src="/testimonial-placeholder.png"
      width={75}
      height={75}
      className="aspect-square h-auto -translate-y-1/2 select-none object-contain"
      priority
      alt=""
    />

    <p className="inline-flex h-max w-full items-start justify-start px-2 leading-tight tracking-wide  lg:h-full">
      {content}
    </p>

    <section className="flex w-full flex-col items-center justify-start gap-3 pb-6 pt-4 md:gap-5">
      <strong className="text-lg font-bold leading-tight">{name}</strong>
      <p className="text-sm font-medium leading-tight">{role}</p>
    </section>
  </div>
);
