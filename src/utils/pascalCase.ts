export function pascalCase(text: string) {
    return text.replace(/(\w)(\w*)/g, function (g0: string, g1: string, g2: string) {
        return g1.toUpperCase() + g2.toLowerCase();
    });
}
