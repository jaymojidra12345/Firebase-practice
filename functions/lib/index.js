"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestaurantWithOwner = void 0;
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const https_1 = require("firebase-functions/v2/https");
(0, app_1.initializeApp)();
const db = (0, firestore_1.getFirestore)();
const auth = (0, auth_1.getAuth)();
async function assertAdmin(uid) {
    const adminDoc = await db.collection('users').doc(uid).get();
    if (!adminDoc.exists || adminDoc.data()?.role !== 'admin') {
        throw new https_1.HttpsError('permission-denied', 'Only admins can perform this action.');
    }
}
exports.createRestaurantWithOwner = (0, https_1.onCall)(async (request) => {
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'You must be signed in.');
    }
    await assertAdmin(request.auth.uid);
    const data = request.data;
    const ownerEmail = String(data.ownerEmail ?? '').trim().toLowerCase();
    const ownerPassword = String(data.ownerPassword ?? '');
    const ownerDisplayName = String(data.ownerDisplayName ?? '').trim();
    const restaurantName = String(data.restaurantName ?? '').trim();
    const description = String(data.description ?? '').trim();
    const cuisineRaw = String(data.cuisine ?? '').trim();
    const deliveryTime = String(data.deliveryTime ?? '').trim();
    if (!ownerEmail || !ownerPassword || !ownerDisplayName || !restaurantName) {
        throw new https_1.HttpsError('invalid-argument', 'Please fill in all required fields.');
    }
    if (ownerPassword.length < 6) {
        throw new https_1.HttpsError('invalid-argument', 'Password must be at least 6 characters.');
    }
    const cuisine = cuisineRaw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    let ownerUid;
    try {
        const existing = await auth.getUserByEmail(ownerEmail);
        ownerUid = existing.uid;
        const existingProfile = await db.collection('users').doc(ownerUid).get();
        const profileData = existingProfile.data();
        if (profileData?.role === 'admin') {
            throw new https_1.HttpsError('failed-precondition', 'Cannot assign an admin as a restaurant owner.');
        }
        if (profileData?.restaurantId) {
            throw new https_1.HttpsError('already-exists', 'This user is already linked to another restaurant.');
        }
    }
    catch (error) {
        const firebaseError = error;
        if (firebaseError.code !== 'auth/user-not-found') {
            throw error;
        }
        const created = await auth.createUser({
            email: ownerEmail,
            password: ownerPassword,
            displayName: ownerDisplayName,
        });
        ownerUid = created.uid;
    }
    const restaurantRef = db.collection('restaurants').doc();
    const userRef = db.collection('users').doc(ownerUid);
    const userSnapshot = await userRef.get();
    await db.runTransaction(async (transaction) => {
        transaction.set(restaurantRef, {
            name: restaurantName,
            description,
            cuisine,
            rating: 0,
            deliveryTime: deliveryTime || '30-40 min',
            ownerId: ownerUid,
            isActive: true,
            createdAt: firestore_1.FieldValue.serverTimestamp(),
            updatedAt: firestore_1.FieldValue.serverTimestamp(),
        });
        if (userSnapshot.exists) {
            transaction.update(userRef, {
                role: 'restaurant_owner',
                restaurantId: restaurantRef.id,
                displayName: ownerDisplayName,
                updatedAt: firestore_1.FieldValue.serverTimestamp(),
            });
        }
        else {
            transaction.set(userRef, {
                uid: ownerUid,
                email: ownerEmail,
                displayName: ownerDisplayName,
                role: 'restaurant_owner',
                restaurantId: restaurantRef.id,
                photoURL: null,
                phone: null,
                createdAt: firestore_1.FieldValue.serverTimestamp(),
                updatedAt: firestore_1.FieldValue.serverTimestamp(),
            });
        }
    });
    return {
        restaurantId: restaurantRef.id,
        ownerId: ownerUid,
        ownerEmail,
    };
});
//# sourceMappingURL=index.js.map