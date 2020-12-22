import { atom } from 'recoil';
import { HierarchicalTags } from '../interfaces/TagHierarchy';

export const tagsState = atom({
    key: "Tags",
    default: new Array<HierarchicalTags>()
})