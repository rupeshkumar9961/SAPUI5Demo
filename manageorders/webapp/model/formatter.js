sap.ui.define([	
	"sap/base/i18n/ResourceBundle",
	"sap/ui/core/format/NumberFormat"
], function ( ResourceBundle, NumberFormat) {
	
	const formatter = {
		formatUnitPrice: function(value) {
			if (value) {
				return parseFloat(value).toFixed(2) + " USD";
			}
			return "0.00";
		},
	
		formatQuantityText: function(value) {
			if (value) {
				return value + " each (EA)"; 
			}
			return "0";
		},
	
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
	
		calculateTotalAmountWithCurrency: function (sUnitPrice, sQuantity) {
			if (!sUnitPrice || !sQuantity) {
				return "0.00"; 
			}
			else {
			
			var fUnitPrice = parseFloat(sUnitPrice);
			var iQuantity = parseInt(sQuantity, 10);
			var fTotal = fUnitPrice * iQuantity;
			
			return fTotal.toFixed(2) + " USD";
			}
		},
		formatDate: function (sDate) {
			if (sDate) {
				const oDateObject = new Date(sDate);
				const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MMM dd, yyyy" });
				const sFormattedDate = oDateFormat.format(oDateObject);

				return sFormattedDate;
			}
			else {
				return formatter._getText("undefinedText");
			}
		},

		formatNoValue: function (sValue) {
			if (!sValue) {
				return formatter._getText("undefinedText");
			} else {
				return sValue;
			}
		},

		formatQuantity: function (sQnty, sUOMText, sUOM) {
			return sQnty ? sQnty + " " + sUOMText + " (" + sUOM + ")" : formatter._getText("undefinedText");
		},

		formatCityPostalCodeText: function (sCity, sPostalCode) {
			if (sCity && sPostalCode) {
				return sCity + ', ' + sPostalCode;
			} else if (sCity) {
				return sCity;
			}
			else if (sPostalCode) {
				return sPostalCode;
			}
			else {
				return formatter._getText("undefinedText");
			}
		},
    
		_getText: function (sKey, oArgs) {
			if (!formatter.rb) {
				formatter.rb = ResourceBundle.create({
					url: sap.ui.require.toUrl("com/sap/demo/manageorders/i18n/i18n.properties")
				});
			}
			return formatter.rb.getText(sKey, oArgs);
		},

		formatMultiLineText: function (sLine1, sLine2, sLine3) {
			return sLine1 && sLine3 && sLine3 ? sLine1 + '\n' + sLine2 + '\n' + sLine3 : formatter._getText("undefinedText");
		},

		

		formatPercentage: function (sPercentage) {
			return parseFloat(sPercentage) + "%";
		},

		formatAmount: function (sAmount) {
			return parseFloat(sAmount).toFixed(2);
		},

		formatSplitQuantity: function (sQuantity) {
			return parseFloat(sQuantity);
		},

		formatDecimal: function (sAmount, sCurrency) {
			if (sAmount && sCurrency) {
				const oCurrencyFormat = NumberFormat.getCurrencyInstance();
				return oCurrencyFormat.format(sAmount, sCurrency)
			} else {
				return formatter._getText("undefinedText");
			}
		},

		formatText: function (sCode, sDescription) {
			if (sCode && sDescription) {
				return sDescription + ' (' + sCode + ')';
			} else if (sCode) {
				return sCode;
			} else {
				return formatter._getText("undefinedText");
			}	
		},

		formatShipVia: function(shipVia) {
            switch (shipVia) {
                case 3:
                    return "Courier Service";
                case 2:
                    return "Air Mail";
                default:
                    return "Standard Shipping";
            }
        },

		formatTotalPrice: function(unitPrice, quantity) {
            if (!unitPrice || !quantity) {
                return "0.00";
            }
            var totalPrice = unitPrice * quantity;
            return totalPrice.toFixed(2); // Formats the result to two decimal places
        },
		formatItemNet: function(unitPrice, quantity) {
            if (!unitPrice || !quantity) {
                return "0.00";
            }
            var totalPrice = ( unitPrice * quantity ) - 10;
            return totalPrice.toFixed(2); // Formats the result to two decimal places
        }
    
	};
	return formatter;
});