// --- 1. Service Worker Notification Logic ---
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

// --- 2. Duplicate Check Function ---
async function isNameDuplicate(newName, type) {
    let arrayKey = `${type}s`;
    return appData[arrayKey].some(item => item.name.toLowerCase() === newName.toLowerCase());
}

// --- 3. Add New Item Logic ---
function openAddModal(type) {
    Swal.fire({
        title: `➕ Add New ${type.toUpperCase()}`,
        input: 'text',
        inputPlaceholder: `Enter ${type} name...`,
        showCancelButton: true,
        background: '#1e293b',
        color: '#fff'
    }).then(async (result) => {
        if (result.value) {
            const inputValue = result.value.trim();
            if (await isNameDuplicate(inputValue, type)) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'මෙම නමින් දැනටමත් අයිතමයක් ඇත!', background: '#1e293b', color: '#fff' });
                return;
            }
            appData[`${type}s`].push({ id: 'id_' + Date.now(), name: inputValue });
            await saveCategoriesToCloud();
            navigateTo(`page-${type}`);
        }
    });
}

// --- 4. Context Menu Logic (Rename & Delete) ---
document.getElementById('menu-rename-btn').addEventListener('click', async () => {
    const target = activeMenuTarget;
    document.getElementById('custom-context-menu').classList.add('hidden');
    
    Swal.fire({
        title: `✏️ Rename "${target.item.name}"`,
        input: 'text',
        inputValue: target.item.name,
        showCancelButton: true,
        background: '#1e293b',
        color: '#fff'
    }).then(async (result) => {
        if (result.value) {
            const newName = result.value.trim();
            if (await isNameDuplicate(newName, target.type) && newName.toLowerCase() !== target.item.name.toLowerCase()) {
                Swal.fire({ icon: 'error', title: 'Oops...', text: 'මෙම නමින් දැනටමත් අයිතමයක් ඇත!', background: '#1e293b', color: '#fff' });
                return;
            }
            target.item.name = newName;
            await saveCategoriesToCloud();
            Swal.fire({ icon: 'success', title: 'Updated!', text: 'නම සාර්ථකව වෙනස් කළා!', background: '#1e293b', color: '#fff' });
            navigateTo(`page-${target.type}`);
        }
    });
});

document.getElementById('menu-delete-btn').addEventListener('click', async () => {
    const target = activeMenuTarget;
    document.getElementById('custom-context-menu').classList.add('hidden');
    
    Swal.fire({
        title: 'Are you sure?',
        text: `"${target.item.name}" මකා දැමීමට අවශ්‍යද?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        background: '#1e293b',
        color: '#fff'
    }).then(async (result) => {
        if (result.isConfirmed) {
            appData[`${target.type}s`] = appData[`${target.type}s`].filter(i => i.id !== target.item.id);
            await saveCategoriesToCloud();
            Swal.fire({ icon: 'success', title: 'Deleted!', text: 'සාර්ථකව මකා දැමුණා.', background: '#1e293b', color: '#fff' });
            navigateTo(`page-${target.type}`);
        }
    });
});

// --- 5. UI Helpers (Toast Notifications) ---
function showSuccessToast(message) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000,
        background: '#1e293b',
        color: '#fff'
    });
}