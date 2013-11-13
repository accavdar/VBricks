Meteor.Router.add({
    '/': {
        to: 'resultList',
        and: function() {
            Session.set('isResult', true);
        }
    },

    '/list': {
        to: 'donationList',
        and: function() {
            Session.set('isResult', false);
        }
    },

    '/new': {
        to: 'donationSubmit',
        and: function() {
            Session.set('isResult', false);
        }
    }
});