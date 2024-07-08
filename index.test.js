const { Room, Booking } = require('./index');

const room1 = new Room("Room 1", 10000, 10);
const room2 = new Room("Room 2", 15000, 5);

const booking1 = new Booking("Gonzalo", "gonzalo.cano.rodriguez93@gmail.com", "2024-07-01", "2024-07-05", 15, room1);
const booking2 = new Booking("Wiiu", "wiwi@gmail.com", "2024-07-10", "2024-07-15", 10, room1);

room1.bookings.push(booking1);
room1.bookings.push(booking2);

test('habitacion estara ocupada', () => {
  expect(room1.isOccupied("2024-07-03")).toBe(true);
});