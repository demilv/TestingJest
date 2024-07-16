
interface BookingInput{
  name: string;
  email:string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room
}

class Booking {
  name: string;
  email: string;
  checkIn: string;
  checkOut: string;
  discount: number;
  room: Room;

  constructor({name, email, checkIn, checkOut, discount, room}: BookingInput) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }


  get fee() {
    let checkIn = new Date(this.checkIn)
    let checkOut = new Date(this.checkOut)
    let basePrice = this.room.rate;
    let roomDiscount = this.room.discount;
    let bookingDiscount = this.discount;
    let finalPriceDay = basePrice * (1 - (roomDiscount / 100)) * (1 - (bookingDiscount / 100));
    let startingDate = checkIn.getTime();
    let endingDate    = checkOut.getTime();    
    let totalTime = endingDate - startingDate;
    let totalDays = (totalTime/(1000*60*60*24))
    let totalFinalPrice = finalPriceDay * totalDays
    return totalFinalPrice
  }
}

interface RoomInput{
  name: string;
  rate:number;
  discount: number;
}

class Room {

  name: string;
  rate: number;
  discount: number;
  bookings: Booking[];

  constructor({name, rate, discount}: RoomInput) {
    this.name = name;
    this.bookings = [];
    this.rate = rate;
    this.discount = discount;
  }

   isOccupied(date: string): boolean {      
    let occupied = false;    
    this.bookings.forEach((booking) => {
      console.log(`date:${date}, checkIn:${booking.checkIn}, checkOut:${booking.checkOut}`)
      if((date >= booking.checkIn) && (date < booking.checkOut))
        occupied = true
    })
    return occupied
  }

  occupancyPercentage(date1: string, date2: string): number {
    let startDate = new Date(date1)
    let endDate = new Date(date2)
    let startingDate = startDate.getTime();
    let endingDate    = endDate.getTime();    
    let totalTime = endingDate - startingDate;
    let totalDays = (totalTime/(1000*60*60*24))+1
    let currentDay = startDate
    let fullDays = 0

    for (let i = 0; i < totalDays; i++) {
      if (this.isOccupied(currentDay.toISOString().split('T')[0]) === true) {
        fullDays++;
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }
    return Math.round((fullDays / totalDays) * 100);
    
  }

  static totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string): number {    
    let totalrooms = rooms.length;
    let totalPercentage = 0

    rooms.forEach(room => {
      totalPercentage += room.occupancyPercentage(startDate, endDate);
    });
    return Math.round(totalPercentage / totalrooms);
  }

  static availableRooms(rooms: Room[], startDate: string, endDate: string): string[] {
    let roomAvailable: string[] = [];
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