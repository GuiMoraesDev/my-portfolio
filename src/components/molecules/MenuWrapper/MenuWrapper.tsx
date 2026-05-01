"use client";

import { useRef, useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "@/components/atoms/Icon";
import { useHandleClickOutside } from "@/hooks/useDetectClickOutside";

type MenuWrapperProps = {
  children: ReactNode;
};

export const MenuWrapper = ({ children }: MenuWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useHandleClickOutside({
    ref: wrapperRef,
    callback: () => setIsOpen(false),
  });

  const handleToggleMenu = () => setIsOpen((s) => !s);

  return (
    <>
      <div className="relative flex items-center lg:hidden" ref={wrapperRef}>
        <button
          onClick={handleToggleMenu}
          type="button"
          className="z-20 rounded-sm text-text-secondary transition hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-300"
          title="menu"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-links"
        >
          {isOpen ? (
            <Icon name="Cross" size="md" />
          ) : (
            <Icon name="HamburgerMenu" size="md" />
          )}
        </button>

        <section
          data-is-open={isOpen}
          className={twMerge(
            "invisible absolute bottom-1/2 left-0 flex h-0 flex-col gap-6 transition-[height,pb,pt]",
            "data-[is-open=true]:visible data-[is-open=true]:top-0 data-[is-open=true]:bottom-auto data-[is-open=true]:z-10 data-[is-open=true]:h-auto data-[is-open=true]:min-w-52 data-[is-open=true]:pt-16 data-[is-open=true]:pb-3",
            "before:absolute before:top-0 before:left-0 before:h-[calc(100%+2.5rem)] before:w-[calc(100%+2.5rem)] before:origin-top-left before:translate-x-1 before:translate-y-1 before:scale-0 before:rounded-xl before:border-2 before:border-white before:bg-plum-900 before:p-5 before:transition before:content-['']",
            "data-[is-open=true]:before:-translate-x-5 data-[is-open=true]:before:-translate-y-5 data-[is-open=true]:before:scale-100 data-[is-open=true]:before:rounded-md",
          )}
        >
          {children}
        </section>
      </div>

      <nav className="relative hidden w-full items-center justify-between lg:flex">
        {children}
      </nav>
    </>
  );
};
