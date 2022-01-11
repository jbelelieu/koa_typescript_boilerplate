import * as ethers from 'ethers';
import * as fs from 'fs';
import { config } from '../config';
import { getProvider, getWallet, loadContract } from './../helper/blockchainLoad';

const loadedContract = loadContract();
const provider = getProvider();
const contract = new ethers.Contract(config.BLOCKCHAIN_CONTRACT_ADDRESS, loadedContract.abi, provider);
const wallet = getWallet(provider);
export const contractWithSigner = contract.connect(wallet);

/**
 * Event Listeners
 */

// When a user mints a FREE taco (can't be resold)
contractWithSigner.on("MintFreeTaco", async (ownerAddress: string, tokenId: number, eventReceipt: any) => {
    try {
        console.log('-> Blockchain event received (MintFreeTaco):', ownerAddress, tokenId, eventReceipt.transactionHash);

        // ...
    } catch (e) {
        console.log('==> Error processing blockchain event (MintFreeTaco):', ownerAddress, tokenId, eventReceipt.transactionHash);
    }
});

// When a user mints a PAID taco (can be resold)
contractWithSigner.on("MintPaidTaco", async (ownerAddress: string, tokenId: number, eventReceipt: any) => {
    try {
        console.log('-> Blockchain event received:', ownerAddress, tokenId, eventReceipt.transactionHash);

        // ...
    } catch (e) {
        console.log('==> Error processing blockchain event (MintPaidTaco):', ownerAddress, tokenId, eventReceipt.transactionHash);
    }
});

// When a user takes a taco off the secondary market
contractWithSigner.on("TacoCannotBeSold", async (tokenId: number, eventReceipt: any) => {
    try {
        console.log('-> Blockchain event received (TacoCannotBeSold):', tokenId, eventReceipt.transactionHash);

        // ...
    } catch (e) {
        console.log('==> Error processing blockchain event (TacoCannotBeSold):', tokenId, eventReceipt.transactionHash);
    }
});

// When another user buys a taco on the secondary market
contractWithSigner.on("TacoResold", async (previousOwner: string, newOwner: string, tokenId: number, salePrice: BigInt, eventReceipt: any) => {
    try {
        console.log('-> Blockchain event received (TacoResold):', previousOwner, newOwner, tokenId, salePrice, eventReceipt.transactionHash);

        // ...
    } catch (e) {
        console.log('==> Error processing blockchain event (TacoResold):', previousOwner, newOwner, tokenId, salePrice, eventReceipt.transactionHash);
    }
});

// When a user puts a taco on the secondary market
contractWithSigner.on("TacoSetToSell", async (tokenId: number, amount: BigInt, eventReceipt: any) => {
    try {
        console.log('-> Blockchain event received (TacoSetToSell):', tokenId, amount, eventReceipt.transactionHash);

        // ...
    } catch (e) {
        console.log('==> Error processing blockchain event (TacoSetToSell):', tokenId, amount, eventReceipt.transactionHash);
    }
});

// When the URI of a taco is updated
contractWithSigner.on("TacoUriUpdated", async (tokenId: number, tokenUri: string, eventReceipt: any) => {
    try {
        console.log('-> Blockchain event received (TacoUriUpdated):', tokenId, tokenUri, eventReceipt.transactionHash);

        // ...
    } catch (e) {
        console.log('==> Error processing blockchain event (TacoUriUpdated):', tokenId, tokenUri, eventReceipt.transactionHash);
    }
});

/**
 * 
 */
export function getProvider(): any {
    try {
        if (config.INFURA_PROJECT_ID) {
            return new ethers.providers.InfuraProvider(config.BLOCKCHAIN_PROVIDER_NETWORK, config.INFURA_PROJECT_ID);
        } else {
            return ethers.getDefaultProvider(config.BLOCKCHAIN_PROVIDER_NETWORK);
        }
    } catch (e) {
        console.log('Failed to grab blockchain provider', e);

        return null;
    }
}

export function getWallet(inputProvider: any): any {
    try {
        return new ethers.Wallet(config.BLOCKCHAIN_WALLET_PRIVATE_KEY, inputProvider);
    } catch (e) {
        console.log('Failed to get blockchain wallet', e);

        return null;
    }
}

export function loadContract(): any {
    try {
        const nodeCommandDirectory = process.cwd();
        const bytecode = fs.readFileSync(`${nodeCommandDirectory}/contracts/v2/TacoHausv2.bin`, 'binary');
        const abi = fs.readFileSync(`${nodeCommandDirectory}/contracts/v2/TacoHausv2.abi`, 'utf8');

        return {
            abi,
            bytecode,
        };
    } catch (e) {
        console.log('Failed to load blockchain contracts', e);

        return null;
    }
}
