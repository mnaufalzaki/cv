import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/portfolio-intro.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { introBootstrap, INTRO_SESSION_KEY } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

function context({ pathname = "/", hash = "", reducedMotion = false, stored = new Map() } = {}) {
  const root = { dataset: {}, removeAttribute: (key) => { delete root.dataset[key.replace(/^data-/, "").replace(/-([a-z])/g, (_, c) => c.toUpperCase())]; } };
  const site = { inert: false };
  const timers = new Map();
  const events = new Map();
  const focused = [];
  let notify;
  let timerId = 0;
  return {
    location: { pathname, hash },
    matchMedia: () => ({ matches: reducedMotion }),
    document: {
      documentElement: root,
      querySelector: (selector) => selector === ".intro-site" ? site : { focus() { focused.push(selector); } },
      addEventListener: (event, callback) => events.set(event, callback),
      removeEventListener: (event) => events.delete(event),
    },
    MutationObserver: class { constructor(callback) { notify = callback; } observe() {} disconnect() {} },
    setTimeout: (callback, delay) => { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
    clearTimeout: (id) => timers.delete(id),
    testState: { site, timers, events, focused, notify: () => notify?.() },
    sessionStorage: { getItem: (key) => stored.get(key), setItem: (key, value) => stored.set(key, value) },
  };
}

test("first Home load gates before paint and marks the tab immediately", () => {
  const stored = new Map();
  const first = context({ stored });
  runInNewContext(introBootstrap, first);
  assert.equal(first.document.documentElement.dataset.intro, "pending");
  assert.equal(stored.get(INTRO_SESSION_KEY), "1");
  const reload = context({ stored });
  runInNewContext(introBootstrap, reload);
  assert.equal(reload.document.documentElement.dataset.intro, undefined);
  const anotherTab = context();
  runInNewContext(introBootstrap, anotherTab);
  assert.equal(anotherTab.document.documentElement.dataset.intro, "pending");
});

test("pre-hydration interaction lock releases after 4.5 seconds", () => {
  const page = context();
  runInNewContext(introBootstrap, page);
  assert.equal(page.testState.site.inert, true);
  const timeout = [...page.testState.timers.values()][0];
  assert.equal(timeout.delay, 4500);
  timeout.callback();
  assert.equal(page.testState.site.inert, false);
  assert.equal(page.document.documentElement.dataset.intro, undefined);
});

test("starting GSAP extends the lock deadline; completion unlocks it", () => {
  const page = context();
  runInNewContext(introBootstrap, page);
  page.document.documentElement.dataset.intro = "running";
  page.testState.notify();
  assert.equal([...page.testState.timers.values()][0].delay, 12000);
  delete page.document.documentElement.dataset.intro;
  page.testState.notify();
  assert.equal(page.testState.site.inert, false);
  assert.equal(page.testState.timers.size, 0);
});

test("Escape, Tab and Shift+Tab open the website and restore focus before hydration", () => {
  for (const keyboard of [{ key: "Escape" }, { key: "Tab" }, { key: "Tab", shiftKey: true }]) {
    const page = context();
    let prevented = false;
    runInNewContext(introBootstrap, page);
    page.testState.events.get("keydown")({ ...keyboard, preventDefault() { prevented = true; }, stopImmediatePropagation() {} });
    assert.equal(page.document.documentElement.dataset.intro, undefined);
    assert.equal(page.testState.site.inert, false);
    assert.equal(prevented, true);
    assert.deepEqual(page.testState.focused, [".skip-link"]);
    assert.equal(page.testState.events.size, 0);
  }
});

test("direct Projects and hash targets bypass without consuming the first Home visit", () => {
  for (const options of [{ pathname: "/projects/" }, { hash: "#nusa-carbon" }]) {
    const stored = new Map();
    const page = context({ ...options, stored });
    runInNewContext(introBootstrap, page);
    assert.equal(page.document.documentElement.dataset.intro, undefined);
    assert.equal(stored.size, 0);
  }
});

test("reduced motion opens the website directly", () => {
  const page = context({ reducedMotion: true });
  runInNewContext(introBootstrap, page);
  assert.equal(page.document.documentElement.dataset.intro, undefined);
});

test("blocked storage getter, read, or write always fails open", () => {
  for (const failure of ["getter", "getItem", "setItem"]) {
    const page = context();
    const blocked = () => { throw new Error("SecurityError"); };
    if (failure === "getter") Object.defineProperty(page, "sessionStorage", { get: blocked });
    else page.sessionStorage[failure] = blocked;
    assert.doesNotThrow(() => runInNewContext(introBootstrap, page));
    assert.equal(page.document.documentElement.dataset.intro, undefined);
  }
});
