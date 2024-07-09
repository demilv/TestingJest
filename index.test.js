const { Room, Booking } = require('./index');

const room1 = new Room("Room 1", 10000, 10);
const room2 = new Room("Room 2", 15000, 5);

const booking1 = new Booking("Gonzalo", "gonzalo.cano.rodriguez93@gmail.com", "2024-07-01", "2024-07-05", 15, room1);
const booking2 = new Booking("Wiiu", "wiwi@gmail.com", "2024-07-10", "2024-07-15", 10, room1);
const booking3 = new Booking("Mal", "mal@gmail.com", "2024-07-07", "2024-07-09", 20, room2)

room1.bookings.push(booking1);
room1.bookings.push(booking2);

test('room will not be available', () => {
  expect(room1.isOccupied("2024-07-01")).toBe(true);
});

test('hroom will not be available', () => {
  expect(room1.isOccupied("2024-07-03")).toBe(true);
});

test('room will be free', () => {
  expect(room1.isOccupied("2024-07-05")).toBe(false);
});

test('room will be free', () => {
  expect(room1.isOccupied("2024-07-06")).toBe(false);
});

test('The occupation % will be 100%', () => {
  const startDate = new Date("2024-07-04");
  const endDate = new Date("2024-07-05"); 
  expect(room1.occupancyPercentage(startDate, endDate)).toBe(100);
});

test('The occupation % will be 50%', () => {
  const startDate = new Date("2024-07-04");
  const endDate = new Date("2024-07-06"); 
  expect(room1.occupancyPercentage(startDate, endDate)).toBe(50);
});

test('The occupation % will be 71%', () => {
  const startDate = new Date("2024-07-09");
  const endDate = new Date("2024-07-16"); 
  expect(room1.occupancyPercentage(startDate, endDate)).toBe(71);
});