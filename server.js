const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to Auth Demo App</h1>
        <p>
          <a href="/.auth/login/aad">Login with Microsoft</a><br/>
          <a href="/.auth/login/google">Login with Google</a>
        </p>
        <p><a href="/.auth/me">View Auth Info</a></p>
    `);
});

// Auth info route
app.get('/.auth/me', (req, res) => {
    const authHeader = req.headers['x-ms-client-principal'];
    if (!authHeader) return res.send('Not authenticated');
    
    const encoded = Buffer.from(authHeader, 'base64').toString('ascii');
    res.send(`<pre>${encoded}</pre>`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
