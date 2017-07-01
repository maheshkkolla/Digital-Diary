var Location = function(name, address, latitude, longitude, phoneNumber) {
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.phoneNumber = phoneNumber;
};

Location.prototype = {
    getAddressWithName: function() {
        return(this.name.concatWithSpace(this.address));
    },

    toJson: function() {
        if(u.isNullOrUndefined(this.name)) return null;
        return {
            name: this.name,
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude,
            phoneNumber: this.phoneNumber
        };
    }
};
