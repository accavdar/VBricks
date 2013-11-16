Template.donationEdit.helpers({
    donation: function () {
        return Donations.findOne(Session.get('currentDonationId'));
    },

    donators: function() {
        return Donators.find();
    },

    years: function() {
        return Years.find();
    }
});

Template.donationEdit.events({
    'submit form': function (e) {
        e.preventDefault();

        var currentDonationId = Session.get('currentDonationId');

        var donation = {
            donator: $(e.target).find('[name=donator] option:selected').text(),
            year: $(e.target).find('[name=year] option:selected').text(),
            name: $(e.target).find('[name=name]').val(),
            amount: parseInt($(e.target).find('[name=amount]').val())
        }

        Donations.update(currentDonationId, {$set: donation}, function (error) {
            if (error) {
                throwError(error.reason);
            } else {
                Meteor.Router.to('donationList');
            }
        });
    },

    'click .delete': function (e) {
        e.preventDefault();

        if (confirm("Delete this donation?")) {
            var currentDonationId = Session.get('currentDonationId');

            Donations.remove(currentDonationId);
            Meteor.Router.to('donationList');
        }
    },

    'change #donator': function (e) {
        e.preventDefault();
        var selected = $('#donator option:selected').text();

        $('#year').empty();
        if (selected === "Guest") {
            $("#year").append('<option value="XX" selected>XX</option>');
        } else if (selected === "TALAS") {
            $("#year").append('<option value="TALAS" selected>TALAS</option>');
        } else {
            for (var i = 1958; i <= 2010; i++) {
                $("#year").append('<option value=' + i.toString() + '>' + i + '</option>');
            }
        }
    }
});

//Template.donationEdit.rendered = function() {
//    // update donator
//    var instance = Donations.findOne(Session.get('currentDonationId'));
//    $("#donator option").each(function() {
//        alert($(this).val());
//    });
//};
