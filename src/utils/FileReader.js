// https://developer.mozilla.org/en-US/docs/Web/API/btoa#unicode_strings
function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

export function readFile(file) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();

        reader.onload = (e) => resolve(utf8_to_b64(e.target.result));

        reader.readAsText(file);
    })
}
