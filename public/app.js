(function () {
  "use strict";

  const LOGO_CLICK_THRESHOLD = 5;
  const LOGO_CLICK_WINDOW = 3000;
  const JWT_KEY = "sc_jwt";

  const i18n = {
    EN: {
      welcome: "You are not alone",
      welcomeSub: "This is your private space. Take a breath. We are here.",
      cardHelplines: "Helplines",
      cardHelplinesD: "Call or text — someone is always there.",
      cardChatTitle: "Talk to Someone",
      cardChatDesc: "A safe, private chat. No judgment.",
      cardLegalTitle: "Know Your Rights",
      cardLegalDesc: "What the law says. In simple words.",
      cardExitTitle: "Safety Plan",
      cardExitDesc: "Small steps. One at a time.",
      cardClearTitle: "Think Clearly",
      cardClearDesc: "Grounding exercises for hard moments.",
      cardVaultTitle: "My Safe Folder",
      cardVaultDesc: "Store documents privately.",
      cardSosTitle: "SOS — Alert Trusted Person",
      cardSosDesc: "Send your location immediately.",
      cardShelterTitle: "Find Shelter Nearby",
      cardShelterDesc: "Shelters and support centers near you.",
      cardJournalTitle: "Mood Journal",
      cardJournalDesc: "Track how you feel. Private & yours.",
      lockLabel: "Safe Space",
      backShopping: "← Back to Shopping",
      chatHeader: "You can talk here. This is safe. 🌸",
      chatPlaceholder: "Type anything…",
      chatSend: "Send",
      pinLabel: "Enter your 4-digit PIN",
      pinNew: "Create a new 4-digit PIN",
      sosTitle: "SOS — Alert Trusted Person",
      sosSave: "Save Contact",
      sosSend: "Send Alert Now",
      sosSent: "Alert sent to your trusted contact.",
      sosNoContact: "Please save a trusted contact first.",
      planTitle: "My Safety Plan",
      journalTitle: "Mood Journal",
      breatheTitle: "Think Clearly",
      helplinesTitle: "Helplines",
      shelterTitle: "Shelters Nearby",
      rightsTitle: "Know Your Rights",
    },
    ML: {
      welcome: "നിങ്ങൾ ഒറ്റയ്ക്കല്ല",
      welcomeSub: "ഇത് നിങ്ങളുടെ സ്വകാര്യ ഇടമാണ്. ഒന്ന് ശ്വസിക്കൂ.",
      cardHelplines: "ഹെൽപ്‌ലൈൻ",
      cardHelplinesD: "വിളിക്കൂ — ആരെങ്കിലും ഉണ്ടാകും.",
      cardChatTitle: "സംസാരിക്കൂ",
      cardChatDesc: "സ്വകാര്യ ചാറ്റ്. ന്യായവിധിയില്ല.",
      cardLegalTitle: "നിങ്ങളുടെ അവകാശങ്ങൾ",
      cardLegalDesc: "നിയമം ലളിതമായ വാക്കുകളിൽ.",
      cardExitTitle: "സേഫ്റ്റി പ്ലാൻ",
      cardExitDesc: "ഒരു സമയം ഒരു ചുവട്.",
      cardClearTitle: "വ്യക്തമായി ചിന്തിക്കൂ",
      cardClearDesc: "ബുദ്ധിമുട്ടുള്ള നിമിഷങ്ങൾക്ക്.",
      cardVaultTitle: "എന്റെ ഫോൾഡർ",
      cardVaultDesc: "രേഖകൾ സ്വകാര്യമായി സൂക്ഷിക്കൂ.",
      cardSosTitle: "SOS — അലേർട്ട്",
      cardSosDesc: "വിശ്വസ്തനായ ആൾക്ക് ലൊക്കേഷൻ.",
      cardShelterTitle: "അടുത്ത ഷെൽട്ടർ",
      cardShelterDesc: "സുരക്ഷിത ഭവനങ്ങൾ അടുത്ത്.",
      cardJournalTitle: "മൂഡ് ജേണൽ",
      cardJournalDesc: "ഇന്ന് എങ്ങനെ തോന്നുന്നു?",
      lockLabel: "സേഫ് സ്‌പേസ്",
      backShopping: "← ഷോപ്പിങ്ങിലേക്ക്",
      chatHeader: "ഇവിടെ സംസാരിക്കൂ. ഇത് സുരക്ഷിതം. 🌸",
      chatPlaceholder: "എന്തും ടൈപ്പ് ചെയ്യൂ…",
      chatSend: "അയക്കൂ",
      pinLabel: "4-അക്ക PIN നൽകൂ",
      pinNew: "പുതിയ 4-അക്ക PIN ഉണ്ടാക്കൂ",
      sosTitle: "SOS — അലേർട്ട്",
      sosSave: "സേവ് ചെയ്യൂ",
      sosSend: "ഇപ്പോൾ അയക്കൂ",
      sosSent: "അലേർട്ട് അയച്ചു.",
      sosNoContact: "ആദ്യം ഒരു ബന്ധപ്പെടൽ സേവ് ചെയ്യൂ.",
      planTitle: "സേഫ്റ്റി പ്ലാൻ",
      journalTitle: "മൂഡ് ജേണൽ",
      breatheTitle: "വ്യക്തമായി ചിന്തിക്കൂ",
      helplinesTitle: "ഹെൽപ്‌ലൈൻ",
      shelterTitle: "ഷെൽട്ടർ",
      rightsTitle: "നിങ്ങളുടെ അവകാശങ്ങൾ",
    },
  };
  let lang = "EN";
  const t = (k) => i18n[lang][k] || i18n.EN[k] || k;

  const HELPLINES = [
    { name: "Women Helpline (National)", number: "1091", avail: "24/7", tag: "women", tagLabel: "WOMEN" },
    { name: "Kerala Police — Women Cell", number: "1515", avail: "24/7", tag: "emergency", tagLabel: "POLICE" },
    { name: "iCall — Mental Health", number: "9152987821", avail: "Mon-Sat 8am-10pm", tag: "mental", tagLabel: "MENTAL HEALTH" },
    { name: "iDream (Youth Helpline)", number: "1800-599-0019", avail: "24/7", tag: "child", tagLabel: "YOUTH" },
    { name: "Childline India", number: "1098", avail: "24/7", tag: "child", tagLabel: "CHILD" },
    { name: "Vandrevala Foundation", number: "1860-2662-345", avail: "24/7", tag: "mental", tagLabel: "MENTAL HEALTH" },
    { name: "Kerala DISHA Helpline", number: "1056", avail: "24/7", tag: "mental", tagLabel: "CRISIS" },
    { name: "National DV Helpline", number: "181", avail: "24/7", tag: "dv", tagLabel: "DOM. VIOLENCE" },
    { name: "Legal Aid (NALSA)", number: "15100", avail: "Mon-Fri", tag: "legal", tagLabel: "LEGAL" },
    { name: "Emergency Services", number: "112", avail: "24/7", tag: "emergency", tagLabel: "EMERGENCY" },
    { name: "Fire & Rescue", number: "101", avail: "24/7", tag: "emergency", tagLabel: "FIRE" },
    { name: "Ambulance", number: "108", avail: "24/7", tag: "emergency", tagLabel: "AMBULANCE" },
  ];

  const LEGAL_ITEMS = [
    { title: "Protection of Women from Domestic Violence Act, 2005", body: "This law protects you from physical, emotional, sexual and economic abuse. You can get a Protection Order, Residence Order (right to stay in your home), and Monetary Relief — without filing a criminal case. A Magistrate can grant emergency orders same day. You do NOT need to leave your home to get protection." },
    { title: "How to file an FIR for domestic violence", body: "Visit any police station and give a written or oral complaint. The officer must register an FIR immediately. If refused, you can complain to the Superintendent of Police or file a complaint directly with a Magistrate. Section 498A IPC makes cruelty by a husband or his relatives a criminal offence." },
    { title: "Restraining Orders — How they work", body: "A Magistrate can issue a Temporary Injunction preventing the abuser from entering your home, workplace or children's school. This can be granted in an emergency without even hearing the other side first. Violation of this order is punishable with imprisonment." },
    { title: "Maintenance & Financial Rights", body: "Under Section 125 CrPC, any woman (regardless of religion) who cannot maintain herself can claim monthly maintenance from her husband. This includes divorced wives during the divorce proceedings. Courts can also order interim maintenance payable within 60 days of application." },
    { title: "Child Custody Rights", body: "Courts decide custody in the 'best interest of the child.' For children under 5, courts generally prefer the mother. You can apply for interim custody immediately. The Guardians & Wards Act 1890 applies to non-Hindus. A Protection Officer or NGO can help you file the application for free." },
    { title: "Divorce — Your Rights", body: "You can file for divorce on grounds including cruelty, desertion, adultery, and mental disorder. Section 13B Hindu Marriage Act allows mutual consent divorce. During proceedings you are entitled to maintenance. You retain rights to matrimonial property acquired during marriage. Seek legal aid from District Legal Services Authority (free of cost)." },
    { title: "Right to Free Legal Aid", body: "Every woman who cannot afford a lawyer is entitled to free legal services under the Legal Services Authorities Act 1987. Contact your District Legal Services Authority (DLSA) or call NALSA helpline 15100. Services are completely free and confidential." },
  ];

  const SHELTERS = [
    { district: "Thiruvananthapuram", name: "Bhoomika (KSACS)", phone: "0471-2300069", address: "Medical College Rd, TVM" },
    { district: "Thiruvananthapuram", name: "Nirbhaya Home", phone: "0471-2533892", address: "Pattom, TVM" },
    { district: "Ernakulam", name: "Snehadaan", phone: "0484-2361234", address: "Near General Hospital, Kochi" },
    { district: "Ernakulam", name: "Savithri Home", phone: "0484-2555100", address: "Ernakulam South" },
    { district: "Kozhikode", name: "Suraksha Sadan", phone: "0495-2760001", address: "Kozhikode Medical College" },
    { district: "Thrissur", name: "Prajwala Shelter", phone: "0487-2420001", address: "Thrissur Town" },
    { district: "Palakkad", name: "WCD Shelter Home", phone: "0491-2505100", address: "Palakkad Collectorate Rd" },
    { district: "Kollam", name: "Nirbhaya Kollam", phone: "0474-2792200", address: "Polayathode, Kollam" },
    { district: "Kannur", name: "Vanitha Bhavan", phone: "0497-2706100", address: "Kannur Town" },
    { district: "Kasaragod", name: "Sakhi One-Stop", phone: "04994-221100", address: "District Hospital, Kasaragod" },
    { district: "Malappuram", name: "Bhumika Shelter", phone: "0483-2734000", address: "Malappuram Town" },
    { district: "Alappuzha", name: "Nirbhaya Alappuzha", phone: "0477-2244100", address: "Collectorate Jn, Alappuzha" },
    { district: "Kottayam", name: "Prajyothi Home", phone: "0481-2564100", address: "Kottayam Medical College" },
    { district: "Idukki", name: "Sukrutham", phone: "04862-222100", address: "Painavu, Idukki" },
    { district: "Pathanamthitta", name: "Snehatheeram", phone: "0468-2222100", address: "Pathanamthitta Town" },
    { district: "Wayanad", name: "Haritha Bhavan", phone: "04936-202100", address: "Kalpetta, Wayanad" },
  ];

  const CALM_EXERCISES = [
    { id: "54321", icon: "🌿", title: "5-4-3-2-1 Grounding", desc: "Bring yourself back to the present moment.", steps: [{ label: "5 things you can SEE", prompt: "Look around. Name 5 things you can see right now." }, { label: "4 things you can TOUCH", prompt: "Feel them — the floor, fabric, a wall, your own hands." }, { label: "3 things you can HEAR", prompt: "Listen quietly — wind, a hum, your own breath." }, { label: "2 things you can SMELL", prompt: "Notice any scent near you — soap, tea, fresh air." }, { label: "1 thing you can TASTE", prompt: "Any taste in your mouth? Just notice it gently." }] },
    { id: "boxbreath", icon: "💨", title: "Box Breathing", desc: "Calm your nervous system in 4 minutes.", steps: [{ label: "Breathe IN", prompt: "Inhale slowly through your nose.", duration: 4 }, { label: "Hold", prompt: "Hold gently. You are safe.", duration: 4 }, { label: "Breathe OUT", prompt: "Exhale slowly through your mouth.", duration: 4 }, { label: "Hold", prompt: "Hold at the bottom. Then begin again.", duration: 4 }], repeat: 4 },
    { id: "body", icon: "🧘", title: "Body Scan", desc: "Release tension from head to toe.", steps: [{ label: "Scalp & Forehead", prompt: "Soften your forehead. Let your scalp relax." }, { label: "Jaw & Neck", prompt: "Unclench your jaw. Let your neck be loose." }, { label: "Shoulders", prompt: "Drop them away from your ears. Release." }, { label: "Chest & Belly", prompt: "Take a slow breath. Let your belly soften." }, { label: "Hands", prompt: "Open your fists. Spread your fingers wide." }, { label: "Legs & Feet", prompt: "Feel the ground beneath you. Let everything go." }] },
    { id: "affirm", icon: "💛", title: "Kind Words to Yourself", desc: "You deserve kindness — especially from yourself.", steps: [{ label: "Say to yourself:", prompt: '"I am doing the best I can."' }, { label: "Say to yourself:", prompt: '"This feeling will pass."' }, { label: "Say to yourself:", prompt: '"I am allowed to take up space."' }, { label: "Say to yourself:", prompt: '"I am not alone."' }, { label: "Say to yourself:", prompt: '"I deserve safety and peace."'}] },
  ];

  const PLAN_PROMPTS = [
    { key: "warn", label: "Warning Signs", placeholder: "What signs tell you danger may be coming?" },
    { key: "safe", label: "Safe Rooms / Exits", placeholder: "Which rooms have exits? Can you lock a door?" },
    { key: "bag", label: "My Go-Bag", placeholder: "ID, phone charger, medicines, some cash, children's documents" },
    { key: "call1", label: "First Person to Call", placeholder: "Who can you call first? Name & number." },
    { key: "call2", label: "Backup Contact", placeholder: "A second trusted person — neighbour, friend, relative." },
    { key: "code", label: "Code Word", placeholder: "A word you can text that means 'I need help now'" },
    { key: "money", label: "Emergency Money", placeholder: "Where can you safely keep a small amount of cash?" },
    { key: "docs", label: "Documents Ready", placeholder: "List documents to take (Aadhaar, passbook, children's records)" },
    { key: "kids", label: "Children's Plan", placeholder: "If children are with you, what is the plan?" },
    { key: "after", label: "After Leaving", placeholder: "Where will you go first? What is the address?" },
  ];

  const MOODS = [
    { emoji: "😌", label: "Calm", score: 5 },
    { emoji: "😊", label: "Okay", score: 4 },
    { emoji: "😟", label: "Anxious", score: 3 },
    { emoji: "😢", label: "Sad", score: 2 },
    { emoji: "😰", label: "Scared", score: 1 },
  ];

  let logoClicks = 0,
    logoTimer = null;
  let chatHistory = [];
  let breathTimer = null,
    calmStepIdx = 0,
    calmCurrentEx = null;

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => [...(c || document).querySelectorAll(s)];
  const el = (tag, attrs = {}, ...ch) => {
    const e = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "className") e.className = v;
      else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
      else e.setAttribute(k, v);
    });
    ch.flat().forEach((c) => e.append(typeof c === "string" ? document.createTextNode(c) : c));
    return e;
  };

  function getToken() {
    return localStorage.getItem(JWT_KEY);
  }
  function setToken(t) {
    if (t) localStorage.setItem(JWT_KEY, t);
    else localStorage.removeItem(JWT_KEY);
  }

  async function api(path, opts = {}) {
    const headers = { ...(opts.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = "Bearer " + token;
    if (opts.body && typeof opts.body === "object" && !(opts.body instanceof FormData))
      headers["Content-Type"] = "application/json";
    const r = await fetch("/api" + path, {
      ...opts,
      headers,
      body: opts.body instanceof FormData ? opts.body : typeof opts.body === "object" ? JSON.stringify(opts.body) : opts.body,
    });
    return r;
  }

  function showToast(msg, dur = 2800) {
    const t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), dur);
  }

  function updateLoginButtonLabel() {
    const loginBtn = $("#btn-open-login");
    if (!loginBtn) return;
    const token = getToken();
    if (!token) {
      loginBtn.textContent = "Sign In";
      return;
    }
    const email = $("#login-email")?.value?.trim();
    const stored = sessionStorage.getItem("sc_display_name");
    if (stored) {
      loginBtn.textContent = "👤 " + stored;
      return;
    }
    if (email) loginBtn.textContent = "👤 " + email.split("@")[0];
    else loginBtn.textContent = "👤 Account";
  }

  async function refreshSessionUi() {
    const token = getToken();
    if (!token) {
      updateLoginButtonLabel();
      return;
    }
    try {
      const r = await api("/auth/me");
      if (r.ok) {
        const u = await r.json();
        sessionStorage.setItem("sc_display_name", (u.name || u.email.split("@")[0]).slice(0, 24));
      }
    } catch (_) {}
    updateLoginButtonLabel();
  }

  function showSafeLayer() {
    const shop = $("#layer-shop"),
      safe = $("#layer-safe"),
      curtain = $("#layer-transition");
    curtain.style.display = "block";
    curtain.style.opacity = "0";
    curtain.style.transition = "opacity 0.4s ease";
    requestAnimationFrame(() => {
      curtain.style.opacity = "1";
      setTimeout(() => {
        shop.style.display = "none";
        safe.hidden = false;
        safe.setAttribute("aria-hidden", "false");
        curtain.style.opacity = "0";
        setTimeout(() => {
          curtain.style.display = "none";
        }, 400);
        applyLang();
      }, 400);
    });
  }

  function showShopLayer() {
    const shop = $("#layer-shop"),
      safe = $("#layer-safe"),
      curtain = $("#layer-transition");
    curtain.style.display = "block";
    curtain.style.opacity = "0";
    curtain.style.transition = "opacity 0.4s ease";
    closeAllPanels();
    requestAnimationFrame(() => {
      curtain.style.opacity = "1";
      setTimeout(() => {
        safe.hidden = true;
        safe.setAttribute("aria-hidden", "true");
        shop.style.display = "block";
        curtain.style.opacity = "0";
        setTimeout(() => {
          curtain.style.display = "none";
        }, 400);
      }, 350);
    });
  }

  function showPasswordGate() {
    const gate = $("#pwd-gate");
    if (!gate) return;
    gate.classList.add("open");
    const inp = $("#pwd-input");
    if (inp) {
      inp.value = "";
      inp.focus();
    }
    $("#pwd-error").textContent = "";
  }

  function hidePasswordGate() {
    const gate = $("#pwd-gate");
    if (gate) gate.classList.remove("open");
  }

  function initPasswordGate() {
    const inp = $("#pwd-input"),
      btn = $("#btn-pwd-enter"),
      cancel = $("#btn-pwd-cancel"),
      toggle = $("#pwd-toggle-vis");

    async function tryEnter() {
      if (!getToken()) {
        showToast("Please sign in to your shop account first.");
        return;
      }
      const val = (inp ? inp.value : "").trim();
      if (!val) {
        $("#pwd-error").textContent = "Enter your private password.";
        return;
      }
      const r = await api("/safe/unlock", { method: "POST", body: { password: val } });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        hidePasswordGate();
        showSafeLayer();
        return;
      }
      const errEl = $("#pwd-error");
      if (errEl) errEl.textContent = data.error || "Could not verify. Try again.";
      if (inp) {
        inp.classList.add("error");
        setTimeout(() => inp.classList.remove("error"), 500);
      }
    }

    if (btn) btn.addEventListener("click", tryEnter);
    if (inp) inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") tryEnter();
    });
    if (cancel) cancel.addEventListener("click", () => hidePasswordGate());
    if (toggle && inp) {
      toggle.addEventListener("click", () => {
        inp.type = inp.type === "password" ? "text" : "password";
        toggle.textContent = inp.type === "password" ? "👁" : "🙈";
      });
    }
  }

  function initLogoTrigger() {
    const btn = $("#logo-trigger");
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (!getToken()) {
        showToast("Sign in first — then your private space unlocks.");
        return;
      }
      logoClicks++;
      if (logoTimer) clearTimeout(logoTimer);
      logoTimer = setTimeout(() => {
        logoClicks = 0;
      }, LOGO_CLICK_WINDOW);
      if (logoClicks >= LOGO_CLICK_THRESHOLD) {
        logoClicks = 0;
        clearTimeout(logoTimer);
        showPasswordGate();
      }
    });
  }

  function initPanicExit() {
    const btn = $("#panic-exit");
    if (btn) btn.addEventListener("click", showShopLayer);
  }

  function initLangToggle() {
    const btn = $("#lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      lang = lang === "EN" ? "ML" : "EN";
      btn.textContent = lang === "EN" ? "EN | ML" : "ML | EN";
      applyLang();
    });
  }

  function applyLang() {
    const wt = $("#safe-welcome-title"),
      ws = $("#safe-welcome-sub");
    if (wt) wt.textContent = t("welcome");
    if (ws) ws.textContent = t("welcomeSub");
    const ll = $("#safe-lock-label");
    if (ll) ll.textContent = t("lockLabel");
    const pe = $("#panic-exit");
    if (pe) pe.textContent = t("backShopping");
    $$("[data-i18n]").forEach((e) => {
      const k = e.dataset.i18n;
      if (i18n[lang][k]) e.textContent = i18n[lang][k];
    });
  }

  function initLoginModal() {
    const overlay = $("#login-overlay"),
      openBtn = $("#btn-open-login"),
      closeBtn = $("#login-close-btn");
    if (!overlay) return;

    if (openBtn) {
      openBtn.addEventListener("click", () => {
        if (getToken()) {
          if (confirm("Sign out of your shop account?")) {
            setToken(null);
            sessionStorage.removeItem("sc_display_name");
            updateLoginButtonLabel();
            showToast("Signed out.");
          }
          return;
        }
        overlay.classList.add("open");
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", () => overlay.classList.remove("open"));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });

    $$(".login-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const which = tab.dataset.loginTab;
        $$(".login-tab").forEach((x) => x.classList.remove("active"));
        $$(".login-panel").forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const panel = $("#login-panel-" + which);
        if (panel) panel.classList.add("active");
      });
    });

    $$("[data-login-switch]").forEach((link) => {
      link.addEventListener("click", () => {
        const which = link.dataset.loginSwitch;
        $$(".login-tab").forEach((x) => x.classList.toggle("active", x.dataset.loginTab === which));
        $$(".login-panel").forEach((p) => p.classList.toggle("active", p.id === "login-panel-" + which));
      });
    });

    const signinBtn = $("#btn-signin");
    if (signinBtn)
      signinBtn.addEventListener("click", async () => {
        const email = $("#login-email")?.value?.trim();
        const password = $("#login-password")?.value || "";
        if (!email) {
          showToast("Please enter your email address.");
          return;
        }
        if (!password) {
          showToast("Please enter your password.");
          return;
        }
        const r = await api("/auth/login", { method: "POST", body: { email, password } });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          showToast(data.error || "Login failed.");
          return;
        }
        setToken(data.token);
        sessionStorage.setItem("sc_display_name", (data.user?.name || email.split("@")[0]).slice(0, 24));
        showToast("Welcome back!");
        overlay.classList.remove("open");
        updateLoginButtonLabel();
      });

    const regBtn = $("#btn-register");
    if (regBtn)
      regBtn.addEventListener("click", async () => {
        const name = $("#register-name")?.value?.trim() || "";
        const email = $("#register-email")?.value?.trim();
        const password = $("#register-password")?.value || "";
        const safePassword = $("#register-safe-pwd")?.value || "";
        if (!email || !password) {
          showToast("Email and password are required.");
          return;
        }
        if (password.length < 6) {
          showToast("Password must be at least 6 characters.");
          return;
        }
        if (!safePassword || safePassword.length < 4) {
          showToast("Private space password is required (min 4 characters).");
          return;
        }
        const r = await api("/auth/register", {
          method: "POST",
          body: { email, password, name, safePassword },
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          showToast(data.error || "Could not create account.");
          return;
        }
        setToken(data.token);
        sessionStorage.setItem("sc_display_name", (data.user?.name || email.split("@")[0]).slice(0, 24));
        showToast("Account created. Your private password unlocks Safe Space.");
        overlay.classList.remove("open");
        updateLoginButtonLabel();
      });

    $$(".btn-social").forEach((b) =>
      b.addEventListener("click", () => showToast("Social login is not enabled in this demo."))
    );
  }

  function closeAllPanels() {
    $$(".safe-full,.safe-chat-panel").forEach((p) => {
      p.hidden = true;
      p.setAttribute("aria-hidden", "true");
    });
  }

  function initCards() {
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".safe-card[data-panel]");
      if (card) {
        if (!getToken()) {
          showToast("Session missing. Sign in again.");
          return;
        }
        openPanel(card.dataset.panel);
        return;
      }
      const closeEl = e.target.closest("[data-close-panel]");
      if (closeEl && !$("#layer-safe")?.hidden) closeAllPanels();
    });
  }

  function openPanel(id) {
    closeAllPanels();
    const panel = $("#panel-" + id);
    if (!panel) return;
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    panel.scrollTop = 0;
    if (id === "helpline") renderHelplines();
    if (id === "chat") renderChat();
    if (id === "legal") renderLegal();
    if (id === "exit") renderPlan();
    if (id === "calm") renderCalm();
    if (id === "vault") renderVault();
    if (id === "sos") renderSos();
    if (id === "shelter") renderShelter();
    if (id === "journal") renderJournal();
  }

  function buildSafeDOM() {
    const cards = $("#safe-cards");
    if (!cards) return;
    const cardDefs = [
      { panel: "helpline", icon: "📞", titleKey: "cardHelplines", descKey: "cardHelplinesD" },
      { panel: "chat", icon: "🤍", titleKey: "cardChatTitle", descKey: "cardChatDesc" },
      { panel: "legal", icon: "⚖️", titleKey: "cardLegalTitle", descKey: "cardLegalDesc" },
      { panel: "exit", icon: "🗒️", titleKey: "cardExitTitle", descKey: "cardExitDesc" },
      { panel: "calm", icon: "🧘", titleKey: "cardClearTitle", descKey: "cardClearDesc" },
      { panel: "vault", icon: "🔐", titleKey: "cardVaultTitle", descKey: "cardVaultDesc" },
      { panel: "sos", icon: "🚨", titleKey: "cardSosTitle", descKey: "cardSosDesc" },
      { panel: "shelter", icon: "🏠", titleKey: "cardShelterTitle", descKey: "cardShelterDesc" },
      { panel: "journal", icon: "📓", titleKey: "cardJournalTitle", descKey: "cardJournalDesc" },
    ];
    cards.innerHTML = cardDefs
      .map(
        (c) => `
    <button type="button" class="safe-card" data-panel="${c.panel}">
      <div class="safe-card-icon-wrap">${c.icon}</div>
      <span class="safe-card-title" data-i18n="${c.titleKey}">${i18n.EN[c.titleKey]}</span>
      <span class="safe-card-desc" data-i18n="${c.descKey}">${i18n.EN[c.descKey]}</span>
    </button>
  `
      )
      .join("");

    const layer = $("#layer-safe");
    if (!layer) return;
    layer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="safe-full" id="panel-helpline" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">Helplines</span>
      </div>
      <div class="panel-body" id="helpline-list"></div>
    </div>

    <div class="safe-chat-panel" id="panel-chat" hidden aria-hidden="true">
      <div class="safe-panel-head">
        <div class="chat-head-info">
          <div class="chat-avatar">🌸</div>
          <div>
            <div class="chat-name" id="chat-header-text">Talk to someone safe</div>
            <div class="chat-online">● Private & confidential</div>
          </div>
        </div>
        <button class="panel-close" data-close-panel aria-label="Close">×</button>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-typing" id="chat-typing" hidden><span></span><span></span><span></span></div>
      <form class="chat-form" id="chat-form">
        <input type="text" id="chat-input" autocomplete="off" placeholder="Type anything…" />
        <button type="submit" class="btn-chat-send" id="chat-send">➤</button>
      </form>
    </div>

    <div class="safe-full" id="panel-legal" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">Know Your Rights</span>
      </div>
      <div class="panel-body">
        <div class="legal-accordion" id="legal-accordion"></div>
      </div>
    </div>

    <div class="safe-full" id="panel-exit" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">My Safety Plan</span>
      </div>
      <div class="panel-body" id="plan-body"></div>
    </div>

    <div class="safe-full" id="panel-calm" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">Think Clearly</span>
      </div>
      <div class="panel-body" id="calm-body"></div>
    </div>

    <div class="safe-full" id="panel-vault" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">My Safe Folder</span>
      </div>
      <div id="vault-main" style="padding:16px 20px;">
        <div class="vault-drop" id="vault-drop">
          <input type="file" id="vault-file" multiple accept="image/*,.pdf" hidden />
          <div class="vault-drop-icon">📁</div>
          <p>Tap to upload — images & PDFs (saved on server)</p>
          <p style="font-size:0.74rem;color:#9a7a8a;margin-top:6px;">Max 4 MB per file</p>
        </div>
        <div class="vault-thumbs" id="vault-thumbs"></div>
      </div>
    </div>

    <div class="safe-full" id="panel-sos" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">SOS — Alert Trusted Person</span>
      </div>
      <div class="panel-body" id="sos-content"></div>
    </div>

    <div class="safe-full" id="panel-shelter" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">Find Shelter Nearby</span>
      </div>
      <div class="panel-body" id="shelter-list"></div>
    </div>

    <div class="safe-full" id="panel-journal" hidden aria-hidden="true">
      <div class="panel-topbar">
        <button class="back-to-cards" data-close-panel>← Back</button>
        <span class="panel-title">Mood Journal</span>
      </div>
      <div class="panel-body" id="journal-body"></div>
    </div>
  `
    );
  }

  function renderHelplines() {
    const list = $("#helpline-list");
    if (!list) return;
    list.innerHTML = "";
    const tagClass = { dv: "tag-dv", mental: "tag-mental", child: "tag-child", women: "tag-women", emergency: "tag-emergency", legal: "tag-legal" };
    const groups = [
      { label: "Emergency & Police", keys: ["emergency"] },
      { label: "Women & Domestic Violence", keys: ["women", "dv"] },
      { label: "Mental Health & Crisis", keys: ["mental"] },
      { label: "Children & Youth", keys: ["child"] },
      { label: "Legal Aid", keys: ["legal"] },
    ];
    groups.forEach((g) => {
      const label = el("p", { className: "helpline-section-label" });
      label.textContent = g.label;
      list.appendChild(label);
      HELPLINES.filter((h) => g.keys.includes(h.tag)).forEach((h) => {
        const card = el("div", { className: "helpline-card" });
        card.innerHTML = `<div class="helpline-info"><span class="helpline-name">${h.name}</span><span class="helpline-avail">${h.avail}</span></div><div class="helpline-right"><span class="helpline-tag ${tagClass[h.tag] || ""}">${h.tagLabel}</span><a href="tel:${h.number}" class="helpline-number">${h.number}</a><a href="tel:${h.number}" class="btn-call">Call</a></div>`;
        list.appendChild(card);
      });
    });
  }

  function renderChat() {
    const msgs = $("#chat-messages");
    if (!msgs) return;
    if (msgs.children.length === 0) {
      const welcome =
        "Hello 🌸 I'm here with you. This is a private, safe space. You can talk about anything — I will listen without judgment. How are you feeling right now?";
      appendChatMsg("ai", welcome);
      chatHistory = [];
    }
    const form = $("#chat-form");
    if (!form) return;
    form.onsubmit = async (e) => {
      e.preventDefault();
      const inp = $("#chat-input");
      if (!inp || !inp.value.trim()) return;
      const msg = inp.value.trim();
      inp.value = "";
      appendChatMsg("user", msg);
      chatHistory.push({ role: "user", content: msg });
      const typing = $("#chat-typing");
      if (typing) typing.hidden = false;
      try {
        const r = await api("/chat", { method: "POST", body: { messages: chatHistory } });
        const data = await r.json().catch(() => ({}));
        if (typing) typing.hidden = true;
        const reply = data.reply || "I'm here with you. You are not alone. 💗";
        chatHistory.push({ role: "assistant", content: reply });
        appendChatMsg("ai", reply);
      } catch {
        if (typing) typing.hidden = true;
        appendChatMsg(
          "ai",
          "I'm here with you. If chat cannot load, call the Women's Helpline at **181** or **1091** anytime. You are not alone. 💗"
        );
      }
    };
  }

  function appendChatMsg(who, text) {
    const msgs = $("#chat-messages");
    if (!msgs) return;
    const wrap = el("div", { className: `chat-msg ${who}` });
    const avatar = el("div", { className: "chat-msg-avatar" });
    avatar.textContent = who === "ai" ? "🌸" : "👤";
    const bubble = el("div", { className: "chat-bubble" });
    bubble.textContent = text;
    wrap.append(avatar, bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function renderLegal() {
    const acc = $("#legal-accordion");
    if (!acc) return;
    acc.innerHTML = "";
    LEGAL_ITEMS.forEach((item) => {
      const div = el("div", { className: "legal-item" });
      const q = el("div", { className: "legal-q" });
      const qText = el("span");
      qText.textContent = item.title;
      const icon = el("span", { className: "legal-q-icon" });
      icon.textContent = "▾";
      q.append(qText, icon);
      const a = el("div", { className: "legal-a" });
      a.textContent = item.body;
      q.addEventListener("click", () => div.classList.toggle("open"));
      div.append(q, a);
      acc.appendChild(div);
    });
  }

  function renderPlan() {
    const body = $("#plan-body");
    if (!body) return;
    body.innerHTML = "";
    const intro = el("div", { className: "safe-inner-card", style: "margin-bottom:16px;" });
    intro.innerHTML = `<p style="font-size:0.88rem;color:#6a4a58;line-height:1.65;">Your safety plan is saved to your account on this demo server. Fill in as much or as little as you want — every step helps. 🌸</p>`;
    body.appendChild(intro);

    const form = el("div", { className: "" });
    const areas = {};

    (async () => {
      let saved = {};
      try {
        const r = await api("/safety-plan");
        if (r.ok) saved = await r.json();
      } catch (_) {}

      PLAN_PROMPTS.forEach((p) => {
        const field = el("div", { className: "plan-field" });
        const label = el("p", { className: "plan-label" });
        label.textContent = p.label;
        const area = el("textarea", { className: "plan-textarea", placeholder: p.placeholder, rows: "3" });
        area.value = saved[p.key] || "";
        areas[p.key] = area;
        field.append(label, area);
        form.appendChild(field);
      });

      const saveBtn = el("button", { type: "button", className: "btn btn-plan-save" });
      saveBtn.textContent = "Save My Plan 🌸";
      const savedNote = el("p", { className: "plan-saved-note", style: "display:none;" });
      savedNote.textContent = "✓ Saved to your account.";
      saveBtn.addEventListener("click", async () => {
        const plan = {};
        Object.entries(areas).forEach(([k, v]) => (plan[k] = v.value));
        const r = await api("/safety-plan", { method: "POST", body: plan });
        if (!r.ok) {
          showToast("Could not save. Check connection.");
          return;
        }
        savedNote.style.display = "block";
        saveBtn.textContent = "Saved ✓";
        setTimeout(() => {
          savedNote.style.display = "none";
          saveBtn.textContent = "Save My Plan 🌸";
        }, 3000);
      });
      form.append(saveBtn, savedNote);
      body.appendChild(form);
    })();
  }

  function renderCalm() {
    const body = $("#calm-body");
    if (!body) return;
    body.innerHTML = "";
    const intro = el("p", { style: "font-size:0.9rem;color:#6a4a58;margin-bottom:20px;line-height:1.6;" });
    intro.textContent = "Choose an exercise. These are grounding tools for hard moments. You can use them anywhere, anytime.";
    body.appendChild(intro);

    const grid = el("div", { className: "calm-grid" });
    CALM_EXERCISES.forEach((ex) => {
      const card = el("div", { className: "calm-ex-card" });
      card.innerHTML = `<div class="calm-ex-icon">${ex.icon}</div><div class="calm-ex-title">${ex.title}</div><div class="calm-ex-desc">${ex.desc}</div>`;
      card.addEventListener("click", () => startCalmExercise(ex, body));
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  function startCalmExercise(ex, body) {
    calmCurrentEx = ex;
    calmStepIdx = 0;
    if (breathTimer) {
      clearInterval(breathTimer);
      breathTimer = null;
    }
    body.innerHTML = "";

    const backBtn = el("button", { type: "button", className: "back-to-cards", style: "display:block;padding:14px 20px;" });
    backBtn.textContent = "← Back to exercises";
    backBtn.addEventListener("click", () => renderCalm());
    body.appendChild(backBtn);

    const header = el("div", { className: "calm-step-header" });
    header.textContent = ex.icon + " " + ex.title;
    const stepBox = el("div", { className: "calm-step-box" });
    const stepLabel = el("div", { className: "calm-step-label" });
    const stepPrompt = el("div", { className: "calm-step-prompt" });
    stepBox.append(stepLabel, stepPrompt);

    const nav = el("div", { className: "calm-nav" });
    const prevBtn = el("button", { type: "button", className: "btn btn-calm-nav btn-calm-prev" });
    prevBtn.textContent = "← Previous";
    const nextBtn = el("button", { type: "button", className: "btn btn-calm-nav btn-calm-next" });
    nextBtn.textContent = "Next →";

    function renderStep() {
      if (breathTimer) {
        clearInterval(breathTimer);
        breathTimer = null;
      }
      const step = ex.steps[calmStepIdx];
      stepLabel.textContent = `Step ${calmStepIdx + 1} of ${ex.steps.length}`;
      stepPrompt.textContent = step.prompt;
      prevBtn.disabled = calmStepIdx === 0;
      nextBtn.textContent = calmStepIdx === ex.steps.length - 1 ? "✓ Done" : "Next →";
    }

    prevBtn.addEventListener("click", () => {
      if (calmStepIdx > 0) {
        calmStepIdx--;
        renderStep();
      }
    });
    nextBtn.addEventListener("click", () => {
      if (calmStepIdx < ex.steps.length - 1) {
        calmStepIdx++;
        renderStep();
      } else {
        stepBox.innerHTML = `<div style="font-size:2rem;margin-bottom:12px;">💛</div><div style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-style:italic;color:#3d2535;">Well done. You showed up for yourself today.</div>`;
        nextBtn.style.display = "none";
      }
    });
    nav.append(prevBtn, nextBtn);
    body.append(header, stepBox, nav);
    renderStep();
  }

  let vaultBound = false;

  function bindVaultOnce() {
    if (vaultBound) return;
    vaultBound = true;
    const drop = $("#vault-drop"),
      fileIn = $("#vault-file");
    if (drop && fileIn) {
      drop.addEventListener("click", () => fileIn.click());
      drop.addEventListener("dragover", (e) => {
        e.preventDefault();
        drop.classList.add("dragover");
      });
      drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));
      drop.addEventListener("drop", (e) => {
        e.preventDefault();
        drop.classList.remove("dragover");
        handleVaultFiles(e.dataTransfer.files);
      });
      fileIn.addEventListener("change", () => handleVaultFiles(fileIn.files));
    }
  }

  async function renderVault() {
    bindVaultOnce();
    await renderVaultThumbs();
  }

  async function handleVaultFiles(fileList) {
    const files = [...fileList];
    if (!files.length) return;
    for (const f of files) {
      if (f.size > 4 * 1024 * 1024) {
        showToast("File too large (max 4 MB)");
        continue;
      }
      const fd = new FormData();
      fd.append("file", f);
      const r = await api("/vault", { method: "POST", body: fd });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        showToast(d.error || "Upload failed");
        continue;
      }
    }
    showToast("Upload complete");
    await renderVaultThumbs();
  }

  async function renderVaultThumbs() {
    const thumbs = $("#vault-thumbs");
    if (!thumbs) return;
    thumbs.innerHTML = "";
    const token = getToken();
    let list = [];
    try {
      const r = await api("/vault");
      if (r.ok) list = await r.json();
    } catch (_) {}
    if (!list.length) {
      thumbs.innerHTML = `<p style="color:#9a7a8a;font-size:0.85rem;text-align:center;padding:20px;">No files yet. Tap above to upload.</p>`;
      return;
    }
    list.forEach((f) => {
      const t = el("div", { className: "vault-thumb" });
      const src = `/api/vault/file/${f.id}?token=${encodeURIComponent(token)}`;
      if (String(f.mime || "").startsWith("image/")) {
        const img = el("img");
        img.src = src;
        img.alt = f.name;
        t.appendChild(img);
      } else {
        t.style.display = "flex";
        t.style.alignItems = "center";
        t.style.justifyContent = "center";
        t.style.background = "#fde8ee";
        t.innerHTML = `<span style="font-size:1.8rem">📄</span>`;
      }
      const lbl = el("div", { className: "vault-thumb-label" });
      lbl.textContent = f.name;
      t.appendChild(lbl);
      const del = el("button", { type: "button", className: "vault-thumb-del" });
      del.textContent = "×";
      del.addEventListener("click", async (e) => {
        e.stopPropagation();
        const r = await api("/vault/" + f.id, { method: "DELETE" });
        if (r.ok) renderVaultThumbs();
        else showToast("Could not delete file.");
      });
      t.appendChild(del);
      thumbs.appendChild(t);
    });
  }

  async function renderSos() {
    const wrap = $("#sos-content");
    if (!wrap) return;
    wrap.innerHTML = "";
    let saved = { name: "", phone: "", msg: "I need help right now. This is my location." };
    try {
      const r = await api("/sos");
      if (r.ok) saved = await r.json();
    } catch (_) {}

    const contactCard = el("div", { className: "sos-contact-card" });
    const cl = el("p", { className: "sos-section-label" });
    cl.textContent = "Trusted Contact";
    const nameIn = el("input", { type: "text", className: "sos-input", placeholder: "Contact name" });
    nameIn.value = saved.name || "";
    const phoneIn = el("input", { type: "tel", className: "sos-input", placeholder: "Phone number" });
    phoneIn.value = saved.phone || "";
    const msgIn = el("textarea", { className: "sos-input sos-textarea", placeholder: "Custom alert message (optional)" });
    msgIn.value = saved.msg || "";
    const saveBtn = el("button", { type: "button", className: "btn btn-sos-save" });
    saveBtn.textContent = "Save Contact 🌸";
    saveBtn.addEventListener("click", async () => {
      const r = await api("/sos", {
        method: "POST",
        body: { name: nameIn.value, phone: phoneIn.value, msg: msgIn.value },
      });
      if (r.ok) showToast("✓ Contact saved on server.");
      else showToast("Could not save.");
    });
    contactCard.append(cl, nameIn, phoneIn, msgIn, saveBtn);

    const sendCard = el("div", { className: "sos-send-card" });
    const pulse = el("span", { className: "sos-pulse-anim" });
    pulse.textContent = "🚨";
    const ask = el("p", { className: "sos-ask" });
    ask.textContent = "Send an alert to your trusted contact?";
    const yesBtn = el("button", { type: "button", className: "btn btn-sos-yes" });
    yesBtn.textContent = "Send SOS Alert Now";
    yesBtn.addEventListener("click", async () => {
      const r = await api("/sos");
      const contact = r.ok ? await r.json() : {};
      if (!contact?.phone) {
        showToast("Please save a trusted contact first.");
        return;
      }
      const smsUrl = `sms:${contact.phone}?body=${encodeURIComponent((contact.msg || "I need help.") + "\n(Sent from SafeCart Safe Space)")}`;
      window.open(smsUrl, "_self");
      showToast("✓ Opening messages…");
    });
    const note = el("p", { className: "sos-emergency-note" });
    note.innerHTML = `For immediate danger, call <a href="tel:112" class="sos-emergency-link">112</a> (Police) or <a href="tel:181" class="sos-emergency-link">181</a> (Women Helpline)`;
    sendCard.append(pulse, ask, yesBtn, note);
    wrap.append(contactCard, sendCard);
  }

  function renderShelter() {
    const list = $("#shelter-list");
    if (!list) return;
    list.innerHTML = "";

    const searchWrap = el("div", { className: "shelter-search-wrap" });
    const search = el("input", { type: "search", className: "shelter-search", placeholder: "Search by district or shelter name…" });
    const searchIcon = el("span", { className: "shelter-search-icon" });
    searchIcon.textContent = "🔍";
    searchWrap.append(search, searchIcon);
    list.appendChild(searchWrap);

    const container = el("div", { id: "shelter-district-list" });
    const byDistrict = {};
    SHELTERS.forEach((s) => {
      (byDistrict[s.district] = byDistrict[s.district] || []).push(s);
    });

    const render = (filter = "") => {
      container.innerHTML = "";
      Object.entries(byDistrict).forEach(([district, shelters]) => {
        const filtered = shelters.filter((s) => !filter || district.toLowerCase().includes(filter) || s.name.toLowerCase().includes(filter));
        if (!filtered.length) return;
        const grp = el("div", { className: "shelter-group" });
        const dlabel = el("p", { className: "shelter-district-label" });
        dlabel.textContent = district;
        grp.appendChild(dlabel);
        filtered.forEach((s) => {
          const card = el("div", { className: "shelter-card" });
          card.innerHTML = `<div class="shelter-info"><span class="shelter-name">${s.name}</span><span class="shelter-address">${s.address}</span></div><a href="tel:${s.phone}" class="shelter-call">📞 ${s.phone}</a>`;
          grp.appendChild(card);
        });
        container.appendChild(grp);
      });
    };

    search.addEventListener("input", () => render(search.value.toLowerCase().trim()));
    render();
    list.appendChild(container);
  }

  async function renderJournal() {
    const wrap = $("#journal-body");
    if (!wrap) return;
    wrap.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];
    let journal = {};
    try {
      const r = await api("/journal");
      if (r.ok) journal = await r.json();
    } catch (_) {}
    const todayEntry = journal[today] || { mood: null, note: "" };
    let selectedMood = todayEntry.mood;

    const moodCard = el("div", { className: "journal-mood-card" });
    const ml = el("p", { className: "journal-section-label" });
    ml.textContent = "How are you feeling today?";
    const moodRow = el("div", { className: "journal-mood-row" });

    const nl = el("p", { className: "journal-section-label", style: "margin-top:14px;" });
    nl.textContent = "Private note (optional)";
    const note = el("textarea", { className: "journal-note", rows: "5", placeholder: "Write anything. Stored on the demo server for your account." });
    note.value = todayEntry.note || "";

    const persist = async () => {
      const r = await api("/journal", {
        method: "POST",
        body: { date: today, mood: selectedMood, note: note.value },
      });
      if (!r.ok) showToast("Could not save entry.");
    };

    note.addEventListener("input", () => {
      clearTimeout(note._deb);
      note._deb = setTimeout(persist, 600);
    });

    MOODS.forEach((m) => {
      const btn = el("button", { type: "button", className: "mood-btn" + (selectedMood === m.label ? " mood-selected" : "") });
      btn.innerHTML = `<span class="mood-emoji">${m.emoji}</span><span class="mood-label">${m.label}</span>`;
      btn.addEventListener("click", () => {
        selectedMood = m.label;
        $$(".mood-btn", moodRow).forEach((b) => b.classList.remove("mood-selected"));
        btn.classList.add("mood-selected");
        persist();
      });
      moodRow.appendChild(btn);
    });

    const saveBtn = el("button", { type: "button", className: "btn btn-journal-save" });
    saveBtn.textContent = "Save Entry 🌸";
    saveBtn.addEventListener("click", async () => {
      await persist();
      saveBtn.textContent = "Saved ✓";
      saveBtn.style.background = `linear-gradient(135deg,#52b788,#2d6a4f)`;
      setTimeout(() => {
        saveBtn.textContent = "Save Entry 🌸";
        saveBtn.style.background = "";
      }, 2500);
    });

    moodCard.append(ml, moodRow, nl, note, saveBtn);

    const pastCard = el("div", { className: "journal-past-card" });
    const pl = el("p", { className: "journal-section-label" });
    pl.textContent = "Recent entries";
    const pastList = el("div", { className: "journal-past-list" });
    const allEntries = Object.entries(journal).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 14);

    if (!allEntries.length) {
      pastList.innerHTML = `<p class="journal-empty">No entries yet. Start today 🌸</p>`;
    } else {
      allEntries.forEach(([date, entry]) => {
        if (date === today) return;
        const moodObj = MOODS.find((x) => x.label === entry.mood);
        const row = el("div", { className: "journal-past-row" });
        row.innerHTML = `<span class="journal-past-date">${date}</span><span class="journal-past-mood">${moodObj ? moodObj.emoji : "—"} ${entry.mood || ""}</span><span class="journal-past-note">${entry.note ? entry.note.slice(0, 70) + (entry.note.length > 70 ? "…" : "") : ""}</span>`;
        pastList.appendChild(row);
      });
    }
    pastCard.append(pl, pastList);

    const clearBtn = el("button", { type: "button", className: "btn btn-journal-clear" });
    clearBtn.textContent = "Clear All Entries";
    clearBtn.addEventListener("click", async () => {
      if (!confirm("Delete all journal entries for your account?")) return;
      const r = await api("/journal", { method: "DELETE" });
      if (r.ok) renderJournal();
      else showToast("Could not clear.");
    });

    wrap.append(moodCard, pastCard, clearBtn);
  }

  function initShopDecoys() {
    $$(".shop-add-btn").forEach((b) =>
      b.addEventListener("click", () => showToast("Added to cart (demo)"))
    );
    const heroBtn = $(".shop-hero-btn");
    if (heroBtn) heroBtn.addEventListener("click", () => showToast("Collection — demo only"));
  }

  function initDecoy() {
    const fg = $("#footer-size-guide"),
      dm = $("#decoy-size-modal"),
      cd = $("#close-decoy-size");
    if (fg && dm)
      fg.addEventListener("click", (e) => {
        e.preventDefault();
        dm.hidden = false;
        dm.style.display = "flex";
      });
    if (cd && dm)
      cd.addEventListener("click", () => {
        dm.hidden = true;
        dm.style.display = "none";
      });
    $$(".shop-cat-pill").forEach((p) =>
      p.addEventListener("click", () => {
        $$(".shop-cat-pill").forEach((x) => x.classList.remove("active"));
        p.classList.add("active");
      })
    );
  }

  function init() {
    buildSafeDOM();
    initLogoTrigger();
    initPasswordGate();
    initPanicExit();
    initLangToggle();
    initCards();
    initLoginModal();
    initDecoy();
    initShopDecoys();
    refreshSessionUi();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
