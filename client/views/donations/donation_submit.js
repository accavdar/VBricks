Template.donationSubmit.helpers({
    donators: function() {
        return Donators.find();
    },

    years: function() {
        return Years.find();
    }
});

Template.donationSubmit.events({
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
    },

    'submit form': function (e) {
        e.preventDefault();

        var donation = {
            donator: $(e.target).find('[name=donator] option:selected').text(),
            year: $(e.target).find('[name=year] option:selected').text(),
            name: $(e.target).find('[name=name]').val(),
            amount: parseInt($(e.target).find('[name=amount]').val())
        }

        Meteor.call('donation', donation, function (error, id) {
            if (error) {
                throwError(error.reason);
            } else {
                Meteor.Router.to('donationList');
            }
        });
    }
});