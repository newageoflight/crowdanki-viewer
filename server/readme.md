# CrowdAnki Web server

Notes and decks are stored as 2 separate collections in MongoDB.

Built with Typescript/Node/Express/Socket.io. Importantly, the Socket endpoint doesn't work even though it's been implemented.

## API Endpoints

### Decks

| Method | Route/endpoint                  | Description                                                     |
|--------|---------------------------------|-----------------------------------------------------------------|
| GET    | /api/v1/decks                   | Get all decks                                                   |
| POST   | /api/v1/decks                   | Add new deck into collection (takes JSON; not implemented yet)  |
| DELETE | /api/v1/decks/`:crowdanki_uuid` | Delete deck corresponding to `crowdanki_uuid` from collection (not implemented yet) |

### Tags

| Method | Route/endpoint | Description                         |
|--------|----------------|-------------------------------------|
| GET    | /api/v1/tags   | Get all note tags in the collection |

### Notes

| Method | Route/endpoint                  | Description                                           |
|--------|---------------------------------|-------------------------------------------------------|
| GET    | /api/v1/notes                   | Get all notes in collection                           |
| GET    | /api/v1/notes/deck/`:deck_uuid` | Get notes belonging to a specific deck                |
| GET    | /api/v1/notes/tags              | Get notes with specific tags (accepts a query string) |
| POST   | /api/v1/notes                   | Add a note to the collection                          |
| DELETE | /api/v1/notes/`:guid`           | Delete note with guid from the collection             |
| SOCKET | /api/v1/syncedits               | Socket.io endpoint for synchronising note edits       |
