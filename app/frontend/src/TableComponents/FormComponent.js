import React, { useState } from "react";

// Import each form component explicitly
import Driver from "./Driver/DriverForm.js";
import BankInformation from "./bankInformation/bankInformationForm.js";
import Supplier from "./Supplier/SupplierForm.js";
import Customer from "./Customer/CustomerForm.js";
import Shipment from "./Shipment/ShipmentForm.js";
import Route from "./Route/RouteForm.js";
import Trailer from "./Trailer/TrailerForm.js";
import CustomerContact from "./CustomerContactInfo/CustomerContactInfoForm.js";
import DriverPhone from "./DriverPhone/DriverPhoneForm.js";
import EmergencyInformation from "./EmergencyInformation/EmergencyInformationForm.js";
import Finance from "./Finance/FinanceForm.js";
import Invoice from "./Invoice/InvoiceForm.js";
import InvoiceTax from "./InvoiceTax/InvoiceTaxForm.js";
import POD from "./ProofOfDelivery/ProofOfDeliveryForm.js";
import SupplierContactInfo from "./SupplierContactInfo/SupplierContactInfoForm.js";
import SupplierContract from "./SupplierContract/SupplierContractForm.js";
import Tax from "./Tax/TaxForm.js";
import Truck from "./Truck/TruckForm.js";
import Trips from "./Trips/TripsForm.js";
import TruckDamageReport from "./TruckDamageReport/TruckDamageReportForm.js";


const MultiTabForm = () => {
  const tabs = [
    { title: "Driver", component: <Driver /> },
    { title: "Bank Information", component: <BankInformation /> },
    { title: "Supplier", component: <Supplier /> },
    { title: "Customer", component: <Customer /> },
    { title: "Shipment", component: <Shipment /> },
    { title: "Route", component: <Route /> },
    { title: "Trailer", component: <Trailer /> },
    { title: "Customer Contact Info", component: <CustomerContact /> },
    { title: "Driver Phone", component: <DriverPhone /> },
    { title: "Emergency Information", component: <EmergencyInformation /> },
    { title: "Finance", component: <Finance /> },
    { title: "Invoice", component: <Invoice /> },
    { title: "Invoice Tax", component: <InvoiceTax /> },
    { title: "Proof of Delivery", component: <POD /> },
    { title: "Supplier Contact Info", component: <SupplierContactInfo /> },
    { title: "Supplier Contract", component: <SupplierContract /> },
    { title: "Tax", component: <Tax /> },
    { title: "Truck", component: <Truck /> },
    { title: "Trips", component: <Trips /> },
    { title: "Truck Damage Report", component: <TruckDamageReport />  },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {/* Tab Buttons */}
      <div >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)} >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Render the active tab's component */}
      <div>{tabs[activeTab].component}</div>
    </div>
  );
};

export default MultiTabForm;
