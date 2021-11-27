# Vue Beam

![Build](https://github.com/crishellco/vue-beam/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/crishellco/vue-beam/branch/master/graph/badge.svg?token=M7N86U5GF7)](https://codecov.io/gh/crishellco/vue-beam)
[![Maintainability](https://api.codeclimate.com/v1/badges/b3806bbadbec2ed40c08/maintainability)](https://codeclimate.com/github/crishellco/vue-beam/maintainability)

A global event bus for Vue.

- [Install](#install)
  - [Package](#package)
  - [Vue Plugin](#vue-plugin)
  - [Nuxt Module](#nuxt-module)
- [API `$vm.$beam`](#api-vmbeam)
  - [Methods](#methods)
- [Development](#development)
  - [Build Dist](#build-dist)
  - [Test](#test)
- [How to Contribute](#how-to-contribute)
  - [Pull Requests](#pull-requests)
- [License](#license)

## Install

### Package

```bash
yarn add @crishellco/vue-beam
# or
npm i @crishellco/vue-beam
```

### Vue Plugin

```javascript
import Vue from 'vue';
import VueBeam from '@crishellco/vue-beam';

Vue.use(VueBeam);
// or with options
Vue.use(VueBeam, { prefix: 'beam' });
```

### Nuxt Module

Installs all components globally.

```javascript
// nuxt.config.js
{
  modules: [['@crishellco/vue-beam/nuxt', { prefix: 'beam' }]];
}
```

#### Options

| Name      | Description                                         | Default     |
|-----------|-----------------------------------------------------|-------------|
| `adapter` | The emitter library to use (`mitt`, `tiny-emitter`) | `mitt`      |
| `prefix`  | The prefix added to all event names                 | `undefined` |

## API `$vm.$beam`

### Methods

#### $vm.$beam.emit

Emits an event.

`$vm.$beam.emit(event: string, payload?: {})`

#### $vm.$beam.on

Subscribes to an event.

`$vm.$beam.on(event: string, handler: function)`

#### $vm.$beam.once

Subscribes to an event once.

`$vm.$beam.once(event: string, handler: function)`

#### $vm.$beam.off

Unsubscribes to an event.

`$vm.$beam.off(event: string, handler: function)`

## Development

### Build Dist

```bash
yarn build
```

### Test

```bash
yarn test
```

## How to Contribute

### Pull Requests

1. Fork the repository
2. Create a new branch for each feature or improvement
3. Send a pull request from each feature branch to the **develop** branch

## License

[MIT](http://opensource.org/licenses/MIT)
