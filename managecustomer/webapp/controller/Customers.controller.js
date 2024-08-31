sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.sap.demo.managecustomer.managecustomer.controller.Customers", {
        onInit: function () {

            var oCarousel = this.byId("idCarousel");
            var i = 0;
        
            setInterval(function() {
                i = (i + 1) % oCarousel.getPages().length; // Cycle through the pages
                oCarousel.setActivePage(oCarousel.getPages()[i]);
            }, 4000); // Switch every 2 seconds

        },
        onColumnListItemCustomerDetailsNavPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oItem = oEvent.getSource(); 
            var sCustomerID = oItem.getBindingContext().getProperty("CustomerID");

            oRouter.navTo("RouteCustomerDetail", {
                CustomerID: sCustomerID
            });
        },
        onSearchFieldCustomerLiveChange: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue"); // Get the search query from the SearchField

            // Get the table and binding
            var oTable = this.byId("idCustomersTable");
            var oBinding = oTable.getBinding("items");

            // Create a filter based on the search query
            var aFilters = [];
            if (sQuery) {
                var oFilter = new Filter({
                    path: "CustomerID",
                    operator: FilterOperator.StartsWith,
                    value1: sQuery,
                    caseSensitive: false,
                });
                aFilters.push(oFilter);
            }

            // Apply the filter to the table binding
            oBinding.filter(aFilters);

            if (!sQuery) {
                oBinding.filter([]); // Clear any filters to show all items
            }
        },
    });
});
