import placeholder from '../placeholder.jpg';

export function getStreamImg(path, width) {
    return path
        ? `https://image.tmdb.org/t/p/w${width}${path}`
        : placeholder;
}