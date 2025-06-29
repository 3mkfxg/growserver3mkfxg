"use strict";
// Credits https://github.com/OceanicJS/Oceanic/blob/dev/lib/util/Collection.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
/** A {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map | Map} with some Array-like additions. */
class Collection extends Map {
    /** If this collection is empty. */
    get empty() {
        return this.size === 0;
    }
    every(predicate, thisArg) {
        return this.toArray().every(predicate, thisArg);
    }
    filter(predicate, thisArg) {
        return this.toArray().filter(predicate, thisArg);
    }
    find(predicate, thisArg) {
        return this.toArray().find(predicate, thisArg);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex | Array#findIndex } */
    findIndex(predicate, thisArg) {
        return this.toArray().findIndex(predicate, thisArg);
    }
    first(amount) {
        if (amount === undefined) {
            const iterable = this.values();
            return iterable.next().value;
        }
        if (amount < 0) {
            return this.last(amount * -1);
        }
        amount = Math.min(amount, this.size);
        const iterable = this.values();
        return Array.from({ length: amount }, () => iterable.next().value);
    }
    last(amount) {
        const iterator = Array.from(this.values());
        if (amount === undefined) {
            return iterator.at(-1);
        }
        if (amount < 0) {
            return this.first(amount * -1);
        }
        if (!amount) {
            return [];
        }
        return iterator.slice(-amount);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map | Array#map } */
    map(predicate, thisArg) {
        return this.toArray().map(predicate, thisArg);
    }
    /**
     * Pick a random element from the collection, or undefined if the collection is empty.
     */
    random() {
        if (this.empty) {
            return undefined;
        }
        const iterable = Array.from(this.values());
        return iterable[Math.floor(Math.random() * iterable.length)];
    }
    reduce(predicate, initialValue) {
        return this.toArray().reduce(predicate, initialValue);
    }
    reduceRight(predicate, initialValue) {
        return this.toArray().reduceRight(predicate, initialValue);
    }
    /** See: {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some | Array#some } */
    some(predicate, thisArg) {
        return this.toArray().some(predicate, thisArg);
    }
    /** Get the values of this collection as an array. */
    toArray() {
        return Array.from(this.values());
    }
}
exports.Collection = Collection;
