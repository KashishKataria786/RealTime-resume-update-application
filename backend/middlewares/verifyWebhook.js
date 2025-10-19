import crypto from "crypto";

export const verifySignature = (req, res, next) => {
  const receivedSignature = req.headers["x-webhook-signature"];
  const secret = process.env.WEBHOOK_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "Server misconfiguration: WEBHOOK_SECRET not set" });
  }

  if (!receivedSignature) {
    return res.status(401).json({ message: "Missing webhook signature header" });
  }

  // Use the raw stringified body for HMAC calculation. If you use a body parser
  // that modifies whitespace or ordering, compute using the raw body (see notes below).
  const rawPayload = JSON.stringify(req.body);

  // Compute expected digest and accept either with or without the 'sha256=' prefix
  const digest = crypto.createHmac("sha256", secret).update(rawPayload).digest("hex");
  const expectedWithPrefix = `sha256=${digest}`;

  const receivedNormalized = receivedSignature.startsWith("sha256=")
    ? receivedSignature
    : `sha256=${receivedSignature}`;

  if (receivedNormalized !== expectedWithPrefix) {
    return res.status(401).json({ message: "Invalid webhook signature" });
  }

  // Attach both the parsed payload (object) and raw string payload for the receiver
  req.user = {
    payload: req.body,
    rawPayload,
  };

  next();
};
