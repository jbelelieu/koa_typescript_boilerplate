
/**
 * @param array 
 * @returns 
 */
export function sortNestedObjects(inputArray: any[]) {
    return inputArray.map((item) => {
        return sortObjectByKey(item);
    });
}

/**
 * Sort an object's key alphabetically.
 * This is used for song hash verification
 * 
 * @param unorderedObject 
 * @param permittedKeys  Empty array means all keys are valid.
 * @returns 
 */
export function sortObjectByKey(
    unorderedObject: any,
    permittedKeys: string[] = []
): any {
    return Object.keys(unorderedObject).sort().reduce(
        (obj, key) => {
            // Remove keys that aren't directly related to the hash itself.
            if (permittedKeys.length > 0 && !permittedKeys.includes(key)) { return obj; }

            obj[key] = unorderedObject[key];

            return obj;
        },
        {}
    );
}
