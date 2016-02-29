//Common Utils
var Utils = function () {

};

Utils.prototype = {
    isNotNullOrUndefined: function(variable) {
        return (!this.isNullOrUndefined(variable));
    },

    isNullOrUndefined: function (variable) {
        return (this.isUndefined(variable) || this.isNull(variable));
    },

    isUndefined: function (variable) {
        return (variable == undefined);
    },

    isNull: function (variable) {
        return (variable == null);
    },

    now: function () {
        return new Date();
    },

    date: function (date) {
        return new Date(date);
    },

    isType: function (variable, type) {
        return (typeof variable == type)
    }
};
var u = new Utils();

//String Utils
String.prototype.concatWithSpace = function(other) {
    return this.concat(' ').concat(other)
};



