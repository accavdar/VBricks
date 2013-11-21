var donators = ['TAC', 'TALAS', 'Guest'];

if (Meteor.users.find({}, {}).count() === 0) {
    for (var i = 0; i < 3; i++) {
        Accounts.createUser({
            username: 'admin' + i,
            password: 'tac' + i
        });
    }
}

if (Donations.find().count() === 0) {
    Donations.insert({
        donator: 'Guest',
        year: 'XX',
        name: 'Abdullah Cetin CAVDAR',
        amount: 400
    });

    Donations.insert({
        donator: 'TAC',
        year: '2001',
        name: 'Murat SOYUPAK',
        amount: 800
    });

}

if (Donators.find().count() === 0) {
    for (var i = 0; i < donators.length; i++) {
        Donators.insert({
            name: donators[i]
        });
    }
}

if (Years.find().count() === 0) {
    for (var i = 1945; i <= 2011; i++) {
        Years.insert({
            year: i.toString()
        });
    }
}