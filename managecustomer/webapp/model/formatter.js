sap.ui.define([
	"sap/ui/base/ManagedObject"
], function(
) {
	"use strict";
const formatter = { 
    formatDate: function(date) {
        if (date) {
            // Ensure that the input is a Date object
            if (!(date instanceof Date)) {
                date = new Date(date);
            }

            // Options for formatting the date
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return date.toLocaleDateString('en-GB', options);
        }
        return "";
    },
}
return formatter;
});