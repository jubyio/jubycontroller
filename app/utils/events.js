export const getTouches = (event) => event.nativeEvent.touches;

export const getScale = (event, styles, diffDistance) => {
    const { transform = [] } = styles;

    const currentScale = transform
        .map((style) => style.scale)
        .reduce((a, b) => b || a, 1);

    const newScale = currentScale - (diffDistance / 400);

    return newScale;
};

export const isMultiTouch = (event) => {
    const currentTouches = getTouches(event);

    return currentTouches.length > 1;
};