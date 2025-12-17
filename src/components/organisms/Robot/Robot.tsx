"use client";

import * as React from "react";

import { RobotAssistant, type RobotAssistantHandle } from "./RobotAssistant";

export function Robot() {
  const botRef = React.useRef<RobotAssistantHandle>(null);

  return (
    <RobotAssistant
      ref={botRef}
      autopilot
      introScript={[
        { kind: "mood", mood: "greet", forMs: 600 },
        { kind: "say", text: "Hey! I'm your helper bot.", forMs: 1600 },
        { kind: "mood", mood: "idle" },
      ]}
      onClick={() =>
        botRef.current?.act([{ kind: "say", text: "Boop! 😊", forMs: 900 }])
      }
    />
  );
}
