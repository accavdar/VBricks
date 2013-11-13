Template.donationList.helpers({
    donations: function () {
        return Donations.find();
    }
});

Template.donationList.events({
    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this donation?")) {
            var donationId = $(e.target).attr('donation-id');
            Donations.remove(donationId);
            Meteor.Router.to('donationList');
        }
    }
});


