var money2Brick = function(amount) {
    return amount / 400;
}

Template.resultList.helpers({
    byAmount: function () {
        return Donations.find({}, {sort: {amount: -1, year: 1}});
    },

    byYear: function () {
        return DonationsByYear.find({ total: { $gt: 0 }}, {sort: {total: -1}});
    },

    totalBricks: function () {
        return TotalBricks.find({});
    }
});

Template.donationByAmount.helpers({
    gradYear: function () {
        if (this.donator === "TALAS") {
            return this.donator
        } else if (this.donator == "TAC") {
            var year = this.year;
            return this.donator + "'" + year.charAt(year.length - 2) + year.charAt(year.length - 1)
        } else {
            return ''
        }
    },

    money2Brick: function() {
        return money2Brick(this.amount);
    }
});

Template.donationByYear.helpers({
    gradYear: function () {
        if (this._id === "XX") {
            return "Konuklar"
        } else if (this._id === "TALAS") {
            return this._id
        } else {
            var year = this._id;
            return "TAC'" + year.charAt(year.length - 2) + year.charAt(year.length - 1)
        }
    },

    money2Brick: function() {
        return money2Brick(this.total);
    }
});

Template.totalBrick.helpers({
    money2Brick: function() {
        return money2Brick(this.total);
    }
});

Template.donationByAmount.rendered = function() {
    var index = 1;
    $('#donationByAmount .index').each(function() {
        $(this).html(index++ + '.');
    });

    var partId;
    var $items = $('#donationByAmount .donation');
    $('#donationByAmount1').empty();
    $('#donationByAmount1').append("<div id='amountCarousel' class='carousel slide'><div class='carousel-inner'></div></div>");

    $items.each(function(index) {
        if (index % 4 == 0) {
            partId = index;
            if (partId == 0) {
                $('#amountCarousel .carousel-inner').append("<div class='active item " + index + "'></div>");
            } else {
                $('#amountCarousel .carousel-inner').append("<div class='item " + index + "'></div>");
            }
        }
        $('#amountCarousel .carousel-inner .item.' + partId).append("<div class='donation'>" + $(this).html() + "</div>");
    });

    $('#amountCarousel').carousel({
        interval: false
    });

    $('#donationByAmount1').show();
    $('#donationByAmount').hide();
}

Template.donationByYear.rendered = function() {
    var index = 1;
    $('#donationByYear .index').each(function() {
        $(this).html(index++ + '.');
    });
}









