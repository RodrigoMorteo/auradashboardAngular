// server.js for AuraDash Mock API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises; // Use promises-based fs for async operations
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- Constants ---
const PROFILES = {
  DEFAULT: 'default',
  SLOW_RESPONSE: 'slow_response',
  ERROR_STATE: 'error_state',
};
const SLOW_RESPONSE_DELAY_MS = 2000; // 2 seconds

// --- State Management ---
// This is the core of the mock server's testability.
// We load different JSON files into memory based on the selected profile.
// CAVEAT: This global state model is NOT suitable for parallel test execution.
// Concurrent requests changing the profile will interfere with each other.
// For true test isolation, consider a session-based state or running separate server instances.

let state = {}; // This will hold our mock data in memory.
let currentStateProfile = PROFILES.DEFAULT;

async function loadState(profileName = PROFILES.DEFAULT) {
  try {
    const dataPath = path.join(__dirname, 'data', `${profileName}.json`);
    // Use async file read to avoid blocking the event loop
    const rawData = await fs.readFile(dataPath, 'utf-8');
    state = JSON.parse(rawData);
    currentStateProfile = profileName;
    console.log(`[State Manager] Switched to profile: ${profileName}`);
    return true;
  } catch (error) {
    // Log the detailed error for debugging, but don't expose it to the client.
    console.error(`[State Manager] Failed to load profile '${profileName}'. Error:`, error);
    return false;
  }
}

// Initial state load
loadState('default');

// Middleware to simulate slow responses
const slowResponseMiddleware = (req, res, next) => {
  if (currentStateProfile === PROFILES.SLOW_RESPONSE) {
    setTimeout(next, SLOW_RESPONSE_DELAY_MS);
  } else {
    next();
  }
};

// Middleware to simulate server errors
const errorStateMiddleware = (req, res, next) => {
    // Exclude the state reset endpoint from returning errors
    if (currentStateProfile === PROFILES.ERROR_STATE && req.path !== '/api/state/reset') {
        res.status(500).json({ error: 'Internal Server Error: The server is in a simulated error state.' });
    } else {
        next();
    }
}

app.use(slowResponseMiddleware);
app.use(errorStateMiddleware);


// --- Utilities ---

function paginate(data, pageQuery, pageSizeQuery) {
    const page = parseInt(pageQuery || '1', 10);
    const pageSize = parseInt(pageSizeQuery || '10', 10);

    if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
        return { error: 'Invalid pagination parameters. Page and pageSize must be positive integers.', data: null };
    }

    const totalItems = data.length;
    const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);
    const hasMore = (page * pageSize) < totalItems;

    return {
        error: null,
        data: {
            items: paginatedData,
            hasMore: hasMore,
            page: page,
            pageSize: pageSize,
            totalItems: totalItems,
        }
    };
}

// --- API Endpoints ---

// The most important endpoint for robust testing.
app.post('/api/state/reset', async (req, res) => {
  const { profile } = req.body;
  const profileToLoad = profile || PROFILES.DEFAULT;
  const success = await loadState(profileToLoad);
  if (success) return res.status(200).json({ message: `State reset successfully to profile: ${profileToLoad}` });
  res.status(404).json({ error: `Failed to load profile: '${profileToLoad}'. The profile does not exist or is invalid.` });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = state.users.find(u => u.email === email && u.password === password);

  if (user) {
    // NOTE: In a real app, never store or compare plaintext passwords.
    res.status(200).json({
      token: state.authToken,
      user: { name: user.name, email: user.email }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// User Profile Widget
app.get('/api/user/profile', (req, res) => {
  res.json(state['user-profile']);
});


app.get('/api/widgets/sales-records', (req, res) => {
    const sales = state.salesRecords || [];
    const { error, data } = paginate(sales, req.query.page, req.query.pageSize);

    if (error) {
        return res.status(400).json({ error });
    }
    // Align with design doc schema: { data: [], hasMore: boolean }
    res.status(200).json({
        data: data.items,
        hasMore: data.hasMore
    });
});

app.get('/api/widgets/kpi-trends', (req, res) => {
  res.status(200).json(state.kpiTrends || {});
});

app.get('/api/widgets/activity-feed', (req, res) => {
    const feed = state.activityFeed || [];
    // Allow overriding default page size
    const { error, data } = paginate(feed, req.query.page, req.query.pageSize || '20');

    if (error) {
        return res.status(400).json({ error });
    }
    // Align with design doc schema: { items: [], hasMore: boolean }
    res.status(200).json({
        items: data.items,
        hasMore: data.hasMore
    });
});


// Start Server
app.listen(PORT, () => {
  console.log(`AuraDash Mock API Server listening on port ${PORT}`);
  console.log(`Current data profile: '${currentStateProfile}'`);
});