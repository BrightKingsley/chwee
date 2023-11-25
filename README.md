# Chwee ([Visit](https://chwee.vercel.app)) - Technical Documentation

## Overview

Chwee is a cutting-edge web application/Progressive Web App (PWA) designed to provide users with a secure and anonymous platform for real-time communication, fund transactions, and engaging activities such as game events, raffle draws, and giveaways. The app is built on Next.js 13, utilizing Tailwind CSS for styling and incorporating various technologies such as MongoDB, Next-auth, Pusher Channels, Pusher Beams, Paystack, and UploadThing for a comprehensive and dynamic user experience.

## Features and Functionality

### Real-time Communication
Chwee enables users to send messages, photos, and voice notes in real-time. The app leverages Pusher Channels to facilitate seamless and instantaneous communication within both one-on-one and group chat settings.

### Secure Fund Transactions
Users can send and receive funds anonymously, request funds, and have them deposited into an in-app wallet. Chwee integrates Paystack for secure and efficient payment processing, allowing users to fund their wallets using debit/credit cards or bank accounts.

### Exciting Events
Chwee introduces a unique dimension of fun with game events, raffle draws, and giveaways. Users can purchase event cards, create event rooms, and stand a chance to win exciting prizes, all credited directly to their wallets.

### Data Purchase and Airtel Subscriptions
Chwee offers the convenience of purchasing data within the app, eliminating the need to switch platforms. Airtel subscriptions are seamlessly integrated, ensuring users stay connected effortlessly.

### Media Upload and Storage
UploadThing, a lightweight library, handles the storage and retrieval of various media files, including images, video, and audio. This functionality enhances the overall user experience by providing a centralized and efficient media management system, akin to Amazon S3.

## Technical Implementation

### Next.js 13
Chwee is built on Next.js 13, taking advantage of its updated features and improved performance. The app is structured following the Next.js app directory conventions, enhancing maintainability and scalability.

### Tailwind CSS
Tailwind CSS is employed for styling, offering a utility-first approach that streamlines the development process. The modular and responsive design ensures a consistent and visually appealing user interface.

### MongoDB and Mongoose ODM/Typegoose
The backend relies on MongoDB as the database, with Mongoose ODM and Typegoose providing an elegant and schema-based solution for interacting with the database. This combination ensures efficient data storage and retrieval.

### Next-auth with Google OAuth Provider
Authentication is seamlessly managed using Next-auth with the Google OAuth provider. This not only enhances security but also provides a straightforward and user-friendly authentication process.

### Pusher Channels
Real-time communication is achieved through Pusher Channels, enabling instant messaging and updates in both individual and group chat scenarios. This enhances user engagement and contributes to a dynamic user experience.

### Pusher Beams
Pusher Beams is integrated for push notifications, ensuring users stay informed about new messages, transactions, and other relevant activities even when the app is not actively open.

### Paystack
Paystack is utilized for payment integration, allowing users to fund their wallets securely through various payment methods, including debit/credit cards and bank accounts.

### UploadThing
UploadThing simplifies the process of media upload and storage, providing Chwee with a robust solution for managing images, videos, audio, and other file types. This enhances the multimedia capabilities of the app.

## Build Process

Chwee's build process involves the following steps:

1. **Installation:**
   - Clone the repository.
   - Run `npm install` to install project dependencies.

2. **Configuration:**
   - Set up environment variables for sensitive information such as API keys, database connection strings, and authentication details.

3. **Database Initialization:**
   - Ensure MongoDB is installed and running.
   - Run necessary scripts or commands to initialize the database schema and populate initial data.

4. **Start the Application:**
   - Run `npm run dev` to start the development server.

5. **Access the Application:**
   - Open the app in your preferred browser, typically at `http://localhost:3000`.

## Project Status

Chwee is currently in active development, with ongoing efforts to enhance existing features and introduce new functionalities. As a result, users can expect continuous improvements and updates to provide an increasingly robust and engaging user experience.

Feel free to explore, contribute, and stay tuned for exciting updates!

*Note: Some features and functionalities may still be a work in progress, and user feedback is highly valued during this developmental phase.*

