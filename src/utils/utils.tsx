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

export function zip(arr1: Array<any>, arr2: Array<any>) {
    return Array.from(Array(Math.max(arr2.length, arr1.length)), (_, i) => [arr1[i], arr2[i]])
}

// thanks: https://gist.github.com/goldhand/70de06a3bdbdb51565878ad1ee37e92b
export function parseHTMLStyles(styles: string) {
    return styles.split(";")
        .filter(style => style.split(":")[0] && style.split(":")[1])
        .map(style => [
            style.split(":")[0].trim().replace(/^-ms-/, 'ms-').replace(/-./g, c => c.substr(1).toUpperCase()),
            style.split(":").slice(1).join(":").trim()
        ])
        .reduce((styleObj, style) => ({
            ...styleObj,
            [style[0]]: style[1],
        }), {});
}

/*

for the moment I can't figure out how to get the images to display correctly out of the box
so use this in the chrome console:

$$("img").forEach((i) => {
    let sourceURL = new URL(i.src);
    sourceURL.pathname = "/Anki_for_GSSE/media/" + sourceURL.pathname;
    i.src = sourceURL;
})

*/