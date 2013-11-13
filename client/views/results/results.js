Template.resultList.helpers({
    donations: function () {
        return Donations.find({}, {sort :{amount: -1}, limit: 5})
    }
});



