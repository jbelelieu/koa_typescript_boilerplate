export const config = {
    isLocal: (): boolean => { return config.NODE_ENV === 'local'; },
    isDev: (): boolean => { return config.NODE_ENV === 'dev'; },
    isStaging: (): boolean => { return config.NODE_ENV === 'staging'; },
    isProduction: (): boolean => { return config.NODE_ENV === 'production'; },

    APP_JWT_SECRET: getEnvVariable('APP_SECRET', 'YOU_REALLY_NEED_TO_CHANGE_THIS_AND_YOUR_.ENV_FILE!'),
    APP_SECRET: getEnvVariable('APP_SECRET', 'YOU_REALLY_NEED_TO_CHANGE_THIS_AND_YOUR_.ENV_FILE!'),
    DEFAULT_LOCALE: getEnvVariable('DEFAULT_LOCALE', 'en'),
    NODE_ENV: getEnvVariable('NODE_ENV', 'local'),
    PORT: getEnvVariable('PORT', '4000'),
};

/**
 * @param key 
 * @param defaultValue 
 * @returns 
 */
function getEnvVariable(key: string, defaultValue?: string): string {
    return key in process.env ? (process.env[key] || defaultValue) : defaultValue;
}
