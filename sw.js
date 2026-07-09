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

// 1. Duplicate චෙක් කිරීමේ ෆන්ක්ෂන් එක
async function isNameDuplicate(newName, type) {
    let arrayKey = `${type}s`;
    return appData[arrayKey].some(item => item.name.toLowerCase() === newName.toLowerCase());
}

// 2. අලුත් අයිතමයක් එකතු කිරීම
function openAddModal(type) {
    currentModalMode = 'add';
    activeMenuTarget = { type: type, item: null };

    Swal.fire({
        title: `➕ Add New ${type.toUpperCase()}`,
        input: 'text',
        inputPlaceholder: `Enter ${type} name here...`,
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#64748b',
        background: '#1e293b',
        color: '#fff'
    }).then(async (result) => {
        if (result.value) {
            const inputValue = result.value.trim();
            const isDuplicate = await isNameDuplicate(inputValue, type);
            if (isDuplicate) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'මෙම නමින් දැනටමත් අයිතමයක් ඇත!', background: '#1e293b', color: '#fff' });
                return;
            }
            let arrayKey = `${type}s`;
            let newItem = { id: 'id_' + Date.now(), name: inputValue };
            appData[arrayKey].push(newItem);
            await saveCategoriesToCloud();
            navigateTo(`page-${type}`);
        }
    });
}

// 3. Long Press / Context Menu සිදුවීම (මෙන්න මේකයි ඔයා අලුතින් ඇහුවේ)
document.addEventListener('contextmenu', function(e) {
    // '.item-button' කියන class එක අයිතම වලට දාන්න අමතක කරන්න එපා!
    if (e.target.closest('.item-button')) { 
        e.preventDefault();
        const menu = document.getElementById('custom-context-menu');
        menu.classList.remove('hidden');
        menu.style.top = `${e.clientY}px`;
        menu.style.left = `${e.clientX}px`;
    }
});

// පිටත ක්ලික් කළාම මෙනුව වැසීම
document.addEventListener('click', function(e) {
    const menu = document.getElementById('custom-context-menu');
    if (!menu.contains(e.target)) {
        menu.classList.add('hidden');
    }
});

// 4. Rename බොත්තම සඳහා
document.getElementById('menu-rename-btn').addEventListener('click', async () => {
    // (ඔයාගේ කලින් තිබ්බ rename logic එක මෙතන තියන්න)
});

// 5. Delete බොත්තම සඳහා
document.getElementById('menu-delete-btn').addEventListener('click', async () => {
    // (ඔයාගේ කලින් තිබ්බ delete logic එක මෙතන තියන්න)
});