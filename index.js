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
    let basePrice = this.room.rate;
    let roomDiscount = this.room.discount;
    let bookingDiscount = this.discount;
    let finalPriceDay = basePrice * (1 - (roomDiscount / 100)) * (1 - (bookingDiscount / 100));
    let startingDate = this.checkIn.getTime();
    let endingDate    = this.checkOut.getTime();    
    let totalTime = endingDate - startingDate;
    let totalDays = (totalTime/(1000*60*60*24))
    let totalFinalPrice = finalPriceDay * totalDays
    return totalFinalPrice
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
      return this.bookings.some(booking => checkDate >= booking.checkIn && checkDate <booking.checkOut)
  }

  occupancyPercentage(date1, date2) {
    let startDate = new Date(date1)
    let endDate = new Date(date2)
    let startingDate = startDate.getTime();
    let endingDate    = endDate.getTime();    
    let totalTime = endingDate - startingDate;
    let totalDays = (totalTime/(1000*60*60*24))+1
    let currentDay = startDate
    let fullDays = 0

    for (let i = 0; i < totalDays; i++){      
      if(this.isOccupied(currentDay) === true)
      {
          fullDays++
      }      
      currentDay.setTime(currentDay.getTime() + (1000 * 60 * 60 * 24));
    }
    return Math.round((fullDays / totalDays) * 100)
  }

  static totalOccupancyPercentage(rooms, startDate, endDate) {    
    let totalrooms = rooms.length;
    let totalPercentage = 0

    rooms.forEach(room => {
      totalPercentage += room.occupancyPercentage(startDate, endDate);
    });
    return Math.round(totalPercentage / totalrooms);
  }

  static availableRooms(rooms, startDate, endDate) {
    let roomAvailable = []
    let totalPercentage = 0

      rooms.forEach(room => {
        totalPercentage += room.occupancyPercentage(startDate, endDate);        
        if (totalPercentage === 0){
          roomAvailable.push(room.name)
        }
        totalPercentage = 0
      })
    return roomAvailable
  }
}

module.exports = {Room, Booking}