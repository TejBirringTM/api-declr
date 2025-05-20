/**
 * Extracts parameters in a path template string literal, representing them as a union.
 * E.g. `ExtractPathParamKeys<'/projects/:project/documents/:document'> = 'project' | 'document'`
 */
type ExtractPathParamsFromTemplate<T extends string> =
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    T extends `${infer Start}:${infer Param}/${infer Rest}`
        ? Param extends `${infer ParamName}/${infer _}`
            ? ParamName | ExtractPathParamsFromTemplate<Rest>
            : Param | ExtractPathParamsFromTemplate<Rest>
        : //eslint-disable-next-line @typescript-eslint/no-unused-vars
          T extends `${infer Start}:${infer Param}`
          ? Param
          : never;

/**
 * Convert a path template string literal into a key-value map of path parameters.
 *
 * E.g.
 * ```
 * ExtractPathParamKeys<'/projects/:project/documents/:document'> = {
 *     project: string,
 *     document: string
 * }
 * ```
 */
export type PathParamsFromTemplate<Path extends string, Val = string> = {
    [Key in ExtractPathParamsFromTemplate<Path>]: Val;
};

/**
 * Represents information required to parse real path according to a path template string.
 */
type PathSegment = {
    segmentValue: string;
    segmentIndex: number;
    isParam: boolean;
};

/**
 * Represents information required to parse real path according to a path template string.
 */
type PathSegments = PathSegment[];

/**
 * Parse a path template string literal.
 * The returned value is a prerequisite to parsing a real path.
 *
 * @param pathTemplate - a string literal representing the path template.
 * @returns an array of PathSegment objects representing each segment in the path template.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function parsePathTemplate<Path extends string>(
    pathTemplate: Path
): PathSegments {
    const parameters = pathTemplate
        .split("/")
        .filter((val) => val.length > 0)
        .map(
            (str, idx) =>
                ({
                    segmentValue: str,
                    segmentIndex: idx,
                    isParam: str.startsWith(":"),
                }) satisfies PathSegment
        );
    return parameters;
}

/**
 * Parse a real path (i.e. a request's path) using a path template.
 *
 * @param pathTemplate - a string literal representing the path template.
 * @param realPath — a string representing the path of a request.
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export function parseRealPath<Path extends string>(
    pathTemplate: Path,
    realPath: string
) {
    const templateSegments = parsePathTemplate(pathTemplate);
    const realPathSegments = realPath
        .replace("/api", "")
        .split("/")
        .filter((val) => val.length > 0)
        .map(
            (str, idx) =>
                ({
                    segmentValue: str,
                    segmentIndex: idx,
                    isParam: templateSegments[idx].isParam,
                }) satisfies PathSegment
        );
    // Check that the number of segments match
    const resultMatchNumberOfSegments =
        templateSegments.length === realPathSegments.length;
    if (!resultMatchNumberOfSegments) {
        return {};
    }

    // Check that the value of each non-param segment matches the template
    const resultMatchNonParamSegments = realPathSegments
        .filter((seg) => !seg.isParam)
        .every((nonParamSeg) => {
            const correspondingTemplateSegment =
                templateSegments[nonParamSeg.segmentIndex];
            return (
                // corresponding template segment must also be a non-param segment
                !correspondingTemplateSegment.isParam &&
                // segment values must match exactly
                nonParamSeg.segmentValue ===
                    correspondingTemplateSegment.segmentValue
            );
        });
    if (!resultMatchNonParamSegments) {
        return {};
    }

    // Extract parameters from template
    const entries = templateSegments
        .filter((seg) => seg.isParam)
        .map(
            (seg) =>
                [
                    /* key: */ seg.segmentValue,
                    /* value: */ realPathSegments[seg.segmentIndex]
                        .segmentValue,
                ] as [key: string, value: string]
        );

    // Produce and return params object
    const pathParams = Object.fromEntries(entries);
    return pathParams as PathParamsFromTemplate<Path>;
}
