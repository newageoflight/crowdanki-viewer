export interface NoteInterface {
    __type__: string;
    fields: Array<string>;
    guid: string;
    note_model_uuid: string;
    tags: Array<string>;
}

export const createEmptyNote = (): NoteInterface => ({
    __type__: '',
    fields: Array<string>(),
    guid: '',
    note_model_uuid: '',
    tags: Array<string>()
})

export const createNote = <T extends Partial<NoteInterface>>(initialValues: T): NoteInterface & T => {
    return Object.assign(createEmptyNote(), initialValues)
}