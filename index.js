var Booking = /** @class */ (function () {
    function Booking(_a) {
        var name = _a.name, email = _a.email, checkIn = _a.checkIn, checkOut = _a.checkOut, discount = _a.discount, room = _a.room;
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }
    Object.defineProperty(Booking.prototype, "fee", {
        get: function () {
            var checkIn = new Date(this.checkIn);
            var checkOut = new Date(this.checkOut);
            var basePrice = this.room.rate;
            var roomDiscount = this.room.discount;
            var bookingDiscount = this.discount;
            var finalPriceDay = basePrice * (1 - (roomDiscount / 100)) * (1 - (bookingDiscount / 100));
            var startingDate = checkIn.getTime();
            var endingDate = checkOut.getTime();
            var totalTime = endingDate - startingDate;
            var totalDays = (totalTime / (1000 * 60 * 60 * 24));
            var totalFinalPrice = finalPriceDay * totalDays;
            return totalFinalPrice;
        },
        enumerable: false,
        configurable: true
    });
    return Booking;
}());
var Room = /** @class */ (function () {
    function Room(_a) {
        var name = _a.name, rate = _a.rate, discount = _a.discount;
        this.name = name;
        this.bookings = [];
        this.rate = rate;
        this.discount = discount;
    }
    Room.prototype.isOccupied = function (date) {
        var occupied = false;
        this.bookings.forEach(function (booking) {
            console.log("date:".concat(date, ", checkIn:").concat(booking.checkIn, ", checkOut:").concat(booking.checkOut));
            if ((date >= booking.checkIn) && (date < booking.checkOut))
                occupied = true;
        });
        return occupied;
    };
    Room.prototype.occupancyPercentage = function (date1, date2) {
        var startDate = new Date(date1);
        var endDate = new Date(date2);
        var startingDate = startDate.getTime();
        var endingDate = endDate.getTime();
        var totalTime = endingDate - startingDate;
        var totalDays = (totalTime / (1000 * 60 * 60 * 24)) + 1;
        var currentDay = startDate;
        var fullDays = 0;
        for (var i = 0; i < totalDays; i++) {
            if (this.isOccupied(currentDay.toISOString().split('T')[0]) === true) {
                fullDays++;
            }
            currentDay.setDate(currentDay.getDate() + 1);
        }
        return Math.round((fullDays / totalDays) * 100);
    };
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var totalrooms = rooms.length;
        var totalPercentage = 0;
        rooms.forEach(function (room) {
            totalPercentage += room.occupancyPercentage(startDate, endDate);
        });
        return Math.round(totalPercentage / totalrooms);
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        var roomAvailable = [];
        var totalPercentage = 0;
        rooms.forEach(function (room) {
            totalPercentage += room.occupancyPercentage(startDate, endDate);
            if (totalPercentage === 0) {
                roomAvailable.push(room.name);
            }
            totalPercentage = 0;
        });
        return roomAvailable;
    };
    return Room;
}());
module.exports = { Room: Room, Booking: Booking };
