import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, addDoc, collection, serverTimestamp, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCfoQCqLUr3L4jFXuNcMDiNtEIYKgD_Tbs",
    authDomain: "quero-store-4302e.firebaseapp.com",
    projectId: "quero-store-4302e",
    storageBucket: "quero-store-4302e.firebasestorage.app",
    messagingSenderId: "851454566371",
    appId: "1:851454566371:web:04ca0e77de8ac7cb7c4ad6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence);

const videoIDs = {
    "rev_t2_1sec": "VLe_aRZB4Ek", 
    1: "ZIu1iDQuy1w", 2: "Vir68tM_mVI", 3: "UrWp5m4u-gs", 4: "y0wCDvZlTh4",
    5: "tVERZCcYCuw", 6: "agyevxfqpRE", 7: "9wkV1IHXHto", 8: "4D3SnIzOaEM",
    9: "HWWbLYnJ-hs", 10: "J_ki7f5kNlg", 11: "SBxLQ1r_Z-M", 12: "EW87FWpHmIc",
    13: "r6IO5rza1Mc", 14: "xGixhtezL1E", 15: "gZlKjmKVFp4", 16: "hCG-2oxLKao",
    17: "IBOEbGAEo80",
    "18_1": "AXyUxXtm-s4", "18_2": "5XTOf7S0dUM", "18_3": "3uaslCF73aA", "18_4": "vFtSCb9Lyx8",
    "19_1": "4E8HUxxjuyg", "19_2": "8V0NoUNe3U", "19_3": "Sp1ZERROdfU", "19_4": "fkTU7_4Bi2o",
    20: "Gj8IP_KmIig", 21: "MgLiyo0GHzs", 22: "ii8En3LBEEI", 23: "7gm5kZFBZQI",
    24: "m8vZkxUk3xI", 25: "dWuasw7e8eY", 26: "fXUoJzhU9n", 27: "8LMVjQMwfp4",
    28: "Yxdr6nJgezQ", 29: "_QufQmtPHr4", 30: "qGcFRYQ1WVU", 31: "qGcFRYQ1WVU",
    32: "p9OmCs_0FOo", 33: "vdRcjYYoSsA", 34: "iXK7HkheP3s", 35: "mWt3E3g3m4w",
    36: "GNIF7shZyw0", 37: "X-nghMBjBcQ", 38: "empty", 39: "HEDBxkdB7mE",
    40: "jNZ-sscoVXI", 41: "wfHiyNWblaE", 42: "wEd0I_w4BEw"
};

let userData = null;
let isAdmin = false;
let isSignUpMode = false;

function showToast(msg, type = 'success') {
    const el = document.getElementById('status-message');
    if(!el) return;
    el.innerText = msg; el.className = `status-msg msg-${type}`;
    el.style.display = 'block'; setTimeout(() => el.style.display = 'none', 3000);
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
            userData = snap.data();
            window.userData = userData;
            if (!userData.package) userData.package = 'free';
        } else {
            userData = { username: user.email.split('@')[0], package: 'free' };
            window.userData = userData;
            await setDoc(doc(db, "users", user.uid), userData);
        }
        await setDoc(doc(db, "users", res.user.uid), { 
    username: u, 
    package: 'free',
    createdAt: serverTimestamp()  // أضف هذا السطر
});
        
        const adminSnap = await getDoc(doc(db, "admins", userData.username));
        isAdmin = adminSnap.exists() && adminSnap.data().role === 'admin';
        window.isAdmin = isAdmin;
        
        const adminNavItem = document.querySelector('.admin-only');
        if (adminNavItem) adminNavItem.style.display = isAdmin ? 'flex' : 'none';
        
        const roleBadge = document.getElementById('user-role-badge');
        if (roleBadge) roleBadge.innerText = isAdmin ? 'أدمن' : 'طالب';
        
        document.getElementById('display-name').innerText = userData.username;
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('app-content').style.display = 'block';
        showPage('dashboard');
    } else {
        document.getElementById('login-page').style.display = 'block';
        document.getElementById('app-content').style.display = 'none';
        isAdmin = false;
        window.isAdmin = false;
    }
});

window.showPage = async function(page) {
    const main = document.getElementById('main-content');
    if(window.closeSidebar) window.closeSidebar();
    main.innerHTML = "";

    if (page === 'dashboard') {
        main.innerHTML = `
            <div style="text-align:center; padding:40px 20px;">
                <div class="dashboard-card">
                    <img src="logo.png" style="width:120px; border-radius:50%; margin-bottom:20px; border:3px solid var(--gold); box-shadow: 0 10px 30px rgba(197,160,89,0.3);">
                    <h1 style="font-size:2rem; margin-bottom:10px;">مرحباً بك في <span class="gold-text">كيريو ستور</span></h1>
                    <p style="color:#64748b;">منصة التميز البرمجي وحل الفصول في مكان واحد.</p>
                    <div class="social-links" style="margin-top:30px; display:flex; justify-content:center; gap:20px;">
                        <a href="https://wa.me/201010700338" target="_blank" class="social-btn wa" style="background:linear-gradient(135deg, #25D366, #128C7E); padding:12px 25px; border-radius:40px;"><i class="fab fa-whatsapp"></i> واتساب</a>
                        <a href="https://www.facebook.com/share/1ehrm1ylht/" target="_blank" class="social-btn fb" style="background:linear-gradient(135deg, #1877F2, #0c63d4); padding:12px 25px; border-radius:40px;"><i class="fab fa-facebook"></i> فيسبوك</a>
                    </div>
                </div>
                <div class="dashboard-card" style="text-align:right;">
                    <h3 style="color:var(--dark-blue); margin-bottom:15px;"><i class="fas fa-comment-dots" style="color:var(--gold); margin-left:10px;"></i> شاركنا رأيك</h3>
                    <textarea id="feedback-text" rows="4" style="width:100%; border:1px solid #e2e8f0; border-radius:16px; padding:15px; outline:none; resize:none; font-family:inherit;" placeholder="اكتب رسالتك هنا..."></textarea>
                    <button class="main-btn" style="margin-top:15px; width:auto; padding:12px 30px;" onclick="window.sendFeedback()"><i class="fas fa-paper-plane"></i> إرسال الرأي</button>
                </div>
            </div>
        `;
    }
    else if (page === 'support') {
        main.innerHTML = `
            <div class="dashboard-card" style="text-align:center;">
                <h2 class="gold-text" style="margin-bottom:15px;"><i class="fas fa-headset"></i> الدعم الفني</h2>
                <p style="color:#64748b; margin-bottom:20px;">نحن هنا لمساعدتك! تواصل معنا عبر:</p>
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:20px; margin:30px 0;">
                    <a href="https://wa.me/201010700338" target="_blank" style="background:#25D366; color:white; padding:15px 30px; border-radius:50px; text-decoration:none; display:inline-flex; align-items:center; gap:10px;"><i class="fab fa-whatsapp fa-2x"></i> <span style="font-size:1.2rem;">واتساب</span></a>
                    <div onclick="window.location.href='tel:01010700338'" style="background:#3b82f6; color:white; padding:15px 30px; border-radius:50px; display:inline-flex; align-items:center; gap:10px; cursor:pointer;"><i class="fas fa-phone-alt fa-2x"></i> <span style="font-size:1.2rem;">اتصال: 01010700338</span></div>
                </div>
                <div style="background:#f8fafc; padding:20px; border-radius:20px; margin-top:20px;">
                    <p style="color:#64748b;"><i class="fas fa-clock"></i> أوقات العمل: السبت - الخميس (12 م - 10 م)</p>
                    <p style="color:#64748b; margin-top:10px;"><i class="fas fa-envelope"></i> <a href="mailto:qureostoreegy@gmail.com" style="color:#c5a059; text-decoration:none;">qureostoreegy@gmail.com</a></p>
                </div>
            </div>
        `;
    }
    else if (page === 'final_reviews') {
        const reviewsSnap = await getDocs(collection(db, "final_reviews"));
        let html = `<div class="dashboard-card" style="text-align:center;"><h2 class="gold-text">🎓 المراجعات النهائية</h2><p style="color:#64748b;">مراجعات شاملة قبل الامتحانات</p></div><div style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">`;
        for (const docSnap of reviewsSnap.docs) {
            const review = docSnap.data();
            let isLocked = false;
            if (review.package === 'silver' && userData.package === 'free') isLocked = true;
            else if (review.package === 'gold' && (userData.package === 'free' || userData.package === 'silver')) isLocked = true;
            html += `<div class="unit-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `window.playFinalReviewVideo('${docSnap.id}')`}"><div><h4>${review.title}</h4><p>${isLocked ? '🔒 يتطلب اشتراك' : '✅ متاح'}</p></div><i class="fas ${isLocked ? 'fa-lock' : 'fa-play-circle'}" style="color:${isLocked ? '#94a3b8' : 'var(--gold)'}; font-size:24px;"></i></div>`;
        }
        html += `</div>`;
        main.innerHTML = html;
    }
    else if (page === 'videos') {
    const videosSnap = await getDocs(collection(db, "videos"));
    let html = `<div class="dashboard-card" style="text-align:center;">
        <h2 class="gold-text" style="margin-bottom:10px;">🎬 فيديوهات الفصول</h2>
        <p style="color:#64748b;">شاهد فيديوهات الشرح لكل الفصول</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">`;
    
    for (const docSnap of videosSnap.docs) {
        const video = docSnap.data();
        let isLocked = false;
        
        // باقة MINI: تفتح فقط فصول 1-30
        if (userData.package === 'mini') {
            if (video.chapterNum > 30) isLocked = true;
        }
        // باقة SILVER: تفتح 1-30
        else if (userData.package === 'silver') {
            if (video.chapterNum > 30) isLocked = true;
        }
        // باقة FREE: تفتح 1-10
        else if (userData.package === 'free') {
            if (video.chapterNum > 10) isLocked = true;
        }
        // باقة GOLD: كل الفيديوهات مفتوحة

        html += `<div class="unit-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `window.playVideoByDoc('${docSnap.id}')`}">
            <div><h4>${video.title || `الفصل ${video.chapterNum}`}</h4><p>${isLocked ? '🔒 يتطلب اشتراك' : '✅ متاح'}</p></div>
            <i class="fas ${isLocked ? 'fa-lock' : 'fa-play-circle'}" style="color:${isLocked ? '#94a3b8' : 'var(--gold)'}; font-size:24px;"></i>
        </div>`;
    }
    html += `</div>`;
    main.innerHTML = html;
}
    else if (page === 'files') {
    const filesSnap = await getDocs(collection(db, "files"));
    let html = `<div class="dashboard-card" style="text-align:center;">
        <h2 class="gold-text" style="margin-bottom:10px;">📁 المذكرات والملفات</h2>
        <p style="color:#64748b;">ملفات الشرح والمذكرات الدراسية</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">`;
    
    for (const docSnap of filesSnap.docs) {
        const file = docSnap.data();
        let isLocked = false;
        
        // باقة MINI: لا تفتح أي ملفات
        if (userData.package === 'mini') {
            isLocked = true;
        }
        // باقة SILVER: تفتح الملفات الفضية
        else if (userData.package === 'silver') {
            if (file.package !== 'silver' && file.package !== 'free') isLocked = true;
        }
        // باقة FREE: تفتح المجاني فقط
        else if (userData.package === 'free') {
            if (file.package !== 'free') isLocked = true;
        }
        // باقة GOLD: كل الملفات مفتوحة

        html += `<div class="unit-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `window.openFileByDoc('${docSnap.id}')`}">
            <div><h4>${file.name}</h4><p>${isLocked ? '🔒 للمشتركين فقط' : '✅ متاح'}</p></div>
            <i class="fas fa-file-pdf" style="color:#e74c3c; font-size:24px;"></i>
        </div>`;
    }
    html += `</div>`;
    main.innerHTML = html;
}
    else if (page === 'upgrade') {
        main.innerHTML = `
            <div style="text-align:center; padding:20px;">
                <h2 class="gold-text" style="margin-bottom:10px;">👑 باقات كيريو المميزة</h2>
                <p style="color:#64748b; margin-bottom:30px;">اختر الباقة المناسبة لك واستمتع بكل المميزات</p>
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:25px; margin-top:20px;">
                    <div class="package-card" style="width:280px; cursor:pointer; position:relative;" onclick="window.confirmSub('Mini')"><div class="badge-silver" style="background:linear-gradient(135deg, #6c5ce7, #4834d4); padding:8px 20px; border-radius:30px; display:inline-block;">MINI</div><div class="price-tag" style="font-size:2rem; font-weight:bold; margin:15px 0;">50 <span style="font-size:1rem;">ج.م</span></div><ul style="list-style:none; padding:0; text-align:right;"><li><i class="fas fa-check-circle" style="color:#10b981;"></i> حل فصول الترم الثاني (17-30)</li><li><i class="fas fa-check-circle" style="color:#10b981;"></i> فتح ملفات الشرح الأساسية</li><li><i class="fas fa-check-circle" style="color:#10b981;"></i> مراجعة سريعة للفصول</li></ul><button class="main-btn" style="margin-top:20px; width:100%;">اشترك الآن</button></div>
                    <div class="package-card" style="width:280px; cursor:pointer; position:relative;" onclick="window.confirmSub('Silver')"><div class="badge-silver" style="background:linear-gradient(135deg, #c0c0c0, #808080); padding:8px 20px; border-radius:30px; display:inline-block;">SILVER</div><div class="price-tag" style="font-size:2rem; font-weight:bold; margin:15px 0;">90 <span style="font-size:1rem;">ج.م</span></div><ul style="list-style:none; padding:0; text-align:right;"><li><i class="fas fa-check-circle" style="color:#10b981;"></i> حل فصول الترم الثاني (حتى فصل 30)</li><li><i class="fas fa-check-circle" style="color:#10b981;"></i> فتح جميع ملفات الشرح والمذكرات</li><li><i class="fas fa-check-circle" style="color:#10b981;"></i> المراجعات النهائية لأولى ثانوي</li></ul><button class="main-btn" style="margin-top:20px; width:100%;">اشترك الآن</button></div>
                    <div class="package-card" style="border:2px solid var(--gold); transform: scale(1.02); cursor:pointer; position:relative; min-width:280px;" onclick="window.confirmSub('Gold')"><div class="most-requested-badge" style="background:#e74c3c; top:-20px; white-space:nowrap; padding:6px 15px; border-radius:30px; display:inline-block; width:auto; position:absolute; left:50%; transform:translateX(-50%); font-size:13px; font-weight:bold;">🔥 الأكثر طلباً 🔥</div><div class="badge-gold" style="background:linear-gradient(135deg, #c5a059, #8b6914); padding:8px 20px; border-radius:30px; display:inline-block; margin-top:20px;">GOLD</div><div class="price-tag" style="font-size:2rem; font-weight:bold; margin:15px 0;">200 <span style="font-size:1rem;">ج.م</span></div><ul style="list-style:none; padding:0; text-align:right;"><li><i class="fas fa-rocket" style="color:#c5a059;"></i> فتح كافة فصول المنصة (1-42)</li><li><i class="fas fa-rocket" style="color:#c5a059;"></i> فيديوهات الشرح (الحالية والقادمة)</li><li><i class="fas fa-rocket" style="color:#c5a059;"></i> مراجعات نهائية (أولى وتانية ثانوي)</li><li><i class="fas fa-rocket" style="color:#c5a059;"></i> كافة الملفات والمذكرات PDF</li></ul><button class="main-btn" style="background:var(--gold); margin-top:20px; width:100%;">اشترك في الذهبية</button></div>
                </div>
                <div class="payment-details" style="margin-top:30px; padding:15px; background:#fffbe6; border-radius:15px;"><p><i class="fas fa-phone-alt gold-text"></i> <strong>💳 طريقة الدفع:</strong> التحويل لرقم <span class="gold-text">01010700338</span> (فودافون كاش)، وابعت سكرين واتساب للتفعيل.</p></div>
            </div>
        `;
    }
    else if (page === 'chapters') {
    let html = `<div class="dashboard-card" style="text-align:center;">
        <h2 class="gold-text" style="margin-bottom:10px;">📚 الفصول (1-42)</h2>
        <p style="color:#64748b;">اختر الفصل الذي تريد مراجعته</p>
    </div>
    <div style="display:flex; flex-direction:column; gap:15px; margin-top:20px;">`;
    
    for (let i = 1; i <= 42; i++) {
        let isLocked = false;
        
        // باقة MINI: تفتح فقط 1-30
        if (userData.package === 'mini') {
            if (i > 30) isLocked = true;
        }
        // باقة SILVER: تفتح 1-30
        else if (userData.package === 'silver') {
            if (i > 30) isLocked = true;
        }
        // باقة FREE: تفتح 1-10 فقط
        else if (userData.package === 'free') {
            if (i > 10) isLocked = true;
        }
        // باقة GOLD: كل الفصول مفتوحة (1-42)

        html += `
            <div class="unit-card ${isLocked ? 'locked' : ''}" onclick="window.openChapter(${i}, ${isLocked})">
                <div>
                    <h4>الفصل ${i}</h4>
                    <p style="font-size:12px; color:#64748b;">${isLocked ? 'مغلق 🔒' : 'متاح ✅'}</p>
                </div>
                <i class="fas fa-chevron-left" style="color:${isLocked ? '#94a3b8' : 'var(--gold)'};"></i>
            </div>`;
    }
    html += `</div>`;
    main.innerHTML = html;
}
    else if (page === 'account') {
        (async () => {
            let role = 'student';
            let memberSince = 'جديد';
            let chaptersCompleted = 0;
            let videosWatched = 0;
            try {
                const adminSnap = await getDoc(doc(db, "admins", userData.username));
                if (adminSnap.exists() && adminSnap.data().role === 'admin') role = 'admin';
                if (userData.createdAt) memberSince = new Date(userData.createdAt.seconds * 1000).toLocaleDateString('ar-EG');
                const chaptersSnap = await getDocs(collection(db, "chapters"));
                chaptersCompleted = chaptersSnap.size;
                const videosSnap = await getDocs(collection(db, "videos"));
                videosWatched = videosSnap.size;
            } catch(e) {}
            let packageName = userData.package === 'gold' ? 'ذهبية 👑' : userData.package === 'silver' ? 'فضية 🥈' : userData.package === 'mini' ? 'MINI (17-30)' : 'مجانية';
            let packageColor = userData.package === 'gold' ? '#c5a059' : userData.package === 'silver' ? '#808080' : userData.package === 'mini' ? '#6c5ce7' : '#10b981';
            main.innerHTML = `<div class="dashboard-card" style="text-align:center;"><div class="account-avatar"><i class="fas fa-user-circle" style="font-size:80px; color:var(--gold);"></i></div><h2 style="margin:15px 0; color:#1e293b;">👤 ملفي الشخصي</h2><div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:15px; margin:20px 0;"><div style="background:#f8fafc; padding:15px; border-radius:15px;"><i class="fas fa-user gold-text" style="font-size:24px;"></i><p style="margin:5px 0 0; color:#64748b;">اسم المستخدم</p><h3 style="color:#1e293b;">${userData.username}</h3></div><div style="background:#f8fafc; padding:15px; border-radius:15px;"><i class="fas fa-crown" style="font-size:24px; color:${packageColor};"></i><p style="margin:5px 0 0; color:#64748b;">الباقة الحالية</p><h3 style="color:${packageColor};">${packageName}</h3></div><div style="background:#f8fafc; padding:15px; border-radius:15px;"><i class="fas fa-shield-alt gold-text" style="font-size:24px;"></i><p style="margin:5px 0 0; color:#64748b;">الصلاحية</p><h3 style="color:${role === 'admin' ? '#e74c3c' : '#3b82f6'};">${role === 'admin' ? 'أدمن 👑' : 'طالب 📚'}</h3></div><div style="background:#f8fafc; padding:15px; border-radius:15px;"><i class="fas fa-calendar-alt gold-text" style="font-size:24px;"></i><p style="margin:5px 0 0; color:#64748b;">عضو منذ</p><h3 style="color:#1e293b;">${memberSince}</h3></div><div style="background:#f8fafc; padding:15px; border-radius:15px;"><i class="fas fa-book-open gold-text" style="font-size:24px;"></i><p style="margin:5px 0 0; color:#64748b;">الفصول المتاحة</p><h3 style="color:#1e293b;">${chaptersCompleted}</h3></div><div style="background:#f8fafc; padding:15px; border-radius:15px;"><i class="fas fa-video gold-text" style="font-size:24px;"></i><p style="margin:5px 0 0; color:#64748b;">فيديوهات متاحة</p><h3 style="color:#1e293b;">${videosWatched}</h3></div></div><button class="main-btn" style="background:#ef4444; width:auto; padding:12px 30px; margin-top:10px;" id="logout-btn-account"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</button></div>`;
            document.getElementById('logout-btn-account').onclick = () => signOut(auth);
        })();
    }
    else if (page === 'admin') {
        window.showAdminPage();
    }
    else if (page === 'services') {
        main.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <h2 class="gold-text" style="margin-bottom:10px; font-size:2.5rem;">✨ خدمات منصة كيريو ✨</h2>
                <p style="color:#666; margin-bottom:30px; font-size:1.2rem;">نقدم خدمة حل الفصول على أكمل وجه وفي أسرع وقت ممكن<br>بواسطة أشخاص محترفين في حل الفصول</p>
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:25px; margin-top:30px;">
                    <div class="package-card" style="width:280px;"><div class="badge-silver" style="background:linear-gradient(135deg, #c5a059, #a07830); color:#fff; border-radius:20px;">🔥 عرض لمدة يوم</div><h3 style="margin:20px 0 10px;">🎯 باقة الترم الثاني</h3><p style="color:#666; font-size:14px;">(من الفصل 17 إلى 30)</p><p style="font-size:13px; color:#27ae60; margin:15px 0;">✨ جواهر كاملة والحل في ساعة ونصف فقط</p><div style="margin:20px 0;"><span style="font-size:20px; color:#999; text-decoration:line-through; margin-left:10px;">130 ج.م</span><span style="font-size:32px; font-weight:bold; color:var(--gold);">100 ج.م</span><span class="offer-badge">عرض خاص!</span></div><button class="main-btn" style="background:#25D366; display:flex; align-items:center; justify-content:center; gap:8px;" onclick="window.orderPackage('term2')"><i class="fab fa-whatsapp"></i> اشترك الآن</button></div>
                    <div class="package-card" style="width:280px;"><div class="badge-silver" style="background:linear-gradient(135deg, #c5a059, #a07830); color:#fff; border-radius:20px;">⭐ الأكثر طلباً</div><h3 style="margin:20px 0 10px;">🎯 باقة الترم الثاني</h3><p style="color:#666; font-size:14px;">(من الفصل 20 إلى 30)</p><p style="font-size:13px; color:#27ae60; margin:15px 0;">✨ حل سريع ومتقن في وقت قياسي</p><div style="margin:20px 0;"><span style="font-size:20px; color:#999; text-decoration:line-through; margin-left:10px;">100 ج.م</span><span style="font-size:32px; font-weight:bold; color:var(--gold);">90 ج.م</span></div><button class="main-btn" style="background:#25D366; display:flex; align-items:center; justify-content:center; gap:8px;" onclick="window.orderPackage('term2_20_30')"><i class="fab fa-whatsapp"></i> اشترك الآن</button></div>
                    <div class="package-card" style="width:280px; opacity:0.4; filter:grayscale(0.3);"><h3 style="margin:20px 0 10px;">🚫 باقة المنصة كاملة</h3><p style="color:#666; font-size:14px;">(من الفصل 1 إلى 42)</p><div style="margin:20px 0;"><span style="font-size:20px; color:#999; text-decoration:line-through;">ج.م</span><span style="font-size:28px; font-weight:bold; color:#999;">غير متاحة</span></div><button class="main-btn" style="background:#ccc; cursor:not-allowed;" disabled>غير متاحة حالياً</button></div>
                    <div class="package-card" style="width:280px; border:2px solid var(--gold);"><div class="badge-silver" style="background:linear-gradient(135deg, #27ae60, #1e8449); color:#fff; border-radius:20px;">💎 عرض خاص</div><h3 style="margin:20px 0 10px;">💎 اكمال الجواهر</h3><p style="color:#666; font-size:14px;">لكل الفصول غير المكتملة</p><p style="font-size:13px; color:#27ae60; margin:15px 0;">✨ السعر غير ثابت - حسب عدد الفصول المتبقية</p><div style="margin:20px 0;"><span style="font-size:32px; font-weight:bold; color:var(--gold);">50 ج.م</span><span style="display:inline-block; background:#27ae60; color:white; font-size:12px; padding:3px 8px; border-radius:20px; margin-right:10px;">للبدء</span></div><p style="font-size:12px; color:#999; margin:10px 0;">⚠️ السعر غير ثابت يرجي التواصل مع الدعم وإخباره بعدد الفصول غير المكتملة</p><button class="main-btn" style="background:#25D366; display:flex; align-items:center; justify-content:center; gap:8px;" onclick="window.orderPackage('jewels')"><i class="fab fa-whatsapp"></i> استفسر الآن</button></div>
                </div>
                <div style="background:linear-gradient(135deg, #fffbe6, #fff8e0); padding:30px; border-radius:30px; margin-top:40px; border:2px solid var(--gold);"><h3 style="color:var(--gold); margin-bottom:15px;"><i class="fas fa-headset fa-spin"></i> للاستفسار عن العروض بشكل أوضح</h3><p style="color:#666; margin-bottom:20px;">أو إذا لم تجد العرض الذي تريده، أو لمعرفة السعر النهائي لباقة اكمال الجواهر</p><a href="https://wa.me/201010700338?text=${encodeURIComponent(`السلام عليكم، أنا ${userData?.username || 'عميل'}، أريد تفاصيل أكثر في خدمة حل الفصول`)}" target="_blank" style="background:#25D366; color:white; text-decoration:none; padding:14px 30px; border-radius:40px; display:inline-flex; align-items:center; gap:12px;"><i class="fab fa-whatsapp fa-lg"></i> تواصل مع الدعم</a></div>
            </div>
        `;
    }
};
// دالة الطلب عبر واتساب حسب الباقة
// دالة الطلب عبر واتساب حسب الباقة مع إضافة اسم المستخدم
window.orderPackage = (packageType) => {
    let userName = userData?.username || 'عميل';
    let message = '';
    
    if (packageType === 'term2') {
        message = `السلام عليكم، أنا ${userName}، أريد الاشتراك في باقة حل الفصول (الترم الثاني 17-30)`;
    } else if (packageType === 'term2_20_30') {
        message = `السلام عليكم، أنا ${userName}، أريد الاشتراك في باقة حل الفصول (الترم الثاني 20-30)`;
    } else if (packageType === 'jewels') {
        message = `السلام عليكم، أنا ${userName}، أريد الاستفسار عن باقة اكمال الجواهر (50 ج.م للبدء)، عدد الفصول غير المكتملة لدي: [أكتب عدد الفصول]`;
    }
    window.open(`https://wa.me/201010700338?text=${encodeURIComponent(message)}`, '_blank');
};

window.playVideoByDoc = async (videoId) => {
    const videoDoc = await getDoc(doc(db, "videos", videoId));
    if (!videoDoc.exists()) return showToast("الفيديو غير موجود", "error");
    const video = videoDoc.data();
    window.playVideo(video.title || `الفصل ${video.chapternum}`, video.youtubeid);
};

window.playFinalReviewVideo = async (reviewId) => {
    const reviewDoc = await getDoc(doc(db, "final_reviews", reviewId));
    if (!reviewDoc.exists()) return showToast("المراجعة غير موجودة", "error");
    const review = reviewDoc.data();
    const main = document.getElementById('main-content');
    main.innerHTML = `<div class="video-container">
        <button class="main-btn" style="width:auto; padding:10px 20px;" onclick="window.showPage('final_reviews')">رجوع للمراجعات</button>
        <h2>${review.title}</h2>
        <div class="video-wrapper" style="position:relative; padding-top:56.25%; background:#000; border-radius:20px;">
            <iframe src="https://www.youtube.com/embed/${review.youtubeId}?rel=0&modestbranding=1&controls=1&showinfo=0" 
                style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>`;
};

window.openFileByDoc = async (fileId) => {
    const fileDoc = await getDoc(doc(db, "files", fileId));
    if (!fileDoc.exists()) return showToast("الملف غير موجود", "error");
    const file = fileDoc.data();
    window.open(`https://drive.google.com/uc?export=download&id=${file.fileId}`, "_blank");
};

window.playVideo = (title, id) => {
    const main = document.getElementById('main-content');
    main.innerHTML = `<div class="video-container">
        <button class="main-btn" style="width:auto; padding:12px 25px;" onclick="window.showPage('videos')">العودة للفيديوهات</button>
        <h2>${title}</h2>
        <div class="video-wrapper" style="position:relative; padding-top:56.25%; background:#000; border-radius:20px;">
            <iframe src="https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&controls=1" 
                style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>`;
};

window.handleVideoClick = (num, isLocked) => {
    if (num === 38 || videoIDs[num] === "empty") return showToast("لم يتم رفع الفيديو بعد ⏳", "error");
    if (isLocked) {
        showToast("هذا الفصل يتطلب ترقية الباقة 🔐", "error");
        setTimeout(() => showPage('upgrade'), 1000);
        return;
    }
    if (num === 'rev_t2_1sec') return window.playVideo("مراجعة الترم الثاني", videoIDs['rev_t2_1sec']);
    if (num === 18 || num === 19) {
        const main = document.getElementById('main-content');
        main.innerHTML = `<h3>أجزاء الفصل ${num}</h3><button class="main-btn" onclick="showPage('videos')">رجوع للفيديوهات</button>`;
        for (let part = 1; part <= 4; part++) {
            main.innerHTML += `<div class="unit-card" onclick="window.playVideo('فصل ${num} - جزء ${part}', videoIDs['${num}_${part}'])">
                <div><h4>جزء ${part}</h4><p>مشاهدة الآن</p></div><i class="fas fa-play-circle" style="color:var(--gold)"></i>
            </div>`;
        }
        return;
    }
    window.playVideo(`فصل ${num}`, videoIDs[num]);
};

window.openContent = (title, isLocked) => {
    if (isLocked && title !== "ملخص ترم اول") {
        showToast("هذا الملف يتطلب اشتراك 👑", "error");
        setTimeout(() => showPage('upgrade'), 1000);
        return;
    }
    let fileId = "";
    if (title === "ملخص ترم اول") fileId = "1vmA2_0GHWQEsVYUeaqFoAcVWcQCphc3X";
    else if (title === "شرح وحل ترم تاني كزء 1") fileId = "1I7ETKP-ikPNUTxOjsbLPNa65mQv0Zj3Y";
    if (fileId) window.open(`https://drive.google.com/uc?export=download&id=${fileId}`, "_blank");
    else showToast("رابط الملف غير متوفر", "error");
};
window.confirmSub = (name) => {
    let packageText = '';
    if (name === 'Mini') packageText = 'MINI (فصول 17-30)';
    else if (name === 'Silver') packageText = 'SILVER (فصول حتى 30)';
    else if (name === 'Gold') packageText = 'GOLD (كافة الفصول 1-42)';
    
    const msg = encodeURIComponent(`مرحباً كيريو ستور، أنا ${userData.username}، أريد تفعيل باقة ${packageText}`);
    window.open(`https://wa.me/201010700338?text=${msg}`, '_blank');
};

window.sendFeedback = async () => {
    const text = document.getElementById('feedback-text')?.value;
    if(!text?.trim()) return showToast("اكتب رأيك أولاً", "error");
    try {
        await addDoc(collection(db, "feedbacks"), { username: userData.username, message: text, timestamp: serverTimestamp() });
        showToast("تم الإرسال بنجاح ❤️");
        document.getElementById('feedback-text').value = "";
    } catch(e) { showToast("فشل الإرسال", "error"); }
};

// ========== OPENCHAPTER ==========
window.openChapter = (num, isLocked) => {
    if (isLocked) {
        showToast("هذا الفصل يتطلب اشتراك 🔒", "error");
        setTimeout(() => showPage('upgrade'), 1000);
        return;
    }
    const main = document.getElementById('main-content');
    const dStyle = "font-size: 2rem; color: var(--gold); margin-top: 10px; font-weight: bold; display: block;";
    const sStyle = "font-size: 1.5rem; margin-top: 25px; font-weight: bold; display: block; border-right: 3px solid var(--gold); padding-right: 10px;";
    const jStyle = "font-size: 1.2rem; color: #333; margin: 10px 20px 0 0; display: block;";
    const codeBlock = "background: #1e1e1e; color: #fff; padding: 15px; border-radius: 8px; font-family: monospace; display: block; margin-top: 10px; line-height: 1.6; border-left: 5px solid var(--gold);";

    let lessonsHTML = `<p style="color:#666; padding:20px;">جاري إضافة دروس هذا الفصل قريباً...</p>`;
    let revisionHTML = `<p style="color:#666; padding:20px;">جاري إضافة مراجعة هذا الفصل قريباً...</p>`;

    if (num == 21) {
        revisionHTML = `<span style="${dStyle}">مراجعة الشروط</span>
            <span style="${sStyle}">س1</span><span style="${jStyle}"><code>score == 50</code></span>
            <span style="${sStyle}">س2</span><span style="${jStyle}"><code>else if (A < B)</code></span>
            <span style="${sStyle}">س3</span><span style="${jStyle}"><code>A < B</code></span>
            <span style="${sStyle}">س4</span><span style="${jStyle}"><code>score >= 50</code></span>
            <span style="${sStyle}">س5</span><span style="${jStyle}"><code>&&</code></span>
            <span style="${sStyle}">س6</span><span style="${jStyle}"><code>||</code></span>
            <span style="${sStyle}">س7</span><span style="${jStyle}"><code>numberOfPeople <= 10 || weight <= 800</code></span>
            <span style="${sStyle}">س8</span><span style="${jStyle}">ينتج عنه خطأ</span>
            <div style="${codeBlock}"><pre>let math = 100; let science = 100;
if (math == 100) {
    console.log("Math is 100 points");
    if (science == 100) console.log("Math and science are 100 points");
}</pre></div>`;
    }
    else if (num == 23) {
        revisionHTML = `<span style="${dStyle}">مراجعة الدوال</span>
            <span style="${sStyle}">س1</span><div style="${codeBlock}"><pre>function move() { }</pre></div>
            <span style="${sStyle}">س2</span><span style="${jStyle}">55</span>
            <span style="${sStyle}">س3</span><span style="${jStyle}">30</span>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>console.log(divide5(35));</pre></div>
            <span style="${sStyle}">س5</span><span style="${jStyle}">ينتج عنه خطأ</span>
            <span style="${sStyle}">س6</span><div style="${codeBlock}"><pre>function goodNight() { return "Good night!"; }</pre></div>
            <span style="${sStyle}">س7</span><div style="${codeBlock}"><pre>console.log(mul(9,7));</pre></div>`;
    }
    else if (num == 24) {
        revisionHTML = `<span style="${dStyle}">مراجعة الفصل 24</span>
            <span style="${sStyle}">س1</span><div style="${codeBlock}"><pre>let A=5,B=10; if(A>B) console.log("A larger"); else if(A<B) console.log("B larger");</pre></div>
            <span style="${sStyle}">س2</span><span style="${jStyle}">&&</span>
            <span style="${sStyle}">س3</span><div style="${codeBlock}"><pre>if(science==100){ console.log("Science 100"); if(math==100) console.log("Both 100"); }</pre></div>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>for(let i=0;i<7;i++) console.log("Good morning");</pre></div>
            <span style="${sStyle}">س5</span><span style="${jStyle}">ينتج عنه خطأ</span>
            <span style="${sStyle}">س6</span><span style="${jStyle}">00010</span>
            <span style="${sStyle}">س7</span><span style="${jStyle}">i += 5</span>
            <span style="${sStyle}">س8</span><div style="${codeBlock}"><pre>function divide3(n){ return n/3; } console.log(divide3(12345));</pre></div>
            <span style="${sStyle}">س9</span><span style="${jStyle}">function move() { }</span>
            <span style="${sStyle}">س10</span><div style="${codeBlock}"><pre>function mul(a,b){ return a*b; } console.log(mul(9,7));</pre></div>`;
    }
    else if (num == 25) {
        lessonsHTML = `
            <span style="${dStyle}">[الدرس1] تكرار العمليات الحسابية</span>
            <span style="${sStyle}">س1</span>
            <span style="${jStyle}">حلقه for</span>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس2] تمرين تكرار العمليات الحسابية</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 0; i < 5; i++) {
  num = num * 2;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 0; i < 4; i++) {
  num = num * 4;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س3</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let i = 1; i <= 4; i++</pre></div>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس3] استخدام عدّاد الحلقة for i</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 1; i <= 5; i++) {
  num = num * i;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 1; i <= 5; i++) {
  num = num * i;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س3</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 1; i <= 10; i++) {
  num = num * i;
}
console.log(num);</pre></div>`;
        revisionHTML = `<span style="${dStyle}">مراجعة الفصل 25</span>
            <span style="${sStyle}">س1</span><div style="${codeBlock}"><pre>let num=1; for(let i=0;i<3;i++) num*=2; console.log(num); //8</pre></div>
            <span style="${sStyle}">س2</span><div style="${codeBlock}"><pre>let num=1; for(let i=0;i<5;i++) num*=7; console.log(num); //16807</pre></div>
            <span style="${sStyle}">س3</span><span style="${jStyle}">1-2-3-4-5-6-7</span>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>let num=0; for(let i=0;i<6;i++) num+=i; console.log(num); //15</pre></div>
            <span style="${sStyle}">س5</span><div style="${codeBlock}"><pre>let num=5040; for(let i=1;i<=5;i++) num/=i; console.log(num); //42</pre></div>`;
    }
    else if (num == 26) {
        lessonsHTML = `
            <span style="${dStyle}">[الدرس1] مراجعة المصفوفات</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.2, 36.5, 36.3, 36.8, 36.4];</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.2, 36.5, 36.3, 36.8, 36.4];\nconsole.log(tempList[2]);</pre></div>
            <span style="${sStyle}">س3</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.2, 36.5, 36.3, 36.8, 36.4];\nconsole.log(tempList[3]);</pre></div>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس2] دمج الحلقات مع المصفوفات</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.2, 36.5, 36.3, 36.8, 36.4, 36.9, 37.0];</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.2, 36.5, 36.3, 36.8, 36.4, 36.9, 37.0];\nlet sum = 0;\nfor(let i = 0; i < 7; i++){\n  sum = sum + tempList[i];\n}\nconsole.log(sum / 7);</pre></div>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس3] استخدام طول المصفوفة</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.0, 36.5, 36.3, 36.8, 36.4, 36.9, 36.6, 37.0, 37.1, 36.9, 36.4, 36.6, 36.7, 36.5];\nconsole.log(tempList.length);</pre></div>
            <span style="${sStyle}">س2</span>
            <span style="${jStyle}">14 <br> 14</span>
            <span style="${sStyle}">س3</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let i = 0; i < tempList.length; i++\n\ntempList.length</pre></div>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس4] المصفوفات مع الحلقات و If</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.0, 36.5, 36.3, 36.8, 36.4, 36.9, 36.6, 37.0, 37.1, 36.9, 36.4, 36.6, 36.7, 36.5];\nfor (let i = 0; i < tempList.length; i++) {\n  if (tempList[i] >= 37.0) {\n    console.log("Be careful!");\n  }\n}</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.0, 36.5, 36.3, 36.8, 36.4, 36.9, 36.6, 37.0, 37.1, 36.9, 36.4, 36.6, 36.7, 36.5];\nfor (let i = 0; i < tempList.length; i++) {\n  if (tempList[i] >= 37.5) {\n    console.log("Avoid going outside!");\n  }\n}</pre></div>`;
        revisionHTML = `<span style="${dStyle}">مراجعة المصفوفات</span>
            <span style="${sStyle}">س1</span><span style="${jStyle}">79</span>
            <span style="${sStyle}">س2</span><div style="${codeBlock}"><pre>let scoreList=[52,60,79,82,66,59,88]; console.log(scoreList[5]);</pre></div>
            <span style="${sStyle}">س3</span><div style="${codeBlock}"><pre>let sum=0; for(let i=0;i<7;i++) sum+=scoreList[i]; console.log(sum/7);</pre></div>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>console.log(scoreList.length);</pre></div>
            <span style="${sStyle}">س5</span><div style="${codeBlock}"><pre>for(let i=0;i<scoreList.length;i++) if(scoreList[i]>=80) console.log("80 points or higher");</pre></div>`;
    }
    else if (num == 27) {
        lessonsHTML = `
            <span style="${dStyle}">[الدرس1] مراجعة الفصلين 25 و26</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 0; i < 7; i++) {
  num = num * 7;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 1; i <= 5; i++) {
  num = num * i;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س3</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let num = 1;
for (let i = 1; i <= 15; i++) {
  num = num * i;
}
console.log(num);</pre></div>
            <span style="${sStyle}">س4</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.0, 36.5, 36.3, 36.8, 36.4];
console.log(tempList[4]);</pre></div>
            <span style="${sStyle}">س5</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">tempList.length</pre></div>
            <span style="${sStyle}">س6</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let tempList = [36.0, 36.5, 36.3, 36.8, 36.4, 36.9, 36.6, 37.0, 37.1, 36.9, 36.4, 36.6, 36.7, 36.5];
for (let i = 0; i < tempList.length; i++) {
  if (tempList[i] >= 37.0) {
    console.log("Be careful!");
  }
}</pre></div>`;
        revisionHTML = `<span style="${dStyle}">مراجعة الفصل 27</span>
            <span style="${sStyle}">س1</span><div style="${codeBlock}"><pre>let num=1; for(let i=0;i<3;i++) num*=9; console.log(num); //729</pre></div>
            <span style="${sStyle}">س2</span><span style="${jStyle}">1-2-3-4</span>
            <span style="${sStyle}">س3</span><div style="${codeBlock}"><pre>let num=5040; for(let i=1;i<=5;i++) num/=i; console.log(num); //42</pre></div>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>console.log(scoreList[1]); //90</pre></div>
            <span style="${sStyle}">س5</span><div style="${codeBlock}"><pre>console.log(scoreList[4]); //63</pre></div>
            <span style="${sStyle}">س6</span><div style="${codeBlock}"><pre>for(let i=0;i<scoreList.length;i++) if(scoreList[i]>=80) console.log("Pass");</pre></div>`;
    }
    else if (num == 28) {
        lessonsHTML = `
            <span style="${dStyle}">[الدرس1] مراجعة الحلقات التكرارية</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let degreeList = [2, 1, 2, 1, 0, 1, 1];
console.log(degreeList[4]);</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let degreeList = [2, 1, 2, 1, 0, 1, 1];
for (let i = 0; i < 7; i++) {
  console.log(degreeList[i]);
}</pre></div>
            <span style="${sStyle}">س3</span>
            <span style="${jStyle}"><code style="background:#eee; padding:2px 8px;">degreeList.length</code></span>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس2] for of</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let degreeList = [8, 6, 11, 10, 9, 7, 12];
for (let degree of degreeList) {
  console.log(degree);
}</pre></div>
            <hr style="margin:30px 0; border:1px solid #eee;">
            <span style="${dStyle}">[الدرس3] التدرب على for...of</span>
            <span style="${sStyle}">س1</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let numList = [5, 10, 15, 20];
for (let num of numList) {
  console.log(num);
}</pre></div>
            <span style="${sStyle}">س2</span>
            <div style="${codeBlock}; direction: ltr; text-align: left;"><pre style="margin:0;">let wordList = ["apple", "banana", "orange"];
for (let word of wordList) {
  console.log(word);
}</pre></div>`;
        revisionHTML = `<span style="${dStyle}">مراجعة الفصل 28</span>
            <span style="${sStyle}">س1</span><span style="${jStyle}">11</span>
            <span style="${sStyle}">س2</span><div style="${codeBlock}"><pre>let numList=[10,11,12]; for(let i=0;i<3;i++) console.log(numList[i]);</pre></div>
            <span style="${sStyle}">س3</span><div style="${codeBlock}"><pre>let numList=[5,6,7]; for(let i=0;i<numList.length;i++) console.log(numList[i]);</pre></div>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>let numList=[2,4,6,8]; for(let num of numList) console.log(num);</pre></div>
            <span style="${sStyle}">س5</span><div style="${codeBlock}"><pre>let wordList=["Good morning","Good night","Hello"]; for(let word of wordList) console.log(word);</pre></div>`;
    }
    else if (num == 29) {
        revisionHTML = `<span style="${dStyle}">مراجعة الفصل 29</span>
            <span style="${sStyle}">س1</span><div style="${codeBlock}"><pre>if(A>B) console.log("A bigger"); else if(A<B) console.log("B bigger");</pre></div>
            <span style="${sStyle}">س2</span><span style="${jStyle}">100</span>
            <span style="${sStyle}">س3</span><span style="${jStyle}">Destination is the amusement park</span>
            <span style="${sStyle}">س4</span><div style="${codeBlock}"><pre>if(weather=="sunny" && shop=="OPEN") console.log("Go to the shop");</pre></div>
            <span style="${sStyle}">س5</span><div style="${codeBlock}"><pre>if(weather=="rain"){ if(time=="morning") console.log("movie theater"); else if(time=="noon") console.log("library"); else console.log("stay home");} else console.log("walk");</pre></div>`;
    }
    else if (num == 30) {
        revisionHTML = `<span style="${dStyle}">اختبار منتصف الطريق - الفصل 30</span>
            <span style="${sStyle}">س1</span><div style="${codeBlock}"><pre>let numList=[5,6,7]; for(let i=0;i<numList.length;i++) console.log(numList[i]);</pre></div>
            <span style="${sStyle}">س2</span><div style="${codeBlock}"><pre>let numList=[2,4,6,8]; for(let num of numList) console.log(num);</pre></div>
            <span style="${sStyle}">س3</span><div style="${codeBlock}"><pre>for(let word of wordList) console.log(word);</pre></div>
            <span style="${sStyle}">س4</span><span style="${jStyle}">100</span>
            <span style="${sStyle}">س5</span><span style="${jStyle}">Destination is the amusement park</span>
            <span style="${sStyle}">س6</span><div style="${codeBlock}"><pre>if(weather=="rain"){ if(time=="morning") console.log("movie theater"); else if(time=="noon") console.log("library"); else console.log("stay home");}</pre></div>`;
    }

    revisionHTML = revisionHTML.replace(/<pre>([\s\S]*?)<\/pre>/g, (match, code) => {
        const escapedCode = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<button class="copy-btn" onclick="navigator.clipboard.writeText(atob('${btoa(unescape(encodeURIComponent(escapedCode)))}'))">📋 نسخ الكود</button><pre>${code}</pre>`;
    });

    main.innerHTML = `
        <div class="chapter-container">
            <button class="main-btn" style="width:auto; padding:10px 20px;" onclick="window.showPage('chapters')">
                <i class="fas fa-arrow-right"></i> رجوع للفصول
            </button>
            <h2>الفصل ${num}</h2>
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button id="tab-lessons" class="main-btn" style="background:var(--dark); flex:1;" onclick="window.switchTab('lessons')">الدروس</button>
                <button id="tab-revision" class="main-btn" style="background:#ccc; flex:1;" onclick="window.switchTab('revision')">المراجعة</button>
            </div>
            <div id="lessons-content" style="display: block; background: #fff; padding: 20px; border-radius: 10px;">${lessonsHTML}</div>
            <div id="revision-content" style="display: none; background: #fff; padding: 20px; border-radius: 10px;">${revisionHTML}</div>
        </div>
    `;
    
    window.switchTab = (type) => {
        const lContent = document.getElementById('lessons-content');
        const rContent = document.getElementById('revision-content');
        const lBtn = document.getElementById('tab-lessons');
        const rBtn = document.getElementById('tab-revision');
        if (type === 'lessons') {
            lContent.style.display = 'block';
            rContent.style.display = 'none';
            lBtn.style.background = 'var(--dark)';
            rBtn.style.background = '#ccc';
        } else {
            lContent.style.display = 'none';
            rContent.style.display = 'block';
            lBtn.style.background = '#ccc';
            rBtn.style.background = 'var(--dark)';
        }
    };
};// ========== ADMIN DASHBOARD ==========
window.showAdminPage = async () => {
    if (!isAdmin) {
        showToast("غير مصرح لك بالدخول", "error");
        showPage('dashboard');
        return;
    }
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div style="padding:20px;">
            <h2><i class="fas fa-tachometer-alt"></i> لوحة التحكم</h2>
            <div class="admin-tabs">
                <button class="admin-tab-btn active" onclick="window.adminShowTab('users')">👥 المستخدمين</button>
                <button class="admin-tab-btn" onclick="window.adminShowTab('chapters')">📚 الفصول</button>
                <button class="admin-tab-btn" onclick="window.adminShowTab('videos')">🎥 الفيديوهات</button>
                <button class="admin-tab-btn" onclick="window.adminShowTab('files')">📁 الملفات</button>
                <button class="admin-tab-btn" onclick="window.adminShowTab('final_reviews')">📝 المراجعات النهائية</button>
            </div>
            <div id="admin-content"><div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div></div>
        </div>`;
    await window.adminShowTab('users');
};

window.adminShowTab = async (tab) => {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event?.target) event.target.classList.add('active');
    const container = document.getElementById('admin-content');
    if (!container) return;
    if (tab === 'users') await window.adminShowUsers(container);
    else if (tab === 'chapters') await window.adminShowChapters(container);
    else if (tab === 'videos') await window.adminShowVideos(container);
    else if (tab === 'files') await window.adminShowFiles(container);
    else if (tab === 'final_reviews') await window.adminShowFinalReviews(container);
};

window.adminShowUsers = async (container) => {
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';
    const usersSnap = await getDocs(collection(db, "users"));
    let html = `<h3>👥 إدارة المستخدمين</h3>
        <button class="admin-btn" onclick="window.adminRefreshUsers()" style="margin-bottom:15px;">🔄 تحديث</button>
        <table class="admin-table"><thead><tr><th>اسم المستخدم</th><th>الباقة</th><th>الصلاحية</th><th>إجراءات</th></tr></thead><tbody>`;
    
    for (const docSnap of usersSnap.docs) {
        const user = docSnap.data();
        const adminCheck = await getDoc(doc(db, "admins", user.username));
        const isUserAdmin = adminCheck.exists();
        
        html += `<tr>
            <td>${user.username}</td>
            <td>
                <select id="package-${docSnap.id}" onchange="window.adminUpdatePackage('${docSnap.id}', this.value)">
                    <option value="free" ${user.package === 'free' ? 'selected' : ''}>مجانية</option>
                    <option value="mini" ${user.package === 'mini' ? 'selected' : ''}>MINI (17-30)</option>
                    <option value="silver" ${user.package === 'silver' ? 'selected' : ''}>فضية</option>
                    <option value="gold" ${user.package === 'gold' ? 'selected' : ''}>ذهبية</option>
                </select>
            </td>
            <td>${isUserAdmin ? '👑 أدمن' : '👤 مستخدم'}</td>
            <td>
                <button class="admin-btn success" onclick="window.adminToggleAdmin('${user.username}', ${!isUserAdmin})">${isUserAdmin ? 'إزالة أدمن' : 'جعله أدمن'}</button>
                <button class="admin-btn danger" onclick="window.adminDeleteUser('${docSnap.id}', '${user.username}')">🗑️ حذف</button>
            </td>
        </tr>`;
    }
    html += `</tbody></table>`;
    container.innerHTML = html;
};
window.adminDeleteUser = async (userId, username) => {
    if (!confirm(`هل أنت متأكد من حذف المستخدم ${username}؟`)) return;
    await deleteDoc(doc(db, "users", userId));
    await deleteDoc(doc(db, "admins", username)).catch(() => {});
    showToast(`تم حذف المستخدم ${username} ✅`);
    window.adminShowTab('users');
};

window.adminRefreshUsers = () => window.adminShowTab('users');

window.adminUpdatePackage = async (userId, newPackage) => {
    await updateDoc(doc(db, "users", userId), { package: newPackage });
    showToast("تم تحديث الباقة بنجاح ✅");
};

window.adminToggleAdmin = async (username, makeAdmin) => {
    if (makeAdmin) await setDoc(doc(db, "admins", username), { username, role: "admin" });
    else await deleteDoc(doc(db, "admins", username));
    showToast(makeAdmin ? `تم جعل ${username} أدمن ✅` : `تم إزالة صلاحيات الأدمن من ${username} ❌`);
    window.adminShowTab('users');
};

window.adminShowChapters = async (container) => {
    container.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';
    const chaptersSnap = await getDocs(collection(db, "chapters"));
    let html = `<h3>📚 إدارة الفصول</h3>
        <button class="admin-btn" onclick="window.adminShowAddChapterForm()" style="margin-bottom:15px;">➕ إضافة فصل جديد</button>
        <table class="admin-table"><thead><tr><th>رقم الفصل</th><th>المحتوى</th><th>إجراءات</th></tr></thead><tbody>`;
    for (const docSnap of chaptersSnap.docs) {
        const chapter = docSnap.data();
        html += `<tr>
            <td>${chapter.num}</td>
            <td><button class="admin-btn" onclick="window.adminEditChapter(${chapter.num})">✏️ تعديل الدروس والمراجعة</button></td>
            <td><button class="admin-btn danger" onclick="window.adminDeleteChapter(${chapter.num})">🗑️ حذف الفصل</button></td>
        </tr>`;
    }
    html += `</tbody></table>`;
    container.innerHTML = html;
};

window.adminDeleteChapter = async (num) => {
    if (!confirm(`هل أنت متأكد من حذف الفصل ${num}؟`)) return;
    await deleteDoc(doc(db, "chapters", `chapter_${num}`));
    showToast(`تم حذف الفصل ${num} ✅`);
    window.adminShowTab('chapters');
};

window.adminShowAddChapterForm = () => {
    const container = document.getElementById('admin-content');
    container.innerHTML = `<h3>➕ إضافة فصل جديد</h3>
        <div class="admin-form">
            <label>رقم الفصل:</label>
            <input type="number" id="new-chapter-num" placeholder="مثال: 43">
            <label>محتوى الدروس (HTML):</label>
            <textarea id="new-chapter-lessons" rows="10" placeholder="أدخل محتوى الدروس هنا..."></textarea>
            <label>محتوى المراجعة (HTML):</label>
            <textarea id="new-chapter-revision" rows="10" placeholder="أدخل محتوى المراجعة هنا..."></textarea>
            <button class="admin-btn" onclick="window.adminCreateChapter()">📌 إنشاء الفصل</button>
            <button class="admin-btn danger" onclick="window.adminShowTab('chapters')">↩️ إلغاء</button>
        </div>`;
};

window.adminCreateChapter = async () => {
    const num = parseInt(document.getElementById('new-chapter-num').value);
    const lessonsHTML = document.getElementById('new-chapter-lessons').value || '<p>لا توجد دروس</p>';
    const revisionHTML = document.getElementById('new-chapter-revision').value || '<p>لا توجد مراجعة</p>';
    if (!num) return showToast("رقم الفصل مطلوب", "error");
    const existing = await getDoc(doc(db, "chapters", `chapter_${num}`));
    if (existing.exists()) return showToast(`الفصل ${num} موجود بالفعل!`, "error");
    await setDoc(doc(db, "chapters", `chapter_${num}`), { num, lessonsHTML, revisionHTML });
    showToast(`تم إنشاء الفصل ${num} بنجاح ✅`);
    window.adminShowTab('chapters');
};

window.adminEditChapter = async (num) => {
    const chapterDoc = await getDoc(doc(db, "chapters", `chapter_${num}`));
    const chapter = chapterDoc.exists() ? chapterDoc.data() : { lessonsHTML: '', revisionHTML: '' };
    const container = document.getElementById('admin-content');
    container.innerHTML = `<h3>✏️ تعديل الفصل ${num}</h3>
        <div class="admin-form">
            <label>محتوى الدروس (HTML):</label>
            <textarea id="edit-lessons" rows="15" style="font-family:monospace;">${escapeHtml(chapter.lessonsHTML)}</textarea>
            <label>محتوى المراجعة (HTML):</label>
            <textarea id="edit-revision" rows="15" style="font-family:monospace;">${escapeHtml(chapter.revisionHTML)}</textarea>
            <button class="admin-btn" onclick="window.adminSaveChapter(${num})">💾 حفظ التعديلات</button>
            <button class="admin-btn danger" onclick="window.adminShowTab('chapters')">↩️ إلغاء</button>
        </div>`;
};

window.adminSaveChapter = async (num) => {
    const lessonsHTML = document.getElementById('edit-lessons').value;
    const revisionHTML = document.getElementById('edit-revision').value;
    await setDoc(doc(db, "chapters", `chapter_${num}`), { num, lessonsHTML, revisionHTML }, { merge: true });
    showToast(`تم حفظ الفصل ${num} بنجاح ✅`);
    window.adminShowTab('chapters');
};

window.adminShowVideos = async (container) => {
    const videosSnap = await getDocs(collection(db, "videos"));
    let html = `<h3>🎥 إدارة الفيديوهات</h3>
        <div class="admin-form">
            <input type="number" id="video-chapter-num" placeholder="رقم الفصل">
            <input type="text" id="video-title" placeholder="عنوان الفيديو">
            <input type="text" id="video-youtube-id" placeholder="YouTube ID">
            <select id="video-package">
                <option value="free">مجاني ✅</option>
                <option value="silver">فضي 🥈</option>
                <option value="gold">ذهبي 👑</option>
            </select>
            <button class="admin-btn" onclick="window.adminAddVideo()">➕ إضافة/تحديث الفيديو</button>
        </div>
        <div id="video-list"></div>`;
    container.innerHTML = html;
    await window.adminRefreshVideoList();
};

window.adminRefreshVideoList = async () => {
    const container = document.getElementById('video-list');
    if (!container) return;
    const videosSnap = await getDocs(collection(db, "videos"));
    let html = `<h4>الفيديوهات الحالية:</h4><table class="admin-table"><thead><tr><th>رقم الفصل</th><th>العنوان</th><th>الباقة</th><th>YouTube ID</th><th>حذف</th></tr></thead><tbody>`;
    for (const docSnap of videosSnap.docs) {
        const video = docSnap.data();
        const packageText = video.package === 'free' ? 'مجاني' : video.package === 'silver' ? 'فضي' : 'ذهبي';
        html += `<tr>
            <td>${video.chapterNum}</td>
            <td>${video.title || '-'}</td>
            <td>${packageText}</td>
            <td><code>${video.youtubeId}</code></td>
            <td><button class="admin-btn danger" onclick="window.adminDeleteVideoDoc('${docSnap.id}')">🗑️</button></td>
        </tr>`;
    }
    html += `</tbody><tr>`;
    container.innerHTML = html;
};

window.adminAddVideo = async () => {
    const chapterNum = parseInt(document.getElementById('video-chapter-num').value);
    const title = document.getElementById('video-title').value;
    const youtubeId = document.getElementById('video-youtube-id').value;
    const packageLevel = document.getElementById('video-package').value;
    if (!chapterNum || !youtubeId) return showToast("رقم الفصل ورابط الفيديو مطلوبين", "error");
    await setDoc(doc(db, "videos", `video_${chapterNum}`), {
        chapterNum, title, youtubeId, package: packageLevel
    }, { merge: true });
    showToast(`تم حفظ فيديو الفصل ${chapterNum} ✅`);
    document.getElementById('video-chapter-num').value = '';
    document.getElementById('video-title').value = '';
    document.getElementById('video-youtube-id').value = '';
    window.adminRefreshVideoList();
};

window.adminDeleteVideoDoc = async (docId) => {
    await deleteDoc(doc(db, "videos", docId));
    showToast("تم حذف الفيديو ❌");
    window.adminRefreshVideoList();
};

window.adminShowFiles = async (container) => {
    const filesSnap = await getDocs(collection(db, "files"));
    let html = `<h3>📁 إدارة الملفات</h3>
        <div class="admin-form">
            <input type="text" id="new-file-name" placeholder="اسم الملف">
            <input type="text" id="new-file-id" placeholder="Google Drive File ID">
            <select id="new-file-package">
                <option value="free">مجاني ✅</option>
                <option value="silver">فضي 🥈</option>
                <option value="gold">ذهبي 👑</option>
            </select>
            <button class="admin-btn" onclick="window.adminAddFile()">➕ إضافة ملف</button>
        </div>
        <table class="admin-table"><thead><tr><th>اسم الملف</th><th>الباقة</th><th>رابط</th><th>حذف</th></tr></thead><tbody>`;
    for (const docSnap of filesSnap.docs) {
        const file = docSnap.data();
        const packageText = file.package === 'free' ? 'مجاني' : file.package === 'silver' ? 'فضي' : 'ذهبي';
        html += `<tr>
            <td>${file.name}</td>
            <td>${packageText}</td>
            <td><code>${file.fileId}</code></td>
            <td><button class="admin-btn danger" onclick="window.adminDeleteFile('${docSnap.id}')">🗑️</button></td>
        </tr>`;
    }
    html += `</tbody></table>`;
    container.innerHTML = html;
};

window.adminAddFile = async () => {
    const name = document.getElementById('new-file-name').value;
    const fileId = document.getElementById('new-file-id').value;
    const packageLevel = document.getElementById('new-file-package').value;
    if (!name || !fileId) return showToast("اسم الملف و ID مطلوبين", "error");
    await addDoc(collection(db, "files"), { name, fileId, package: packageLevel });
    showToast("تم إضافة الملف بنجاح ✅");
    document.getElementById('new-file-name').value = '';
    document.getElementById('new-file-id').value = '';
    window.adminShowTab('files');
};

window.adminDeleteFile = async (fileId) => {
    await deleteDoc(doc(db, "files", fileId));
    showToast("تم حذف الملف ❌");
    window.adminShowTab('files');
};

window.adminShowFinalReviews = async (container) => {
    const reviewsSnap = await getDocs(collection(db, "final_reviews"));
    let html = `<h3>📝 المراجعات النهائية</h3>
        <div class="admin-form">
            <input type="text" id="review-title" placeholder="عنوان المراجعة">
            <input type="text" id="review-youtube-id" placeholder="YouTube ID">
            <select id="review-package">
                <option value="free">مجاني ✅</option>
                <option value="silver">فضي 🥈</option>
                <option value="gold">ذهبي 👑</option>
            </select>
            <button class="admin-btn" onclick="window.adminAddFinalReview()">➕ إضافة مراجعة</button>
        </div>
        <table class="admin-table"><thead><tr><th>العنوان</th><th>YouTube ID</th><th>الباقة</th><th>حذف</th></tr></thead><tbody>`;
    for (const docSnap of reviewsSnap.docs) {
        const review = docSnap.data();
        const packageText = review.package === 'free' ? 'مجاني' : review.package === 'silver' ? 'فضي' : 'ذهبي';
        html += `<tr>
            <td>${review.title}</td>
            <td><code>${review.youtubeId}</code></td>
            <td>${packageText}</td>
            <td><button class="admin-btn danger" onclick="window.adminDeleteFinalReview('${docSnap.id}')">🗑️ حذف</button></td>
        </tr>`;
    }
    html += `</tbody></table>`;
    container.innerHTML = html;
};

window.adminAddFinalReview = async () => {
    const title = document.getElementById('review-title').value;
    const youtubeId = document.getElementById('review-youtube-id').value;
    const packageLevel = document.getElementById('review-package').value;
    if (!title || !youtubeId) return showToast("العنوان و YouTube ID مطلوبين", "error");
    await addDoc(collection(db, "final_reviews"), { title, youtubeId, package: packageLevel });
    showToast("تم إضافة المراجعة بنجاح ✅");
    document.getElementById('review-title').value = '';
    document.getElementById('review-youtube-id').value = '';
    window.adminShowTab('final_reviews');
};

window.adminDeleteFinalReview = async (docId) => {
    await deleteDoc(doc(db, "final_reviews", docId));
    showToast("تم حذف المراجعة ❌");
    window.adminShowTab('final_reviews');
};

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m] || m));
}

// ========== DOM EVENTS ==========
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#sidebar .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            // الضغط على اسم المستخدم يفتح صفحة حسابي
const userPillBtn = document.getElementById('user-pill-btn');
if (userPillBtn) {
    userPillBtn.onclick = () => {
        window.closeSidebar();
        setTimeout(() => showPage('account'), 150);
    };
}
            const page = item.getAttribute('data-page');
            // الضغط على اسم المستخدم يفتح صفحة حسابي
const userPill = document.getElementById('user-pill-btn');
if (userPill) {
    userPill.onclick = () => {
        window.closeSidebar();
        setTimeout(() => showPage('account'), 150);
    };
}
            window.closeSidebar();
            setTimeout(() => showPage(page), 150);
        });
    });

    document.getElementById('auth-btn').onclick = async () => {
        const u = document.getElementById('username').value.trim();
        const p = document.getElementById('password').value;
        if (!u || !p) return showToast("أكمل البيانات أولاً", "error");
        if (isSignUpMode && u.length !== 8) return showToast("اسم المستخدم لازم 8 خانات", "error");
        const email = `${u}@quero.com`;
        try {
            if (isSignUpMode) {
                const res = await createUserWithEmailAndPassword(auth, email, p);
                await setDoc(doc(db, "users", res.user.uid), { username: u, package: 'free' });
                showToast("تم إنشاء الحساب بنجاح ✅");
            } else {
                await signInWithEmailAndPassword(auth, email, p);
            }
        } catch (e) {
            if (e.code === 'auth/invalid-credential') showToast("اسم المستخدم أو كلمة المرور خطأ", "error");
            else showToast("فشل في العملية", "error");
        }
    };

    document.addEventListener('click', (e) => {
        if (e.target?.id === 'switch-mode-btn') {
            isSignUpMode = !isSignUpMode;
            const title = document.getElementById('auth-title');
            const authBtn = document.getElementById('auth-btn');
            const switchArea = document.querySelector('.auth-switch p');
            if (isSignUpMode) {
                title.innerText = "إنشاء حساب جديد";
                authBtn.innerText = "إنشاء حساب";
                switchArea.innerHTML = `لديك حساب؟ <button type="button" id="switch-mode-btn" class="text-link-btn">سجل دخولك</button>`;
            } else {
                title.innerText = "تسجيل الدخول";
                authBtn.innerText = "دخول";
                switchArea.innerHTML = `ليس لديك حساب؟ <button type="button" id="switch-mode-btn" class="text-link-btn">أنشئ حساباً</button>`;
            }
        }
    });

    const menuToggle = document.getElementById('new-menu-toggle-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    window.openSidebar = () => {
        document.getElementById('sidebar').classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    window.closeSidebar = () => {
        document.getElementById('sidebar').classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (menuToggle) menuToggle.onclick = window.openSidebar;
    if (closeSidebarBtn) closeSidebarBtn.onclick = window.closeSidebar;
    if (overlay) overlay.onclick = window.closeSidebar;
    
    const logoutBtn = document.getElementById('logout-btn-action');
    if (logoutBtn) logoutBtn.onclick = () => signOut(auth);
    // تأكد من أن showPage موجودة في النافذة
window.showPage = showPage;

// إصلاح زر تسجيل الدخول
const authBtn = document.getElementById('auth-btn');
if (authBtn) {
    authBtn.onclick = async () => {
        const u = document.getElementById('username').value.trim();
        const p = document.getElementById('password').value;
        
        console.log("محاولة تسجيل الدخول:", u);
        
        if (!u || !p) {
            showToast("أكمل البيانات أولاً", "error");
            return;
        }
        
        if (isSignUpMode && u.length !== 8) {
            showToast("اسم المستخدم لازم 8 خانات", "error");
            return;
        }
        
        const email = `${u}@quero.com`;
        
        try {
            if (isSignUpMode) {
                const res = await createUserWithEmailAndPassword(auth, email, p);
                await setDoc(doc(db, "users", res.user.uid), { 
                    username: u, 
                    package: 'free',
                    createdAt: serverTimestamp()
                });
                showToast("تم إنشاء الحساب بنجاح ✅");
            } else {
                await signInWithEmailAndPassword(auth, email, p);
                showToast("تم تسجيل الدخول بنجاح ✅");
            }
        } catch (e) {
            console.error("Firebase Error:", e.code, e.message);
            if (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
                showToast("اسم المستخدم أو كلمة المرور خطأ", "error");
            } else if (e.code === 'auth/email-already-in-use') {
                showToast("اسم المستخدم موجود بالفعل", "error");
            } else {
                showToast("خطأ في الاتصال، حاول مرة أخرى", "error");
            }
        }
    };
}
// ========== إصلاح مشكلة تسجيل الدخول ==========
// التأكد من أن showPage موجودة في النطاق العام
window.showPage = showPage;

// مراقبة حالة تسجيل الدخول بشكل مباشر
const checkAuthState = () => {
    const user = auth.currentUser;
    console.log("حالة المستخدم:", user ? user.email : "غير مسجل");
    
    if (user) {
        // جلب بيانات المستخدم
        getDoc(doc(db, "users", user.uid)).then(async (snap) => {
            if (snap.exists()) {
                userData = snap.data();
                window.userData = userData;
                if (!userData.package) userData.package = 'free';
            } else {
                userData = { username: user.email.split('@')[0], package: 'free' };
                window.userData = userData;
                await setDoc(doc(db, "users", user.uid), userData);
            }
            
            // التحقق من الأدمن
            const adminSnap = await getDoc(doc(db, "admins", userData.username));
            isAdmin = adminSnap.exists() && adminSnap.data().role === 'admin';
            window.isAdmin = isAdmin;
            
            // إظهار الأدمن في القائمة
            const adminNavItem = document.querySelector('.admin-only');
            if (adminNavItem) adminNavItem.style.display = isAdmin ? 'flex' : 'none';
            
            // تحديث البادج
            const roleBadge = document.getElementById('user-role-badge');
            if (roleBadge) roleBadge.innerText = isAdmin ? 'أدمن' : 'طالب';
            
            // تحديث اسم المستخدم
            document.getElementById('display-name').innerText = userData.username;
            
            // إخفاء صفحة تسجيل الدخول وإظهار التطبيق
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('app-content').style.display = 'block';
            
            // فتح الرئيسية
            showPage('dashboard');
        }).catch(err => {
            console.error("خطأ في جلب البيانات:", err);
            showToast("حدث خطأ، حاول تحديث الصفحة", "error");
        });
    } else {
        document.getElementById('login-page').style.display = 'block';
        document.getElementById('app-content').style.display = 'none';
    }
};

// استدعاء الدالة عند تحميل الصفحة
setTimeout(checkAuthState, 100);

// مراقبة التغييرات في حالة تسجيل الدخول
onAuthStateChanged(auth, (user) => {
    console.log("onAuthStateChanged تم التفعيل:", user ? user.email : "لا يوجد مستخدم");
    checkAuthState();
});

// إصلاح زر تسجيل الدخول
const fixLoginBtn = () => {
    const authBtn = document.getElementById('auth-btn');
    if (!authBtn) {
        setTimeout(fixLoginBtn, 500);
        return;
    }
    
    authBtn.onclick = async () => {
        const u = document.getElementById('username').value.trim();
        const p = document.getElementById('password').value;
        
        if (!u || !p) {
            showToast("أكمل البيانات أولاً", "error");
            return;
        }
        
        if (isSignUpMode && u.length !== 8) {
            showToast("اسم المستخدم لازم 8 خانات", "error");
            return;
        }
        
        const email = `${u}@quero.com`;
        console.log("محاولة تسجيل الدخول:", email);
        
        try {
            if (isSignUpMode) {
                const res = await createUserWithEmailAndPassword(auth, email, p);
                await setDoc(doc(db, "users", res.user.uid), { 
                    username: u, 
                    package: 'free',
                    createdAt: serverTimestamp()
                });
                showToast("تم إنشاء الحساب بنجاح ✅");
            } else {
                await signInWithEmailAndPassword(auth, email, p);
                showToast("تم تسجيل الدخول بنجاح ✅");
            }
            // بعد نجاح تسجيل الدخول، انتظر قليلاً ثم تحقق من الحالة
            setTimeout(() => checkAuthState(), 500);
        } catch (e) {
            console.error("Firebase Error:", e.code);
            if (e.code === 'auth/invalid-credential') {
                showToast("اسم المستخدم أو كلمة المرور خطأ", "error");
            } else {
                showToast("فشل تسجيل الدخول: " + e.message, "error");
            }
        }
    };
};

fixLoginBtn();
});