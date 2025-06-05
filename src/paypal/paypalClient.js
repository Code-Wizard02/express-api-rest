// paypal/paypalClient.js
import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';
dotenv.config();

function environment() {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    if (process.env.PAYPAL_ENV === 'production') {
        return new paypal.core.LiveEnvironment(clientId, clientSecret);
    } else {
        return new paypal.core.SandboxEnvironment(clientId, clientSecret);
    }
}

function client() {
    return new paypal.core.PayPalHttpClient(environment());
}

export { client };
