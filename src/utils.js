export const isJson = (str) => {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}
