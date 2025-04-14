type TechStack = {
  name: string;
  color: string;
  link: string;
};

export type Repository = {
  title: string;
  cover: string;
  description_key?: string;
  project_link?: string;
  github_link: string;
  tech_stack: Array<TechStack>;
};
