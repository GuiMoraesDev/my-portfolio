export type Notes = {
  id: string;
  title: string;
  url: string;
  cover: string | null;
};

export const notes: Array<Notes> = [
  {
    id: "1",
    url: "https://dev.to/guimoraes/how-to-have-your-portfolio-up-to-date-with-your-published-articles-am4",
    title: "How to have your portfolio up-to-date with your published articles",
    cover:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F9ezpqfh3xnvam230lz6r.png",
  },
  {
    id: "2",
    url: "https://dev.to/guimoraes/why-defaultvalues-newvalues-can-hide-a-bug-54hc",
    title: "Why { ...defaultValues, ...newValues } can hide a bug",
    cover:
      "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fgcbmabcho02mh48hp8no.png",
  },
];
