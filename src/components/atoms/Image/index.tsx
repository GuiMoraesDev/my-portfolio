"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const Placeholder = () => {
  return (
    <div className="bg-gold-500 flex h-full flex-col items-center justify-center gap-2 object-cover">
      <div
        className="h-4 w-full"
        style={{
          background: `repeating-linear-gradient(
          110deg,
          #0D020D,
          #0D020D 10px,
          #EFEFEF 10px,
          #EFEFEF 20px
        )`,
        }}
      />

      <section className="flex flex-col items-center justify-center gap-2">
        <span className="text-plum-900 font-bold uppercase md:text-2xl lg:text-3xl">
          Coming soon
        </span>
        <span className="text-plum-700 text-sm font-bold md:text-xl lg:text-2xl">
          Under Construction
        </span>
      </section>

      <div
        className="h-4 w-full"
        style={{
          background: `repeating-linear-gradient(
          110deg,
          #0D020D,
          #0D020D 10px,
          #EFEFEF 10px,
          #EFEFEF 20px
        )`,
        }}
      />
    </div>
  );
};

export const ImageComponent = (props: ImageProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <Placeholder />;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} onError={() => setHasError(true)} />;
};
