// ==UserScript==
// @name         YouTube Shorts Remover
// @version      0.5
// @description  Removes YouTube Shorts from the homepage & the sidebar
// @author       k1nsej
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeShorts() {
        const shortsEntries = document.querySelectorAll('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');
        shortsEntries.forEach(entry => {
            entry.remove();
        });
    }

    function removeRichSectionRenderers() {
        const richSectionRenderers = document.querySelectorAll('ytd-rich-section-renderer');
        richSectionRenderers.forEach(element => {
            element.remove();
        });
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                removeShorts();
                removeRichSectionRenderers();
            }
        });
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);

    removeShorts();
    removeRichSectionRenderers();
})();
