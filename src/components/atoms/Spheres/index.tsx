import { twMerge } from "tailwind-merge";

export const Spheres = () => (
  <>
    <span
      className={twMerge(
        "fixed aspect-square object-cover",
        "animate-[pulse_2s_0.75s_ease-in-out_infinite]",
        "left-0 top-[6.7%]",
        "h-[18.9vw] w-[18.9vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(31,241,218,0.12)_0%,rgba(31,241,218,0)_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover",
        "animate-[pulse_5s_0.75s_ease-in-out_infinite]",
        "left-[39.4%] top-[9.8%]",
        "h-[18.9vw] w-[18.9vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(164,121,114,0.3)_0%,rgba(164,121,114,0)_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover",
        "animate-[pulse_3s_0.5s_ease-in-out_infinite]",
        "left-[82.2%] top-0",
        "h-[35.2vw] w-[35.2vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(66,17,56,0.8)_0%,rgba(66,17,56,0)_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover",
        "animate-[pulse_1s_1.75s_ease-in-out_infinite]",
        "left-[13.6%] top-[53.2%]",
        "h-[35.2vw] w-[35.2vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(87,18,63,0.32)_0%,rgba(87,18,63,0)_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover",
        "animate-[pulse_6s_1.5s_ease-in-out_infinite]",
        "h-[28.8vw] w-[28.8vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(164,121,114,0.16)_0%,rgba(164,121,114,0)_100%)]",
      )}
    />
  </>
);
