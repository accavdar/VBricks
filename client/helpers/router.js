Meteor.Router.add({
    '/': {
        to: 'resultList',
        and: function () {
            Session.set('isResult', true);
        }
    },

    '/donations': {
        to: 'donationList',
        and: function () {
            Session.set('isResult', false);
        }
    },

    '/donations/:_id/edit': {
        to: 'donationEdit',
        and: function (id) {
            Session.set('currentDonationId', id);
        }
    },

    '/new': {
        to: 'donationSubmit',
        and: function () {
            Session.set('isResult', false);
        }
    }
});

Meteor.Router.filters({
    'requireLogin': function (page) {
        if (Meteor.user()) {
            return page;
        } else {
            return 'accessDenied';
        }
    }
});

Meteor.Router.filter('requireLogin', {except: ['resultList', 'donationList']});
