import { twMerge } from "tailwind-merge";

export const MovingSpheres = () => (
  <div>
    <span
      className={twMerge(
        "fixed",
        "left-0 top-[6.7%]",
        "w-[18.9%] h-[27.3%]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,241,218,0.12)_0%,rgba(31,241,218,0)_100%)]"
      )}
    />
    <span
      className={twMerge(
        "fixed",
        "left-[39.4%] top-[9.8%]",
        "w-[18.9%] h-[27.3%]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(164,121,114,0.3)_0%,rgba(164,121,114,0)_100%)]"
      )}
    />
    <span
      className={twMerge(
        "fixed",
        "left-[82.2%] top-0",
        "w-[35.2%] h-[51%]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(66,17,56,0.8)_0%,rgba(66,17,56,0)_100%)]"
      )}
    />
    <span
      className={twMerge(
        "fixed",
        "left-[13.6%] top-[53.2%]",
        "w-[35.2%] h-[51%]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(87,18,63,0.32)_0%,rgba(87,18,63,0)_100%)]"
      )}
    />
    <span
      className={twMerge(
        "fixed",
        "left-[80.4%] top-[39.9%]",
        "w-[28.8%] h-[41.7%]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(164,121,114,0.16)_0%,rgba(164,121,114,0)_100%)]"
      )}
    />
  </div>
);
