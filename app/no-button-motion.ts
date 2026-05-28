export type Point = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type EscapeButtonInput = {
  currentPosition: Point;
  pointerPosition: Point;
  viewport: Size;
  button: Size;
  margin?: number;
  proximityRadius?: number;
  stepDistance?: number;
};

export type EscapeButtonStyleInput = {
  position: Point;
  button?: Size;
};

export type EscapeButtonStyle = {
  left: number;
  top: number;
  width?: number;
  height?: number;
};

export type ShrinkingButtonStyleInput = {
  button: Size;
  attempts: number;
  maxAttempts?: number;
};

export type ShrinkingButtonStyle = {
  width: number;
  height: number;
  opacity?: number;
  pointerEvents?: "none";
};

const clamp = (value: number, min: number, max: number) => {
  if (max < min) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
};

const getDistanceFromPointer = (position: Point, pointerPosition: Point, button: Size) =>
  Math.hypot(
    position.x + button.width / 2 - pointerPosition.x,
    position.y + button.height / 2 - pointerPosition.y
  );

export function getEscapedButtonPosition({
  currentPosition,
  pointerPosition,
  viewport,
  button,
  margin = 18,
  proximityRadius = 190,
  stepDistance = 10
}: EscapeButtonInput): Point {
  const buttonCenter = {
    x: currentPosition.x + button.width / 2,
    y: currentPosition.y + button.height / 2
  };

  const awayVector = {
    x: buttonCenter.x - pointerPosition.x,
    y: buttonCenter.y - pointerPosition.y
  };

  const rawMagnitude = Math.hypot(awayVector.x, awayVector.y);
  const magnitude = rawMagnitude || 1;
  const normalized = {
    x: awayVector.x / magnitude,
    y: awayVector.y / magnitude
  };

  const maxX = viewport.width - button.width - margin;
  const maxY = viewport.height - button.height - margin;
  const safeCurrentPosition = {
    x: clamp(currentPosition.x, margin, maxX),
    y: clamp(currentPosition.y, margin, maxY)
  };
  const farthestPositions: Point[] = [
    { x: margin, y: margin },
    { x: maxX, y: margin },
    { x: margin, y: maxY },
    { x: maxX, y: maxY },
    { x: viewport.width / 2 - button.width / 2, y: margin },
    { x: viewport.width / 2 - button.width / 2, y: maxY },
    { x: margin, y: viewport.height / 2 - button.height / 2 },
    { x: maxX, y: viewport.height / 2 - button.height / 2 }
  ].map((position) => ({
    x: clamp(position.x, margin, maxX),
    y: clamp(position.y, margin, maxY)
  }));
  const getFarthestPosition = () =>
    farthestPositions.reduce((bestPosition, candidate) => {
      const bestDistance = getDistanceFromPointer(bestPosition, pointerPosition, button);
      const candidateDistance = getDistanceFromPointer(candidate, pointerPosition, button);

      return candidateDistance > bestDistance ? candidate : bestPosition;
    }, safeCurrentPosition);

  if (rawMagnitude < 1) {
    return getFarthestPosition();
  }

  if (rawMagnitude > proximityRadius) {
    return safeCurrentPosition;
  }

  const nextPosition = {
    x: safeCurrentPosition.x + normalized.x * stepDistance,
    y: safeCurrentPosition.y + normalized.y * stepDistance
  };
  const hitsEdge =
    nextPosition.x <= margin ||
    nextPosition.x >= maxX ||
    nextPosition.y <= margin ||
    nextPosition.y >= maxY;

  return hitsEdge ? getFarthestPosition() : nextPosition;
}

export function getEscapingButtonStyle({
  position,
  button
}: EscapeButtonStyleInput): EscapeButtonStyle {
  return {
    left: position.x,
    top: position.y,
    ...(button
      ? {
          width: button.width,
          height: button.height
        }
      : {})
  };
}

export function getShrinkingButtonStyle({
  button,
  attempts,
  maxAttempts = 4
}: ShrinkingButtonStyleInput): ShrinkingButtonStyle {
  const visibleRatio = clamp((maxAttempts - attempts) / maxAttempts, 0, 1);
  const size = {
    width: button.width * visibleRatio,
    height: button.height * visibleRatio
  };

  return visibleRatio === 0
    ? {
        ...size,
        opacity: 0,
        pointerEvents: "none"
      }
    : size;
}
