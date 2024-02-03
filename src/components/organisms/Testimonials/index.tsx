import Image from "next/image";
import { useTranslations } from "next-intl";

export const Testimonials = () => {
  const t = useTranslations("Home");
  return (
    <>
      <TestimonialCard
        name="Vitor Leonardo"
        role={t("about-me.testimonials.vitor-leonardo.role")}
        content={t("about-me.testimonials.vitor-leonardo.text")}
      />
      <TestimonialCard
        name="Saulo Bulhões"
        role={t("about-me.testimonials.saulo-bulhoes.role")}
        content={t("about-me.testimonials.saulo-bulhoes.text")}
      />
      <TestimonialCard
        name="Osmane Fonseca"
        role={t("about-me.testimonials.osmane-fonseca.role")}
        content={t("about-me.testimonials.osmane-fonseca.text")}
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
  <div className="flex h-full w-full max-w-xs flex-1 flex-col items-center justify-between rounded-md border-8 border-plum-500 bg-plum-50 px-3 md:max-w-[45%] md:justify-between lg:max-w-xs">
    <Image
      src="/testimonial-placeholder.png"
      width={75}
      height={75}
      className="aspect-square h-auto -translate-y-1/3 select-none object-contain"
      priority
      alt=""
    />

    <p className="h-full w-full text-sm leading-tight tracking-wide text-gray-800">
      {content}
    </p>

    <section className="flex w-full flex-col items-center justify-start gap-3 pb-6 pt-4 md:gap-5">
      <strong className="text-lg font-bold leading-tight text-gray-900">
        {name}
      </strong>
      <p className="text-sm font-medium leading-tight text-gray-950">{role}</p>
    </section>
  </div>
);
