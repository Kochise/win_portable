import type { CodeKeywordDefinition, ErrorObject, AnySchema } from "../../types";
export declare type OneOfError = ErrorObject<"oneOf", {
    passingSchemas: [number, number];
}, AnySchema[]>;
declare const def: CodeKeywordDefinition;
export default def;
