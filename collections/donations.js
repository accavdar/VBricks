Donations = new Meteor.Collection('donations');

Meteor.methods({
    donation: function (itemAttributes) {

        var donationId = Donations.insert({
            donator: itemAttributes.donator,
            year: itemAttributes.year,
            name: itemAttributes.name,
            amount: itemAttributes.amount
        });

        return donationId;
    }
});