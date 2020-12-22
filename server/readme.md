# API Endpoints

## Decks

| Method | Route/endpoint | Description   |
|--------|----------------|---------------|
| GET    | /api/v1/decks  | Get all decks |

## Tags

| Method | Route/endpoint | Description                         |
|--------|----------------|-------------------------------------|
| GET    | /api/v1/tags   | Get all note tags in the collection |

## Notes

| Method | Route/endpoint                | Description                                           |
|--------|-------------------------------|-------------------------------------------------------|
| GET    | /api/v1/notes                 | Get all notes in collection                           |
| GET    | /api/v1/notes/deck/:deck_uuid | Get notes belonging to a specific deck                |
| GET    | /api/v1/notes/tags            | Get notes with specific tags (accepts a query string) |
| POST   | /api/v1/notes                 | Add a note to the collection                          |
| DELETE | /api/v1/notes/:guid           | Delete note with guid from the collection             |

## Syncing edits

| Method | Route/endpoint    | Description                                |
|--------|-------------------|--------------------------------------------|
| SOCKET | /api/v1/syncedits | Socket.io endpoint for synchronising edits |