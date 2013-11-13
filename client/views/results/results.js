Template.resultList.helpers({
    donations: function () {
        return Donations.find({}, {sort :{amount: -1}, limit: 5})
    }
});

Template.donationItem.helpers({
    gradYear: function () {
        if (this.donator === "TALAS") {
            return this.donator
        } else if (this.donator == "TAC") {
            var year = this.year;
            return this.donator + "'" + year.charAt(2) + year.charAt(3)
        } else {
            return ''
        }
    }
});







