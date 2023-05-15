import Commerce from '@chec/commerce.js';

const publicKey = import.meta.env.VITE_COMMERCE_PUBLIC_KEY;
export const commerce = new Commerce(publicKey);
