export type Testimonial = {
  name: string;
  role: string;
  company: string;
  img: {
    src: string;
    alt: string;
  };
  relationship: string;
  content: string;
  className?: string;
};
