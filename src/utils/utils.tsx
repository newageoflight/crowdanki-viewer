// you'll notice that I'm mostly just trying to replicate functions in Python that Javascript lacks

export function range(start: number, stop?: number, step?: number): Array<number> {
    if (typeof stop == "undefined") {
        stop = start;
        start = 0;
    }

    if (typeof step == "undefined") {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    let result = Array<number>();
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

export function uniq<T>(arr: Array<T>) {
    return arr.filter((elem, pos, array) => {
        return array.indexOf(elem) === pos;
    })
}

export function zip<T>(arr1: Array<T>, arr2: Array<T>) {
    return Array.from(Array(Math.max(arr2.length, arr1.length)), (_, i) => [arr1[i], arr2[i]])
}