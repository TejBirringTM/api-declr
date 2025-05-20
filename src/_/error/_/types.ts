import type { HttpErrorStatus } from "../../response/http-status";

type _ErrorName = `ApiRequestError:${string}`;

export type _ErrorsMap = {
    [K in _ErrorName]: {
        status: HttpErrorStatus;
    };
};

export type _ErrorNamesFromMap<T> = T extends _ErrorsMap ? keyof T : never;
