import assert from "node:assert/strict";
import test from "node:test";

import { getEscapedButtonPosition, getEscapingButtonStyle } from "./no-button-motion";

test("keeps the escaped button position inside the viewport", () => {
  const position = getEscapedButtonPosition({
    currentPosition: { x: 20, y: 20 },
    pointerPosition: { x: 25, y: 25 },
    viewport: { width: 320, height: 240 },
    button: { width: 90, height: 44 },
    margin: 16
  });

  assert.ok(position.x >= 16);
  assert.ok(position.y >= 16);
  assert.ok(position.x <= 214);
  assert.ok(position.y <= 180);
});

test("moves the button center farther from the pointer", () => {
  const currentPosition = { x: 200, y: 150 };
  const pointerPosition = { x: 210, y: 160 };
  const button = { width: 100, height: 48 };

  const nextPosition = getEscapedButtonPosition({
    currentPosition,
    pointerPosition,
    viewport: { width: 900, height: 700 },
    button
  });

  const beforeDistance = Math.hypot(
    currentPosition.x + button.width / 2 - pointerPosition.x,
    currentPosition.y + button.height / 2 - pointerPosition.y
  );
  const afterDistance = Math.hypot(
    nextPosition.x + button.width / 2 - pointerPosition.x,
    nextPosition.y + button.height / 2 - pointerPosition.y
  );

  assert.ok(afterDistance > beforeDistance);
});

test("escapes even when the pointer reaches the exact button center", () => {
  const currentPosition = { x: 200, y: 150 };
  const button = { width: 100, height: 48 };
  const pointerPosition = {
    x: currentPosition.x + button.width / 2,
    y: currentPosition.y + button.height / 2
  };

  const nextPosition = getEscapedButtonPosition({
    currentPosition,
    pointerPosition,
    viewport: { width: 900, height: 700 },
    button
  });

  assert.notDeepEqual(nextPosition, currentPosition);
});

test("moves only ten pixels away from the pointer when the pointer gets close", () => {
  const nextPosition = getEscapedButtonPosition({
    currentPosition: { x: 300, y: 180 },
    pointerPosition: { x: 250, y: 204 },
    viewport: { width: 900, height: 700 },
    button: { width: 100, height: 48 },
    proximityRadius: 170,
    stepDistance: 10
  });

  assert.deepEqual(nextPosition, { x: 310, y: 180 });
});

test("teleports to the farthest point when the ten pixel step would hit the edge", () => {
  const nextPosition = getEscapedButtonPosition({
    currentPosition: { x: 782, y: 180 },
    pointerPosition: { x: 740, y: 204 },
    viewport: { width: 900, height: 700 },
    button: { width: 100, height: 48 },
    margin: 18,
    proximityRadius: 170,
    stepDistance: 10
  });

  assert.deepEqual(nextPosition, { x: 18, y: 634 });
});

test("keeps the escaping button at a stable measured size", () => {
  const style = getEscapingButtonStyle({
    position: { x: 42, y: 88 },
    button: { width: 260, height: 62 }
  });

  assert.deepEqual(style, {
    left: 42,
    top: 88,
    width: 260,
    height: 62
  });
});
