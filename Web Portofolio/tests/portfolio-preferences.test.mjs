import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const source = readFileSync(new URL("../lib/portfolio-preferences.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { readPreferences, savePreference, themeBootstrap } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);

test("blocked storage access leaves usable default preferences", () => {
  assert.deepEqual(readPreferences(() => { throw new Error("SecurityError"); }), {
    language: "en", theme: "dark",
  });
});

test("stored selections restore; unsupported values fall back", () => {
  assert.deepEqual(readPreferences(() => ({ getItem: (key) => key === "portfolio-language" ? "id" : "light" })), {
    language: "id", theme: "light",
  });
  assert.deepEqual(readPreferences(() => ({ getItem: () => "unsupported" })), {
    language: "en", theme: "dark",
  });
});

test("storage write failures do not interrupt preference changes", () => {
  assert.doesNotThrow(() => savePreference(() => ({ setItem: () => { throw new Error("QuotaExceededError"); } }), "theme", "light"));
  assert.doesNotThrow(() => savePreference(() => { throw new Error("SecurityError"); }, "language", "id"));
});

test("theme bootstrap applies a saved theme before hydration", () => {
  const context = {
    localStorage: { getItem: () => "light" },
    document: { documentElement: { dataset: { theme: "dark" } } },
  };
  runInNewContext(themeBootstrap, context);
  assert.equal(context.document.documentElement.dataset.theme, "light");
});

test("theme bootstrap survives unavailable storage without breaking the document", () => {
  const context = { document: { documentElement: { dataset: { theme: "dark" } } } };
  Object.defineProperty(context, "localStorage", { get() { throw new Error("SecurityError"); } });
  assert.doesNotThrow(() => runInNewContext(themeBootstrap, context));
  assert.equal(context.document.documentElement.dataset.theme, "dark");
});
