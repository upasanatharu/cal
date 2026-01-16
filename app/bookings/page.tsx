export const dynamic = 'force-dynamic';
import { db } from "@/lib/mock-db";
// import { prisma } from "@/lib/prisma"; // ❌ Commented out to stop localhost crashes
import CancelBookingButton from "./components/CancelBookingButton";

export default async function BookingsPage() {
  // MOCK DATA - via lib/mock-db
  const allBookings = await db.getBookingsForUser(1);

  const now = new Date();
  const upcoming = allBookings.filter((b) => new Date(b.startTime) >= now);
  const past = allBookings.filter((b) => new Date(b.startTime) < now);

  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 bg-black min-h-screen">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Bookings</h1>

        <div className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="text-gray-400">No upcoming bookings.</p>
          ) : (
            <div className="space-y-3">
              {upcoming.map((booking) => {
                const { date, time } = formatDateTime(booking.startTime);
                return (
                  <div key={booking.id} className="rounded-lg bg-[#1a1a1a] border border-gray-800 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-4">
                          <h3 className="font-semibold text-white">{booking.bookerName}</h3>
                          <span className="text-sm text-gray-400">{booking.bookerEmail}</span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-400">
                          <p><span className="font-medium text-gray-300">Event:</span> {booking.eventTypeTitle}</p>
                          <p><span className="font-medium text-gray-300">Date:</span> {date}</p>
                          <p><span className="font-medium text-gray-300">Time:</span> {time}</p>
                        </div>
                      </div>
                      <CancelBookingButton bookingId={booking.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">Past</h2>
          {past.length === 0 ? (
            <p className="text-gray-400">No past bookings.</p>
          ) : (
            <div className="space-y-3">
              {past.map((booking) => {
                const { date, time } = formatDateTime(booking.startTime);
                return (
                  <div key={booking.id} className="rounded-lg bg-[#1a1a1a] border border-gray-800 p-4 opacity-70">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-4">
                          <h3 className="font-semibold text-white">{booking.bookerName}</h3>
                          <span className="text-sm text-gray-400">{booking.bookerEmail}</span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-400">
                          <p><span className="font-medium text-gray-300">Event:</span> {booking.eventTypeTitle}</p>
                          <p><span className="font-medium text-gray-300">Date:</span> {date}</p>
                          <p><span className="font-medium text-gray-300">Time:</span> {time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}