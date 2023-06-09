import Image from "next/image";

export const HeroImage = () => {
  return (
    <section className="lg:h-full">
      <Image
        src="/img/photo-dark.png"
        width={600}
        height={600}
        alt="This picture's an AI generated picture of me on my back looking to the right wearing a dark jacket in a futuristic city at night"
        className="invisible h-0 w-0 scale-0 rounded-[40px] shadow-md shadow-black transition-all dark:visible dark:h-auto dark:w-auto dark:scale-100 lg:rounded-[60px]"
        priority
      />

      <Image
        src="/img/photo-light.png"
        width={600}
        height={600}
        alt="This picture shows my half-upper body. I'm a white Latino man wearing a beige suit, smiling with hands in the pocket"
        className="visible h-auto transition-all dark:invisible dark:h-0 dark:w-0 dark:scale-0"
        priority
      />
    </section>
  );
};
