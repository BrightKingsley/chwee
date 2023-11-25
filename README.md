# Welcome to Chwee: Where Connections and Transactions Stay Anonymous, Exciting, and Convenient

At Chwee, we're all about empowering you to connect, share, transact, and enjoy an unmatched level of convenience. Our innovative web application/PWA (Progressive Web App) is designed to make your online interactions seamless and thrilling, offering a range of features that set us apart from the rest.

## What is Chwee?
Chwee is your gateway to a world of anonymous connection and secure transactions. It's the go-to platform where you can:

1. **Connect Anonymously:** Send messages, photos, and voice notes to your heart's content, in real-time, while keeping your identity a well-guarded secret. Whether it's one-on-one conversations or group chats, Chwee ensures that your privacy is paramount.

2. **Transact Seamlessly:** Send and receive funds with ease and total anonymity. You can also request funds that will be deposited directly into your in-app wallet, without ever revealing your identity.

3. **Fund Your Wallet:** Top up your wallet conveniently with debit/credit cards or bank accounts, making transactions hassle-free.

4. **Withdraw to Your Bank Account:** Enjoy a seamless withdrawal process, transferring funds directly to your bank account.

5. **Game Events and Giveaways:** Get ready for fun and excitement! Create and participate in game events, raffle draws, and giveaways. Purchase event cards and host event rooms for a chance to win big. The best part? Prizes are credited directly to your wallet, keeping the thrill alive.

6. **Data Purchase:** Stay connected effortlessly by purchasing data right within the Chwee app. No need to leave your conversations to stay online.

7. **Airtel Subscriptions:** Experience convenience like never before with Airtel subscriptions available on Chwee. Stay connected with your favorite mobile services hassle-free.

## What Makes Chwee Special?
- **Unmatched Anonymity:** Your identity is secure. Your conversations and transactions are your business alone.
- **Exciting Events:** We make sure your Chwee experience is never dull. Join thrilling game events and giveaways.
- **Ease of Use:** Our user-friendly interface ensures that anyone can navigate Chwee effortlessly.
- **Privacy and Security:** Your data and transactions are shielded by the latest security measures.

## Join the Chwee Community
Discover a new world of anonymity, excitement, and convenience. Join Chwee today and connect, transact, and engage like never before. Your privacy, your thrill, and your world, all in one place.

**Ready to embark on your Chwee journey? Get started now!**



# Chwee - Technical Documentation

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

