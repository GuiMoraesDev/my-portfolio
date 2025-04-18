"use client";

import dynamic from "next/dynamic";

import { SkeletonContactForm } from "./components/organisms/ContactForm";

const FormComponent = dynamic(
  () =>
    import("./components/organisms/ContactForm").then(
      (mod) => mod.ContactFormComponent,
    ),
  {
    loading: () => <SkeletonContactForm />,
  },
);

export const ContactFormComponent = () => <FormComponent />;
