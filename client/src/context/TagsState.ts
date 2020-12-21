import { atom } from 'recoil';

export const tagsState = atom({
    key: "Tags",
    default: new Array<string>()
})