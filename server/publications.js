Meteor.publish('donations', function() {
    return Donations.find();
});

Meteor.publish('donators', function() {
    return Donators.find();
});

Meteor.publish('years', function() {
    return Years.find();
});