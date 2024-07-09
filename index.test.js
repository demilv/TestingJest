const { Room, Booking } = require('./index');

const room1 = new Room("Room 1", 10000, 10);
const room2 = new Room("Room 2", 15000, 5);

const booking1 = new Booking("Gonzalo", "gonzalo.cano.rodriguez93@gmail.com", "2024-07-01", "2024-07-05", 15, room1);
const booking2 = new Booking("Wiiu", "wiwi@gmail.com", "2024-07-10", "2024-07-15", 10, room1);
const booking3 = new Booking("Mal", "mal@gmail.com", "2024-07-07", "2024-07-09", 20, room2)

room1.bookings.push(booking1);
room1.bookings.push(booking2);
room2.bookings.push(booking3);


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

test('room will be free', () => {
  expect(room2.isOccupied("2024-07-10")).toBe(false);
});

test('The occupation % will be 50%', () => {
  console.log(room1.occupancyPercentage("2024-07-04", "2024-07-05"))
  expect(room1.occupancyPercentage("2024-07-04", "2024-07-05")).toBe(50);
});

test('The occupation % will be 33%', () => {
  expect(room1.occupancyPercentage("2024-07-04", "2024-07-06")).toBe(33);
});

test('The occupation % will be 63%', () => {
  expect(room1.occupancyPercentage("2024-07-09", "2024-07-16")).toBe(63);
});

test('The occupation % will be 37%', () => {
  const rooms = [room1, room2];
  expect(Room.totalOccupancyPercentage(rooms ,"2024-07-01", "2024-07-15")).toBe(37);
});

test('The occupation % will be 50%', () => {
  const rooms = [room1, room2];
  expect(Room.totalOccupancyPercentage(rooms ,"2024-07-02", "2024-07-03")).toBe(50);
});

test('Both rooms will be free', () => {
  const rooms = [room1, room2];
  expect(Room.availableRooms(rooms ,"2024-07-20", "2024-07-23")).toStrictEqual(["Room 1", "Room 2"]);
});

test('Room 1 should be free', () => {
  const rooms = [room1, room2];
  expect(Room.availableRooms(rooms ,"2024-07-05", "2024-07-08")).toStrictEqual(["Room 1"]);
});

test('Room 2 should be free', () => {
  const rooms = [room1, room2];
  expect(Room.availableRooms(rooms ,"2024-07-09", "2024-07-10")).toStrictEqual(["Room 2"]);
});

test('Total fee should be 30600', () => {
  const actualFee = booking1.fee;
  expect(actualFee).toBe(30600);
})

test('Total fee should be 22800', () => {
  const actualFee = booking3.fee;
  expect(actualFee).toBe(22800);
})