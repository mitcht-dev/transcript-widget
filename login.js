// 1. Generate a high-entropy random string (Code Verifier)
function generateCodeVerifier() {
    const array = new Uint32Array(56); // Generates a robust string length (~75 chars)
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

// 2. Helper function to Base64URL encode an ArrayBuffer
function base64UrlEncode(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // Remove padding characters
}

// 3. Compute the SHA-256 hash and encode it (Code Challenge)
async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return base64UrlEncode(hash);
}

async function initiateAuth() {
    // 1. Generate the pair
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    // 2. CRITICAL: Save the verifier to localStorage or sessionStorage.
    // You will need this exact string later to exchange the code for a token.
    sessionStorage.setItem('pkce_verifier', verifier);

    // 3. Build your Genesys Cloud authorization URL
    const clientId = 'YOUR_GENESYS_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
    const genesysEnv = 'mypurecloud.com'; // Dynamic via url params as discussed earlier

    const authUrl = `https://login.${genesysEnv}/oauth/authorize` +
        `?client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&response_type=code` + // Tells Genesys to return an auth code
        `&code_challenge_method=S256` +
        `&code_challenge=${challenge}`;

    // 4. Redirect the iframe to initiate the silent login
    window.location.href = authUrl;
}
