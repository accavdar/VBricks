Meteor.publish('donations', function () {
    return Donations.find();
});

Meteor.publish('donators', function () {
    return Donators.find();
});

Meteor.publish('years', function () {
    return Years.find();
});

Meteor.publish("donationsByYear", function () {
    var self = this;

    var yearlyTotal = function (year) {
        var donation = Donations.find({year: year}).fetch();
        if (donation.length > 0) {
            var total = _.reduce(_.map(Donations.find({year: year}).fetch(),
                function (doc) {
                    return doc.amount
                }),
                function (memo, num) {
                    return memo + num;
                });

            return total;
        }

        return 0;
    }

    var initializeTotal = function () {
        var years = Years.find({}).fetch();
        for (var i = 0; i < years.length; i++) {
            self.added("donationsByYear", years[i].year, {total: yearlyTotal(years[i].year)});
        }

        self.added("donationsByYear", 'XX', {total: yearlyTotal('XX')});
        self.added("donationsByYear", 'TALAS', {total: yearlyTotal('TALAS')});
    }

    var initializing = true;
    var handle = Donations.find().observe({
        added: function (doc) {
            if (!initializing) {
                self.changed("donationsByYear", doc.year, {total: yearlyTotal(doc.year)});
            }
        },
        removed: function (doc) {
            self.changed("donationsByYear", doc.year, {total: yearlyTotal(doc.year)});
        },
        changed: function (newDoc, oldDoc) {
            if (newDoc.year !== oldDoc.year) {
                self.changed("donationsByYear", oldDoc.year, {total: yearlyTotal(oldDoc.year)});
            }
            self.changed("donationsByYear", newDoc.year, {total: yearlyTotal(newDoc.year)});
        }
    });

    initializing = false;
    initializeTotal();
    self.ready();

    self.onStop(function () {
        handle.stop();
    });
});

Meteor.publish("totalBricks", function () {
    var self = this;
    var uuid = Meteor.uuid();
    var total = 7525 * 400;

    var initializeTotal = function () {
        var donations = Donations.find({}).fetch();
        for (var i = 0; i < donations.length; i++) {
            total += donations[i].amount;
        }

        self.added("totalBricks", uuid, {total: total});
    }

    var initializing = true;
    var handle = Donations.find().observe({
        added: function (doc) {
            if (!initializing) {
                total += doc.amount;
                self.changed("totalBricks", uuid, {total: total});
            }
        },
        removed: function (doc) {
            total -= doc.amount;
            self.changed("totalBricks", doc.year, {total: total});
        },
        changed: function (newDoc, oldDoc) {
            total += newDoc.amount - oldDoc.amount;
            self.changed("totalBricks", uuid, {total: total});
        }
    });

    initializing = false;
    initializeTotal();
    self.ready();

    self.onStop(function () {
        handle.stop();
    });
});
