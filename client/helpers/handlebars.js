Handlebars.registerHelper('isResult', function() {
    return Session.get('isResult')
});

Handlebars.registerHelper('isEqual', function(a, b) {
    return a === b
});