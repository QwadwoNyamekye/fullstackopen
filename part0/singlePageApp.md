```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser makes request for Javascript Document

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>browser: the Javascript file
    deactivate server

    Note right of browser: The browser starts executing the Javascript code that fetches the HTML, CSS and JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: HTML Document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: [{"content": "Hello from Kunilingusik","date": "2024-11-14T00:54:36.346Z"},...]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```
