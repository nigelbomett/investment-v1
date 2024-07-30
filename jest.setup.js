// Mock for window.matchMedia
window.matchMedia = window.matchMedia || function (query) {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: function () { }, // Deprecated
        removeListener: function () { }, // Deprecated
        addEventListener: function () { }, 
        removeEventListener: function () { }, 
        dispatchEvent: function () { },
    };
};
