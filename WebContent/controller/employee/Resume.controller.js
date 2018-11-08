sap.ui.define([
	"kiran/Myapp/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";
	
	var _aValidTabKeys = ["Info", "Projects", "Hobbies", "Notes"];
	
	return BaseController.extend("sap.ui.demo.nav.controller.employee.Resume", {
		onInit: function () {
			var oRouter = this.getRouter();
			
			this.getView().setModel(new JSONModel(), "view");
			
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			
			let a = oArgs.employeeId - 1;
			
			this.getModel((data)=>{
				this.getView().setModel(data);
			
				let myJson = data.getJSON();
				var oData = JSON.parse(myJson);
								
				var cuntEmplyID = oData["Employees"].findIndex( x => x.EmployeeID == oArgs.employeeId );
				
			oView.bindElement({
				path : "/Employees/" + cuntEmplyID,
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
			
			var resumeID = oData["Resumes"].findIndex( x => x.ResumeID == oData["Employees"][cuntEmplyID]["ResumeID"] );
			
			var otabs = this.getView().byId("iconTabBar");
			otabs.bindElement({ path : "/Resumes/" + resumeID });
			
			
			
			}
		);
			oQuery = oArgs["?query"];
			if (oQuery && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("view").setProperty("/selectedTabKey", oQuery.tab);
				// support lazy loading for the hobbies and notes tab
				if (oQuery.tab === "Hobbies" || oQuery.tab === "Notes"){
					// the target is either "resumeTabHobbies" or "resumeTabNotes"
					this.getRouter().getTargets().display("resumeTab" + oQuery.tab);
				}
			} else {
				// the default query param should be visible at all time
				this.getRouter().navTo("employeeResume", {
					employeeId : oArgs.employeeId,
					query: {
						tab : _aValidTabKeys[0]
					}
				},true /*no history*/);
			}
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		},
		onTabSelect : function (oEvent){
			var oCtx = this.getView().getBindingContext();
			this.getRouter().navTo("employeeResume", {
				employeeId : oCtx.getProperty("EmployeeID"),
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
		}
	});
});