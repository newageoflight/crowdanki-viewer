export interface NoteInterface {
    __type__: "Note";
    fields: Array<string>;
    guid: string;
    note_model_uuid: string;
    tags: Array<string>;
    deck_uuid: string;
}

export const createEmptyNote = (): NoteInterface => ({
    __type__: 'Note',
    fields: Array<string>(),
    guid: '',
    note_model_uuid: '',
    tags: Array<string>(),
    deck_uuid: ""
})

export const createNote = <T extends Partial<NoteInterface>>(initialValues: T): NoteInterface & T => {
    return Object.assign(createEmptyNote(), initialValues)
}