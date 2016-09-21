satanApp.service('shareId', function() {
    var stringValue = '';
    return {
        getString: function() {
            return stringValue;
        },
        setString: function(value) {
            stringValue = value;
        },
        getRandomImage: function() {
			return 'app/img/' + Math.floor((Math.random()*6)+1) + '.jpg';
        }
    }
});
