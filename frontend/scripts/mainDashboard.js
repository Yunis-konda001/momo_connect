import { fetchTransactionVolume } from './api.js';
import './visualization.js';

class MainDashboard {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'main-dashboard';
        this.transactionTypes = [
            'Airtime',
            'Bank Deposit',
            'Bundles and Packs',
            'Cash Power',
            'Incoming Money',
            'Payment to Code Holders',
            'Transfer to Mobile Number',
            'Withdrawal from Agent'
        ];
        this.setupContainers();
    }

    setupContainers() {
        // Create main content container
        const mainContent = document.createElement('div');
        mainContent.className = 'main-content';

        // Create cards container
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

        // Create transaction cards
        this.transactionTypes.forEach(type => {
            const card = this.createTransactionCard(type);
            cardsContainer.appendChild(card);
        });

        mainContent.appendChild(cardsContainer);

        // Create visualization container
        const visualizationContainer = document.createElement('div');
        visualizationContainer.className = 'visualization-container';

        // Create charts column
        const chartsColumn = document.createElement('div');
        chartsColumn.className = 'charts-column';

        // Create transaction volume chart container
        const volumeChartContainer = document.createElement('div');
        volumeChartContainer.className = 'chart-container';
        const volumeCanvas = document.createElement('canvas');
        volumeCanvas.id = 'transactionVolumeChart';
        volumeChartContainer.appendChild(volumeCanvas);

        // Create monthly trends chart container
        const trendsChartContainer = document.createElement('div');
        trendsChartContainer.className = 'chart-container';
        const trendsCanvas = document.createElement('canvas');
        trendsCanvas.id = 'monthlyTrendsChart';
        trendsChartContainer.appendChild(trendsCanvas);

        chartsColumn.appendChild(volumeChartContainer);
        chartsColumn.appendChild(trendsChartContainer);

        // Create pie chart column
        const pieChartColumn = document.createElement('div');
        pieChartColumn.className = 'pie-chart-column';

        // Create distribution chart container
        const distributionChartContainer = document.createElement('div');
        distributionChartContainer.className = 'chart-container';
        const distributionCanvas = document.createElement('canvas');
        distributionCanvas.id = 'transactionDistributionChart';
        distributionChartContainer.appendChild(distributionCanvas);

        pieChartColumn.appendChild(distributionChartContainer);

        // Add columns to visualization container
        visualizationContainer.appendChild(chartsColumn);
        visualizationContainer.appendChild(pieChartColumn);

        mainContent.appendChild(visualizationContainer);
        this.container.appendChild(mainContent);

        // Fetch and update transaction data
        this.fetchAndUpdateData();
    }

    createTransactionCard(type) {
        const card = document.createElement('div');
        card.className = 'card transaction-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <h3 class="card-title">${type}</h3>
            <div class="card-content">
                <div class="stat-item">
                    <span class="stat-value amount" data-type="${type}" data-stat="amount">-</span>
                </div>
                <div class="stat-item transaction-count">
                    <span class="stat-label count" data-type="${type}" data-stat="count">-</span>
                    <span class="stat-label">transactions</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            const route = type.toLowerCase().replace(/ /g, '-');
            window.location.hash = `/transactions/${route}`;
        });

        return card;
    }

    async fetchAndUpdateData() {
        try {
            const data = await fetchTransactionVolume();
            this.updateCards(data);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    }

    updateCards(data) {
        data.forEach(item => {
            const countElement = document.querySelector(`[data-type="${item.type}"][data-stat="count"]`);
            const amountElement = document.querySelector(`[data-type="${item.type}"][data-stat="amount"]`);

            if (countElement) {
                countElement.textContent = item.count.toLocaleString();
            }
            if (amountElement) {
                amountElement.textContent = item.totalAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'RWF'
                });
            }
        });
    }

    render() {
        return this.container;
    }
}

export default MainDashboard;