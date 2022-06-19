import { useEffect, useState } from 'react';
import { useDebouncedValue } from 'rooks';

/**
 * Execute a debounced callback on value change
 * @param callback
 * @param initialValue
 */
export function useOnDebouncedValue<T>(
    callback: (debouncedValue: T) => void,
    initialValue: T
): [T, (debouncedValue: T) => void] {
    const [value, setValue] = useState<T>(initialValue);

    const [debouncedValue] = useDebouncedValue(value, 50);

    useEffect(() => {
        if (debouncedValue === null) {
            return;
        }

        callback(debouncedValue);
    }, [debouncedValue]);

    return [value, setValue];
}
