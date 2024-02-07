import { useTranslations } from "next-intl";

import { FormEmail } from "./components/FormEmail";

import { Dialog } from "@/components/atoms/Dialog";
import { Icon } from "@/components/atoms/Icon";

export const EmailDialog = () => {
  const t = useTranslations("contact");

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex size-20 items-center justify-center rounded-md border p-4 transition hover:bg-white/[0.3]">
        <Icon icon="Mail" size="lg" />
      </Dialog.Trigger>

      <Dialog.Content className="flex flex-col gap-4 md:gap-8">
        <Dialog.Header>
          <Dialog.Title>{t("title")}</Dialog.Title>
          <Dialog.Description>{t("subtitle")}</Dialog.Description>
        </Dialog.Header>

        <FormEmail className="flex flex-col gap-4" id="email-form" />

        <Dialog.Footer className="gap-2 sm:justify-between">
          <Dialog.Close className="rounded-md border border-plum-800 px-4 py-2 transition hover:bg-plum-500 hover:text-white">
            {t("buttons.close")}
          </Dialog.Close>

          <button
            type="submit"
            form="email-form"
            className="rounded-md border border-plum-800 bg-plum-500 px-4 py-2 text-white transition hover:bg-plum-800"
          >
            {t("buttons.send")}
          </button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
