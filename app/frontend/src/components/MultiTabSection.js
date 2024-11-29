// import React, { useState } from "react";
// // import DriverForm from "./Driver";
// import DriverPhoneForm from "./DriverPhoneForm";
// import EmergencyInfoForm from "./EmergInfoForm";
// import BankInfoForm from "./BankInfoForm";

// const MultiTabSection = () => {
//   const [activeTab, setActiveTab] = useState("drivers");

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "drivers":
//         return <DriverForm />;
//       case "driverPhones":
//         return <DriverPhoneForm />;
//       case "emergencyInfo":
//         return <EmergencyInfoForm />;
//       case "bankInfo":
//         return <BankInfoForm />;
//       default:
//         return <div>Select a tab to view its content</div>;
//     }
//   };

//   return (
//     <div>
//     <h1>Driver Management</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab("drivers")}>Drivers</button>
//         <button onClick={() => setActiveTab("driverPhones")}>Driver Phones</button>
//         <button onClick={() => setActiveTab("emergencyInfo")}>Emergency Info</button>
//         <button onClick={() => setActiveTab("bankInfo")}>Bank Info</button>
//       </div>
//       <div className="tab-content">{renderTabContent()}</div>
//     </div>
//   );
// };

// export default MultiTabSection;
