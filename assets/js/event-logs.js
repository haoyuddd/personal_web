/* Event source: event-logs.html. No framework, CMS, or build step required. */
(function() {
    'use strict';
    const container = document.querySelector('[data-event-logs]');
    if (!container) return;
    const source = new URL(container.dataset.source || 'event-logs.html', document.baseURI);
    const requestedLimit = Number(container.dataset.limit || 5);
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0 ? requestedLimit : 5;
    const allowed = new Set(['P', 'A', 'EM', 'STRONG', 'B', 'I', 'BR', 'CODE', 'SPAN']);

    // Copy a small set of formatting elements; resolve links relative to the source page.
    function copyContent(parent, destination, sourceURL) {
        for (const node of parent.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                destination.append(document.createTextNode(node.textContent));
            } else if (node.nodeType === Node.ELEMENT_NODE && allowed.has(node.tagName)) {
                const clone = document.createElement(node.tagName.toLowerCase());
                if (node.tagName === 'A') {
                    const raw = node.getAttribute('href');
                    if (raw) {
                        const url = new URL(raw, sourceURL);
                        if (['http:', 'https:', 'mailto:'].includes(url.protocol)) clone.href = url.href;
                    }
                }
                copyContent(node, clone, sourceURL);
                destination.append(clone);
            }
        }
    }

    async function loadEvents() {
        try {
            const response = await fetch(source.href);
            if (!response.ok) throw new Error('Event log request failed');
            const parsed = new DOMParser().parseFromString(await response.text(), 'text/html');
            const entries = [...parsed.querySelectorAll('#event-log-entries > .event-log-entry')]
                .map((entry, order) => {
                    const time = entry.querySelector('time[datetime]');
                    const date = time ? .getAttribute('datetime');
                    const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(date || '') ? Date.parse(date + 'T00:00:00Z') : NaN;
                    const validDate = Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === date;
                    return { entry, time, date, timestamp, order, validDate };
                })
                .filter(item => item.validDate)
                .sort((a, b) => b.timestamp - a.timestamp || a.order - b.order)
                .slice(0, limit);
            if (!entries.length) {
                throw new Error(
                    'No valid events found. Check #event-log-entries, ' +
                    '.event-log-entry, and time[datetime] in ' + source.href
                );
            }; // Keep the accessible link if empty or invalid.
            const fragment = document.createDocumentFragment();
            for (const item of entries) {
                const article = document.createElement('article');
                article.className = 'event-log-entry';
                const time = document.createElement('time');
                time.dateTime = item.date;
                time.textContent = item.time.textContent;
                const content = document.createElement('div');
                for (const paragraph of[...item.entry.children].filter(child => child.tagName === 'P')) {
                    const p = document.createElement('p');
                    copyContent(paragraph, p, response.url || source.href);
                    content.append(p);
                }
                article.append(time, content);
                fragment.append(article);
            }
            container.replaceChildren(fragment);
            container.dataset.loaded = 'true';
        } catch (error) {
            console.error('Could not load event logs:', source.href, error);

            const message = document.createElement('p');
            message.textContent =
                'Event logs could not load. Open the full event log below.';
            container.replaceChildren(message);
        }
    }
    loadEvents();
})();