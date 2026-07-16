self.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'LOW_STOCK') {
        const options = {
            body: event.data.body || "Stock level is low!",
            icon: event.data.imgUrl || 'images/image_3.png',
            vibrate: [200, 100, 200],
            badge: 'images/image_3.png',
            data: { url: event.data.url || self.registration.scope }
        };
        
        // Show notification directly
        event.waitUntil(
            self.registration.showNotification('🚨 Sanjeewa Stock Alert', options)
        );
    }
});