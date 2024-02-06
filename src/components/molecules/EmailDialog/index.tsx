import { useTranslations } from "next-intl";

import { SendButton } from "./components/SendButton";

import { Dialog } from "@/components/atoms/Dialog";
import { Icon } from "@/components/atoms/Icon";

export const EmailDialog = () => {
  const t = useTranslations("contact");

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex size-20 items-center justify-center rounded-md border p-4 transition hover:bg-white/[0.3]">
        <Icon icon="Mail" size="lg" />
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>{t("title")}</Dialog.Title>
          <Dialog.Description>{t("subtitle")}</Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer className="sm:justify-between">
          <Dialog.Close asChild>
            <button className="rounded-md border border-plum-800 px-4 py-2 transition hover:bg-plum-700 hover:text-white">
              {t("buttons.close")}
            </button>
          </Dialog.Close>

          <SendButton className="rounded-md border border-plum-800 px-4 py-2 transition hover:bg-plum-700 hover:text-white">
            {t("buttons.send")}
          </SendButton>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
