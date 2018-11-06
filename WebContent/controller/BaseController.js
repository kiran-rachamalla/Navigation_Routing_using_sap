
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History,JSONModel) {
	"use strict";
	
	
	let oModel;
	return Controller.extend("kiran.Myapp.controller.BaseController", {
		
		onInit: function(){
			 
		},
		_call_server(){			
		   return  new Promise ((resolve,reject)=>{
				$.ajax({url: "http://contour.vistex.local:8000/z10102_testk?sap-client=040/",
					    success: function(result){
		            console.log("read data");
//		            oView.setModel(result);
		            if (result){return resolve(result);}
		            else{reject('No employees found')}
		        }});
			})
		},
		
		getModel : function(cb){
			if(!oModel){
								
				this._call_server()
				.then((Employees)=>{
					 var oData = JSON.parse(Employees);
					 oModel = new JSONModel(oData);
					 if(cb){
						 cb(oModel);
					 }
				 }).catch((err)=>{
					 alert(err)
				 });

			}
			else {
				 if(cb){
					 cb(oModel);
				 }
			}
			
		},

		
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		}
	});
});