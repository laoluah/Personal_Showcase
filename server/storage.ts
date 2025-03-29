import { 
  users, type User, type InsertUser,
  waitlist, type Waitlist, type InsertWaitlist
} from "@shared/schema";

// Interface for the storage layer
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Waitlist methods
  getWaitlistEntries(): Promise<Waitlist[]>;
  getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined>;
  createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private waitlistEntries: Map<number, Waitlist>;
  currentUserId: number;
  currentWaitlistId: number;

  constructor() {
    this.users = new Map();
    this.waitlistEntries = new Map();
    this.currentUserId = 1;
    this.currentWaitlistId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Waitlist methods implementation
  async getWaitlistEntries(): Promise<Waitlist[]> {
    return Array.from(this.waitlistEntries.values());
  }

  async getWaitlistEntryByEmail(email: string): Promise<Waitlist | undefined> {
    return Array.from(this.waitlistEntries.values()).find(
      (entry) => entry.email === email,
    );
  }

  async createWaitlistEntry(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentWaitlistId++;
    const joinedAt = new Date();
    const waitlistEntry: Waitlist = { ...entry, id, joinedAt };
    this.waitlistEntries.set(id, waitlistEntry);
    return waitlistEntry;
  }
}

export const storage = new MemStorage();
