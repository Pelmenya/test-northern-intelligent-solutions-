export type TName = {
    name: string
}

export type TTotalCount = {
    totalCount: number;
}

export type TRepoNode = {
    databaseId: number;
    id: string;
    name: string;
    description: string;
    forkCount: number;
    issues: TTotalCount;
    labels: {
        nodes: Array<{ node: TName }>
    };
    languages: {
        nodes: Array<{ node: TName }>
    };
    licenseInfo: TName;
    nameWithOwner: string;
    primaryLanguage: TName;
    pullRequests: TTotalCount;
    watchers: TTotalCount;
    stargazers: TTotalCount;
    url: string;
    createdAt: string;
    updatedAt: string;
    disckUsage: number;

}

export type TRepo = {
    node: TRepoNode;
}

export type TRepoPageInfo = {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
}

export type TSeachRepositoriesResponse = {
    search: {
        edges: Array<TRepo>;
        pageInfo: TRepoPageInfo;
        repositoryCount: number;
    };
}