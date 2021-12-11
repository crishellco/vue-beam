![Build](https://github.com/crishellco/vue-beam/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/crishellco/vue-beam/branch/master/graph/badge.svg?token=M7N86U5GF7)](https://codecov.io/gh/crishellco/vue-beam)
[![Maintainability](https://api.codeclimate.com/v1/badges/b3806bbadbec2ed40c08/maintainability)](https://codeclimate.com/github/crishellco/vue-beam/maintainability)

# Vue Beam

An event bus for Vue.

- [Getting Started](#getting-started)
  - [Install Package](#install-package)
  - [Add The Plugin To Your App](#add-the-plugin-to-your-app)
  - [Alternatively, Include As a Nuxt Module](#alternatively-include-as-a-nuxt-module)
- [Usage](#usage)
  - [In Vue Component](#in-vue-component)
  - [Outside Of A Vue Component](#outside-of-a-vue-component)
- [API](#api)
  - [Methods](#methods)
    - [$vm.$beam.emit](#vmbeamemit)
    - [$vm.$beam.debouncedEmit](#vmbeamdebouncedemit)
    - [$vm.$beam.on](#vmbeamon)
    - [$vm.$beam.once](#vmbeamonce)
    - [$vm.$beam.off](#vmbeamoff)
    - [$vm.$beam.removeAllListeners](#vmbeamremovealllisteners)
  - [Properties](#properties)
    - [$vm.$beam.listeners](#vmbeamlisteners)
- [Development](#development)
  - [Build Dist](#build-dist)
  - [Test](#test)
- [How to Contribute](#how-to-contribute)
  - [Pull Requests](#pull-requests)
- [License](#license)

## Getting Started

### Install Package

```bash
yarn add @crishellco/vue-beam
# or
npm i @crishellco/vue-beam
```

### Add The Plugin To Your App

```javascript
import Vue from 'vue';
import VueBeam from '@crishellco/vue-beam';


Vue.use(VueBeam);
```

### Alternatively, Include As a Nuxt Module

```javascript
// nuxt.config.js
{
  modules: ['@crishellco/vue-beam/nuxt'];
}
```

## Usage

### In Vue Component
```vue
<template>
  <button @click="$beam.emit('submitted')">Submit</button>
</template>

// In a different component...
<script>
export default {
  mounted() {
    this.$beam.on('submitted', handleSubmit);
  },

  beforeDestroy() {
    this.$beam.off('submitted', handleSubmit);
  }
};
</script>
```

### Outside Of A Vue Component
```javascript
import { beam } from '@crishellco/vue-beam';

const bus = beam();

bus.emit('submitted');
```

## API

### Methods

#### $vm.$beam.emit

Emits an event.

```vue 
$vm.$beam.emit(type: string, payload?: {})
```

#### $vm.$beam.debouncedEmit

Returns a debounced emit function. Useful when it is undesirable to emit the same event many times in a short period of time.

```vue 
$vm.$beam.debouncedEmit(delay: number, type: string): (payload) => {}
```

#### $vm.$beam.on

Subscribes to an event.

```vue 
$vm.$beam.on(type: string, listener: function)
```

Subscribes to all events.

```vue 
$vm.$beam.on('*', listener: function)
```

#### $vm.$beam.once

Subscribes to an event once.

```vue 
$vm.$beam.once(type: string, listener: function)
```

#### $vm.$beam.off

Unsubscribes to an event.

```vue 
$vm.$beam.off(type: string, listener: function)
```

#### $vm.$beam.removeAllListeners

Removes all listeners on a given bus.

```vue 
$vm.$beam.removeAllListeners()
```

### Properties

#### $vm.$beam.listeners

Returns all registered listeners, grouped by event type.

```vue 
$vm.$beam.listeners
```

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
  