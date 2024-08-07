![Example Image](server/views/exChat.png)

# NexChat

NexChat is an innovative chat application built on the MERN stack, designed to provide seamless real-time communication. Utilizing Socket.IO, NexChat ensures instant message delivery, allowing users to engage in dynamic conversations without delay. The app supports not only text messages but also the sharing of files and images, making it versatile for various communication needs. Additionally, NexChat features the ability to create channels, which can include multiple members, fostering collaborative environments for teams and communities. This robust functionality is all wrapped in a user-friendly interface, making NexChat an ideal solution for modern, real-time communication.

## Table of Contents

- [Overview](#Overview)
- [Features](#features)
- [Dependencies](#dependencies)
- [Git Setup](#Git-Setup)
- [Client Setup](#Client-Setup)
- [Server Setup](#Server-Setup)
- [Usage](#usage)
- [Contributors](#contributors)

## Overview

- NexChat is a cutting-edge chat application built with the MERN stack, featuring real-time messaging powered by Socket.IO. It allows users to send text messages, files, and images instantly. Users can create channels to include multiple members, making it ideal for both team collaboration and community interactions. NexChat offers a user-friendly interface and robust functionality for seamless communication.
- 
## Features

- Live Chat - Chats are send and recieved in real time without delay.
- Channels - Create Groups and send messages to everyone in one click.
- Files and Image - Send heavy Files and Images with no quality loss and download them in realtime.

## Dependencies

- Express
- Mongo
- Github
- Socket.io

## Git-Setup

Clone the repository:

```bash
git clone https://github.com/OmShankarDeshmukh01/NexChat.git
cd NexChat
```
## Client Setup

Redirect to client:

```bash
cd client
```

Install the dependencies:
```bash
npm install
```

Create a .env file:
```bash
VITE_SERVER_URL=""
```

Run client Interface:
```bash
npm run dev
```
## Server Setup

Redirect to server:

```bash
cd server
```

Install the dependencies:
```bash
npm install
```

Create a .env file:
```bash
PORT=
JWT_KEY=""
ORIGIN=""
DATABASE_URL=""
```

4. Run Server:
```bash
npm run dev
```
## Usage

Access the app in your web browser at `http://localhost:5173/`.

## Contributors

- Om Shankar Deshmukh ([LinkedIn](https://www.linkedin.com/in/om-shankar-deshmukh-7431b9245/))


