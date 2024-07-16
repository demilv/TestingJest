const { Room, Booking } = require('./index');

let room1, room2;

function data() { 
  room1 = new Room({name: "Room 1", rate: 10000, discount: 10});
  room2 = new Room({name: "Room 2", rate: 15000, discount: 5});

  const booking1 = new Booking({name: "Gonzalo", email: "gonzalo.cano.rodriguez93@gmail.com", checkIn: "2024-07-01", checkOut: "2024-07-05", discount: 15, room: room1});
  const booking2 = new Booking({name: "Wiiu", email: "wiwi@gmail.com", checkIn: "2024-07-10", checkOut: "2024-07-15", discount: 10, room: room1});
  const booking3 = new Booking({name: "Mal", email: "mal@gmail.com", checkIn: "2024-07-07", checkOut: "2024-07-09", discount: 20, room: room2})

  room1.bookings.push(booking1);
  room1.bookings.push(booking2);
  room2.bookings.push(booking3);
}

beforeEach(() => {
  data(); 
});

test('room will not be available', () => {
  expect(room1.isOccupied("2024-07-01")).toBe(true);
});

test('room will not be available', () => {
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
  expect(room1.occupancyPercentage("2024-07-04", "2024-07-05")).toBe(50);
});

test('The occupation % will be 0%', () => {
  expect(room1.occupancyPercentage("2024-07-06", "2024-07-08")).toBe(0);
});

test('The occupation % will be 100%', () => {
  expect(room1.occupancyPercentage("2024-07-02", "2024-07-04")).toBe(100);
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
  const actualFee = room1.bookings[0].fee;
  expect(actualFee).toBe(30600);
});

test('Total fee should be 22800', () => {
  const actualFee = room2.bookings[0].fee;
  expect(actualFee).toBe(22800);
});
