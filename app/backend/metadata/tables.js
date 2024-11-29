module.exports = [
    {
      tableName: "Driver",
      primaryKey: "driverID",
      fields: [
        "licenseNumber",
        "driverName",
        "homeAddress",
        "yearsOfExperience",
        "numberOfDeliveries",
        "email",
        "age",
        "salary",
        "employmentDate",
        "workingStatus",
        "truckOwnedorAssigned",
      ],
    },
    {
      tableName: "DriverPhone",
      primaryKey: "phoneID",
      fields: ["driverID", "phoneNumber", "phoneType"],
      foreignKeys: ["driverID"],
    },
    {
      tableName: "EmergencyInformation",
      primaryKey: "emergencyContactID",
      fields: ["driverID", "contanctName", "contactNumber"],
      foreignKeys: ["driverID"],
    },
    {
      tableName: "bankInformation",
      primaryKey: "accountID",
      fields: ["driverID", "transitNo", "branchNo", "accountNo"],
      foreignKeys: ["driverID"],
    },
    {
      tableName: "Truck",
      primaryKey: "truckID",
      fields: [
        "driverID",
        "mileage",
        "licencePlateNumber",
        "VIN",
        "makeModelYear",
        "maxTowWeight",
        "insurancePolicyNo",
        "registration",
      ],
      foreignKeys: ["driverID"],
    },
    {
      tableName: "TruckDamageReport",
      primaryKey: "damageReportID",
      fields: ["truckID", "damageData", "damageDescription"],
      foreignKeys: ["truckID"],
    },
    {
      tableName: "Supplier",
      primaryKey: "supplierID",
      fields: [
        "supplierName",
        "contactPerson",
        "contactName",
        "supplierLongitude",
        "supplierLatitude",
        "supplierType",
        "businessHours",
      ],
    },
    {
      tableName: "Trailer",
      primaryKey: "trailerID",
      fields: [
        "supplierID",
        "truckID",
        "trailerCapacity",
        "maxLoadWeight",
        "trailerLength",
        "trailerType",
        "licensePlateNumber",
        "VIN",
        "makeModelYear",
        "registration",
      ],
      foreignKeys: ["supplierID", "truckID"],
    },
    {
      tableName: "TrailerDamageReport",
      primaryKey: "damageReportID",
      fields: ["trailerID", "damageData", "damageDescription"],
      foreignKeys: ["trailerID"],
    },
    {
      tableName: "SupplierContract",
      primaryKey: "contractID",
      fields: ["supplierID", "contractStart", "contractEnd", "productType"],
      foreignKeys: ["supplierID"],
    },
    {
      tableName: "SupplierContactInfo",
      primaryKey: "supplierContactInfoID",
      fields: ["supplierID", "contactPerson", "contactNumber"],
      foreignKeys: ["supplierID"],
    },
    {
      tableName: "Customer",
      primaryKey: "customerID",
      fields: [
        "customerLongitude",
        "customerLatitude",
        "customerName",
        "typeOfStore",
        "deliveryInstructions",
      ],
    },
    {
      tableName: "CustomerContactInfo",
      primaryKey: "customerContactInfoID",
      fields: ["customerID", "contactPerson", "contactNumber"],
      foreignKeys: ["customerID"],
    },
    {
      tableName: "Shipment",
      primaryKey: "shipmentID",
      fields: [
        "supplierID",
        "customerID",
        "trailerID",
        "loadWeight",
        "typeOfProduct",
        "deliveryType",
      ],
      foreignKeys: ["supplierID", "customerID", "trailerID"],
    },
    {
      tableName: "Route",
      primaryKey: "routeID",
      fields: [
        "driverID",
        "shipmentID",
        "truckID",
        "trailerID",
        "pickupLongitude",
        "pickupLattitude",
        "pickupTime",
      ],
      foreignKeys: ["driverID", "shipmentID", "truckID", "trailerID"],
    },
    {
      tableName: "ProofOfDelivery",
      primaryKey: "podID",
      fields: ["routeID", "proofOfDelivery", "PODNo"],
      foreignKeys: ["routeID"],
    },
    {
      tableName: "Trips",
      primaryKey: "tripID",
      fields: ["routeID", "destinationLongitude", "destinationLatitude", "tripIndex"],
      foreignKeys: ["routeID"],
    },
    {
      tableName: "Finance",
      primaryKey: "entryID",
      fields: ["truckID", "expense", "totalAmount", "paymentMethod", "paymentDate"],
      foreignKeys: ["truckID"],
    },
    {
      tableName: "Tax",
      primaryKey: "taxID",
      fields: ["entryID", "amount", "tax", "taxRate"],
      foreignKeys: ["entryID"],
    },
    {
      tableName: "Invoice",
      primaryKey: "invoiceID",
      fields: ["supplierID", "shipmentID", "invoiceNumber", "invoiceDate", "paymentDate"],
      foreignKeys: ["supplierID", "shipmentID"],
    },
    {
      tableName: "InvoiceTax",
      primaryKey: "invoiceTaxID",
      fields: [
        "invoiceID",
        "totalAmount",
        "taxedAmount",
        "currency",
        "paymentTerms",
      ],
      foreignKeys: ["invoiceID"],
    },
  ];
  