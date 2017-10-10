export const pow2abs = (a, b) =>
    Math.pow(Math.abs(a - b), 2);

export const distance = (touches) => {
    const a = touches[0];
    const b = touches[1];

    if (touches.length === 1) {
        return false;
    }

    return Math.sqrt(
        pow2abs(a.pageX, b.pageX) +
        pow2abs(a.pageY, b.pageY),
        2);
};