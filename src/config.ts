export const config = {
    /**
     * General App configuration
     */
    APP_API_URL: getEnvVariable('APP_API_URL', 'http://localhost:4000/api/v1'),
    DEFAULT_LOCALE: getEnvVariable('DEFAULT_LOCALE', 'en'),
    JWT_SECRET: getEnvVariable('JWT_SECRET'),
    NODE_ENV: getEnvVariable('NODE_ENV', 'production'),
    PORT: getEnvVariable('PORT', '4000'),

    /**
     * Blockchain-related Configuration
     */
    BLOCKCHAIN_CONTRACT_ADDRESS: getEnvVariable('BLOCKCHAIN_CONTRACT_ADDRESS', ''),
    BLOCKCHAIN_PROVIDER_NETWORK: getEnvVariable('BLOCKCHAIN_PROVIDER_NETWORK', 'kovan'),
    BLOCKCHAIN_WALLET_PRIVATE_KEY: getEnvVariable('BLOCKCHAIN_WALLET_PRIVATE_KEY'),
    INFURA_PROJECT_ID: getEnvVariable('INFURA_PROJECT_ID', null),
    INFURA_PROJECT_SECRET: getEnvVariable('INFURA_PROJECT_SECRET', null),
};

function getEnvVariable(key: string, defaultValue?: string): string {
    return key in process.env ? (process.env[key] || defaultValue) : defaultValue;
}