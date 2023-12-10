# Creating a New Node.js App with Express.js

This guide will walk you through the steps to create a basic Node.js application using the Express.js framework.

## Step 1: Setting Up a New Node.js Project

1. **Create a New Directory**: Create a new directory for your project and navigate into it:

    ```bash
    mkdir myexpressapp
    cd myexpressapp
    ```

2. **Initialize Node.js**: Initialize a new Node.js application:

    ```bash
    npm init -y
    ```

    This command creates a `package.json` file with default values.

## Step 2: Installing Express.js

- **Install Express**: Run the following command to install Express.js:

    ```bash
    npm install express
    ```

## Step 3: Creating Your Main App File

1. **Create a New File**: Create a file named `app.js` (or `index.js`, if you prefer).

2. **Add Basic Express Setup**: Edit `app.js` to set up a basic Express server:

    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello Express.js!');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    ```

## Step 4: Running Your Application

- **Start the Server**: Run your Express app:

    ```bash
    node app.js
    ```

    Visit `http://localhost:3000` in your browser to see the message "Hello Express.js!".

