class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = new Date(checkIn);
    this.checkOut = new Date(checkOut);
    this.discount = discount;
    this.room = room;
  }

  get fee() {
    
  }
}

class Room {
  constructor(name, rate, discount) {
    this.name = name;
    this.bookings = [];
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date) {
      const checkDate = new Date(date);
      return this.bookings.some(booking => checkDate >= booking.checkIn && checkDate <=booking.checkOut)
  }

  occupancyPercentage(startDate, endDate) {

  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {

  }

  static availableRooms(rooms, startDate, endDate) {

  }
}

module.exports = {Room, Booking}