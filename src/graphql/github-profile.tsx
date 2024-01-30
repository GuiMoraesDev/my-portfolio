import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

type GithubRequestProps = {
  user: {
    pinnedItems: {
      nodes: Array<{
        id: string;
        homepageUrl?: string;
        url: string;
        name: string;
      }>;
    };
  };
};

const headers = {
  Authorization: `bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}`,
};

const query = gql`
  {
    user(login: "GuiMoraesDev") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            url
            description
            homepageUrl
          }
        }
      }
    }
  }
`;

const fetchRepos = async () => {
  const response = await request<GithubRequestProps>(
    "https://api.github.com/graphql",
    query,
    undefined,
    headers
  );

  return response.user.pinnedItems.nodes.map((node) => ({
    id: node.id,
    project_link: node.homepageUrl,
    github_link: node.url,
    title: node.name,
  }));
};

export const useGitHubPinnedRepositories = () => {
  return useQuery({
    queryKey: ["github-pinned-repos"],
    queryFn: fetchRepos,
  });
};
