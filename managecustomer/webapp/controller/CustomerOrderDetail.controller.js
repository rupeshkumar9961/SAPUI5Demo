sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel"
    ],
    function(BaseController, UIComponent, JSONModel) {
      "use strict";
  
      return BaseController.extend("com.sap.demo.managecustomer.managecustomer.controller.CustomerOrderDetail", {
        onInit: function() {
          console.log(this.getOwnerComponent().getModel());

                // Attach the route pattern matched event
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteCustomerDetail").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
          // Retrieve the CustomerID from the route
          var sCustomerID = oEvent.getParameter("arguments").CustomerID;
          var sPath = "/Customers('" + sCustomerID + "')/Orders";
          var oModel = this.getOwnerComponent().getModel();
          oModel.read(sPath, {
            success: function(oData, response) {
              var oFirstRecord = oData.results[0];
              console.log("First Record:", oFirstRecord);

              // Create a new JSON model and set the first record as its data
              var oJsonModel = new JSONModel();
              oJsonModel.setData(oFirstRecord);

              // Set the JSON model to the view
              this.getView().setModel(oJsonModel, "firstRecordModel");
          }.bind(this),
        })
      }
      });
    }
  );
  