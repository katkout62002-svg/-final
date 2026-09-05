import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment, 
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  limit
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export interface DeviceVisitRecord {
  deviceId: string;
  visitCount: number;
  deviceType: string;
  os: string;
  browser: string;
  firstVisitAt: string;
  lastVisitAt: string;
  fullName?: string;
  age?: number;
  educationalAdmin?: string;
  schoolName?: string;
  isRegistered?: boolean;
  registeredAt?: string;
}

export interface VisitorProfile {
  deviceId: string;
  fullName: string;
  age: number;
  educationalAdmin: string;
  schoolName: string;
  visitCount?: number;
  lastVisitAt?: string;
  registeredAt?: string;
  isPublic?: boolean;
}

export interface GlobalVisitStats {
  totalVisits: number;
  uniqueDevices: number;
  registeredStudentsCount?: number;
  lastUpdated: string;
}

const DEVICE_ID_KEY = 'be7ery_device_uuid_v1';
const SESSION_VISIT_FLAG = 'be7ery_session_recorded_flag';
const LOCAL_DEVICE_STATS_KEY = 'be7ery_local_device_stats';
const LOCAL_PROFILE_KEY = 'be7ery_visitor_profile';

/**
 * Returns or creates a persistent device ID.
 */
export function getOrCreateDeviceId(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timePart = Date.now().toString(36);
    id = `dev_${timePart}_${randomPart}`;
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

/**
 * Parses user agent to detect human-readable device info.
 */
export function getClientDeviceMetadata() {
  const ua = navigator.userAgent || '';
  
  // OS Detection
  let os = 'غير معروف';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Browser Detection
  let browser = 'متصفح ويب';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  // Device Type
  let deviceType = 'كمبيوتر شخصي';
  const isMobile = /mobile|android|iphone|ipod/i.test(ua);
  const isTablet = /tablet|ipad/i.test(ua);
  if (isTablet) deviceType = 'جهاز لوحي (Tablet)';
  else if (isMobile) deviceType = 'هاتف محمول (Mobile)';
  else deviceType = 'كمبيوتر (Desktop / Laptop)';

  return { os, browser, deviceType };
}

/**
 * Records a visit for the current device and increments global metrics in Firestore.
 */
export async function recordAppVisit(): Promise<{
  deviceStats: DeviceVisitRecord;
  globalStats?: GlobalVisitStats;
}> {
  const deviceId = getOrCreateDeviceId();
  const metadata = getClientDeviceMetadata();
  const nowIso = new Date().toISOString();

  // Load existing local profile if any
  let localProfile: Partial<DeviceVisitRecord> = {};
  try {
    const saved = localStorage.getItem(LOCAL_PROFILE_KEY);
    if (saved) localProfile = JSON.parse(saved);
  } catch {
    // ignore
  }

  // Check if visit was already recorded for this tab/window session
  const alreadyRecordedInSession = sessionStorage.getItem(SESSION_VISIT_FLAG);

  const deviceDocPath = `devices/${deviceId}`;
  const statsDocPath = `stats/visits`;

  let deviceRecord: DeviceVisitRecord = {
    deviceId,
    visitCount: 1,
    deviceType: metadata.deviceType,
    os: metadata.os,
    browser: metadata.browser,
    firstVisitAt: nowIso,
    lastVisitAt: nowIso,
    ...localProfile,
  };

  try {
    const deviceRef = doc(db, 'devices', deviceId);
    let deviceDocSnap;
    try {
      deviceDocSnap = await getDoc(deviceRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, deviceDocPath);
    }

    const isNewDevice = !deviceDocSnap || !deviceDocSnap.exists();

    if (!alreadyRecordedInSession) {
      // 1. Update or create device record
      if (isNewDevice) {
        deviceRecord = {
          deviceId,
          visitCount: 1,
          deviceType: metadata.deviceType,
          os: metadata.os,
          browser: metadata.browser,
          firstVisitAt: nowIso,
          lastVisitAt: nowIso,
          ...localProfile,
        };
        try {
          await setDoc(deviceRef, deviceRecord);
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, deviceDocPath);
        }
      } else {
        const existingData = deviceDocSnap.data() as Partial<DeviceVisitRecord>;
        const newCount = (existingData.visitCount || 0) + 1;
        deviceRecord = {
          deviceId,
          visitCount: newCount,
          deviceType: metadata.deviceType || existingData.deviceType || 'كمبيوتر',
          os: metadata.os || existingData.os || 'Windows',
          browser: metadata.browser || existingData.browser || 'Web',
          firstVisitAt: existingData.firstVisitAt || nowIso,
          lastVisitAt: nowIso,
          fullName: existingData.fullName || localProfile.fullName,
          age: existingData.age || localProfile.age,
          educationalAdmin: existingData.educationalAdmin || localProfile.educationalAdmin,
          schoolName: existingData.schoolName || localProfile.schoolName,
          isRegistered: existingData.isRegistered || localProfile.isRegistered || false,
          registeredAt: existingData.registeredAt || localProfile.registeredAt,
        };

        const updatePayload: Record<string, unknown> = {
          visitCount: increment(1),
          lastVisitAt: nowIso,
          deviceType: deviceRecord.deviceType,
          os: deviceRecord.os,
          browser: deviceRecord.browser,
        };
        if (deviceRecord.fullName) updatePayload.fullName = deviceRecord.fullName;
        if (deviceRecord.age) updatePayload.age = deviceRecord.age;
        if (deviceRecord.educationalAdmin) updatePayload.educationalAdmin = deviceRecord.educationalAdmin;
        if (deviceRecord.schoolName) updatePayload.schoolName = deviceRecord.schoolName;
        if (deviceRecord.isRegistered) updatePayload.isRegistered = true;
        if (deviceRecord.registeredAt) updatePayload.registeredAt = deviceRecord.registeredAt;

        try {
          await updateDoc(deviceRef, updatePayload);
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, deviceDocPath);
        }
      }

      // 2. Update global stats
      const statsRef = doc(db, 'stats', 'visits');
      try {
        const statsSnap = await getDoc(statsRef);
        if (statsSnap.exists()) {
          const updatePayload: Record<string, unknown> = {
            totalVisits: increment(1),
            lastUpdated: nowIso,
          };
          if (isNewDevice) {
            updatePayload.uniqueDevices = increment(1);
          }
          await updateDoc(statsRef, updatePayload);
        } else {
          // Initialize stats doc
          await setDoc(statsRef, {
            totalVisits: 1,
            uniqueDevices: 1,
            registeredStudentsCount: localProfile.isRegistered ? 1 : 0,
            lastUpdated: nowIso,
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, statsDocPath);
      }

      // Mark session as recorded
      sessionStorage.setItem(SESSION_VISIT_FLAG, 'true');
    } else {
      // Session already recorded in this tab, just read the existing device record if available
      if (deviceDocSnap && deviceDocSnap.exists()) {
        const data = deviceDocSnap.data() as DeviceVisitRecord;
        deviceRecord = { ...deviceRecord, ...data };
      }
    }

    localStorage.setItem(LOCAL_DEVICE_STATS_KEY, JSON.stringify(deviceRecord));
    if (deviceRecord.fullName) {
      localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify({
        fullName: deviceRecord.fullName,
        age: deviceRecord.age,
        educationalAdmin: deviceRecord.educationalAdmin,
        schoolName: deviceRecord.schoolName,
        isRegistered: true,
        registeredAt: deviceRecord.registeredAt,
      }));
    }
  } catch (error) {
    console.warn('Could not sync visit with Firestore:', error);
    // Fallback to local storage
    const cached = localStorage.getItem(LOCAL_DEVICE_STATS_KEY);
    if (cached) {
      try {
        deviceRecord = JSON.parse(cached);
      } catch {
        // ignore
      }
    }
  }

  return { deviceStats: deviceRecord };
}

/**
 * Saves or updates student visitor data in Firestore.
 */
export async function saveVisitorProfile(profile: {
  fullName: string;
  age: number;
  educationalAdmin: string;
  schoolName: string;
}): Promise<DeviceVisitRecord> {
  const deviceId = getOrCreateDeviceId();
  const nowIso = new Date().toISOString();

  const trimmedName = profile.fullName.trim();
  const trimmedAdmin = profile.educationalAdmin.trim();
  const trimmedSchool = profile.schoolName.trim();
  const numericAge = Number(profile.age);

  // 1. Update device document
  const deviceRef = doc(db, 'devices', deviceId);
  const devicePath = `devices/${deviceId}`;
  let wasPreviouslyRegistered = false;

  try {
    const snap = await getDoc(deviceRef);
    if (snap.exists()) {
      const data = snap.data() as Partial<DeviceVisitRecord>;
      wasPreviouslyRegistered = !!data.isRegistered;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, devicePath);
  }

  const deviceUpdates = {
    fullName: trimmedName,
    age: numericAge,
    educationalAdmin: trimmedAdmin,
    schoolName: trimmedSchool,
    isRegistered: true,
    registeredAt: nowIso,
  };

  try {
    await updateDoc(deviceRef, deviceUpdates);
  } catch (err) {
    // If doc didn't exist, create it
    try {
      const metadata = getClientDeviceMetadata();
      await setDoc(deviceRef, {
        deviceId,
        visitCount: 1,
        deviceType: metadata.deviceType,
        os: metadata.os,
        browser: metadata.browser,
        firstVisitAt: nowIso,
        lastVisitAt: nowIso,
        ...deviceUpdates,
      });
    } catch (createErr) {
      handleFirestoreError(createErr, OperationType.WRITE, devicePath);
    }
  }

  // 2. Update public visitor directory document
  const visitorRef = doc(db, 'visitors', deviceId);
  const visitorPath = `visitors/${deviceId}`;
  const visitorData: VisitorProfile = {
    deviceId,
    fullName: trimmedName,
    age: numericAge,
    educationalAdmin: trimmedAdmin,
    schoolName: trimmedSchool,
    lastVisitAt: nowIso,
    registeredAt: nowIso,
    isPublic: true,
  };

  try {
    await setDoc(visitorRef, visitorData);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, visitorPath);
  }

  // 3. Update global stats counter for registered students
  if (!wasPreviouslyRegistered) {
    const statsRef = doc(db, 'stats', 'visits');
    try {
      await updateDoc(statsRef, {
        registeredStudentsCount: increment(1),
        lastUpdated: nowIso,
      });
    } catch {
      // ignore
    }
  }

  // Save to local cache
  const updatedDeviceRecord: DeviceVisitRecord = {
    deviceId,
    visitCount: 1,
    deviceType: 'كمبيوتر',
    os: 'Windows',
    browser: 'Web',
    firstVisitAt: nowIso,
    lastVisitAt: nowIso,
    ...deviceUpdates,
  };

  localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(deviceUpdates));
  localStorage.setItem(LOCAL_DEVICE_STATS_KEY, JSON.stringify(updatedDeviceRecord));

  return updatedDeviceRecord;
}

/**
 * Loads registered visitors directory for Admin access.
 */
export async function fetchRecentRegisteredVisitors(limitCount = 50): Promise<VisitorProfile[]> {
  const visitorsPath = 'visitors';
  try {
    const q = query(
      collection(db, visitorsPath),
      where('isPublic', '==', true),
      limit(limitCount)
    );
    const snap = await getDocs(q);
    const results: VisitorProfile[] = [];
    snap.forEach((d) => {
      results.push(d.data() as VisitorProfile);
    });
    return results;
  } catch (err) {
    console.warn('Could not fetch visitors directory:', err);
    return [];
  }
}

/**
 * Loads all registered visitors for Admin Roster & Reporting.
 */
export async function fetchAllRegisteredVisitors(): Promise<VisitorProfile[]> {
  const visitorsPath = 'visitors';
  try {
    const q = query(
      collection(db, visitorsPath),
      limit(250)
    );
    const snap = await getDocs(q);
    const results: VisitorProfile[] = [];
    snap.forEach((d) => {
      const data = d.data() as VisitorProfile;
      results.push(data);
    });
    // Sort by latest registered or last visited
    return results.sort((a, b) => {
      const timeA = new Date(a.registeredAt || a.lastVisitAt || 0).getTime();
      const timeB = new Date(b.registeredAt || b.lastVisitAt || 0).getTime();
      return timeB - timeA;
    });
  } catch (err) {
    console.warn('Admin fetch error:', err);
    return [];
  }
}

/**
 * Subscribes to real-time global visit metrics.
 */
export function subscribeToGlobalStats(
  onUpdate: (stats: GlobalVisitStats) => void,
  onError?: (err: unknown) => void
): () => void {
  const path = 'stats/visits';
  const statsRef = doc(db, 'stats', 'visits');

  const unsubscribe = onSnapshot(
    statsRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as GlobalVisitStats;
        onUpdate({
          totalVisits: data.totalVisits || 0,
          uniqueDevices: data.uniqueDevices || 0,
          registeredStudentsCount: data.registeredStudentsCount || 0,
          lastUpdated: data.lastUpdated || new Date().toISOString(),
        });
      } else {
        // Fallback default
        onUpdate({
          totalVisits: 1,
          uniqueDevices: 1,
          registeredStudentsCount: 0,
          lastUpdated: new Date().toISOString(),
        });
      }
    },
    (error) => {
      console.warn('Real-time stats error:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );

  return unsubscribe;
}

/**
 * Subscribes to real-time device visit metrics.
 */
export function subscribeToDeviceStats(
  deviceId: string,
  onUpdate: (stats: DeviceVisitRecord) => void,
  onError?: (err: unknown) => void
): () => void {
  const path = `devices/${deviceId}`;
  const deviceRef = doc(db, 'devices', deviceId);

  const unsubscribe = onSnapshot(
    deviceRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as DeviceVisitRecord;
        onUpdate(data);
      }
    },
    (error) => {
      console.warn('Device stats listener error:', error);
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.GET, path);
    }
  );

  return unsubscribe;
}
