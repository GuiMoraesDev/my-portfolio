import { getTranslations } from "next-intl/server";
import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

import { Spheres } from "@/components/atoms/Spheres";
import { NoteCard } from "@/components/molecules/NoteCard/NoteCard";
import { SocialMedia } from "@/components/molecules/SocialMedia";
import { Header } from "@/components/organisms/Header";
import { notes } from "@/data/notes";

export default async function Home() {
  const t = await getTranslations();

  return (
    <main className="font-lato relative container flex flex-col items-center">
      <Spheres />

      <Header />

      <SessionWrapper id="home">
        <header className="flex w-full items-center justify-between">
          <h1 className="inline-flex flex-col font-title text-2xl font-bold text-plum-light lg:text-5xl dark:text-gold-light">
            {t("home.hello")}
          </h1>

          <SocialMedia />
        </header>

        <p className="font-body text-lg leading-relaxed tracking-wide lg:text-xl">
          {t.rich("home.about-me", {
            break: () => <br />,
            highlight: (chunks) => (
              <span className="font-semibold text-gold dark:text-gold-light">
                {chunks}
              </span>
            ),
          })}
        </p>
      </SessionWrapper>

      <SessionWrapper id="notes">
        <header className="flex flex-col">
          <h1 className="inline-flex flex-col font-title text-2xl font-bold text-plum-light lg:text-4xl dark:text-gold-light">
            {t("notes.title")}
          </h1>
        </header>

        <ul className="flex w-full items-center gap-6">
          {notes.map((props, index) => (
            <li key={props.id}>
              <NoteCard {...props} index={index} />
            </li>
          ))}
        </ul>

        <footer className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <a
            href="https://dev.to/guimoraes"
            className="text-plum-200 rounded-sm p-3 text-center text-sm leading-tight font-medium hover:underline"
          >
            {t("notes.view-all")}
          </a>
        </footer>
      </SessionWrapper>

      <SessionWrapper id="working-with-me">
        <header className="flex flex-col gap-6">
          <h1 className="inline-flex flex-col font-title text-2xl font-bold text-plum-light lg:text-4xl dark:text-gold-light">
            {t("working-with-me.title")}
          </h1>
          <p className="font-body text-lg leading-relaxed tracking-wide">
            {t.rich("working-with-me.quote", {
              break: () => <br />,
            })}
          </p>
        </header>

        <ul className="flex flex-col gap-8">
          <li className="flex flex-col gap-2">
            <header>
              <strong className="text-lg">Emanoel Faria</strong> -{" "}
              <u>Senior Backend Engineer</u> at GlobalPassport
            </header>

            <p className="line-clamp-5 text-base">
              I worked for more than 2 years on the same team as Guilherme. I
              had an incredible work experience with him; he was very helpful
              and available, engaged in solving the proposed problems and always
              questioning, trying to find the real impact of the activities he
              carried out, always very concerned with quality and deadlines. I
              would be very happy working with him again on the team because I
              know he will deliver great work.
            </p>
          </li>

          <li className="flex flex-col gap-2">
            <header>
              <strong className="text-lg">Antoine Meunier</strong> -{" "}
              <u>Head of Product & Design</u> at Blissbook
            </header>

            <p className="line-clamp-5 text-base">
              I had the pleasure of working with Guilherme on several projects
              at Blissbook, and it was an amazing experience. Guilherme is a
              talented front-end developer whose skills and dedication are truly
              exceptional. His knack for crafting engaging and intuitive user
              experiences stands out, making every project we worked on together
              not just a success, but a blast. Guilherme&apos;s approach to
              front-end challenges is innovative and effective, ensuring that
              all user interactions are smooth and enjoyable. I am confident
              that he&apos;ll go far in his career, bringing his unique blend of
              talent and passion to every endeavour. It was a blast to work
              alongside him, and I look forward to seeing where his talents will
              take him next! ✨🚀
            </p>
          </li>

          <li className="flex flex-col gap-2">
            <header>
              <strong className="text-lg">Pierre-Alexandre St-Jean</strong> -{" "}
              <u>Principal software engineer</u> at Blissbook
            </header>

            <p className="line-clamp-5 text-base">
              Guilherme is awesome teammate and great employee, always making
              sure he understands where we are going with the projects and
              really open to feedback as to grow, he has great sens of shipping
              quality stuff and I really enjoy working with him.
            </p>
          </li>
        </ul>

        <footer className="flex w-full flex-col items-center justify-center gap-4 md:items-end">
          <a
            href="https://www.linkedin.com/in/guimoraesdev/details/recommendations/"
            className="rounded-sm p-3 text-center text-sm leading-tight font-medium hover:underline"
          >
            {t("working-with-me.view-all")}
          </a>
        </footer>
      </SessionWrapper>

      <SessionWrapper id="contact">
        <header className="flex flex-col gap-6">
          <h1 className="inline-flex flex-col font-title text-2xl font-bold text-plum-light lg:text-4xl dark:text-gold-light">
            {t("contact.title")}
          </h1>
          <p className="font-body text-lg leading-relaxed tracking-wide">
            {t.rich("contact.quote", {
              break: () => <br />,
            })}
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <p className="font-body text-lg leading-relaxed tracking-wide">
            {t.rich("contact.reach-me-out", {
              break: () => <br />,
            })}
          </p>

          <ul>
            <li>
              Email:{" "}
              <a href="mailto:guimoraes.dev@gmail.com">
                guimoraes.dev@gmail.com
              </a>
            </li>

            <li>
              LinkedIn:{" "}
              <a href="https://www.linkedin.com/in/guimoraesdev/">
                linkedin.com/in/guimoraesdev
              </a>
            </li>

            <li>
              GitHub:{" "}
              <a href="https://github.com/guimoraesdev">
                github.com/guimoraesdev
              </a>
            </li>
          </ul>
        </section>
      </SessionWrapper>

      <footer className="flex flex-col gap-4 p-16 text-center text-sm dark:text-gold-light">
        <span>
          &copy; {new Date().getFullYear()} Guilherme Moraes.{" "}
          {t("footer.rights")}
        </span>

        <a href="#home">Back to top</a>
      </footer>
    </main>
  );
}

const SessionWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex h-full w-full max-w-6xl flex-col justify-between gap-14 py-16",
      className,
    )}
    {...props}
  />
);

/* type SessionHeaderProps = ComponentProps<"h2"> & {
  title: string;
  quote: string;
};
const SessionHeader = ({
  title,
  quote,
  className,
  ...props
}: SessionHeaderProps) => (
  <header
    className={twMerge("flex w-full flex-col gap-2", className)}
    {...props}
  >
    <p className="leading-snug tracking-wide">{quote}</p>
  </header>
); */

/* type HighlightCardProps = ComponentProps<"p"> & {
  icon: IconProp;
};
const HighlightCard = ({ icon, ...props }: HighlightCardProps) => (
  <div className="text-plum-50 flex flex-col items-center justify-start gap-4">
    <Icon icon={icon} size="lg" />
    <p
      className="text-center text-base leading-normal tracking-wider"
      {...props}
    />
  </div>
); */
