import crypto from 'crypto';
export function generateSignature(payload){
    const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
    hmac.update(JSON.stringify(payload));
    return `sha256=${hmac.digest("hex")}`;
}