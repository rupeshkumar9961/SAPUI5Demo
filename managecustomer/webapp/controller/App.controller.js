sap.ui.define(["sap/ui/core/mvc/Controller"], function (BaseController) {
  "use strict";

  return BaseController.extend(
    "com.sap.demo.managecustomer.managecustomer.controller.App",
    {
      onInit: function () {
        // Retrieve startup parameters from the component
        // var oComponentData = this.getOwnerComponent().getComponentData();
        // var oStartupParameters = oComponentData
        //   ? oComponentData.startupParameters
        //   : null;

        // if (oStartupParameters && oStartupParameters.CustomerID) {
        //   var sCustomerID = oStartupParameters.CustomerID[0]; // Get the first CustomerID value

        //   // Navigate to the CustomerDetails view
        //   this.getOwnerComponent()
        //     .getRouter()
        //     .navTo("RouteCustomerDetail", { CustomerID: sCustomerID });
        // }
      },
      /**
       * @override
       */
      onBeforeRendering: function() {
        // BaseController.prototype.onBeforeRendering.apply(this, arguments);
        // Retrieve startup parameters from the component
        var oComponentData = this.getOwnerComponent().getComponentData();
        var oStartupParameters = oComponentData
          ? oComponentData.startupParameters
          : null;

        if (oStartupParameters && oStartupParameters.CustomerID) {
          var sCustomerID = oStartupParameters.CustomerID[0]; // Get the first CustomerID value

          // Navigate to the CustomerDetails view
          this.getOwnerComponent()
            .getRouter()
            .navTo("RouteCustomerDetail", { CustomerID: sCustomerID });
        }
      
      }
    }
  );
});
