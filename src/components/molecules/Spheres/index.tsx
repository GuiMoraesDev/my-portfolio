import { twMerge } from "tailwind-merge";

export const Spheres = () => (
  <>
    <span
      className={twMerge(
        "fixed aspect-square object-cover opacity-20",
        "animate-[pulse_2s_0.75s_ease-in-out_infinite]",
        "top-[6.7%] left-0",
        "h-[18.9vw] w-[18.9vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(from_var(--color-cyan-400)_r_g_b/0.1)_0%,transparent_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover opacity-20",
        "animate-[pulse_5s_0.75s_ease-in-out_infinite]",
        "top-[9.8%] left-[39.4%]",
        "h-[18.9vw] w-[18.9vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(from_var(--color-rose-400)_r_g_b/0.2)_0%,transparent_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover opacity-20",
        "animate-[pulse_3s_0.5s_ease-in-out_infinite]",
        "top-0 left-[82.2%]",
        "h-[35.2vw] w-[35.2vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(from_var(--color-plum-600)_r_g_b/0.24)_0%,transparent_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover opacity-20",
        "animate-[pulse_1s_1.75s_ease-in-out_infinite]",
        "top-[53.2%] left-[13.6%]",
        "h-[35.2vw] w-[35.2vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(from_var(--color-plum-400)_r_g_b/0.3)_0%,transparent_100%)]",
      )}
    />
    <span
      className={twMerge(
        "fixed aspect-square object-cover opacity-20",
        "animate-[pulse_6s_1.5s_ease-in-out_infinite]",
        "h-[28.8vw] w-[28.8vw]",
        "bg-[radial-gradient(50%_50%_at_50%_50%,rgba(from_var(--color-rose-400)_r_g_b/0.1)_0%,transparent_100%)]",
      )}
    />
  </>
);
