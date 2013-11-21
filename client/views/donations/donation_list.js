Template.donationList.helpers({
    donations: function () {
        return Donations.find({}, {sort: {name: 1}});
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

Template.donationList.rendered = function() {
    var index = 1;
    $('.dIndex').each(function() {
        $(this).html(index++);
    });

}


