sap.ui.define([
	"kiran/Myapp/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController,JSONModel){
	"use strict";
	
	return BaseController.extend("kiran.Myapp.controller.employee.EmployeeList",{
		
		onInit: function(){
			this.getModel((data)=>{
				this.getView().setModel(data);
			});
		},
		
//		onInit: function(){
//			 this._call_server().then((Employees)=>{
//				 var oData = JSON.parse(Employees);
//				 let oModel = new JSONModel(oData);
//				 this.getView().setModel(oModel);
//			 }).catch((err)=>{
//				 alert(err)
//			 });
//		},
//		_call_server(){
//			return new Promise (function(resolve,reject){
//				$.ajax({url: "http://contour.vistex.local:8000/z10102_testk?sap-client=040/",
//					    success: function(result){
//		            console.log("read data");
//		            //oView.setModel(result);
//		            if (result){return resolve(result);}
//		            else{reject('No employees found')}
//		            
//		        }});
//			})
//		},
		onListItemPressed : function(oEvent){
			let oArgs;
			oArgs = oEvent.getSource().getBindingContext();
			this.getRouter().navTo("employee",{ employeeId: oArgs.getProperty("EmployeeID") } );
		}
	});
});