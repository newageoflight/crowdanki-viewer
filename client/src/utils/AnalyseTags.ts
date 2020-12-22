import { HierarchicalTags, TagHierarchy } from './../interfaces/TagHierarchy';
import { uniq, zip } from './utils';
import { arrayToTree } from 'performant-array-to-tree';

export function analyseAnkiTags(tagList: string[]): HierarchicalTags[] {
    // assuming list is already uniqued.
    // split by delimiter first
    let flatTagTree = new Array<TagHierarchy>();
    let splitTags = tagList.map(s => s.split("::"))
    console.log(splitTags)
    // regularise everything to be the same length first
    for (let tagArray of splitTags) {
        let startingLength = tagArray.length;
        tagArray.length = Math.max(...splitTags.map(a => a.length));
        tagArray.fill("", startingLength)
    }
    // transpose the resulting 2d array
    console.log(splitTags)
    let transposedTags = splitTags[0].map((_, colIndex) => splitTags.map(row => row[colIndex]))
    console.log(transposedTags)
    // start with the top level, just uniq everything here
    let uniqueTopLevelTags = uniq(transposedTags[0]).map(name => ({name, parent: null}))
    flatTagTree = flatTagTree.concat(uniqueTopLevelTags)
    console.log(flatTagTree)
    // for every level thereafter look at who their parents are
    for (let index = 1; index < transposedTags.length; index++) {
        const tagsAtLevel = transposedTags[index];
        const parentTags = transposedTags[index-1];
        let hierarchicalTags = zip(tagsAtLevel, parentTags).map(([name, parent]) => ({name, parent})).filter(({name}) => name !== "")
        flatTagTree = flatTagTree.concat(hierarchicalTags);
    }
    // then build up the tree
    console.log(flatTagTree)
    return arrayToTree(flatTagTree, {id: "name", parentId: "parent", dataField: null}) as HierarchicalTags[];
}