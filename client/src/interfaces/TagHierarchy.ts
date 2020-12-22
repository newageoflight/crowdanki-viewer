export interface TagHierarchy {
    name: string,
    parent: string | null
}

export interface HierarchicalTags {
    name: string,
    children: HierarchicalTags[]
}