interface IDbValidationMessageUtil {
  required(property: string): string;
  string(property: string): string;
  number(property: string): string;
  minimum(property: string, min: number): string;
}


export const DbValidationMessageUtil: IDbValidationMessageUtil = {
    required: (property: string) => `${property} is required`,
    string: (property: string) => `${property} must be a string`,
    number: (property: string) => `${property} must be a number`,
    minimum: ((property: string, min: number) => `${property} must be at least ${min}`)
}