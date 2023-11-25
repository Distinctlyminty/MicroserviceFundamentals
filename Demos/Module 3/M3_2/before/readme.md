# Module 3 - Demo 2

## Creating a simple Node application

The purpose of this exercise it to test that your environment is correctly set up.

1. Open the M3_2 before folder in Visual Studio Code.  Alternatively create a folder on your machine and open that.

2. Open the terminal from within Visual Studio Code and enter the following command:
    ```shell
    npm init

3. Fill in the details for the creation wizard:
For package name, enter hellonode or a name of your choosing.
For entry point, enter app.js
For all other options just press enter to use the default value.

4. In the root of the folder create a new file called app.js
5. Add the following code:

    ```shell 
    const http = require('http');

    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello Node\n');
    });

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

6. Go back to the terminal and enter the following command:
    ```shell
    node app.js

7. Open a browser and navigate to http://localhost:3000

You should see the text Hello Node displayed in the browser.


