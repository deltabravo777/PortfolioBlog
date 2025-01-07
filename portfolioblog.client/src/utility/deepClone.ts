export function deepClone(obj: any): any {
    if (obj === null || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }

    if (typeof obj === 'function') {
        return obj; // Return the function reference as is
    }

    const copy = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key]);
        }
    }
    return copy;
}