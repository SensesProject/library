# SENSES Library

The foundation of every SENSES module. Also known as living style guide and component library.

[→ Visit senses-library.netlify.app](https://senses-library.netlify.app/) to access usage instructions, style guide, and component library.

## Using the Library

### Installation

In your project directory run:
```
npm i github:SensesProject/library
```
### Use Styles

Import base style – You generally want to do that once at the root of your app
```
@import "library/src/style/base.scss";
```
Import variables and mixins – You generally want to import them wherever you need them, likely in all your components
```
@import "library/src/style/global.scss";
```
If you run into issues with font imports you might need to explicitly set the path to the font files before importing the base style
```
$font-prefix: "../../node_modules/library/src/assets/fonts";
```
### Components

Import Components individually wherever you need them, e.g.
```
import SensesMenu from 'library/src/components/SensesMenu.vue'
```
## License

The source code is licensed under the [ISC license](LICENSE.md). Text and graphics are licensed under [Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/). For licensing information on datasets please refer to the data sources section. Exceptions are listed below on a per-file basis.

- `src/components/helper/TransitionExpand.vue` Source: [maoberlehner](https://github.com/maoberlehner)/[transition-to-height-auto-with-vue](https://github.com/maoberlehner/transition-to-height-auto-with-vue); License: [MIT](https://github.com/maoberlehner/transition-to-height-auto-with-vue#license)

## Development
### Project setup
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
