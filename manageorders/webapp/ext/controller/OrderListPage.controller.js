sap.ui.define(
  ["sap/ui/core/mvc/ControllerExtension", "sap/ui/model/json/JSONModel"],
  function (ControllerExtension, JSONModel) {
    "use strict";

    return ControllerExtension.extend(
      "com.sap.demo.manageorders.ext.controller.OrderListPage",
      {
        override: {
          onInit: function () {
            var oView = this.getView();
            var oController = oView.getController();
            var oComponent = oController.getOwnerComponent(); // Access from the view's controller

            if (oComponent) {
              var oModel = oComponent.getModel(); // Get the model from the component

              if (oModel) {
                oModel.read("/Orders", {
                  urlParameters: {
                    $expand: "Order_Details,Shipper", // Expand the associated entity
                  },
                  success: function (oData) {
                    console.log("Orders fetched successfully:", oData);
                  },
                  error: function (oError) {
                    console.error("Error fetching orders:", oError);
                  },
                });
              } else {
                console.error("OData model not found.");
              }
            } else {
              console.error("Component not found.");
            }
          },

          onBeforeRendering: function () {
            this._overrideConfiguration();
          },

          onAfterRendering: function () {
            console.log("View has been rendered.");
          },

          onExit: function () {
            console.log("Controller is being destroyed.");
          },
        },
        onPressCustomerDetails: function (oEvent) {},
        onCustomerIDListPagePress: function (oEvent) {
          const sCustomerID = oEvent
            .getSource()
            .getBindingContext()
            .getProperty("CustomerID");
          const oCrossAppNavigator = sap.ushell.Container.getService(
            "CrossApplicationNavigation"
          );

          // Construct the URL path without additional encoding
          // const sNavigationTarget = `&/Customers(${sCustomerID})`;

          // Use hrefForExternal to get the correct URL
          const sHash = oCrossAppNavigator.hrefForExternal({
            target: {
              semanticObject: "CustomerDetails",
              action: "display",
            },
            params: {
              // Ensure parameters are not encoded twice
              CustomerID: sCustomerID,
            },
          });

          // Construct the full URL for redirection
          const sBaseUrl = window.location.href.split("#")[0];
          const sUrl = sBaseUrl + sHash;

          // Redirect to the constructed URL
          sap.m.URLHelper.redirect(sUrl, false);
        },

        _overrideConfiguration: function () {
          const oShareBtn = this.getView().byId('template::Share');
          oShareBtn.setVisible(false);

          this.getView().byId('deleteEntry').setVisible(false);
          this.getView().byId('listReport-variant').setVisible(false);
          this.getView().byId('addEntry').setVisible(false);
          this.getView().byId('listReport-btnCopy').setVisible(false);
          this.getView().byId('listReport-btnPersonalisation').setVisible(false);
          this.getView().byId('listReportFilter-filterItem-___INTERNAL_-CustomerID').setText('Customer ID');
          this.getView().byId('listReportFilter-filterItem-___INTERNAL_-OrderID').setText('Order ID');
          this.getView().byId('listReportFilter-filterItem-___INTERNAL_-OrderDate').setText('Order Date');

        },

      }
    );
  }
);
