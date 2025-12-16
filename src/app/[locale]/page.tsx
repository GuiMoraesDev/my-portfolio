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
    <>
      <main className="relative container flex w-full flex-col items-center">
        <Header />
        <Spheres />

        <SessionWrapper id="home">
          <header className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <h1 className="inline-flex flex-col font-title text-2xl font-bold text-plum-light md:text-3xl lg:text-4xl dark:text-gold-light">
              {t("home.hello")}
            </h1>

            <SocialMedia />
          </header>

          <p className="font-body leading-relaxed tracking-wider md:text-lg">
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
            <h1 className="inline-flex flex-col font-title text-xl font-bold text-plum-light lg:text-3xl dark:text-gold-light">
              {t("notes.title")}
            </h1>
          </header>

          <ul className="flex w-full flex-col items-center gap-6 lg:flex-row">
            {notes.map((props, index) => (
              <li key={props.id}>
                <NoteCard {...props} index={index} />
              </li>
            ))}
          </ul>

          <footer className="flex w-full flex-col items-end justify-center gap-4">
            <a
              href="https://dev.to/guimoraes"
              className="rounded-sm p-3 text-center text-sm leading-tight font-medium hover:underline"
            >
              {t("notes.view-all")}
            </a>
          </footer>
        </SessionWrapper>

        <SessionWrapper id="working-with-me" className="gap-12">
          <header className="flex flex-col gap-6">
            <h1 className="inline-flex flex-col font-title text-xl font-bold text-plum-light lg:text-3xl dark:text-gold-light">
              {t("working-with-me.title")}
            </h1>

            <p className="font-body leading-relaxed tracking-wide">
              &quot;
              {t.rich("working-with-me.quote", {
                break: () => <br />,
              })}
              &quot;
            </p>
          </header>

          <ul className="flex flex-col gap-10">
            <li className="flex flex-col gap-4 md:gap-2">
              <header>
                <strong className="text-lg">Emanoel Faria</strong> -{" "}
                <u>Senior Backend Engineer</u> at GlobalPassport
              </header>

              <p>
                I worked for more than 2 years on the same team as Guilherme. I
                had an incredible work experience with him; he was very helpful
                and available, engaged in solving the proposed problems and
                always questioning, trying to find the real impact of the
                activities he carried out, always very concerned with quality
                and deadlines. I would be very happy working with him again on
                the team because I know he will deliver great work.
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <header>
                <strong className="text-lg">Antoine Meunier</strong> -{" "}
                <u>Head of Product & Design</u> at Blissbook
              </header>

              <p>
                I had the pleasure of working with Guilherme on several projects
                at Blissbook, and it was an amazing experience. Guilherme is a
                talented front-end developer whose skills and dedication are
                truly exceptional. His knack for crafting engaging and intuitive
                user experiences stands out, making every project we worked on
                together not just a success, but a blast. Guilherme&apos;s
                approach to front-end challenges is innovative and effective,
                ensuring that all user interactions are smooth and enjoyable. I
                am confident that he&apos;ll go far in his career, bringing his
                unique blend of talent and passion to every endeavour. It was a
                blast to work alongside him, and I look forward to seeing where
                his talents will take him next! ✨🚀
              </p>
            </li>

            <li className="flex flex-col gap-2">
              <header>
                <strong className="text-lg">Pierre-Alexandre St-Jean</strong> -{" "}
                <u>Principal software engineer</u> at Blissbook
              </header>

              <p>
                Guilherme is awesome teammate and great employee, always making
                sure he understands where we are going with the projects and
                really open to feedback as to grow, he has great sens of
                shipping quality stuff and I really enjoy working with him.
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
            <h1 className="inline-flex flex-col font-title text-2xl font-bold text-plum-light lg:text-3xl dark:text-gold-light">
              {t("contact.title")}
            </h1>
            <p className="font-body leading-relaxed tracking-wide">
              {t.rich("contact.quote", {
                break: () => <br />,
              })}
            </p>
          </header>

          <section className="flex flex-col gap-6">
            <p className="font-body leading-relaxed tracking-wide">
              {t.rich("contact.reach-me-out", {
                break: () => <br />,
              })}
            </p>

            <ul>
              <li>
                Email:{" "}
                <a href="mailto:guimoraes.dev@gmail.com" className="underline">
                  guimoraes.dev@gmail.com
                </a>
              </li>

              <li>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/guimoraesdev/"
                  className="underline"
                >
                  linkedin.com/in/guimoraesdev
                </a>
              </li>

              <li>
                GitHub:{" "}
                <a href="https://github.com/guimoraesdev" className="underline">
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
    </>
  );
}

const SessionWrapper = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={twMerge(
      "relative z-10 flex h-full w-full max-w-80 flex-col justify-between gap-12 py-10 md:max-w-6xl md:py-16",
      className,
    )}
    {...props}
  />
);
