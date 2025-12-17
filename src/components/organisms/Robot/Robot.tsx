"use client";

import * as React from "react";

import { RobotAssistant, type RobotAssistantHandle } from "./RobotAssistant";

export function Robot() {
  const botRef = React.useRef<RobotAssistantHandle>(null);

  return (
    <div className="flex items-center gap-4">
      <RobotAssistant
        ref={botRef}
        autopilot
        introScript={[
          { kind: "mood", mood: "greet", forMs: 600 },
          { kind: "say", text: "Hey! I’m your helper bot.", forMs: 1600 },
          { kind: "mood", mood: "idle" },
        ]}
        onClick={() =>
          botRef.current?.act([{ kind: "say", text: "Boop! 😊", forMs: 900 }])
        }
      />

      <div className="flex flex-col gap-2">
        <button
          onClick={() =>
            botRef.current?.send({ type: "THINK_START", message: "Searching…" })
          }
        >
          Think
        </button>
        <button
          onClick={() =>
            botRef.current?.send({
              type: "THINK_DONE",
              message: "Found it!",
              ttlMs: 1200,
            })
          }
        >
          Done
        </button>
        <button
          onClick={() =>
            botRef.current?.act([
              { kind: "think", text: "Let me check…", forMs: 1100 },
              { kind: "say", text: "I have an idea!", forMs: 1200 },
              { kind: "mood", mood: "celebrate", forMs: 900 },
              { kind: "mood", mood: "idle" },
            ])
          }
        >
          Act (script)
        </button>
        <button onClick={() => botRef.current?.startAutopilot()}>
          Autopilot ON
        </button>
        <button onClick={() => botRef.current?.stopAutopilot()}>
          Autopilot OFF
        </button>
      </div>
    </div>
  );
}
