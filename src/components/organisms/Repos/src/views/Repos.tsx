import pick from "lodash/pick";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Suspense } from "react";

import { ReposList } from "../components/ReposList";
import { SkeletonReposCard } from "../components/ReposSkeleton";

import { api } from "@/services/api";

const ReposFetch = async () => {
  const messages = await getMessages();
  const { data: repositories } = await api.repos.list();

  return (
    <NextIntlClientProvider messages={pick(messages, "projects")}>
      <ReposList repositories={repositories} />
    </NextIntlClientProvider>
  );
};

export const ReposView = () => {
  const skeletonArray = Array.from({ length: 3 }, (_, index) => index);

  return (
    <ul className="flex w-full flex-col items-center justify-center gap-10">
      <Suspense
        fallback={skeletonArray.map((_, index) => (
          <SkeletonReposCard key={index} />
        ))}
      >
        <ReposFetch />
      </Suspense>
    </ul>
  );
};
