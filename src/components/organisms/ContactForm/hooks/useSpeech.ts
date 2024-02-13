"use client";

import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import { SendEmailProps } from "@/schemas/emailSchema";

type UseSpeechProps = {
  locale: string;
  callback: UseFormSetValue<SendEmailProps>;
};

export const useSpeech = ({ locale, callback }: UseSpeechProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognition, setSpeechRecognition] =
    useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isSupported =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSupported) return;

    const SpeechRecognitionApi =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const instance = new SpeechRecognitionApi();

    instance.lang = locale;
    instance.continuous = true;
    instance.interimResults = true;
    instance.maxAlternatives = 1;

    instance.onresult = (event) => {
      const speechToText = Array.from(event.results).reduce(
        (text, result) => text.concat(result[0].transcript),
        "",
      );

      callback("message", speechToText);
    };

    setSpeechRecognition(instance);
  }, [callback, locale]);

  const onStartRecording = () => {
    if (!speechRecognition) return;

    speechRecognition.start();
    setIsRecording(true);
  };

  const onStopRecording = () => {
    if (!speechRecognition) return;

    speechRecognition.stop();
    setIsRecording(false);
  };

  return {
    isRecording,
    isDisabled: !speechRecognition,
    onStartRecording,
    onStopRecording,
  };
};
