# CLAUDE.md

Layers Pane Plus: a CEP panel for After Effects. React UI in `src/`, ExtendScript host in `public/jsx/scripts.jsx`. Minimum target: After Effects 22.0, CEP 11, Chromium 88.

## Verify

- `npm test` and `npm run build` before committing. There is no linter.
- UI changes also need a check inside After Effects: `npm run deploy`, then restart After Effects.
- Test checkboxes with a real mouse click. Clicks sent through the remote debugger (CDP) reach react-aria as virtual clicks: buttons and tabs respond, checkboxes do not.

## Rules

- `public/jsx/` is ExtendScript (ES3): no `let`/`const`, arrow functions, template literals, `JSON` or ES5 array methods. TypeScript does not check it.
- Host functions are plain globals called by name. Do not introduce a namespace.
- Every `evalScript` call blocks After Effects' main thread. Batch reads into one call, and loop over the selection rather than every layer in the comp.
- Prefer the native scripting API over `app.executeCommand(id)`. The remaining commands open native dialogs on purpose. Never use `app.findMenuCommandId()`.
- Do not remove the classic-script build (`format: 'iife'`, `modulePreload: false`, `cepClassicScriptTags`, `target: 'chrome88'`) or `installPointerEventFallback()` in `main.tsx`. Without them the panel opens blank, or ignores every click, on After Effects 2022 for macOS.
- `build.target` only lowers syntax: do not use DOM or JS APIs newer than Chromium 88, or scripting APIs newer than After Effects 22.0.
- CEP rejects `navigator.clipboard.writeText`; fall back to `document.execCommand('copy')`.
- The extension ID `com.donyaep.LayersPanePlus` must match everywhere it appears (manifest, `.debug`, scripts, `vite.config.ts`).
- UI uses `react-aria-components` and CSS Modules. No Tailwind. Fonts and icons are bundled; the panel makes no network requests.

## Workflow

- User-visible changes go in both `CHANGELOG.md` and `CHANGELOG_ES.md`, in the same commit. Keep `README.md` and `README_ES.md` in sync.
- Commit messages in English, imperative mood.
- The version lives only in `package.json`.
- Release: `npm run package` and `npm run sign` (reads the certificate password from the file in `LPP_CERT_PASSWORD_FILE`), then attach the zip and the `.zxp` to a GitHub release tagged `vX.Y.Z`.
