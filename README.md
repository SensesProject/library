# library

Here lives the climatescenarios.org styleguide & component library.

[→ Visit](https://dev.climatescenarios.org/library) for details

## setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# JSON structures
`modules.json` holds a list of all modules that are visible in the toolkit and portals.

| Key | Type | Description | Toolkit/Portals |
| :--- | :--- | :--- | :--- |
| **title** | String | Title of the module | Both |
| **description** | String | Description of the module | Both |
| **authors** | Array | designers and scientists that authored the module | Both |
| **portal** | String | The portal assigned to the module. Can be "Finance", "Policy" or "null" if the element is not part of portals | Portals |
| **portal-num** | String | Position of the element in the portal based on the topic | Portals |
| **main-topic** | String | Main topic of the module, useful for building the subway line menu in Portal | Portals |
| **path** | String | path of the module | Portals |
| **readingTime** | String | Minutes (approx.) required to read the module | Portals |
| **gem** | String | The module has/has not a GEMs link | Both |
| **scenario-finder** | String | The module has/has not a scenario finder link | Portals |
| **data** | String | The module has/has not additional data that can be downloaded | Portals |
| **downloadIDs** | Array | List of IDs pointing to `downloads.json` | Portals |
| **share** | String | The module has/has not additional material that can be downloaded from the "share" section | Portals |
| **bg** | String | background image for Toolkit | Toolkit |
| **alignRight** | Boolean | position of header in the Toolkit | Portals |
| **keywords** | Array | Additional keywords used for search | Toolkit |
| **tags** | Array | Additional tags for the module (could be »Policy«, »Finance«) | Portals |

`downloads.json` hold a list of all downloadable items. Modules can have multiple download items.
| Key | Type | Description |
| :--- | :--- | :--- |
| **id** | String | Unique id of the download item |
| **label** | String | Label of the download item |
| **link** | String | Path to the item |
| **licence** | String | Description of the licence |
| **reference** | String | Reference line |
| **authors** | Array | Authors of the item |
| **description** | String | Description of the item |
| **previews** | Array | List of paths of preview images |

