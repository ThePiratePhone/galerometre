# request shema

## pulling from /rest/form
```ts
responseType = Array<{
  "PageId": 
  "name": string;
  "description": string;
  "fields": (
    | {
        "type": "range";
        "label": string;
        "id": string;
        "extrainfo"?: string;
        "help"?: string;
        "range": [number, number];
      }
    | {
        "type": "input";
        "inputType": "text" | "email" | "tel";
        "label": string;
        "id": string;
        "placeholder": string;
        "extrainfo"?: string;
        "help"?: string;
      }
    | {
        "type": "select";
        "label": string;
        "id": string;
        "extrainfo"?: string;
        "help"?: string;
        "options": {
          "label": string;
          "value": string;
        }[];
      }
    | {
        "type": "radio";
        "label": string;
        "id": string;
        "extrainfo"?: string;
        "help"?: string;
        "options": {
          "label": string;
        }[];
      }
  )[];
  "next": ({
    "pageId": number;
  } |
  array<{
    "pageId": number;
    "ifawnserId": number;
    "ifAwnser": number;
    "default"?: boolean;
  }>
  )
}>
```
## response on /rest/awnser/{*pageId*}/{*anwserId*}

```ts
const body = {
    "userid": string[16],
    "trackid": strig[4|8] | null,
    "questionId": number /* is id of field */,
    "awnser": number /* is id of awnser */,
    "language": 'fr' | 'en'
}
```

### conditional page exemple:
```json
{
    "next": 8
}
```
or:
```json
{
    "next":
    [
      {
        "pageId": 8,
        "ifawnserId": 2,
        "ifAwnser": 1,
      },
      {
        "pageId": 8,
        "ifawnserId": 2,
        "ifAwnser": 2,
      },
      // optional part
      {
        "pageId": 8,
        "default": true
      }
    ]
}
```