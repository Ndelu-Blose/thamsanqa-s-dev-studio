const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const PINNED_REPOS_QUERY = `
  query GetPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type PinnedRepositoryNode = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
};

type GraphQlError = { message: string };
type PinnedReposResponse = {
  data?: {
    user: {
      pinnedItems: {
        nodes: (PinnedRepositoryNode | null)[];
      } | null;
    } | null;
  };
  errors?: GraphQlError[];
};

export async function getPinnedRepos(username: string, token: string): Promise<PinnedRepositoryNode[]> {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: PINNED_REPOS_QUERY,
      variables: { username },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = (await res.json()) as PinnedReposResponse;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }

  const nodes = json.data?.user?.pinnedItems?.nodes ?? [];
  return nodes.filter((n): n is PinnedRepositoryNode => n !== null);
}

export async function getPublicUserEvents(username: string, token: string): Promise<unknown[]> {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=30`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub events request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as unknown;
  if (!Array.isArray(data)) {
    throw new Error("GitHub events response was not an array");
  }
  return data;
}
