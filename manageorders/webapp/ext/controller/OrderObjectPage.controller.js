sap.ui.define(
  [
    "sap/ui/core/mvc/ControllerExtension",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
  ],
  function (ControllerExtension, Fragment, JSONModel) {
    "use strict";
    return ControllerExtension.extend(
      "com.sap.demo.manageorders.ext.controller.OrderObjectPage",
      {
        override: {
          onInit: function () {
            this._overrideConfiguration();
          },

          onBeforeRendering: function () {
            this._overrideConfiguration();
            const oView = this.getView();

            var oViewModel = new JSONModel({
              DeliveryType: "Standard Delivery",
            });
            oView.setModel(oViewModel, "deliveryModel");
          },

          onBeforeRebindTableExtension: function (oEvent) {},

          onAfterRendering: function () {
            var oView = this.getView();
            var oController = oView.getController();
            var oComponent = oController.getOwnerComponent(); // Access from the view's controller

            if (oComponent) {
              var oModel = oComponent.getModel(); // Get the OData model from the component

              if (oModel) {
                // Create a new JSON model for Shipper
                var shipperModel = new sap.ui.model.json.JSONModel();
                oView.setModel(shipperModel, "shipperContext");

                // Read Order_Details
                oModel.read("/Order_Details", {
                  success: function (oOrderDetailsData) {
                    console.log(
                      "Orders fetched successfully:",
                      oOrderDetailsData
                    );
                  },
                  error: function (oError) {
                    console.error("Error fetching orders:", oError);
                  },
                });

                // Read Shipper
                oModel.read("/Shippers", {
                  success: function (oShipperData) {
                    // Extract the first record
                    var aShippers = oShipperData.results;
                    if (aShippers.length > 0) {
                      var oFirstShipper = aShippers[0];

                      // Set the first record to the shipper model
                      shipperModel.setProperty("/shipper", oFirstShipper);
                      console.log(
                        "Shipper fetched successfully and data set to model:",
                        oShipperData
                      );
                    }
                  },
                  error: function (oError) {
                    console.error("Error fetching Shipper:", oError);
                  },
                });
              } else {
                console.error("OData model not found.");
              }
            } else {
              console.error("Component not found.");
            }

           
          },
        },
          onExit: function () {},
          onPressChangeDeliveryType: function () {
            var oView = this.getView();

            // Create the dialog lazily

            Fragment.load({
              id: oView.getId(),
              name: "com.sap.demo.manageorders.ext.fragment.changeDelivery",
              controller: this,
            })
              .then((oDialog) => {
                oView.addDependent(oDialog);
                oDialog.setTitle("Change Delivery Type");
                oDialog.open();
              })
              .catch(function (oError) {
                console.error("Error loading fragment:", oError);
              });
          },
          onSubmit: function (oEvent) {
            var oView = this.getView();
            var oRadioGroup = this.getView().byId("radioButtonClose");
            var sSelectedKey = oRadioGroup.getSelectedButton().getText();
            sap.m.MessageToast.show("Delivery Type Changed to : " + sSelectedKey);

            var sSelectedText = this.getView().byId("textAreaClose").getValue();

            var oDialogModel = oView.getModel("deliveryModel");
            oDialogModel.setProperty("/DeliveryType", sSelectedKey);

            this.getView().byId("changeDeliveryDialog").close();
            this.getView().byId("changeDeliveryDialog").destroy();
          },
          onCancel: function (oEvent) {
            let dialog = this.getView().byId("changeDeliveryDialog");
            if (dialog) {
              dialog.close();
              dialog.destroy();
            }
          },
       

        onCustomerIDPress: function (oEvent) {
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

        onPressManageCustomers: function (oEvent) {
          // Get the CrossApplicationNavigation service
          const oCrossAppNavigator = sap.ushell.Container.getService(
            "CrossApplicationNavigation"
          );

          // Construct the hash for navigation
          const sHash = oCrossAppNavigator.hrefForExternal({
            target: {
              semanticObject: "CustomerDetails",
              action: "display",
            },
          });

          // Construct the full URL for redirection
          const sBaseUrl = window.location.href.split("#")[0];
          const sUrl = sBaseUrl + sHash;

          // Redirect to the constructed URL
          sap.m.URLHelper.redirect(sUrl, true);
        },

        _overrideConfiguration: function () {
          this.getView().byId("edit").setVisible(false);
          this.getView().byId("delete").setVisible(false);
          const oBindingContext = this.getView().getBindingContext();
          if (oBindingContext) {
            const sPath = oBindingContext.getPath();
            if (sPath.includes("Orders")) {
              this.getView()
                .byId("OrderData1::Table-variant")
                .setVisible(false);
              this.getView()
                .byId("OrderData1::Table::Toolbar::SearchField")
                .setVisible(false);
              this.getView().byId("OrderData1::addEntry").setVisible(false);
              this.getView().byId("OrderData1::deleteEntry").setVisible(false);
              this.getView()
                .byId("OrderData1::Table-btnCopy")
                .setVisible(false);
              this.getView()
                .byId("OrderData1::Table-btnPersonalisation")
                .setVisible(false);
            }
          }
        },
      }
    );
  }
);