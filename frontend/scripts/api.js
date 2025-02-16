import { API_CONFIG } from './config.js';

export async function fetchFromAPI(endpoint) {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${endpoint}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }
}

export async function fetchTransactionVolume() {
    try {
        const transactionTypes = [
            { type: 'Airtime', endpoint: 'airtime' },
            { type: 'Bank Deposit', endpoint: 'bank-deposit' },
            { type: 'Bundles and Packs', endpoint: 'bundles-and-packs' },
            { type: 'Cash Power', endpoint: 'cash-power' },
            { type: 'Incoming Money', endpoint: 'incoming-money' },
            { type: 'Payment to Code Holders', endpoint: 'payment-to-code-holders' },
            { type: 'Transfer to Mobile Number', endpoint: 'transfer-to-mobile-number' },
            { type: 'Withdrawal from Agent', endpoint: 'withdrawal-from-agent' }
        ];

        const promises = transactionTypes.map(async ({ type, endpoint }) => {
            const response = await fetch(`${API_CONFIG.baseUrl}/${endpoint}/total`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type} data`);
            }
            const data = await response.json();
            return {
                type,
                count: data.data?.totalTransactions || 0,
                totalAmount: parseFloat(data.data?.totalAmount || 0)
            };
        });

        return await Promise.all(promises);
    } catch (error) {
        console.error('Error fetching transaction volume:', error);
        throw error;
    }
}