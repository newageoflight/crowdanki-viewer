import { DeckInterface, FlatDeckInterface } from '../interfaces/DeckInterface';

interface IntermediateDeckInterface extends DeckInterface {
    parent: string | null;
}

export function flattenDecks(decks: DeckInterface[]): FlatDeckInterface[] {
    let flatDecks = new Array<FlatDeckInterface>();
    let deckStack = decks.map(deck => ({...deck, parent: null})) as IntermediateDeckInterface[];
    while (deckStack.length > 0) {
        let currentDeck = deckStack.pop();
        let currentChildren = currentDeck!.children;
        if (currentChildren.length > 0) {
            deckStack = deckStack.concat(currentChildren.map(child => ({...child,
                name: `${currentDeck!.name}::${child.name}`,
                parent: currentDeck!.crowdanki_uuid
            })) as IntermediateDeckInterface[]);
        }
        flatDecks.push({...currentDeck, children: currentDeck!.children.map(child => child.crowdanki_uuid)} as FlatDeckInterface)
    }
    return flatDecks;
}
