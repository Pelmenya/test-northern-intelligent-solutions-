export type TSeachRepositoriesDTO = {
    name: string;
    first: number | null;
    before?: string | null;
    after?: string | null;
}