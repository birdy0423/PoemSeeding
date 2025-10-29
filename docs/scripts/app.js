const STORAGE_KEYS = {
  orders: "poemseeding-orders",
  users: "poemseeding-users",
  auth: "poemseeding-auth",
};

const ORDER_STATUS = [
  "pending",
  "confirmed",
  "designing",
  "arranging",
  "ready",
  "completed",
  "canceled",
];

const STATUS_LABELS = {
  pending: "\u5f85\u78ba\u8a8d",
  confirmed: "\u5df2\u78ba\u8a8d",
  designing: "\u8a2d\u8a08\u4e2d",
  arranging: "\u88fd\u4f5c\u4e2d",
  ready: "\u5f85\u53d6\u8ca8",
  completed: "\u5df2\u5b8c\u6210",
  canceled: "\u5df2\u53d6\u6d88",
};

const DELIVERY_METHODS = {
  pickup_kaohsiung: {
    label: "\u4ec1\u6b66\u5de5\u4f5c\u5ba4\u81ea\u53d6",
    fee: 0,
  },
  pickup_tainan: {
    label: "\u53f0\u5357\u5de5\u4f5c\u5ba4\u81ea\u53d6",
    fee: 0,
  },
  lalamove: {
    label: "Lalamove \u914d\u9001",
    fee: 250,
  },
  blackcat: {
    label: "\u9ed1\u8c93\u4f4e\u6eab\u5b85\u914d",
    fee: 320,
  },
};

function loadCollection(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveCollection(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadAuth() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.auth) || "null");
}

function saveAuth(payload) {
  if (payload) {
    localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(payload));
  } else {
    localStorage.removeItem(STORAGE_KEYS.auth);
  }
}

function formatStatus(status) {
  return STATUS_LABELS[status] || status;
}

function getStatusClass(status) {
  return `status--${status}`;
}

function formatDelivery(method) {
  const info = DELIVERY_METHODS[method];
  return info ? info.label : method;
}

function seedDataOnce() {
  let users = loadCollection(STORAGE_KEYS.users);
  const now = new Date().toISOString();
  const ensureUser = (payload) => {
    const existing = users.find((user) => user.email === payload.email);
    if (existing) {
      existing.id = payload.id;
      existing.name = payload.name;
      existing.phone = payload.phone;
      existing.role = payload.role;
      existing.password = payload.password;
      existing.updated_at = now;
    } else {
      users.push({
        ...payload,
        created_at: now,
        updated_at: now,
      });
    }
  };

  ensureUser({
    id: "U001",
    name: "詩秧花室",
    email: "owner@poemseeding.com",
    phone: "0935-111-222",
    role: "owner",
    password: "owner123",
  });

  ensureUser({
    id: "U100",
    name: "林小姐",
    email: "member@example.com",
    phone: "0983-456-789",
    role: "member",
    password: "member123",
  });

  saveCollection(STORAGE_KEYS.users, users);

  if (!localStorage.getItem(STORAGE_KEYS.orders)) {
    const demoOrders = buildDemoOrders();
    saveCollection(STORAGE_KEYS.orders, demoOrders);
  }
}

function buildDemoOrders() {
  const today = new Date();
  const addDays = (base, days) => {
    const date = new Date(base);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };
  const now = new Date().toISOString();

  const base = {
    user_id: "U100",
    receiver_name: "林小姐",
    receiver_phone: "0983-456-789",
    created_at: now,
    updated_at: now,
    status_updated_at: now,
  };

  return [
    {
      ...base,
      id: "PO-DEMO-001",
      custom_title: "秋日暖陽桌花",
      product_description: "暖杏與米白色調，擺放在咖啡廳入口迎賓桌。",
      budget_min: 2200,
      budget_max: 2800,
      preferred_palette: "暖杏 / 米白 / 焦糖",
      flower_preferences: "玫瑰 / 康乃馨 / 兔尾草",
      avoid_flowers: "不使用百合",
      purpose: "咖啡廳開幕佈置",
      card_message: "祝開幕生意興隆、門庭若市。",
      delivery_method: "pickup_kaohsiung",
      delivery_fee: 0,
      pickup_slot: "下午 15:00-17:00",
      delivery_address: "",
      preferred_delivery_window: "",
      scheduled_date: addDays(today, 5),
      status: "confirmed",
      owner_note: "已與客人確認預算與色系，準備進入設計階段。",
      canceled_reason: "",
    },
    {
      ...base,
      id: "PO-DEMO-002",
      custom_title: "訂婚典禮捧花",
      product_description: "粉橘與奶茶色系，搭配棉花與乾燥尤加利葉。",
      budget_min: 3200,
      budget_max: 3800,
      preferred_palette: "粉橘 / 蜜桃 / 裸色",
      flower_preferences: "棉花 / 尤加利 / 玫瑰",
      avoid_flowers: "",
      purpose: "訂婚儀式",
      card_message: "期待與你攜手走過每個季節。",
      delivery_method: "blackcat",
      delivery_fee: 320,
      pickup_slot: "",
      delivery_address: "台北市大安區和平東路53巷18號3樓",
      preferred_delivery_window: "14:00-18:00",
      scheduled_date: addDays(today, 7),
      status: "pending",
      owner_note: "",
      canceled_reason: "",
    },
    {
      ...base,
      id: "PO-DEMO-003",
      custom_title: "咖啡廳開幕桌花",
      product_description: "奶油白搭配金色點綴，希望呈現溫柔的穩定感。",
      budget_min: 3000,
      budget_max: 3600,
      preferred_palette: "奶油白 / 金色",
      flower_preferences: "玫瑰 / 小菊",
      avoid_flowers: "",
      purpose: "店面開幕",
      card_message: "恭祝隆重開幕，客似雲來！",
      delivery_method: "lalamove",
      delivery_fee: 250,
      pickup_slot: "",
      delivery_address: "高雄市苓雅區成功二路88號",
      preferred_delivery_window: "10:00-12:00",
      scheduled_date: addDays(today, 6),
      status: "designing",
      owner_note: "依空間照片調整高度與擺設動線。",
      canceled_reason: "",
    },
    {
      ...base,
      id: "PO-DEMO-004",
      custom_title: "生日花束",
      product_description: "需要溫柔粉色系，且避免百合的香味。",
      budget_min: 1800,
      budget_max: 2200,
      preferred_palette: "溫柔粉 / 奶油色",
      flower_preferences: "玫瑰 / 乒乓菊",
      avoid_flowers: "百合",
      purpose: "生日祝福",
      card_message: "生日快樂，天天都像花一樣綻放。",
      delivery_method: "pickup_tainan",
      delivery_fee: 0,
      pickup_slot: "上午 11:00-13:00",
      delivery_address: "",
      preferred_delivery_window: "",
      scheduled_date: addDays(today, 8),
      status: "arranging",
      owner_note: "花材已處理完成，安排明日組裝。",
      canceled_reason: "",
    },
    {
      ...base,
      id: "PO-DEMO-005",
      custom_title: "教師節謝師禮",
      product_description: "暖色系花束，附上客製卡片表達感謝。",
      budget_min: 1500,
      budget_max: 1800,
      preferred_palette: "暖黃 / 杏色",
      flower_preferences: "康乃馨",
      avoid_flowers: "",
      purpose: "教師節禮物",
      card_message: "謝謝老師的照顧與教導。",
      delivery_method: "pickup_kaohsiung",
      delivery_fee: 0,
      pickup_slot: "下午 15:00-17:00",
      delivery_address: "",
      preferred_delivery_window: "",
      scheduled_date: addDays(today, 10),
      status: "ready",
      owner_note: "花束已完成，放置保護盒等待取貨。",
      canceled_reason: "",
    },
    {
      ...base,
      id: "PO-DEMO-006",
      custom_title: "新居落成桌花",
      product_description: "米杏白色調，搭配乾燥葉材呈現極簡氛圍。",
      budget_min: 2800,
      budget_max: 3200,
      preferred_palette: "米杏白 / 淺金",
      flower_preferences: "滿天星 / 棉花",
      avoid_flowers: "",
      purpose: "新居落成",
      card_message: "恭喜入厝，新家充滿美好時光！",
      delivery_method: "blackcat",
      delivery_fee: 320,
      pickup_slot: "",
      delivery_address: "新北市板橋區文化路二段108號",
      preferred_delivery_window: "16:00-20:00",
      scheduled_date: addDays(today, 12),
      status: "completed",
      owner_note: "已通知客戶完成配送，照片備份於相簿。",
      canceled_reason: "",
    },
    {
      ...base,
      id: "PO-DEMO-007",
      custom_title: "臨時改期訂單",
      product_description: "原預定的告白花束因行程改期，需要取消。",
      budget_min: 2000,
      budget_max: 2400,
      preferred_palette: "紅 / 粉",
      flower_preferences: "玫瑰 / 粉桔梗",
      avoid_flowers: "",
      purpose: "告白驚喜",
      card_message: "期待下次與你相見。",
      delivery_method: "lalamove",
      delivery_fee: 250,
      pickup_slot: "",
      delivery_address: "高雄市苓雅區四維一路88號",
      preferred_delivery_window: "18:00-20:00",
      scheduled_date: addDays(today, 9),
      status: "canceled",
      owner_note: "",
      canceled_reason: "會員因行程調整主動取消",
    },
  ];
}

function injectDemoOrders() {
  const currentOrders = loadCollection(STORAGE_KEYS.orders);
  const demoOrders = buildDemoOrders();
  const existingIds = new Set(currentOrders.map((order) => order.id));
  const toAdd = demoOrders.filter((order) => !existingIds.has(order.id));
  if (!toAdd.length) {
    return { added: 0, total: currentOrders.length };
  }
  const merged = [...currentOrders, ...toAdd];
  saveCollection(STORAGE_KEYS.orders, merged);
  return { added: toAdd.length, total: merged.length };
}

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function computeEarliestDate() {
  const today = new Date();
  today.setDate(today.getDate() + 5);
  return today.toISOString().slice(0, 10);
}

function authenticate(email, password) {
  const users = loadCollection(STORAGE_KEYS.users);
  const match = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );
  if (!match) return null;

  saveAuth({
    user_id: match.id,
    role: match.role,
    name: match.name,
    email: match.email,
  });
  return match;
}

function requireAuth(roles = []) {
  const auth = loadAuth();
  if (!auth) {
    const current = window.location.pathname.split("/").pop() || "index.html";
    window.location.href = `login.html?redirect=${encodeURIComponent(current)}`;
    return null;
  }
  if (roles.length && !roles.includes(auth.role)) {
    window.location.href = "index.html";
    return null;
  }
  return auth;
}

function renderUserBadge() {
  const badge = document.querySelector('[data-auth-badge]');
  if (!badge) return;
  const auth = loadAuth();

  const orderLinks = document.querySelectorAll('[data-order-link], a[href="order-new.html"]');
  const href = auth ? 'order-new.html' : 'login.html?redirect=order-new.html';
  orderLinks.forEach((link) => link.setAttribute('href', href));

  if (auth) {
    const roleLabel = auth.role === 'owner' ? '業主' : '會員';
    badge.innerHTML = `
      <span class="badge">${auth.name}・${roleLabel}</span>
      <button class="btn btn--light" data-logout>登出</button>
    `;
    badge.querySelector('[data-logout]').addEventListener('click', () => {
      saveAuth(null);
      window.location.href = 'login.html';
    });
  } else {
    badge.innerHTML = '<a href="login.html" class="btn btn--light">登入</a>';
  }
}

function initLoginPage() {
  const form = document.querySelector('form');
  if (!form) return;
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fd = new FormData(form);
    const user = authenticate(fd.get('email'), fd.get('password'));
    if (!user) { alert('帳號或密碼錯誤，請再試一次。'); return; }
    alert('\u767b\u5165\u6210\u529f\uff01');
    if (redirect) { window.location.href = redirect; return; }
    window.location.href = user.role === 'owner' ? 'admin-dashboard.html' : 'orders.html';
  });
}function initRegisterPage() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");

    const users = loadCollection(STORAGE_KEYS.users);
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      alert("這個 Email 已有人使用，請改用其他 Email。");
      return;
    }

    const newUser = {
      id: `U${Math.floor(Math.random() * 900 + 100)}`,
      name,
      email,
      phone,
      role: "member",
      password,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    saveCollection(STORAGE_KEYS.users, users);
    saveAuth({
      user_id: newUser.id,
      role: "member",
      name: newUser.name,
      email: newUser.email,
    });
    alert("註冊成功！現在為您導向下單頁面。");
    window.location.href = "order-new.html";
  });
}

function assembleOrderPayload(formData, auth) {
  const id = `PO-${new Date()
    .toISOString()
    .slice(0, 7)
    .replace("-", "")}-${Math.floor(Math.random() * 900 + 100)}`;

  const scheduledDate = formData.get("scheduled_date");
  const earliest = computeEarliestDate();
  if (scheduledDate < earliest) {
    throw new Error(`最早可預約日期為 ${earliest}`);
  }

  const deliveryMethod = formData.get("delivery_method");
  const methodInfo = DELIVERY_METHODS[deliveryMethod];

  return {
    id,
    user_id: auth.user_id,
    custom_title: formData.get("custom_title"),
    product_description: formData.get("product_description"),
    budget_min: Number(formData.get("budget_min")),
    budget_max: Number(formData.get("budget_max")),
    preferred_palette: formData.get("preferred_palette"),
    flower_preferences: formData.get("flower_preferences"),
    avoid_flowers: formData.get("avoid_flowers"),
    purpose: formData.get("purpose"),
    card_message: formData.get("card_message"),
    delivery_method: deliveryMethod,
    delivery_fee: methodInfo?.fee ?? 0,
    receiver_name: formData.get("receiver_name"),
    receiver_phone: formData.get("receiver_phone"),
    pickup_slot: formData.get("pickup_slot") || "",
    delivery_address: formData.get("delivery_address") || "",
    preferred_delivery_window: formData.get("preferred_delivery_window") || "",
    scheduled_date: scheduledDate,
    status: "pending",
    status_updated_at: new Date().toISOString(),
    owner_note: "",
    canceled_reason: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function initOrderForm() {
  const auth = requireAuth(["member"]);
  if (!auth) return;

  const earliestInput = document.querySelector("[data-earliest-date]");
  const dateField = document.querySelector('input[name="scheduled_date"]');
  if (earliestInput && dateField) {
    const earliest = computeEarliestDate();
    earliestInput.textContent = earliest;
    dateField.min = earliest;
  }

  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    try {
      const payload = assembleOrderPayload(formData, auth);
      const orders = loadCollection(STORAGE_KEYS.orders);
      orders.push(payload);
      saveCollection(STORAGE_KEYS.orders, orders);
      alert("訂單送出成功，我們會在 24 小時內與您聯繫確認細節。");
      window.location.href = "orders.html";
    } catch (error) {
      alert(error.message);
    }
  });

  const deliverySelect = form.querySelector('select[name="delivery_method"]');
  const feeBadge = document.querySelector("[data-delivery-fee]");
  if (deliverySelect && feeBadge) {
    const updateFee = () => {
      const selected = deliverySelect.value;
      const method = DELIVERY_METHODS[selected];
      feeBadge.textContent = method
        ? `${method.label}｜${formatCurrency(method.fee)}`
        : "";
      const pickupSection = document.querySelector("[data-pickup-section]");
      const deliverySection = document.querySelector("[data-delivery-section]");
      if (pickupSection && deliverySection) {
        if (selected.startsWith("pickup")) {
          pickupSection.style.display = "grid";
          deliverySection.style.display = "none";
        } else {
          pickupSection.style.display = "none";
          deliverySection.style.display = "grid";
        }
      }
    };
    deliverySelect.addEventListener("change", updateFee);
    updateFee();
  }
}

function initMemberOrders() {
  const auth = requireAuth(["member"]);
  if (!auth) return;

  const allOrders = loadCollection(STORAGE_KEYS.orders)
    .filter((order) => order.user_id === auth.user_id)
    .sort((a, b) => (a.scheduled_date > b.scheduled_date ? 1 : -1));

  const list = document.querySelector("[data-order-list]");
  const filterForm = document.querySelector("[data-member-filter]");
  if (!list) return;

  const renderOrders = (dataset) => {
    if (!dataset.length) {
      list.innerHTML = '<div class="empty-state">目前尚無符合條件的訂單。</div>';
      return;
    }

    list.innerHTML = dataset
      .map((order) => {
        const methodLabel = formatDelivery(order.delivery_method);
        const statusLabel = formatStatus(order.status);
        return `
          <article class="card">
            <div class="badge badge--status ${getStatusClass(order.status)}">
              ${statusLabel}
            </div>
            <h3>${order.custom_title || "未命名訂單"}</h3>
            <p>預計日期：${order.scheduled_date}</p>
            <p>預算區間：${formatCurrency(order.budget_min)} - ${formatCurrency(order.budget_max)}</p>
            <p>配送方式：${methodLabel}</p>
            <div class="chip-group">
              <button class="btn btn--light" data-view="${order.id}">訂單詳情</button>
            </div>
            <p style="color: var(--muted-color); font-size: 0.85rem; margin-top: 1rem;">
              若需調整或取消訂單，請透過官方聯絡方式與花藝師聯繫，我們會協助處理。
            </p>
          </article>
        `;
      })
      .join("");
  };

  const applyFilters = () => {
    if (!filterForm) {
      renderOrders(allOrders);
      return;
    }
    const formData = new FormData(filterForm);
    const from = formData.get("from");
    const to = formData.get("to");
    const filtered = allOrders.filter((order) => {
      if (from && order.scheduled_date < from) return false;
      if (to && order.scheduled_date > to) return false;
      return true;
    });
    renderOrders(filtered);
  };

  applyFilters();

  filterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
  });

  filterForm?.addEventListener("reset", () => {
    setTimeout(applyFilters, 0);
  });

  list.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const orderId = target.dataset.view;
    if (!orderId) return;

    localStorage.setItem("poemseeding-selected-order", orderId);
    window.location.href = "order-detail.html";
  });
}

function initOrderDetail() {
  const auth = requireAuth(["member"]);
  if (!auth) return;

  const selectedId = localStorage.getItem("poemseeding-selected-order");
  if (!selectedId) {
    window.location.href = "orders.html";
    return;
  }

  const order = loadCollection(STORAGE_KEYS.orders).find(
    (item) => item.id === selectedId
  );
  if (!order || order.user_id !== auth.user_id) {
    window.location.href = "orders.html";
    return;
  }

  const detail = document.querySelector("[data-order-detail]");
  if (!detail) return;

  const methodLabel = formatDelivery(order.delivery_method);
  detail.innerHTML = `
    <section class="card">
      <div class="badge badge--status ${getStatusClass(order.status)}">
        ${formatStatus(order.status)}
      </div>
      <h2>${order.custom_title || "未命名訂單"}</h2>
      <p>訂單編號：${order.id}</p>
      <div class="timeline">
        ${renderTimeline(order)}
      </div>
    </section>
    <section class="card">
      <h3>訂製需求</h3>
      <p>${order.product_description || "—"}</p>
      <div class="chip-group">
        <span class="chip">預算：${formatCurrency(order.budget_min)} - ${formatCurrency(order.budget_max)}</span>
        <span class="chip">色系喜好：${order.preferred_palette || "—"}</span>
      </div>
      <p>喜歡花材：${order.flower_preferences || "—"}</p>
      <p>避免花材：${order.avoid_flowers || "—"}</p>
      <p>用途：${order.purpose || "—"}</p>
      <p>祝福卡片：${order.card_message || "—"}</p>
    </section>
    <section class="card">
      <h3>取貨與配送</h3>
      <p>預計日期：${order.scheduled_date}</p>
      <p>方式：${methodLabel}</p>
      ${
        order.pickup_slot
          ? `<p>自取時段：${order.pickup_slot}</p>`
          : `<p>配送地址：${order.delivery_address || "—"}</p>
             <p>配送時段：${order.preferred_delivery_window || "—"}</p>`
      }
      <p>運費：${formatCurrency(order.delivery_fee)}</p>
      <p>聯絡人：${order.receiver_name}｜${order.receiver_phone}</p>
    </section>
    ${
      order.owner_note
        ? `<section class="card">
            <h3>設計備註</h3>
            <p>${order.owner_note}</p>
          </section>`
        : ""
    }
  `;
}

function renderTimeline(order) {
  const defaultFlow = ORDER_STATUS.filter((status) => status !== "canceled");
  const canceledFlow = ["pending", "confirmed", "canceled"];
  const steps = order.status === "canceled" ? canceledFlow : defaultFlow;

  return steps
    .map((status) => {
      const label = formatStatus(status);
      const active = status === order.status;
      const reached = ORDER_STATUS.indexOf(order.status) >= ORDER_STATUS.indexOf(status);
      const timestamp = reached ? order.status_updated_at : "";
      return `
        <div class="timeline__item">
          <strong>${label}</strong>
          <div>${timestamp ? `狀態更新：${timestamp.slice(0, 16).replace('T', ' ')}` : ""}</div>
          ${active && order.canceled_reason ? `<p>原因：${order.canceled_reason}</p>` : ""}
        </div>
      `;
    })
    .join("");
}

function initAdminDashboard() {
  const auth = requireAuth(["owner"]);
  if (!auth) return;

  let orders = loadCollection(STORAGE_KEYS.orders);
  let filteredOrders = [...orders];
  let activeDetailId = null;

  const summaryEl = document.querySelector("[data-admin-summary]");
  const tableBody = document.querySelector("[data-admin-table]");
  const detailPanel = document.querySelector("[data-admin-detail]");
  const detailBody = document.querySelector("[data-admin-detail-body]");
  const detailTitle = document.querySelector("[data-detail-title]");
  const detailClose = document.querySelector("[data-detail-close]");
  const filtersForm = document.querySelector("[data-admin-filters]");
  const resetBtn = filtersForm?.querySelector("[data-reset]");
  const statusFilter = filtersForm?.querySelector('select[name="status"]');
  const filterSummary = filtersForm?.querySelector("[data-filter-summary]");
  const demoButton = filtersForm?.querySelector("[data-demo-seed]");

  if (!tableBody || !filtersForm) return;

  if (statusFilter) {
    ORDER_STATUS.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = formatStatus(status);
      statusFilter.appendChild(option);
    });
  }

  const formatDateTime = (value) => (value ? value.slice(0, 16).replace('T', ' ') : '—');

  const renderSummary = (dataset) => {
    if (!summaryEl) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAhead = new Date(today);
    weekAhead.setDate(today.getDate() + 7);

    const countPending = dataset.filter((order) => order.status === "pending").length;
    const countInProgress = dataset.filter((order) => ["confirmed", "designing", "arranging"].includes(order.status)).length;
    const countWeek = dataset.filter((order) => {
      if (order.status === "canceled") return false;
      const date = new Date(order.scheduled_date);
      if (Number.isNaN(date.getTime())) return false;
      return date >= today && date <= weekAhead;
    }).length;
    const countCompleted = dataset.filter((order) => order.status === "completed").length;

    summaryEl.innerHTML = [
      { label: "待確認", value: countPending, hint: "等待回覆的訂單" },
      { label: "製作中", value: countInProgress, hint: "包含已確認與製作中" },
      { label: "本週出貨", value: countWeek, hint: "七日內預計出貨/取貨" },
      { label: "已完成", value: countCompleted, hint: "累計完成的訂單" },
    ]
      .map(
        (card) => `
          <article class="summary-card">
            <span class="summary-card__label">${card.label}</span>
            <span class="summary-card__value">${card.value}</span>
            <span class="summary-card__hint">${card.hint}</span>
          </article>
        `
      )
      .join("");
  };

  const buildStatusOptions = (current) =>
    ORDER_STATUS.map(
      (status) =>
        `<option value="${status}" ${status === current ? "selected" : ""}>${formatStatus(status)}</option>`
    ).join("");

  const highlightActiveRow = () => {
    tableBody
      .querySelectorAll("tr")
      .forEach((row) => row.classList.toggle("is-active", row.dataset.rowId === activeDetailId));
  };

  const closeDetail = () => {
    detailPanel?.setAttribute("hidden", "");
    activeDetailId = null;
    highlightActiveRow();
  };

  const renderRows = (dataset) => {
    if (!dataset.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center;color:var(--muted-color);padding:2rem;">
            目前沒有符合條件的訂單。
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = dataset
      .map((order) => {
        const methodLabel = formatDelivery(order.delivery_method);
        const statusLabel = formatStatus(order.status);
        const activeClass = activeDetailId === order.id ? ' class="is-active"' : '';
        return `
          <tr data-row-id="${order.id}"${activeClass}>
            <td>
              <strong>${order.custom_title || "未命名"}</strong>
              <div style="font-size:0.8rem;color:var(--muted-color);">${order.id}</div>
            </td>
            <td>${order.scheduled_date}</td>
            <td>${methodLabel}</td>
            <td>${formatCurrency(order.budget_min)} - ${formatCurrency(order.budget_max)}</td>
            <td>${order.receiver_name}<br>${order.receiver_phone}</td>
            <td>
              <span class="badge badge--status ${getStatusClass(order.status)}">${statusLabel}</span>
            </td>
            <td>
              <div class="admin-actions">
                <select data-status-select="${order.id}">
                  ${buildStatusOptions(order.status)}
                </select>
                <button class="btn btn--light" data-save="${order.id}">儲存狀態</button>
                <button class="btn btn--light" data-view="${order.id}">查看 / 編輯</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  };

  const renderDetail = (order) => {
    if (!detailPanel || !detailBody) return;
    activeDetailId = order.id;
    detailTitle.textContent = order.custom_title || "訂單詳情";
    const methodLabel = formatDelivery(order.delivery_method);
    const deliveryOptions = Object.entries(DELIVERY_METHODS)
      .map(([value, info]) => `<option value="${value}" ${value === order.delivery_method ? "selected" : ""}>${info.label}</option>`)
      .join("");

    detailBody.innerHTML = `
      <div class="admin-detail__section">
        <div class="badge badge--status ${getStatusClass(order.status)}">${formatStatus(order.status)}</div>
        <div class="admin-detail__meta">
          <span>訂單編號 ${order.id}</span>
          <span>建立於 ${formatDateTime(order.created_at)}</span>
          <span>最新更新 ${formatDateTime(order.status_updated_at)}</span>
        </div>
      </div>
      <form class="admin-detail__form" data-admin-edit>
        <div class="admin-detail__section">
          <h3>取貨／配送</h3>
          <label class="field">
            <span>預計日期</span>
            <input type="date" name="scheduled_date" value="${order.scheduled_date}" required />
          </label>
          <label class="field">
            <span>配送方式</span>
            <select name="delivery_method">${deliveryOptions}</select>
          </label>
          <label class="field" data-pickup>
            <span>自取時段</span>
            <input type="text" name="pickup_slot" value="${order.pickup_slot || ''}" placeholder="例如：下午 15:00-17:00" />
          </label>
          <label class="field" data-delivery>
            <span>配送地址</span>
            <input type="text" name="delivery_address" value="${order.delivery_address || ''}" placeholder="請輸入配送地址" />
          </label>
          <label class="field" data-delivery>
            <span>配送時段</span>
            <input type="text" name="preferred_delivery_window" value="${order.preferred_delivery_window || ''}" placeholder="例如：14:00-18:00" />
          </label>
        </div>
        <div class="admin-detail__section">
          <h3>訂製資訊</h3>
          <label class="field">
          <span>需求描述</span>
          <textarea name="product_description" placeholder="描述客製需求">${order.product_description || ''}</textarea>
          </label>
          <label class="field">
            <span>用途</span>
            <input type="text" name="purpose" value="${order.purpose || ''}" />
          </label>
          <label class="field">
            <span>色系偏好</span>
            <input type="text" name="preferred_palette" value="${order.preferred_palette || ''}" />
          </label>
          <label class="field">
            <span>喜歡花材</span>
            <input type="text" name="flower_preferences" value="${order.flower_preferences || ''}" />
          </label>
          <label class="field">
            <span>避免花材</span>
            <input type="text" name="avoid_flowers" value="${order.avoid_flowers || ''}" />
          </label>
          <label class="field">
            <span>祝福文字</span>
            <textarea name="card_message" placeholder="祝福卡片內容">${order.card_message || ''}</textarea>
          </label>
          <label class="field">
            <span>業主備註</span>
            <textarea name="owner_note" placeholder="給工作室的備註">${order.owner_note || ''}</textarea>
          </label>
        </div>
        <div class="admin-detail__form-actions">
          <button type="submit" class="btn">儲存修改</button>
        </div>
      </form>
    `;

    detailPanel.removeAttribute("hidden");
    highlightActiveRow();

    const editForm = detailBody.querySelector("[data-admin-edit]");
    if (!editForm) return;

    const methodSelect = editForm.querySelector('[name="delivery_method"]');
    const pickupFields = editForm.querySelectorAll('[data-pickup]');
    const deliveryFields = editForm.querySelectorAll('[data-delivery]');
    const syncMethodFields = () => {
      if (methodSelect.value.startsWith('pickup')) {
        pickupFields.forEach((el) => (el.style.display = 'flex'));
        deliveryFields.forEach((el) => (el.style.display = 'none'));
      } else {
        pickupFields.forEach((el) => (el.style.display = 'none'));
        deliveryFields.forEach((el) => (el.style.display = 'flex'));
      }
    };
    methodSelect.addEventListener('change', syncMethodFields);
    syncMethodFields();

    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(editForm);
      order.scheduled_date = formData.get('scheduled_date');
      order.delivery_method = formData.get('delivery_method');
      if (order.delivery_method.startsWith('pickup')) {
        order.pickup_slot = formData.get('pickup_slot')?.trim() || '';
        order.delivery_address = '';
        order.preferred_delivery_window = '';
      } else {
        order.pickup_slot = '';
        order.delivery_address = formData.get('delivery_address')?.trim() || '';
        order.preferred_delivery_window = formData.get('preferred_delivery_window')?.trim() || '';
      }
      order.product_description = formData.get('product_description')?.trim() || '';
      order.purpose = formData.get('purpose')?.trim() || '';
      order.preferred_palette = formData.get('preferred_palette')?.trim() || '';
      order.flower_preferences = formData.get('flower_preferences')?.trim() || '';
      order.avoid_flowers = formData.get('avoid_flowers')?.trim() || '';
      order.card_message = formData.get('card_message')?.trim() || '';
      order.owner_note = formData.get('owner_note')?.trim() || '';
      order.updated_at = new Date().toISOString();
      saveCollection(STORAGE_KEYS.orders, orders);
      closeDetail();
      renderSummary(orders);
      applyFilters();
      alert('訂單資料已更新，已通知會員。');
    });
  };

  const applyFilters = (refreshDetail = true) => {
    const formData = new FormData(filtersForm);
    const from = formData.get('from');
    const to = formData.get('to');
    const status = formData.get('status');
    const keywordRaw = formData.get('keyword') || '';
    const keyword = keywordRaw.trim().toLowerCase();

    filteredOrders = orders.filter((order) => {
      if (from && order.scheduled_date < from) return false;
      if (to && order.scheduled_date > to) return false;
      if (status && order.status !== status) return false;
      if (keyword) {
        const haystack = [
          order.custom_title,
          order.receiver_name,
          order.receiver_phone,
          order.id,
          order.delivery_address,
          order.product_description,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(keyword)) return false;
      }
      return true;
    });

    renderRows(filteredOrders);
    highlightActiveRow();

    if (filterSummary) {
      filterSummary.textContent = filteredOrders.length
        ? `顯示 ${filteredOrders.length} 筆結果`
        : '目前沒有符合條件的訂單';
    }

    if (refreshDetail && activeDetailId) {
      const activeOrder = orders.find((item) => item.id === activeDetailId);
      if (activeOrder && filteredOrders.includes(activeOrder)) {
        renderDetail(activeOrder);
      } else {
        detailPanel?.setAttribute('hidden', '');
        activeDetailId = null;
      }
    }
  };

  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilters();
  });

  resetBtn?.addEventListener('click', () => {
    filtersForm.reset();
    applyFilters();
  });

  detailClose?.addEventListener('click', () => {
    closeDetail();
  });

  tableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const viewId = target.dataset.view;
    const saveId = target.dataset.save;

    if (viewId) {
      const order = orders.find((item) => item.id === viewId);
      if (!order) return;
      renderDetail(order);
      return;
    }

    if (saveId) {
      const select = tableBody.querySelector(`[data-status-select="${saveId}"]`);
      if (!select) return;
      const nextStatus = select.value;
      if (!ORDER_STATUS.includes(nextStatus)) {
        alert('請選擇合法的狀態。');
        return;
      }
      const order = orders.find((item) => item.id === saveId);
      if (!order) return;
      if (order.status === nextStatus) {
        alert('狀態未變更。');
        return;
      }
      order.status = nextStatus;
      order.status_updated_at = new Date().toISOString();
      order.updated_at = new Date().toISOString();
      if (nextStatus === 'canceled') {
        const reason = prompt('請輸入取消原因（可留空）', order.canceled_reason || '');
        order.canceled_reason = reason ? reason.trim() : '業主取消';
      } else {
        order.canceled_reason = '';
      }
      saveCollection(STORAGE_KEYS.orders, orders);
      renderSummary(orders);
      applyFilters();
      if (activeDetailId === saveId) {
        const updated = orders.find((item) => item.id === saveId);
        if (updated) renderDetail(updated);
      }
      alert('訂單狀態已更新。');
    }
  });

  demoButton?.addEventListener('click', () => {
    const confirmed = window.confirm('匯入測試資料將新增示範訂單，是否繼續？');
    if (!confirmed) return;
    const result = injectDemoOrders();
    orders = loadCollection(STORAGE_KEYS.orders);
    renderSummary(orders);
    applyFilters();
    alert(result.added ? `已加入 ${result.added} 筆測試資料，目前共有 ${result.total} 筆訂單。` : '測試資料已存在，未新增。');
  });

  document
    .querySelector('[data-export]')
    ?.addEventListener('click', () => exportCsv(filteredOrders));

  renderSummary(orders);
  applyFilters();
}

function exportCsv(orders) {
  if (!orders || !orders.length) { alert('目前沒有可匯出的資料。'); return; }
  const header = ['訂單編號','會員姓名','會員電話','會員 Email','預約日期','配送方式','自取時段','配送地址','配送時段','預算下限','預算上限','運費','狀態','最新狀態時間','用途','需求描述','色系偏好','喜歡花材','避免花材','祝福文字','業主備註'];
  const users = loadCollection(STORAGE_KEYS.users);
  const rows = orders.map((order)=>{ const user = users.find(u=>u.id===order.user_id); return [order.id,user?.name||'',user?.phone||'',user?.email||'',order.scheduled_date,formatDelivery(order.delivery_method),order.pickup_slot,order.delivery_address,order.preferred_delivery_window,order.budget_min,order.budget_max,order.delivery_fee,formatStatus(order.status),order.status_updated_at,order.purpose,order.product_description,order.preferred_palette,order.flower_preferences,order.avoid_flowers,order.card_message,order.owner_note]; });
  const enc = v=>{ if(v==null) return ''; const s=String(v); return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; };
  const csv = [header,...rows].map(cols=>cols.map(enc).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='poemseeding-orders.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  alert('CSV 已匯出，請查看下載的檔案。');
}function initLandingPage() {
  renderUserBadge();
  const cta = document.querySelector("[data-cta]");
  if (cta) {
    cta.addEventListener("click", () => {
      const auth = loadAuth();
      if (auth) {
        window.location.href = "order-new.html";
      } else {
        window.location.href = "login.html?redirect=order-new.html";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  seedDataOnce();
  renderUserBadge();
  const page = document.body.dataset.page;
  switch (page) {
    case "landing":
      initLandingPage();
      break;
    case "login":
      initLoginPage();
      break;
    case "register":
      initRegisterPage();
      break;
    case "order-form":
      initOrderForm();
      break;
    case "member-orders":
      initMemberOrders();
      break;
    case "order-detail":
      initOrderDetail();
      break;
    case "admin-dashboard":
      initAdminDashboard();
      break;
  }
});









