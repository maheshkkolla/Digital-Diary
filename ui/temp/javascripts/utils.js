//Common Utils
var Util = function () {

};

Util.prototype = {
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
    },

    getKeys: function(obj) {
        return Object.keys(obj);
    },

    mapOnKeys: function(obj, callback) {
         return this.getKeys(obj).map(callback);
    },

    eachOnKeys: function(arr, callback) {
        this.getKeys(arr).forEach(callback);
    },

    newDateString: function(){
        return new Date().toString();
    }
};
var u = new Util();

//String Utils
String.prototype.concatWithSpace = function(other) {
    return this.concat(' ').concat(other)
};

String.prototype.is = function(other) {
    return (this == other);
};

export default class Utils {

    static isNullOrEmpty(value) {
        return(Utils.isNull(value) || Utils.isUndefined(value) || Utils.isEmptyString(value) );
    }

    static isNull(value) {
        return(value === null);
    }

    static isUndefined(value) {
        return(value === undefined)
    }

    static isEmptyString(value) {
        return !(/\S/.test(value));
    }

    static isInvalidEmail(email) {
        let emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !(emailRegEx.test(email));
    }
}



