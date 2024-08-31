sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (Controller,
	UIComponent) {
    "use strict";

    return Controller.extend("com.sap.demo.managecustomer.managecustomer.controller.CustomerDetail", {
        onInit: function () {
            // Attach the route pattern matched event
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteCustomerDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            // Get the CustomerID from the URL
            var sCustomerID = oEvent.getParameter("arguments").CustomerID;

            // Construct the OData path
            var sPath = "/Customers('" + sCustomerID + "')";

            // Bind the view to the path
            var oView = this.getView();
            oView.bindElement({
                path: sPath,
                parameters: {
                    expand: "Orders" // Expand related entities if needed
                },
                events: {
                    dataRequested: function () {
                        oView.setBusy(true);
                    },
                    dataReceived: function () {
                        oView.setBusy(false);
                    }.bind(this) // Ensure `this` context is maintained
                }
            });

        },
        onCreateYourOrderButtonPress: function (oEvent) {
            const oCrossAppNavigator = sap.ushell.Container.getService(
                "CrossApplicationNavigation"
              );
    
              // Construct the hash for navigation
              const sHash = oCrossAppNavigator.hrefForExternal({
                target: {
                  semanticObject: "ManageOrders",
                  action: "manage",
                },
              });
    
              // Construct the full URL for redirection
              const sBaseUrl = window.location.href.split("#")[0];
              const sUrl = sBaseUrl + sHash;
    
              // Redirect to the constructed URL
              sap.m.URLHelper.redirect(sUrl, true);
        }
    });
});
