// pick.test.js - run with `node --test` (Node >= 18, no dependencies).
const test = require("node:test");
const assert = require("node:assert/strict");
const { pick } = require("./pick.js");

const P = (name, weight) => ({ name, weight });
const names = (r) => r.chosen.map((p) => p.name);

test("everyone fits: everyone goes", () => {
  const r = pick([P("a", 10), P("b", 20)], 100);
  assert.deepEqual(names(r), ["a", "b"]);
  assert.equal(r.total, 30);
});

test("best subset beats the greedy heaviest-first pick", () => {
  // greedy takes 70 and stops there; 50 + 45 = 95 is the real answer
  const r = pick([P("a", 70), P("b", 50), P("c", 45)], 100);
  assert.deepEqual(names(r), ["b", "c"]);
  assert.equal(r.total, 95);
});

test("never exceeds the cap", () => {
  const r = pick([P("a", 60), P("b", 50)], 100);
  assert.deepEqual(names(r), ["a"]);
  assert.equal(r.total, 60);
});

test("works in 0.1 kg steps", () => {
  const r = pick([P("a", 0.3), P("b", 0.2)], 0.4);
  assert.deepEqual(names(r), ["a"]);
  assert.equal(r.total, 0.3);
});

test("nobody fits, empty pool, negative cap", () => {
  assert.deepEqual(pick([P("a", 20)], 10), { chosen: [], total: 0 });
  assert.deepEqual(pick([], 800), { chosen: [], total: 0 });
  assert.deepEqual(pick([P("a", 20)], -5), { chosen: [], total: 0 });
});

test("20 players: reported total matches the chosen weights", () => {
  const team = Array.from({ length: 20 }, (_, k) => P("p" + k, 60 + ((k * 7) % 21)));
  const r = pick(team, 800);
  const sum = r.chosen.reduce((acc, p) => acc + p.weight, 0);
  assert.equal(r.total, sum);
  assert.ok(r.total <= 800);
});

test("refuses more than 31 candidates", () => {
  assert.throws(() => pick(Array.from({ length: 32 }, (_, k) => P("p" + k, 1)), 800));
});
