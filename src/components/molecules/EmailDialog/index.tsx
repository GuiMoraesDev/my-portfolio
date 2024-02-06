import { useTranslations } from "next-intl";

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
          <Dialog.Title className="text-xl font-bold lg:text-2xl">
            {t("title")}
          </Dialog.Title>
          <Dialog.Description>{t("subtitle")}</Dialog.Description>
        </Dialog.Header>

        <Dialog.Footer>
          <Dialog.Close>{t("buttons.close")}</Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
