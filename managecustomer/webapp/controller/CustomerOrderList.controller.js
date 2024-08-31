sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.sap.demo.managecustomer.managecustomer.controller.CustomerOrderList", {
        onInit: function () {

        },

        onAfterRendering: function () {

        },

        onColumnListItemOrderPress: function (oEvent) {
                    var oItem = oEvent.getSource();
            
                    var oContext = oItem.getBindingContext();
        
                    var oData = oContext.getObject();
                    var oView = this.getView();
                    var oOrderDetailView = oView.byId("idOrderDetailXMLView").getContent()[0];
                    
                    var oFirstRecordModel = oOrderDetailView.getModel("firstRecordModel");
                    
                    oFirstRecordModel.setData(oData);
        },
        onSearchFieldSearch : function (oEvent) {
            var sQuery = oEvent.getParameter("query");

            var oTable = this.byId("idOrdersTable");
            var oBinding = oTable.getBinding("items");

            var aFilters = [];
            if (sQuery) {
                var sQueryString = sQuery.toString();

                // Use the custom filter function to compare the string values
                var oFilter = new Filter({
                    path: "OrderID",
                    operator: FilterOperator.EQ,
                    value1: sQueryString,
                    caseSensitive: false
                });
        
                aFilters.push(oFilter);
            }

            oBinding.filter(aFilters);
        }
    });
});
