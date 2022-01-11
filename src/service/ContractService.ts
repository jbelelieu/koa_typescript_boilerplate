import * as BlockchainService from './blockchainService';
// import { config } from '../config';

const contractWithSigner = BlockchainService.contractWithSigner;

/**
 * @param recipientAddress 
 * @param tokenUri 
 * @returns 
 */
export async function mintFreeTaco(recipientAddress: string): Promise<any> {
    try {
        console.log(`----> Sending to blockchain (mintFreeTaco):`, recipientAddress);

        return contractWithSigner.freeMintTaco(recipientAddress);
    } catch (e) {
        console.log('Blockchain interaction failed (mintFreeTaco):', e);

        return null;
    }
}

/**
 * @param recipientAddress 
 * @param tokenUri 
 * @returns 
 */
export async function issuePaidToken(recipientAddress: string): Promise<any> {
    try {
        console.log(`----> Sending to blockchain (mintFreeTaco):`, recipientAddress);

        return contractWithSigner.paidMintTaco(recipientAddress);
    } catch (e) {
        console.log('Blockchain interaction failed (mintFreeTaco):', e);

        return null;
    }
}
