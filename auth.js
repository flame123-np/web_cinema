// Shared Firebase Auth Module
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile 
} from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js';

// Export for global access
window.authModule = {};

export function initializeAuthUI(firebaseApp, firebaseConfig) {
    const auth = getAuth(firebaseApp);
    const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiBase = window.location.protocol === 'file:' || (isLocalHost && window.location.port !== '4316')
        ? 'http://localhost:4316'
        : '';
    const FALLBACK_AUTH_KEY = 'cinema.fallbackAuth';
    let isAuthenticated = false;
    let authStateResolved = false;
    const pendingRequireLoginCallbacks = [];
    
    // Export auth functions globally
    window.authModule.isLoggedIn = () => isAuthenticated;
    window.authModule.openAuthModal = null;
    window.authModule.requireLogin = null;

    // DOM Elements
    const profileBtn = document.getElementById('profile-btn');
    const authModal = document.getElementById('auth-modal');
    const authBackdrop = document.getElementById('auth-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabBtns = document.querySelectorAll('.auth-tab-btn');
    const profileMenu = document.getElementById('profile-menu');
    const logoutBtn = document.getElementById('logout-btn');
    const profileImg = document.getElementById('profile-img');
    const memberPointsEl = document.getElementById('member-points');

    function setMemberPoints(points) {
        if (!memberPointsEl) return;
        const value = Number.isFinite(Number(points)) ? Number(points) : 0;
        memberPointsEl.textContent = `${value.toLocaleString('th-TH')} คะแนน`;
    }

    async function syncMemberPoints(uid) {
        if (!uid) {
            setMemberPoints(0);
            return;
        }
        try {
            const response = await fetch(`${apiBase}/api/users/${encodeURIComponent(uid)}`);
            if (!response.ok) {
                setMemberPoints(0);
                return;
            }
            const profile = await response.json();
            setMemberPoints(profile?.loyaltyPoints || 0);
        } catch (_error) {
            setMemberPoints(0);
        }
    }

    function readFallbackSession() {
        try {
            const raw = localStorage.getItem(FALLBACK_AUTH_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.uid || !parsed.email) return null;
            return parsed;
        } catch (_error) {
            return null;
        }
    }

    function writeFallbackSession(profile) {
        if (!profile?.uid || !profile?.email) return;
        localStorage.setItem(FALLBACK_AUTH_KEY, JSON.stringify({
            uid: profile.uid,
            email: profile.email,
            displayName: profile.displayName || 'ผู้ใช้'
        }));
    }

    function clearFallbackSession() {
        localStorage.removeItem(FALLBACK_AUTH_KEY);
    }

    function flushRequireLoginCallbacks() {
        while (pendingRequireLoginCallbacks.length > 0) {
            const callback = pendingRequireLoginCallbacks.shift();
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    function applyAuthenticatedProfile(profile) {
        if (!profileBtn) return;
        isAuthenticated = true;
        const uid = profile.uid || '';
        const email = profile.email || '';
        const displayName = profile.displayName || email || 'ผู้ใช้';

        localStorage.setItem('cinema.uid', uid);
        localStorage.setItem('cinema.userEmail', email);
        localStorage.setItem('cinema.userDisplayName', displayName);

        profileBtn.innerHTML = `<span class="text-lg font-bold text-white">${(displayName || email).charAt(0).toUpperCase()}</span>`;
        profileBtn.className = 'flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold cursor-pointer hover:bg-pink-700 transition';
        profileBtn.title = displayName || email;

        const userNameEl = document.getElementById('user-name');
        const userEmailEl = document.getElementById('user-email');
        const userNameDisplay = document.getElementById('user-name-display');
        if (userNameEl) userNameEl.textContent = displayName;
        if (userEmailEl) userEmailEl.textContent = email || 'email@example.com';
        if (userNameDisplay) userNameDisplay.textContent = displayName;
        profileBtn.style.opacity = '1';

        if (uid) syncMemberPoints(uid);
        closeAuthModal();
    }

    function applyLoggedOutState() {
        if (!profileBtn) return;
        isAuthenticated = false;
        setMemberPoints(0);
        profileBtn.innerHTML = `<button class="text-sm font-bold text-primary hover:text-pink-700 px-4 py-2 rounded-lg border border-primary hover:border-pink-700 transition-colors">Login</button>`;
        profileBtn.className = 'cursor-pointer';
        profileBtn.title = 'Login';

        const userNameEl = document.getElementById('user-name');
        const userEmailEl = document.getElementById('user-email');
        const userNameDisplay = document.getElementById('user-name-display');
        if (userNameEl) userNameEl.textContent = 'ผู้ใช้';
        if (userEmailEl) userEmailEl.textContent = 'email@example.com';
        if (userNameDisplay) userNameDisplay.textContent = 'Login';
        profileBtn.style.opacity = '1';
        if (profileMenu) profileMenu.classList.add('hidden');
    }

    // Ensure modal exists
    if (!authModal) {
        console.error('Auth modal not found in DOM');
        return;
    }

    // Open Modal
    function openAuthModal() {
        authModal.classList.remove('hidden');
        authBackdrop.classList.remove('hidden');
        authBackdrop.style.pointerEvents = 'auto';
        authBackdrop.style.backdropFilter = 'blur(4px)';
        authBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    }
    
    // Make openAuthModal globally accessible
    window.authModule.openAuthModal = openAuthModal;

    // Close Modal
    function closeAuthModal() {
        authModal.classList.add('hidden');
        authBackdrop.classList.add('hidden');
        authBackdrop.style.pointerEvents = 'none';
        authBackdrop.style.backdropFilter = 'blur(0)';
        authBackdrop.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        clearFormErrors();
    }

    // Tab Switching
    function switchTab(tabName) {
        const isLoginTab = tabName === 'login';
        loginForm.classList.toggle('hidden', !isLoginTab);
        signupForm.classList.toggle('hidden', isLoginTab);
        
        tabBtns.forEach(btn => {
            const isActive = btn.dataset.tab === tabName;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('bg-white', isActive);
            btn.classList.toggle('dark:bg-slate-600', isActive);
            btn.classList.toggle('text-slate-900', isActive);
            btn.classList.toggle('dark:text-white', isActive);
            btn.classList.toggle('text-slate-600', !isActive);
            btn.classList.toggle('dark:text-slate-300', !isActive);
        });
    }

    // Clear Form Errors
    function clearFormErrors() {
        const loginError = document.getElementById('login-error');
        const signupError = document.getElementById('signup-error');
        if (loginError) loginError.textContent = '';
        if (signupError) signupError.textContent = '';
    }

    // Show Error
    function showError(formType, message) {
        const errorEl = document.getElementById(`${formType}-error`);
        if (errorEl) errorEl.textContent = message;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
    }

    function getFriendlyAuthErrorMessage(error, mode = 'login') {
        const code = String(error?.code || '').trim();

        const commonMap = {
            'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
            'auth/network-request-failed': 'เชื่อมต่อเครือข่ายไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่',
            'auth/too-many-requests': 'ลองผิดหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่',
            'auth/unauthorized-domain': 'โดเมนนี้ยังไม่ได้รับอนุญาตใน Firebase (Authorized domains)'
        };

        const loginMap = {
            'auth/user-not-found': 'ไม่พบบัญชีผู้ใช้นี้',
            'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
            'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
            'auth/invalid-login-credentials': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
            'auth/user-disabled': 'บัญชีนี้ถูกระงับการใช้งาน'
        };

        const signupMap = {
            'auth/email-already-in-use': 'อีเมลนี้ถูกใช้งานแล้ว',
            'auth/weak-password': 'รหัสผ่านไม่ปลอดภัยพอ (อย่างน้อย 6 ตัวอักษร)',
            'auth/operation-not-allowed': 'ระบบยังไม่เปิดใช้งานการสมัครด้วยอีเมล/รหัสผ่าน'
        };

        const byMode = mode === 'signup' ? signupMap : loginMap;
        return byMode[code] || commonMap[code] || (mode === 'signup' ? 'สร้างบัญชีไม่สำเร็จ กรุณาลองใหม่อีกครั้ง' : 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน');
    }

    // Login Handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFormErrors();

            const email = String(document.getElementById('login-email').value || '').trim();
            const password = String(document.getElementById('login-password').value || '');

            if (!email) {
                showError('login', 'กรุณากรอกอีเมล');
                return;
            }

            if (!isValidEmail(email)) {
                showError('login', 'รูปแบบอีเมลไม่ถูกต้อง');
                return;
            }

            if (!password) {
                showError('login', 'กรุณากรอกรหัสผ่าน');
                return;
            }

            try {
                const result = await signInWithEmailAndPassword(auth, email, password);
                console.log('Login successful:', result.user);

                applyAuthenticatedProfile({
                    uid: result.user.uid,
                    email: result.user.email || '',
                    displayName: result.user.displayName || 'ผู้ใช้'
                });

                try {
                    await fetch(`${apiBase}/api/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            uid: result.user.uid,
                            email: result.user.email,
                            displayName: result.user.displayName || 'ผู้ใช้'
                        })
                    });
                } catch (backendError) {
                    console.warn('Could not sync user profile to backend:', backendError);
                }
                
                // Store user uid in localStorage for use across pages
                localStorage.setItem('cinema.uid', result.user.uid);
                localStorage.setItem('cinema.userEmail', result.user.email);
                localStorage.setItem('cinema.userDisplayName', result.user.displayName || '');

                loginForm.reset();
            } catch (error) {
                if (error?.code === 'auth/network-request-failed') {
                    try {
                        const usersResponse = await fetch(`${apiBase}/api/users`);
                        const users = usersResponse.ok ? await usersResponse.json() : [];
                        const fallbackUser = Array.isArray(users)
                            ? users.find((item) => String(item.email || '').trim().toLowerCase() === String(email).trim().toLowerCase())
                            : null;

                        if (fallbackUser?.uid && fallbackUser?.email) {
                            applyAuthenticatedProfile({
                                uid: fallbackUser.uid,
                                email: fallbackUser.email,
                                displayName: fallbackUser.displayName || 'ผู้ใช้'
                            });
                            writeFallbackSession(fallbackUser);
                            loginForm.reset();
                            return;
                        }
                    } catch (_fallbackError) {
                    }
                }
                showError('login', getFriendlyAuthErrorMessage(error, 'login'));
            }
        });
    }

    // Signup Handler
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFormErrors();

            const nickname = String(document.getElementById('signup-nickname').value || '').trim();
            const email = String(document.getElementById('signup-email').value || '').trim();
            const password = String(document.getElementById('signup-password').value || '');
            const confirmPassword = String(document.getElementById('signup-confirm-password').value || '');

            if (!nickname) {
                showError('signup', 'กรุณากรอกชื่อที่ใช้แสดง');
                return;
            }

            if (!email) {
                showError('signup', 'กรุณากรอกอีเมล');
                return;
            }

            if (!isValidEmail(email)) {
                showError('signup', 'รูปแบบอีเมลไม่ถูกต้อง');
                return;
            }

            if (password !== confirmPassword) {
                showError('signup', 'รหัสผ่านไม่ตรงกัน');
                return;
            }

            if (password.length < 6) {
                showError('signup', 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
                return;
            }

            try {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                
                // Update profile with nickname
                await updateProfile(result.user, {
                    displayName: nickname
                });

                applyAuthenticatedProfile({
                    uid: result.user.uid,
                    email: result.user.email || '',
                    displayName: nickname
                });

                // Store user uid in localStorage for use across pages
                localStorage.setItem('cinema.uid', result.user.uid);
                localStorage.setItem('cinema.userEmail', result.user.email);
                localStorage.setItem('cinema.userDisplayName', nickname);

                // Save user profile to backend
                try {
                    await fetch(`${apiBase}/api/users`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            uid: result.user.uid,
                            email: result.user.email,
                            displayName: nickname
                        })
                    });
                } catch (backendError) {
                    console.warn('Could not save user profile to backend:', backendError);
                }

                console.log('Signup successful:', result.user);
                signupForm.reset();
            } catch (error) {
                showError('signup', getFriendlyAuthErrorMessage(error, 'signup'));
            }
        });
    }

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });

    // Modal controls
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeAuthModal);
    }
    if (authBackdrop) {
        authBackdrop.addEventListener('click', closeAuthModal);
    }

    // Close profile menu when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (profileBtn && profileMenu && !profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
            profileMenu.classList.add('hidden');
        }
    });

    // Profile button behavior by auth state
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isAuthenticated) {
                if (profileMenu) profileMenu.classList.add('hidden');
                openAuthModal();
                return;
            }

            window.location.href = 'user.html';
        });
    }

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                console.log('Logout successful');
                
                // Clear user data from localStorage
                localStorage.removeItem('cinema.uid');
                localStorage.removeItem('cinema.userEmail');
                localStorage.removeItem('cinema.userDisplayName');
                clearFallbackSession();
                
                if (profileMenu) profileMenu.classList.add('hidden');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        });
    }

    // Monitor Auth State
    onAuthStateChanged(auth, (user) => {
        authStateResolved = true;
        if (user) {
            clearFallbackSession();
            applyAuthenticatedProfile({
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || 'ผู้ใช้'
            });
            flushRequireLoginCallbacks();

            fetch(`${apiBase}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email || '',
                    displayName: user.displayName || 'ผู้ใช้'
                })
            }).catch(() => {});
        } else {
            const fallbackSession = readFallbackSession();
            if (fallbackSession) {
                applyAuthenticatedProfile(fallbackSession);
                flushRequireLoginCallbacks();
                return;
            }
            applyLoggedOutState();
        }

        if (!isAuthenticated) {
            pendingRequireLoginCallbacks.length = 0;
        }
    });
    
    // Export requireLogin function globally
    window.authModule.requireLogin = function(callback) {
        if (isAuthenticated) {
            if (callback) callback();
            return;
        }

        if (!authStateResolved) {
            if (callback) pendingRequireLoginCallbacks.push(callback);
            return;
        }

        if (isAuthenticated) {
            if (callback) callback();
        } else {
            openAuthModal();
        }
    };
}
