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
import TrailerDamageReport from "./TrailerDamageReport/TrailerDamageReportForm.js";
import "bootstrap/dist/css/bootstrap.min.css";


const MultiTabForm = () => {
  const tabs = [
    { title: "Driver", component: <Driver /> },
    { title: "Driver Phone", component: <DriverPhone /> },
    { title: "Emergency Information", component: <EmergencyInformation /> },
    { title: "Bank Information", component: <BankInformation /> },
    { title: "Supplier", component: <Supplier /> },
    { title: "Supplier Contact Info", component: <SupplierContactInfo /> },
    { title: "Supplier Contract", component: <SupplierContract /> },
    { title: "Customer", component: <Customer /> },
    { title: "Customer Contact Info", component: <CustomerContact /> },
    { title: "Truck", component: <Truck /> },
    { title: "Truck Damage Report", component: <TruckDamageReport /> },
    { title: "Trailer", component: <Trailer /> },
    { title: "Trailer Damage Report", component: <TrailerDamageReport /> },
];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mt-4">
      {/* Application Title */}
      <div className="text-center mb-4">
        <h1 className="display-4">Truck Management Application</h1>
        <p className="lead">Effortlessly manage your fleet data and reports</p>
      </div>

      {/* Tab Navigation */}
      <ul className="nav nav-tabs justify-content-center">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-4">
        <div className="tab-pane fade show active">
          {tabs[activeTab].component}
        </div>
      </div>
    </div>
  );
};

export default MultiTabForm;
