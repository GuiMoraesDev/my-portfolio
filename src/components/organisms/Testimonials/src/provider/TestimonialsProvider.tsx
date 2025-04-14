"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

type TestimonialsContextType = {
  showMore: boolean;
  handleToggleShowMore: () => void;
};

export const TestimonialsContext = createContext<TestimonialsContextType>({
  showMore: false,
  handleToggleShowMore: () => {},
});

type TestimonialsProviderProps = {
  children: ReactNode;
};

export const TestimonialsProvider = ({
  children,
}: TestimonialsProviderProps) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <TestimonialsContext.Provider value={{ showMore, handleToggleShowMore }}>
      {children}
    </TestimonialsContext.Provider>
  );
};

export const useTestimonials = () => {
  const context = useContext(TestimonialsContext);

  if (!context) {
    throw new Error(
      "useTestimonials must be used within a TestimonialsProvider",
    );
  }

  return context;
};
