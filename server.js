const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

let firebaseReady = false;
let firestore = null;

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const db = {
  users: [],
  movies: [
    {
      id: 'avatar-way-of-water',
      title: 'Avatar: The Way of Water',
      cinema: 'Paragon Cineplex',
      hall: 'Theater 5 (IMAX)',
      language: 'EN/TH',
      format: 'IMAX 3D',
      durationMinutes: 192,
      poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCANR7ambYBR6NXFdSYijpzzYbGMNLe81-D_p3STHCeidvznIriLF52eydEwmMJNUnnmgf2ydgpWSKFWsC69YpHpjXgFN9sbgsFuthwxKBoD7u2ZzhMGBYhJtXmAAPKHXOq11V70Te69Su1RV13Ret1Wt8nmCT10nyjCl_m51WeU2vDidDlwHq5Bws5XmOmy5arPF1HeNBXLoYbO7_V-sbZSf9so43ybVebWdDHxsStSf1gv7q2UlNxDS7kmQLHzz6eWaYlDyximxJN'
    },
    {
      id: 'death-whisperer-2',
      title: 'ธี่หยด 2',
      cinema: 'Paragon Cineplex',
      hall: 'Hall 1',
      language: 'TH/EN SUB',
      format: 'IMAX',
      durationMinutes: 125,
      poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASMj5eZTFJZJs9CywraW3SS7EjRRxBBEHqp-Y19NWauJrymZaNn1rXaEBcJQPTmnFDhF7-p6IIwNd7AQa6xtFWoImsrofyxVANdSPqev0LFMGsYGtKLktvAmYxrQAh7SAmvSUcuhxed8VZqLbtnuVBw9ocFdQcmk0jMeZlAJDbIk3YjSTlLfLNvQWmrF_OisbgJslncTjKUzc3oTfExAOGztOdWazgvwZYKGiLfTAsGiHOAPFMZ5QUH'
    },
    {
      id: 'the-marvels',
      title: 'The Marvels',
      cinema: 'Icon Siam Cineplex',
      hall: 'Hall 2',
      language: 'TH/EN SUB',
      format: 'IMAX',
      durationMinutes: 105,
      poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4LF9j0wT5oJ1xXpQ2z9KqL3m4MdN7p2s8t0r5vW6a7bXyZ0cDeFgHiJkL1mNoPqRsT'
    },
    {
      id: 'hunger-games',
      title: 'The Hunger Games',
      cinema: 'Paragon Cineplex',
      hall: 'Hall 3',
      language: 'TH/EN SUB',
      format: '4DX',
      durationMinutes: 158,
      poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7hunger0Games0backdrop00'
    },
    {
      id: 'killers-of-the-flower-moon',
      title: 'Killers of the Flower Moon',
      cinema: 'Major Cineplex Sukhumvit',
      hall: 'Theater 4',
      language: 'EN SUB',
      format: 'Standard 2D',
      durationMinutes: 206,
      poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5LDqEhChXP-vKH3QfaFy2-3NiwsDGow2GuUO3vq5mAbu9JUt7'
    },
    {
      id: 'trolls-band-together',
      title: 'Trolls Band Together',
      cinema: 'Icon Siam Cineplex',
      hall: 'Hall 1',
      language: 'TH',
      format: 'Standard 2D',
      durationMinutes: 92,
      poster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAERj7xQVsl0tyNLugPr8wpKU9VHDPlA6FU'
    }
  ],
  showtimes: [
    {
      id: 'st-avatar-1430',
      movieId: 'avatar-way-of-water',
      dateLabel: 'วันนี้, 14 ต.ค. 2023',
      startTime: '14:30',
      endTime: '17:42'
    },
    {
      id: 'st-death-whisperer-2-1030-hall-1',
      movieId: 'death-whisperer-2',
      dateLabel: 'วันนี้',
      startTime: '10:30',
      endTime: '12:35'
    },
    {
      id: 'st-the-marvels-1100-hall-2',
      movieId: 'the-marvels',
      dateLabel: 'วันนี้',
      startTime: '11:00',
      endTime: '12:45'
    },
    {
      id: 'st-hunger-games-1000-hall-3',
      movieId: 'hunger-games',
      dateLabel: 'วันนี้',
      startTime: '10:00',
      endTime: '12:38'
    },
    {
      id: 'st-killers-of-the-flower-moon-1030-theater-4',
      movieId: 'killers-of-the-flower-moon',
      dateLabel: 'วันนี้',
      startTime: '10:30',
      endTime: '13:56'
    },
    {
      id: 'st-trolls-band-together-0930-hall-1',
      movieId: 'trolls-band-together',
      dateLabel: 'วันนี้',
      startTime: '09:30',
      endTime: '11:02'
    }
  ],
  seatsByShowtime: {
    'st-avatar-1430': {
      sold: [],
      booked: []
    },
    'st-death-whisperer-2-1030-hall-1': {
      sold: [],
      booked: []
    },
    'st-the-marvels-1100-hall-2': {
      sold: [],
      booked: []
    },
    'st-hunger-games-1000-hall-3': {
      sold: [],
      booked: []
    },
    'st-killers-of-the-flower-moon-1030-theater-4': {
      sold: [],
      booked: []
    },
    'st-trolls-band-together-0930-hall-1': {
      sold: [],
      booked: []
    }
  },
  bookings: {}
};

const PRICE_BY_TYPE = {
  'Sofa Pair': 500,
  Premium: 350,
  Regular: 240
};

const SEAT_TYPE_BY_PREFIX = {
  A: 'Sofa Pair',
  B: 'Premium',
  C: 'Regular',
  D: 'Regular'
};

const SERVICE_FEE_PER_SEAT = 20;
const DEFAULT_LOYALTY_POINTS = 250;
const POINTS_REQUIRED_FOR_DISCOUNT = 80;
const POINT_DISCOUNT_BAHT = 30;
const POINTS_EARNED_PER_BOOKING = 50;
const LEGACY_BLOCKED_SEATS = new Set(['A3', 'B6', 'B7']);
const PROMO_CODE_CONFIG = {
  FREE100: { discount: 100, mondayOnly: false },
  MONDAY100: { discount: 100, mondayOnly: true }
};

function defaultPromoCodeStatus() {
  return Object.keys(PROMO_CODE_CONFIG).reduce((acc, code) => {
    acc[code] = 1;
    return acc;
  }, {});
}

function normalizePromoCodeStatus(status = {}) {
  const base = defaultPromoCodeStatus();
  for (const code of Object.keys(base)) {
    if (String(status?.[code]) === '0' || Number(status?.[code]) === 0) {
      base[code] = 0;
    }
  }
  return base;
}

function normalizePromoCodeInput(rawCode = '') {
  return String(rawCode || '').trim().toUpperCase();
}

function validatePromoCodeRules(code) {
  if (!code) return { ok: true };
  const config = PROMO_CODE_CONFIG[code];
  if (!config) {
    return { ok: false, message: 'โค้ดไม่ถูกต้อง' };
  }
  if (config.mondayOnly && new Date().getDay() !== 1) {
    return { ok: false, message: 'โค้ด MONDAY100 ใช้ได้เฉพาะวันจันทร์' };
  }
  return { ok: true, config };
}

async function initializeFirebase() {
  try {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
      || process.env.GOOGLE_APPLICATION_CREDENTIALS
      || path.join(__dirname, 'firebase-service-account.json');

    if (!fs.existsSync(serviceAccountPath)) {
      throw new Error(`Service account file not found: ${serviceAccountPath}`);
    }

    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

    const adminApp = getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id
        });

    firestore = getFirestore(adminApp);

    await seedFirebaseData();
    firebaseReady = true;
    console.log(`Firebase Admin connected (${serviceAccount.project_id})`);
  } catch (error) {
    firebaseReady = false;
    console.warn('Firebase Admin unavailable, fallback to in-memory store:', error?.message || error);
  }
}

async function seedFirebaseData() {
  if (!firestore) return;

  for (const movie of db.movies) {
    const movieRef = firestore.collection('movies').doc(movie.id);
    const movieSnap = await movieRef.get();
    if (!movieSnap.exists) {
      await movieRef.set(movie);
    }
  }

  for (const showtime of db.showtimes) {
    const showtimeRef = firestore.collection('showtimes').doc(showtime.id);
    const showtimeSnap = await showtimeRef.get();
    if (!showtimeSnap.exists) {
      await showtimeRef.set(showtime);
    }
  }

  for (const [showtimeId, seatState] of Object.entries(db.seatsByShowtime)) {
    const seatRef = firestore.collection('seatMaps').doc(showtimeId);
    const seatSnap = await seatRef.get();
    if (!seatSnap.exists) {
      await seatRef.set(seatState);
    }
  }
}

function normalizeUserProfile(profile = {}) {
  return {
    ...profile,
    loyaltyPoints: Number.isFinite(Number(profile.loyaltyPoints)) ? Number(profile.loyaltyPoints) : DEFAULT_LOYALTY_POINTS,
    promoCodeStatus: normalizePromoCodeStatus(profile.promoCodeStatus || {})
  };
}

async function validatePromoCodeForUser(uid, rawCode) {
  const code = normalizePromoCodeInput(rawCode);
  if (!code) {
    return { ok: true, code: '', discount: 0 };
  }

  if (!uid) {
    return { ok: false, message: 'กรุณาเข้าสู่ระบบก่อนใช้โค้ด' };
  }

  const ruleResult = validatePromoCodeRules(code);
  if (!ruleResult.ok) return { ok: false, message: ruleResult.message };

  const profile = await getUserProfileByUid(uid);
  if (!profile) {
    return { ok: false, message: 'ไม่พบข้อมูลผู้ใช้สำหรับใช้โค้ด' };
  }

  const status = normalizePromoCodeStatus(profile.promoCodeStatus || {});
  if (status[code] !== 1) {
    return { ok: false, message: 'โค้ดนี้ถูกใช้ไปแล้ว' };
  }

  return {
    ok: true,
    code,
    discount: Number(ruleResult.config?.discount || 0)
  };
}

async function consumePromoCodeForUser(uid, code) {
  const normalizedCode = normalizePromoCodeInput(code);
  if (!normalizedCode) {
    return { ok: true };
  }

  if (!uid) {
    return { ok: false, message: 'กรุณาเข้าสู่ระบบก่อนใช้โค้ด' };
  }

  const ruleResult = validatePromoCodeRules(normalizedCode);
  if (!ruleResult.ok) {
    return { ok: false, message: ruleResult.message };
  }

  if (firebaseReady) {
    const userRef = firestore.collection('users').doc(uid);
    const result = await firestore.runTransaction(async (transaction) => {
      const snap = await transaction.get(userRef);
      if (!snap.exists) {
        return { ok: false, message: 'ไม่พบข้อมูลผู้ใช้สำหรับใช้โค้ด' };
      }

      const profile = normalizeUserProfile(snap.data());
      if ((profile.promoCodeStatus || {})[normalizedCode] !== 1) {
        return { ok: false, message: 'โค้ดนี้ถูกใช้ไปแล้ว' };
      }

      const nextStatus = {
        ...(profile.promoCodeStatus || {}),
        [normalizedCode]: 0
      };

      transaction.set(userRef, {
        promoCodeStatus: nextStatus,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      return { ok: true };
    });

    return result;
  }

  const index = (db.users || []).findIndex((item) => item.uid === uid);
  if (index < 0) {
    return { ok: false, message: 'ไม่พบข้อมูลผู้ใช้สำหรับใช้โค้ด' };
  }

  const profile = normalizeUserProfile(db.users[index]);
  if ((profile.promoCodeStatus || {})[normalizedCode] !== 1) {
    return { ok: false, message: 'โค้ดนี้ถูกใช้ไปแล้ว' };
  }

  db.users[index] = {
    ...profile,
    promoCodeStatus: {
      ...(profile.promoCodeStatus || {}),
      [normalizedCode]: 0
    },
    updatedAt: new Date().toISOString()
  };

  return { ok: true };
}

async function getUserProfileByUid(uid) {
  if (!uid) return null;

  if (firebaseReady) {
    const snap = await firestore.collection('users').doc(uid).get();
    if (!snap.exists) return null;
    return normalizeUserProfile(snap.data());
  }

  const user = (db.users || []).find((item) => item.uid === uid);
  return user ? normalizeUserProfile(user) : null;
}

async function upsertUserProfile(profile) {
  const normalized = normalizeUserProfile(profile);

  if (firebaseReady) {
    await firestore.collection('users').doc(normalized.uid).set(normalized, { merge: true });
    return normalized;
  }

  const existingIndex = (db.users || []).findIndex((item) => item.uid === normalized.uid);
  if (existingIndex >= 0) {
    db.users[existingIndex] = { ...db.users[existingIndex], ...normalized };
    return db.users[existingIndex];
  }

  db.users.push(normalized);
  return normalized;
}

async function applyUserPoints(uid, { earnedPoints = 0, usedPoints = 0 } = {}) {
  if (!uid) return null;

  if (firebaseReady) {
    const userRef = firestore.collection('users').doc(uid);
    const updated = await firestore.runTransaction(async (transaction) => {
      const snap = await transaction.get(userRef);
      const existing = snap.exists ? normalizeUserProfile(snap.data()) : normalizeUserProfile({ uid, loyaltyPoints: DEFAULT_LOYALTY_POINTS });
      const nextPoints = Math.max(0, existing.loyaltyPoints - usedPoints + earnedPoints);

      const payload = {
        ...existing,
        uid,
        loyaltyPoints: nextPoints,
        updatedAt: new Date().toISOString()
      };

      transaction.set(userRef, payload, { merge: true });
      return payload;
    });
    return updated;
  }

  const existingIndex = (db.users || []).findIndex((item) => item.uid === uid);
  const existing = existingIndex >= 0 ? normalizeUserProfile(db.users[existingIndex]) : normalizeUserProfile({ uid, loyaltyPoints: DEFAULT_LOYALTY_POINTS });
  const nextPoints = Math.max(0, existing.loyaltyPoints - usedPoints + earnedPoints);
  const payload = {
    ...existing,
    uid,
    loyaltyPoints: nextPoints,
    updatedAt: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    db.users[existingIndex] = payload;
  } else {
    db.users.push(payload);
  }

  return payload;
}

async function getMovieById(movieId) {
  if (firebaseReady) {
    const snap = await firestore.collection('movies').doc(movieId).get();
    if (snap.exists) return snap.data();
    return null;
  }
  return db.movies.find((item) => item.id === movieId) || null;
}

async function getMovies() {
  if (firebaseReady) {
    const snaps = await firestore.collection('movies').get();
    return snaps.docs.map((docItem) => docItem.data());
  }
  return db.movies;
}

async function getShowtimeById(showtimeId) {
  if (firebaseReady) {
    const snap = await firestore.collection('showtimes').doc(showtimeId).get();
    if (snap.exists) return snap.data();
    return null;
  }
  return db.showtimes.find((item) => item.id === showtimeId) || null;
}

function slugToTitle(slug = '') {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function parseDynamicShowtimeId(showtimeId = '') {
  const match = /^st-(.+)-(\d{4})-(.+)$/.exec(showtimeId);
  if (!match) return null;

  const movieId = match[1];
  const rawTime = match[2];
  const hallSlug = match[3];

  return {
    movieId,
    startTime: `${rawTime.slice(0, 2)}:${rawTime.slice(2)}`,
    hall: hallSlug
      .split('-')
      .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
      .join(' ')
  };
}

function addMinutesToTime(startTime = '10:00', minutes = 120) {
  const [hourText, minuteText] = startTime.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return '';

  const startTotalMinutes = (hour * 60) + minute;
  const endTotalMinutes = startTotalMinutes + Number(minutes || 120);
  const endHour = String(Math.floor((endTotalMinutes % (24 * 60)) / 60)).padStart(2, '0');
  const endMinute = String(endTotalMinutes % 60).padStart(2, '0');
  return `${endHour}:${endMinute}`;
}

async function resolveMovie(movieId) {
  const movie = await getMovieById(movieId);
  if (movie) return movie;

  return {
    id: movieId,
    title: slugToTitle(movieId),
    cinema: 'Paragon Cineplex',
    hall: 'Hall 1',
    language: 'TH/EN SUB',
    format: 'Digital 2D',
    durationMinutes: 120,
    poster: `https://picsum.photos/seed/${encodeURIComponent(movieId)}/600/900`
  };
}

async function resolveShowtime(showtimeId) {
  const showtime = await getShowtimeById(showtimeId);
  if (showtime) return showtime;

  const parsed = parseDynamicShowtimeId(showtimeId);
  if (!parsed) return null;

  const movie = await resolveMovie(parsed.movieId);
  return {
    id: showtimeId,
    movieId: parsed.movieId,
    dateLabel: 'วันนี้',
    startTime: parsed.startTime,
    endTime: addMinutesToTime(parsed.startTime, movie.durationMinutes || 120),
    hall: parsed.hall
  };
}

async function getSeatState(showtimeId) {
  if (firebaseReady) {
    const snap = await firestore.collection('seatMaps').doc(showtimeId).get();
    if (snap.exists) {
      const current = snap.data() || {};
      const sold = Array.isArray(current.sold)
        ? current.sold.filter((seatCode) => !LEGACY_BLOCKED_SEATS.has(seatCode))
        : [];
      const booked = Array.isArray(current.booked) ? current.booked : [];

      const shouldUpdate = sold.length !== (Array.isArray(current.sold) ? current.sold.length : 0)
        || booked.length !== (Array.isArray(current.booked) ? current.booked.length : 0);

      if (shouldUpdate) {
        const normalized = { sold, booked };
        await firestore.collection('seatMaps').doc(showtimeId).set(normalized, { merge: true });
        return normalized;
      }

      return { sold, booked };
    }
    return null;
  }

  const state = db.seatsByShowtime[showtimeId] || null;
  if (!state) return null;

  const sold = Array.isArray(state.sold)
    ? state.sold.filter((seatCode) => !LEGACY_BLOCKED_SEATS.has(seatCode))
    : [];
  const booked = Array.isArray(state.booked) ? state.booked : [];
  db.seatsByShowtime[showtimeId] = { sold, booked };
  return db.seatsByShowtime[showtimeId];
}

async function ensureSeatState(showtimeId) {
  const existing = await getSeatState(showtimeId);
  if (existing) return existing;

  const defaultSeatState = {
    sold: [],
    booked: []
  };

  if (firebaseReady) {
    await firestore.collection('seatMaps').doc(showtimeId).set(defaultSeatState, { merge: true });
    return defaultSeatState;
  }

  db.seatsByShowtime[showtimeId] = defaultSeatState;
  return defaultSeatState;
}

async function saveBooking(booking) {
  if (firebaseReady) {
    await firestore.collection('bookings').doc(booking.bookingId).set(booking);
    return;
  }
  db.bookings[booking.bookingId] = booking;
}

async function getBookingById(bookingId) {
  if (firebaseReady) {
    const snap = await firestore.collection('bookings').doc(bookingId).get();
    if (snap.exists) return snap.data();
    return null;
  }
  return db.bookings[bookingId] || null;
}

async function reserveSeats(showtimeId, seats) {
  await ensureSeatState(showtimeId);

  if (firebaseReady) {
    const seatRef = firestore.collection('seatMaps').doc(showtimeId);

    return firestore.runTransaction(async (transaction) => {
      const seatDoc = await transaction.get(seatRef);
      if (!seatDoc.exists) {
        const defaultSeatState = {
          sold: [],
          booked: []
        };
        transaction.set(seatRef, defaultSeatState, { merge: true });
      }

      const seatStateRaw = seatDoc.exists ? seatDoc.data() : { sold: [], booked: [] };
      const seatState = {
        sold: Array.isArray(seatStateRaw.sold)
          ? seatStateRaw.sold.filter((seatCode) => !LEGACY_BLOCKED_SEATS.has(seatCode))
          : [],
        booked: Array.isArray(seatStateRaw.booked) ? seatStateRaw.booked : []
      };

      if (seatDoc.exists && seatState.sold.length !== (Array.isArray(seatStateRaw.sold) ? seatStateRaw.sold.length : 0)) {
        transaction.set(seatRef, seatState, { merge: true });
      }

      const blockedSet = new Set([...(seatState.sold || []), ...(seatState.booked || [])]);
      const conflicts = seats.filter((seatCode) => blockedSet.has(seatCode));

      if (conflicts.length > 0) {
        return { ok: false, conflicts };
      }

      transaction.update(seatRef, {
        booked: FieldValue.arrayUnion(...seats)
      });
      return { ok: true, conflicts: [] };
    });
  }

  const seatState = db.seatsByShowtime[showtimeId];
  if (!seatState) {
    throw new Error('Showtime seat map not found');
  }

  const blockedSet = new Set([...(seatState.sold || []), ...(seatState.booked || [])]);
  const conflicts = seats.filter((seatCode) => blockedSet.has(seatCode));

  if (conflicts.length > 0) {
    return { ok: false, conflicts };
  }

  seatState.booked.push(...seats);
  return { ok: true, conflicts: [] };
}

function getSeatType(seatCode) {
  const rowPrefix = seatCode?.charAt(0)?.toUpperCase();
  return SEAT_TYPE_BY_PREFIX[rowPrefix] || 'Regular';
}

function calculatePricing({ seats, promoCode, promoDiscount = 0, usePoints, availablePoints = 0 }) {
  const lines = seats.map((seatCode) => {
    const type = getSeatType(seatCode);
    const unitPrice = PRICE_BY_TYPE[type] ?? 240;
    return { seatCode, type, unitPrice };
  });

  const seatSubtotal = lines.reduce((sum, item) => sum + item.unitPrice, 0);
  const serviceFee = seats.length * SERVICE_FEE_PER_SEAT;

  let discount = Math.min(Number(promoDiscount || 0), seatSubtotal + serviceFee);
  const canUsePoints = Boolean(usePoints) && Number(availablePoints) >= POINTS_REQUIRED_FOR_DISCOUNT;
  if (canUsePoints) {
    discount += Math.min(POINT_DISCOUNT_BAHT, seatSubtotal + serviceFee - discount);
  }

  const total = Math.max(0, seatSubtotal + serviceFee - discount);

  return {
    lines,
    seatSubtotal,
    serviceFee,
    discount,
    total
  };
}

function randomId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Cinema API running' });
});

app.get('/api/movies', asyncHandler(async (_req, res) => {
  const movies = await getMovies();
  res.json(movies);
}));

app.get('/api/movies/:movieId', asyncHandler(async (req, res) => {
  const movie = await getMovieById(req.params.movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  return res.json(movie);
}));

app.get('/api/showtimes/:showtimeId', asyncHandler(async (req, res) => {
  const showtime = await resolveShowtime(req.params.showtimeId);
  if (!showtime) {
    return res.status(404).json({ message: 'Showtime not found' });
  }
  const movie = await resolveMovie(showtime.movieId);
  return res.json({ ...showtime, movie });
}));

app.get('/api/seats/:showtimeId', asyncHandler(async (req, res) => {
  const seatState = await ensureSeatState(req.params.showtimeId);
  return res.json(seatState);
}));

app.post('/api/checkout/preview', asyncHandler(async (req, res) => {
  const { showtimeId, seats = [], promoCode = '', usePoints = false, uid = null } = req.body;
  if (!showtimeId || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: 'showtimeId and seats are required' });
  }

  const showtime = await resolveShowtime(showtimeId);
  if (!showtime) {
    return res.status(404).json({ message: 'Showtime not found' });
  }

  const seatState = await ensureSeatState(showtimeId);
  const blockedSet = new Set([...(seatState?.sold || []), ...(seatState?.booked || [])]);
  const conflicts = seats.filter((seatCode) => blockedSet.has(seatCode));

  if (conflicts.length > 0) {
    return res.status(409).json({ message: 'Some seats are no longer available', conflicts });
  }

  const userProfile = uid ? await getUserProfileByUid(uid) : null;
  const availablePoints = userProfile?.loyaltyPoints ?? 0;
  const canUsePoints = availablePoints >= POINTS_REQUIRED_FOR_DISCOUNT;
  const effectiveUsePoints = Boolean(usePoints) && canUsePoints;

  const promoValidation = await validatePromoCodeForUser(uid, promoCode);
  if (!promoValidation.ok) {
    return res.status(400).json({ message: promoValidation.message });
  }

  const pricing = calculatePricing({
    seats,
    promoCode: promoValidation.code,
    promoDiscount: promoValidation.discount,
    usePoints: effectiveUsePoints,
    availablePoints
  });
  const movie = await resolveMovie(showtime.movieId);

  return res.json({
    showtime,
    movie,
    seats,
    pricing,
    promoCode: promoValidation.code,
    usePoints: effectiveUsePoints,
    loyalty: {
      availablePoints,
      canUsePoints,
      pointsRequired: POINTS_REQUIRED_FOR_DISCOUNT
    }
  });
}));

app.post('/api/bookings', asyncHandler(async (req, res) => {
  const {
    showtimeId,
    seats = [],
    promoCode = '',
    usePoints = false,
    paymentMethod = 'credit-card',
    cardLast4 = '0000',
    uid = null
  } = req.body;

  if (!showtimeId || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: 'showtimeId and seats are required' });
  }

  const showtime = await resolveShowtime(showtimeId);
  if (!showtime) {
    return res.status(404).json({ message: 'Showtime not found' });
  }

  const promoValidation = await validatePromoCodeForUser(uid, promoCode);
  if (!promoValidation.ok) {
    return res.status(400).json({ message: promoValidation.message });
  }

  try {
    const reserveResult = await reserveSeats(showtimeId, seats);
    if (!reserveResult.ok) {
      return res.status(409).json({ message: 'Some seats are no longer available', conflicts: reserveResult.conflicts });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Seat reservation failed' });
  }

  const userProfile = uid ? await getUserProfileByUid(uid) : null;
  const availablePoints = userProfile?.loyaltyPoints ?? 0;
  const canUsePoints = availablePoints >= POINTS_REQUIRED_FOR_DISCOUNT;
  const effectiveUsePoints = Boolean(usePoints) && canUsePoints;
  const usedPoints = effectiveUsePoints ? POINTS_REQUIRED_FOR_DISCOUNT : 0;

  const pricing = calculatePricing({
    seats,
    promoCode: promoValidation.code,
    promoDiscount: promoValidation.discount,
    usePoints: effectiveUsePoints,
    availablePoints
  });

  const promoConsumeResult = await consumePromoCodeForUser(uid, promoValidation.code);
  if (!promoConsumeResult.ok) {
    return res.status(400).json({ message: promoConsumeResult.message });
  }

  const bookingId = randomId('BK');
  const movie = await resolveMovie(showtime.movieId);
  const earnedPoints = uid ? POINTS_EARNED_PER_BOOKING : 0;

  const booking = {
    bookingId,
    uid: uid || null,
    movie,
    showtime,
    seats,
    pricing,
    payment: {
      method: paymentMethod,
      cardLast4
    },
    loyalty: {
      earnedPoints,
      usedPoints
    },
    promotion: {
      code: promoValidation.code || null,
      discount: promoValidation.discount || 0
    },
    createdAt: new Date().toISOString(),
    qrPayload: `cinema:${bookingId}:${showtimeId}:${seats.join(',')}`
  };

  await saveBooking(booking);

  let updatedUserProfile = null;
  if (uid) {
    updatedUserProfile = await applyUserPoints(uid, { earnedPoints, usedPoints });
  }

  if (updatedUserProfile) {
    booking.loyalty.balanceAfterBooking = updatedUserProfile.loyaltyPoints;
  }

  return res.status(201).json(booking);
}));

app.get('/api/bookings/:bookingId', asyncHandler(async (req, res) => {
  const booking = await getBookingById(req.params.bookingId);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  return res.json(booking);
}));

// Get all bookings for a specific user
app.get('/api/users/:uid/bookings', asyncHandler(async (req, res) => {
  const { uid } = req.params;

  if (firestore) {
    try {
      const snapshot = await firestore.collection('bookings').where('uid', '==', uid).get();
      const bookings = [];
      snapshot.forEach(doc => {
        bookings.push(doc.data());
      });
      return res.json(bookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      return res.status(500).json({ message: 'Error fetching bookings' });
    }
  } else {
    // Fallback: filter in-memory bookings
    const bookings = Object.values(db.bookings || {}).filter(b => b.uid === uid);
    return res.json(bookings);
  }
}));

app.get('/api/users/:uid', asyncHandler(async (req, res) => {
  const user = await getUserProfileByUid(req.params.uid);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user);
}));

// Save user profile to Firestore
app.post('/api/users', asyncHandler(async (req, res) => {
  const { uid, email, displayName } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: 'uid and email are required' });
  }

  const existing = await getUserProfileByUid(uid);
  const now = new Date().toISOString();

  const userProfile = {
    uid,
    email,
    displayName: displayName || 'ผู้ใช้',
    loyaltyPoints: existing?.loyaltyPoints ?? DEFAULT_LOYALTY_POINTS,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };

  try {
    const savedProfile = await upsertUserProfile(userProfile);
    console.log(`User profile saved: ${uid}`);
    return res.status(201).json(savedProfile);
  } catch (error) {
    console.error('Error saving user profile:', error);
    return res.status(500).json({ message: 'Cannot save user profile' });
  }
}));

// Get all users (for admin purposes)
app.get('/api/users', asyncHandler(async (req, res) => {
  if (firestore) {
    try {
      const snapshot = await firestore.collection('users').get();
      const users = [];
      snapshot.forEach(doc => {
        users.push(doc.data());
      });
      return res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    // Fallback: return in-memory users
    const users = Array.isArray(db.users) ? db.users : [];
    return res.json(users);
  }
}));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.use((error, _req, res, _next) => {
  console.error('Unhandled API error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

initializeFirebase().finally(() => {
  app.listen(PORT, () => {
    console.log(`Cinema app running on http://localhost:${PORT}`);
  });
});
