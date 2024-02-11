export const generateSKU = () => {
    // You can customize this function based on your requirements
    const alphanumericChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const skuLength = 10;
  
    let sku = '';
    for (let i = 0; i < skuLength; i++) {
      const randomIndex = Math.floor(Math.random() * alphanumericChars.length);
      sku += alphanumericChars[randomIndex];
    }
  
    return sku;
};