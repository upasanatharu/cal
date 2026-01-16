// lib/mock-db.ts
import fs from 'fs';
import path from 'path';

// Define types
type User = {
    id: number;
    username: string;
    email: string;
};

type EventType = {
    id: number;
    title: string;
    slug: string;
    duration: number;
    description: string;
    userId: number;
};

type Booking = {
    id: number;
    bookerName: string;
    bookerEmail: string;
    startTime: string | Date; // JSON stores dates as strings
    endTime: string | Date;
    eventTypeId: number;
    uid: string;
};

type MockStore = {
    users: User[];
    eventTypes: EventType[];
    bookings: Booking[];
};

const DB_PATH = path.join(process.cwd(), 'mock-data.json');

// Helper to read DB
function readDb(): MockStore {
    try {
        if (!fs.existsSync(DB_PATH)) {
            // Create default if missing
            const defaultData: MockStore = {
                users: [{ id: 1, username: "kavya", email: "kavya@example.com" }],
                eventTypes: [{ id: 1, title: "30 Min Meeting", slug: "30-min", duration: 30, description: "Intro", userId: 1 }],
                bookings: []
            };
            fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
            return defaultData;
        }
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to read mock DB:", error);
        return { users: [], eventTypes: [], bookings: [] };
    }
}

// Helper to write DB
function writeDb(data: MockStore) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Failed to write mock DB:", error);
    }
}

// Database Helper Functions
export const db = {
    getUser: async (id: number) => {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 50));
        const store = readDb();
        return store.users.find(u => u.id === id) || null;
    },

    getAllEventTypes: async (userId: number) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        const store = readDb();
        return store.eventTypes.filter(e => e.userId === userId);
    },

    getEventTypeBySlug: async (username: string, slug: string) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        const store = readDb();
        const user = store.users.find(u => u.username === username);
        if (!user) return null;
        return store.eventTypes.find(e => e.userId === user.id && e.slug === slug) || null;
    },

    createEventType: async (data: Omit<EventType, "id">) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const store = readDb();
        const newId = Math.max(0, ...store.eventTypes.map(e => e.id)) + 1;
        const newEventType = { ...data, id: newId };
        store.eventTypes.push(newEventType);
        writeDb(store);
        return newEventType;
    },

    createBooking: async (data: Omit<Booking, "id" | "uid">) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const store = readDb();
        const newId = Math.max(0, ...store.bookings.map(b => b.id)) + 1;
        const newBooking = {
            ...data,
            id: newId,
            uid: `uid-${newId}`
        };
        store.bookings.push(newBooking);
        writeDb(store);
        return newBooking;
    },

    getBookingsForUser: async (userId: number) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        const store = readDb();
        const userEventTypes = store.eventTypes.filter(e => e.userId === userId);
        const eventTypeIds = userEventTypes.map(e => e.id);

        return store.bookings
            .filter(b => eventTypeIds.includes(b.eventTypeId))
            .map(b => {
                const et = userEventTypes.find(e => e.id === b.eventTypeId);
                return {
                    ...b,
                    startTime: new Date(b.startTime), // Convert string back to Date
                    endTime: new Date(b.endTime),
                    eventType: et,
                    eventTypeTitle: et?.title || "Unknown Event"
                };
            });
    },

    deleteBooking: async (id: number) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const store = readDb();
        const index = store.bookings.findIndex(b => b.id === id);
        if (index !== -1) {
            store.bookings.splice(index, 1);
            writeDb(store);
            return true;
        }
        return false;
    }
};
