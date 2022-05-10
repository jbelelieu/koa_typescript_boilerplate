import * as crypto from 'crypto';
import { config } from '../config/config';

/**
 * Standard envelop passed around the app for encrypted values.
 */
export interface IEncryptedPackage {
    iv: string;
    content: string;
}

/**
 * @param value 
 * @returns 
 */
export function encrypt(value: string): IEncryptedPackage {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        'aes-256-ctr',
        config.APP_SECRET,
        iv
    );

    const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

/**
 * @param hashEnvelop 
 * @returns 
 */
export function decrypt(hashEnvelop: IEncryptedPackage): string {
    const decipher = crypto.createDecipheriv(
        'aes-256-ctr',
        config.APP_SECRET,
        Buffer.from(hashEnvelop.iv, 'hex')
    );

    const decrpyted = Buffer.concat([
        decipher.update(Buffer.from(hashEnvelop.content, 'hex')),
        decipher.final()
    ]);

    return decrpyted.toString();
}


/**
 * @param inputString 
 * @returns 
 */
export function md5(inputString: string): string {
    return crypto.createHash('md5').update(inputString).digest('hex');
}

/**
 * Generates a random string of variable length. Note that each
 * character takes up two bytes here, therefore the output will
 * be 2x the size of the requested string. To accound for this,
 * we use a substring against the actual length of the desired
 * string.
 * 
 * @param length 
 * @returns 
 */
export function randomString(length = 32): string {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
}

/**
 * @param inputString 
 * @returns 
 */
export function sha256(inputString: string): string {
    return crypto.createHash('sha256').update(inputString).digest('hex');
}
