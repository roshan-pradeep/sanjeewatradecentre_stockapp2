// Service Worker එකේ පණිවිඩය ලැබෙන තැන
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'LOW_STOCK') {
        const options = {
            body: event.data.body,
            icon: event.data.imgUrl || 'images/image_3.png', // මෙතනට database එකෙන් එන පින්තූරේ ලින්ක් එක දෙන්න පුළුවන්
            vibrate: [200, 100, 200],
            badge: 'images/image_3.png',
            data: { url: self.location.origin }
        };

        event.waitUntil(
            self.registration.showNotification('🚨 Sanjeewa Stock Alert', options)
        );
    }
});