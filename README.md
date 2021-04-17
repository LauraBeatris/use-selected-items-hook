<p align="center">
   <img src="https://raw.githubusercontent.com/LauraBeatris/use-selected-items-hook/master/.github/docs/logo.png" width="400"/>
</p>

[![Author](https://img.shields.io/badge/author-LauraBeatris-283366?style=flat-square)](https://github.com/LauraBeatris)
[![Languages](https://img.shields.io/github/languages/count/LauraBeatris/use-selected-items-hook?color=%23283366&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/LauraBeatris/use-selected-items-hook?color=283366&style=flat-square)](https://github.com/LauraBeatris/use-selected-items-hook/stargazers)
[![Forks](https://img.shields.io/github/forks/LauraBeatris/use-selected-items-hook?color=%23283366&style=flat-square)](https://github.com/LauraBeatris/use-selected-items-hook/network/members)
[![Contributors](https://img.shields.io/github/contributors/LauraBeatris/use-selected-items-hook?color=283366&style=flat-square)](https://github.com/LauraBeatris/use-selected-items-hook/graphs/contributors)
[![NPM](https://img.shields.io/npm/v/use-selected-items-hook?color=283366&style=flat-square)](https://www.npmjs.com/package/use-selected-items-hook)

---
<p align="center">
   <img src="https://github.com/LauraBeatris/use-selected-items-hook/blob/master/.github/docs/example.gif" width="500"/>
</p>

<p align="center">
   <a href="https://use-selected-items-hook.vercel.app/">Check out the example</a>
</p>

---

# :pushpin: Table of Contents

* [Installation](#construction_worker-installation)
* [Usage](#pushpin-usage)
* [API](#computer-api)
* [Builds](#hammer-builds)
* [FAQ](#postbox-faq)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :construction_worker: Installation

### With Yarn

```bash
yarn add use-selected-items-hook
```

### With NPM
```bash
npm install use-selected-items-hook
```

# :pushpin: [Go to example](./example/pages/index.tsx) 

# :computer: API

## Initialization
To initialize the `items` array, the `initialItems` must be passed as an argument. It's also possible to initialize the items already with an `isSelected` state, but to do so, it's necessary to provide the `initialSelectedItems` argument.

---

## Return Values

- ``selectedItems``: The items that are currently selected.
- ``listItems``: The items with the status of ``isSelected``. Refer to the [Usage](#pushpin-usage).

---

## Actions

- ``toggleSingleItem``

- ``toggleAllItems``

# :hammer: Builds
- `es` (EcmaScript module)
- `cjs` (CommonJS)

# :postbox: Faq

**Question:** What are the technologies used in this project?

**Answer:** The technologies and libraries used in this project are [React](https://en.reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) and [Immutability Helper](https://github.com/kolodny/immutability-helper) to
handle the array manipulation.

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [useSelectItems hook](https://github.com/LauraBeatris/use-selected-items-hook/issues) repository. If you already found a solution to your problem, **I would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/LauraBeatris/use-selected-items-hook/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/LauraBeatris/use-selected-items-hook/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020

This project is under the [MIT license](https://github.com/LauraBeatris/use-selected-items-hook/master/LICENSE).

Made with love by [Laura Beatris](https://github.com/LauraBeatris) 💜🚀
