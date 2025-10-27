# Property-IO: Afrika Property Guardian

A blockchain-based property registry and verification system built on Hedera Hashgraph for the Hedera Africa Hackathon.

## Project Overview

Property-IO is a decentralized application that leverages Hedera Hashgraph to create a secure, transparent, and immutable property registry system for Africa. The platform allows property owners to register their properties, verify ownership, and transfer property rights securely.

## Features

- Secure property registration using Hedera smart contracts
- Immutable property records on the Hedera network
- User-friendly interface for property management
- Verification of property ownership
- Secure property transfers
- Document storage and verification

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Blockchain**: Hedera Hashgraph
- **Smart Contracts**: Solidity
- **Database**: MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Hedera testnet account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/belloibrahv/property-io.git
   cd property-io
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Configure environment variables:
   - Copy `env.example` to `.env`
   - Update the variables with your Hedera account details and MongoDB URI

4. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Hedera Hashgraph
- Hedera Africa Hackathon