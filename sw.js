self.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'LOW_STOCK') {
        const options = {
            body: event.data.body,
            icon: event.data.imgUrl || 'images/image_3.png',
            vibrate: [200, 100, 200],
            badge: 'images/image_3.png',
            data: { url: self.registration.scope }
        };
        event.waitUntil(self.registration.showNotification('🚨 Sanjeewa Stock Alert', options));
    }
});