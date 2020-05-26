function assign() {
    const targetObject = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        Object.keys(arguments[i]).forEach(elem => {
            targetObject[elem] = arguments[i][elem];
        });
    }
    return targetObject;
}
