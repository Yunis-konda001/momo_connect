# MoMo Connect

MoMo Connect is a web application designed to process and manage MTN Mobile Money (MoMo) SMS data. It provides a streamlined interface for handling MoMo transactions and generating insights from SMS notifications.

## Features

- Process MTN MoMo SMS data
- Store transaction information in a structured database
- RESTful API for data access and management
- Interactive transaction visualization dashboard
- Detailed transaction history and filtering
- Real-time transaction updates

## Demo

Watch our demonstration video to see MoMo Connect in action:
[Demo Video](https://drive.google.com/file/d/1zvACUWeQeSJE_rck4YVSy5erVKhPtrsm/view?usp=sharing)

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- XML2JS for SMS parsing

### Frontend
- Vanilla JavaScript
- HTML5/CSS3
- Chart.js for visualizations
- Lucide Icons

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Yunis-konda001/momo_connect.git]
   cd momo-connect
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=4000
   DB_HOST=localhost
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=momo_connect
   ```

4. Set up the frontend:
   ```bash
   cd ../frontend
   # No installation needed - static files
   ```

## Running the Application

### Backend Development Mode
```bash
# From the backend directory
npm run dev
```

### Backend Production Mode
```bash
# From the backend directory
npm start
```

### Frontend
Open the `frontend/index.html` file in your web browser, or serve it using a static file server:
```bash
# Using Python's built-in server (from frontend directory)
python3 -m http.server 3000
```

## API Endpoints

### Base URL
Development: `http://localhost:4000`
Production: `https://momo-connect-api.onrender.com`

### Available Endpoints

#### Transaction Types
- `GET /airtime` - Airtime transactions
- `GET /bank-deposit` - Bank deposit transactions
- `GET /bundles-and-packs` - Bundles and packs transactions
- `GET /cash-power` - Cash power transactions
- `GET /incoming-money` - Incoming money transactions
- `GET /payment-to-code-holders` - Payment to code holders transactions
- `GET /transfer-to-mobile-number` - Transfer to mobile number transactions
- `GET /withdrawal-from-agent` - Withdrawal from agent transactions

#### Transaction Statistics
- `GET /{transaction-type}/total` - Get total amount and count for specific transaction type

## Development

### Running Tests
```bash
# From the backend directory
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository.