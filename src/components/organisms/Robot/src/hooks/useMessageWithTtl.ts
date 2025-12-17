import { type ActionDispatch, useCallback, useRef } from "react";

import { type RobotEvent } from "../@types";

type UseMessageWithTtlProps = {
  dispatch: ActionDispatch<[event: RobotEvent]>;
};

export const useMessageWithTtl = ({ dispatch }: UseMessageWithTtlProps) => {
  const ttlTimer = useRef<number | null>(null);

  const setMessageWithTTL = useCallback(
    (msg: string, ttlMs?: number) => {
      dispatch({ type: "SPEAK", message: msg, ttlMs });

      if (ttlTimer.current) window.clearTimeout(ttlTimer.current);

      if (ttlMs && ttlMs > 0) {
        ttlTimer.current = window.setTimeout(
          () => dispatch({ type: "CLEAR_MESSAGE" }),
          ttlMs,
        );
      }
    },
    [dispatch],
  );

  return { setMessageWithTTL };
};
