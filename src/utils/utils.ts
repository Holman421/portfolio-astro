type Point = {
    x: string;
    y: string;
};

type PointArray<T extends number> = [Point, ...Point[]] & { length: T };

export function createClipPath<T extends number>(
    borderPoints: PointArray<T>,
    insidePoints: PointArray<T>
) {
    const clipPathOutside = `polygon(${borderPoints
        .map((point: Point) => `calc(${point.x}) calc(${point.y})`)
        .join(", ")})`;

    const clipPathInside = `polygon(${borderPoints
        .map(
            (point: Point, index) =>
                `calc(${point.x}${insidePoints[index].x ? ` ${insidePoints[index].x}` : ""
                }) calc(${point.y}${insidePoints[index].y ? ` ${insidePoints[index].y}` : ""
                })`
        )
        .join(", ")})`;

    return { clipPathOutside, clipPathInside };
}

export function isScreenBelow(breakpoint: number): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
}

