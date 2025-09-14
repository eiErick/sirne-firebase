export class Mapper {
    public static mapMatchingProperties<T extends Record<string, any>, U extends Record<string, any>>(source: T, target: U): U {
        for (const key of Object.keys(source)) {
            const normalizedKey = key.charAt(0).toLowerCase() + key.slice(1);
            if (normalizedKey in target) {
                (target as any)[normalizedKey] = source[key];
            }
        }
        return target;
    }
}
