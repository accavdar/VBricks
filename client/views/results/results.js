Template.resultList.helpers({
    byAmount: function () {
        return Donations.find({}, {sort: {amount: -1}, limit: 5});
    },

    byYear: function () {
        return DonationsByYear.find({ total: { $gt: 0 }}, {sort: {total: -1}, limit: 5});
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
    }
});







