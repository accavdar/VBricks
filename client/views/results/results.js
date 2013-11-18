var money2Brick = function(amount) {
    return amount / 400;
}

Template.resultList.helpers({
    byAmount: function () {
        return Donations.find({}, {sort: {amount: -1}, limit: 5});
    },

    byYear: function () {
        return DonationsByYear.find({ total: { $gt: 0 }}, {sort: {total: -1}, limit: 5});
    },

    totalBricks: function () {
        return TotalBricks.find({});
    }
});

Template.donationByAmount.helpers({
    gradYear: function () {
        if (this.donator === "TALAS") {
            return this.donator
        } else if (this.donator == "TAC") {
            var year = this.year;
            return this.donator + "'" + year.charAt(year.length - 2) + year.charAt(year.length - 1)
        } else {
            return ''
        }
    },

    money2Brick: function() {
        return money2Brick(this.amount);
    }
});

Template.donationByYear.helpers({
    gradYear: function () {
        if (this._id === "XX") {
            return "Konuklar"
        } else if (this._id === "TALAS") {
            return this._id
        } else {
            var year = this._id;
            return "TAC'" + year.charAt(year.length - 2) + year.charAt(year.length - 1)
        }
    },

    money2Brick: function() {
        return money2Brick(this.total);
    }
});

Template.totalBrick.helpers({
    money2Brick: function() {
        return money2Brick(this.total);
    }
});









