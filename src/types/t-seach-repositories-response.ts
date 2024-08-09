export type Node = {
    node: {
        createAt: string;
        description: string;
        forkCount: number;
        languages: {
            edges: Array<{ node: { name: string } }>
        };
        name: string;
        stargazerCount: number;
        updateAt: string;
        url: string;
    }
}

export type TSeachRepositoriesResponse = {
    search: {
        edges: Array<Node>;
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
        };
        repositoryCount: number;
    };
}