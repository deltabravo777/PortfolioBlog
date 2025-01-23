export function deepClone(obj: any): any {
    const seen = new WeakMap(); // To handle circular references

    function clone(item: any): any {
        // Handle primitive types, null, and undefined
        if (item === null || typeof item !== 'object') return item;

        // Handle circular references
        if (seen.has(item)) return seen.get(item);

        // Handle arrays
        if (Array.isArray(item)) {
            const copy = [];
            seen.set(item, copy);
            item.forEach((_, index) => {
                copy[index] = clone(item[index]);
            });
            return copy;
        }

        // Handle React state or plain objects
        if (Object.prototype.toString.call(item) === '[object Object]') {
            const copy = Object.create(Object.getPrototypeOf(item)); // Preserve the prototype
            seen.set(item, copy);
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    copy[key] = clone(item[key]);
                }
            }
            return copy;
        }

        // Handle Map, Set, Date, and other built-in types
        if (item instanceof Map) {
            const copy = new Map();
            seen.set(item, copy);
            item.forEach((value, key) => {
                copy.set(key, clone(value));
            });
            return copy;
        }

        if (item instanceof Set) {
            const copy = new Set();
            seen.set(item, copy);
            item.forEach(value => {
                copy.add(clone(value));
            });
            return copy;
        }

        if (item instanceof Date) {
            return new Date(item);
        }

        // Return non-cloneable types as is
        return item;
    }

    return clone(obj);
}


//export function deepClone(obj: any): any {
//    if (obj === null || typeof obj !== 'object') return obj;

//    if (Array.isArray(obj)) {
//        return obj.map(deepClone);
//    }

//    if (typeof obj === 'function') {
//        return obj; // Return the function reference as is
//    }

//    const copy = {};
//    for (const key in obj) {
//        if (obj.hasOwnProperty(key)) {
//            copy[key] = deepClone(obj[key]);
//        }
//    }
//    return copy;
//}