import { Validator } from 'node-input-validator';

/**
 * @param ctx 
 * @param rules 
 * @returns 
 */
export async function validateInput(inputData: any, rules: any): Promise<any> {
    const validator = new Validator(inputData, rules);

    const check = validator.check();
    if (!check) {
        return validator.errors;
    }

    return null;
}
