/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "com/sap/demo/managecustomer/managecustomer/model/models",
        "sap/ui/model/json/JSONModel"
    ],
    function (UIComponent, Device, models, JSONModel) {
        "use strict";

        return UIComponent.extend("com.sap.demo.managecustomer.managecustomer.Component", {
            metadata: {
                manifest: "json",
                config: {
                    fullWidth: true
                }
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();
                // var oComponentData = this.getComponentData();
                // var oStartupParameters = oComponentData ? oComponentData.startupParameters : null;
    
                // if (oStartupParameters && oStartupParameters.CustomerID) {
                //     var sCustomerID = oStartupParameters.CustomerID[0]; // get the first CustomerID value
                //     this.getRouter().navTo("RouteCustomerDetail", { CustomerID: sCustomerID });
                // }

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                //Set the image model
                      // create and set the JSON model
                var oModel = new JSONModel();
                oModel.loadData("model/Images.json");
                this.setModel(oModel, "imagesModel");
            }
        });
    }
);