import * as fs from 'fs';
import { config } from '../config/config';

/**
 * 
 * @param key 
 * @param language 
 * @returns 
 */
export function translate(key: string, language: string = config.DEFAULT_LOCALE): string {
    let languageFile;

    const pathToLocales = `${process.cwd()}/src/config/locales`;

    try {
        languageFile = JSON.parse(fs.readFileSync(`${pathToLocales}/${language}.json`, 'utf8'));
    } catch (e) {
        languageFile = JSON.parse(fs.readFileSync(`${pathToLocales}/${config.DEFAULT_LOCALE}.json`, 'utf8'));
    }

    return (key in languageFile) ? languageFile[key] : "Language key not found.";
}
