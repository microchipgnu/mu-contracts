/**
 * Mixins are special classes that contain a combination of
 * methods that can be used by other classes. Mixins promote code
 * reusability and help you avoid limitations associated with multiple inheritance.
 */

import * as Mixer from "ts-mixer";

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

const Mixin = Mixer.Mixin;

export { Mixer, applyMixins, Mixin };
