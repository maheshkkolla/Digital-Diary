//String Utils
String.prototype.toDate = function() {
    return new Date(this.slice(0,15));
};


//Date Utils
Date.prototype.toDbString = function() {
    var year = this.getFullYear().toString();
    var month = (this.getMonth() + 1).toString();
    var date = this.getDate().toString();
    var separator = "-";
    return(year.concat(separator).concat(month).concat(separator).concat(date));
};

Date.prototype.next = function() {
    return(new Date(this.getTime() + 24 * 60 * 60 * 1000));
};