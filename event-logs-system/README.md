# Event logs for your personal website

Write each event once in `event-logs.html`. The homepage's JavaScript reads that page, sorts events by date, and generates ordinary HTML elements inside your chosen section. No database, framework, or build step is needed.

## Install

1. Copy `event-logs.html` and the two files under `assets/` into the corresponding locations in your existing website repository. Preserve all your other files.
2. Open `index-integration.html` and copy its head links and section into `index.html` as indicated. This is a snippet, not a replacement homepage.
3. If using the earlier template, replace its “Some updates” section. Its `simple.js` can remain (it does nothing without `data-recent-updates`), or remove its script include. Change the navigation's News link to `event-logs.html` if desired; keep your old `news.html` available for existing links.
4. Commit and push through your normal GitHub Pages workflow. These files have not been pushed or published for you.

## Add an event

Edit `event-logs.html`, inside `id="event-log-entries"`, and paste this above the previous event:

```html
<article class="event-log-entry" data-event-id="unique-event-name">
  <time datetime="2026-11-02">Nov 2026</time>
  <p>Your update, with an optional <a href="project/project-phd.html">link</a>.</p>
</article>
```

Use a unique ID and a full `YYYY-MM-DD` date. The visible label can be just month/year. Newest-first source order keeps the full log chronological. Home sorts by the actual date, even if entries were pasted out of order. Same-date entries retain their source order. Invalid dates are omitted from Home.

Only the verified PhD defence event is prefilled; the November date in the example is illustrative. Future-dated entries are displayed too: use the date you intend to publish and do not add private drafts to the public file.

## Choose how many appear on Home

Change `data-limit="5"` in your homepage section. The full Event Logs page always shows all entries.

## How automatic is it?

After you save and publish an edit to `event-logs.html`, visitors see the newest entries on their next homepage load. Generated HTML exists in the visitor's browser; JavaScript does not rewrite the repository's `index.html` file. A build-time generator would be needed if you want the generated entries committed into that file instead.

Use an HTTP preview such as VS Code Live Server or `python3 -m http.server 8000`. Browsers block fetching the event page when you double-click `index.html` with `file://`. If JavaScript or loading fails, the homepage keeps a working link to the full log, which needs no JavaScript.

Links are resolved relative to `event-logs.html`. Basic paragraphs, links, emphasis, bold, and line breaks are supported. Scripts and event-handler attributes are not copied. The CSS is scoped to this module and does not replace your existing `main.css`.
