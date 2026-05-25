import crypto from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

// 1. Cryptographically Secure Password Hashing via Node Scrypt
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const parts = storedHash.split(":");
  if (parts.length !== 2) return false;
  const [salt, hash] = parts;
  const testHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(testHash, "hex"));
}

// 2. Session Management
const SESSION_COOKIE_NAME = "fry_session_token";
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_MS);
  
  // Save session to SQLite
  const session = await prisma.session.create({
    data: {
      userId,
      expiresAt
    }
  });

  // Set HTTPOnly cookie in browser response
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/"
  });

  return session;
}

export async function getSessionId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export async function validateSession(sessionId: string) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId }
  });

  if (!session) return null;

  // Check expiration
  if (new Date() > session.expiresAt) {
    // Delete expired session
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  // Fetch admin user details
  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  return user;
}

export async function getCurrentUser() {
  const sessionId = await getSessionId();
  if (!sessionId) return null;
  return validateSession(sessionId);
}

export async function destroySession() {
  const sessionId = await getSessionId();
  if (sessionId) {
    try {
      await prisma.session.delete({ where: { id: sessionId } });
    } catch (e) {
      // Ignored if session already deleted
    }
  }

  // Clear cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/"
  });
}
