// 🔄 බැක්ග්‍රවුන්ඩ් එකේ ඇප් එක රන් කරවන සර්විස් වර්කර් එක
self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(self.clients.claim());
});

// කෝඩ් එකෙන් පුෂ් කරන මැසේජ් එකක් ආවොත් බැක්ග්‍රවුන්ඩ් එකේ Notification එකක් පෙන්වීම
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'LOW_STOCK') {
        const options = {
            body: event.data.body,
            icon: 'image_3.png', // උඹේ අලුත් ලෝගෝ එක
            vibrate: [200, 100, 200], // ෆෝන් එක වයිබ්‍රේට් වෙන්න
            badge: 'image_3.png',
            data: { url: self.location.origin }
        };

        event.waitUntil(
            self.registration.showNotification('🚨 Sanjeewa Stock Alert', options)
        );
    }
});