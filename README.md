# Dashboard Component

The Dashboard component is designed to display and manage a list of orders with various features like filtering, currency selection, and order details. It utilizes React and integrates with various components to create a comprehensive dashboard view.

## Features

- Display a list of orders with relevant details.
- Filter orders based on search text.
- Select a currency to display order volumes.
- View selected order details and timestamps in separate cards.

## Usage

To use the Dashboard component, follow these steps:

1. Include the Dashboard component in your React project.
2. Pass the required data and functions as props to the component.

### Props

- `currency` (string): The selected currency to display order volumes.
- `searchText` (string): The search text used for filtering orders.
- `onCurrencyChange` (function): A function to handle currency changes.
- `onSearchTextChange` (function): A function to handle search text changes.
- `selectedOrderDetails` (object): The details of the selected order.
- `selectedOrderTimeStamps` (object): The timestamps of the selected order.
- `onSelectOrder` (function): A function to handle selecting an order.

### Example

```jsx
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import mockData from "./assets/data.json";
import timestampData from "./assets/timeStamps.json";

const App = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleSearchTextChange = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const handleSelectOrder = (orderId) => {
    const selectedOrder = mockData.results.find(
      (order) => order["&id"] === orderId
    );
    setSelectedOrderDetails(selectedOrder || {});
    setSelectedOrderTimeStamps(
      selectedOrder
        ? timestampData.results.find(
            (ts) => ts["&id"] === selectedOrder["&id"]
          ).timestamps
        : {}
    );
  };

  return (
    <div>
      <Dashboard
        currency={currency}
        searchText={searchText}
        onCurrencyChange={handleCurrencyChange}
        onSearchTextChange={handleSearchTextChange}
        selectedOrderDetails={selectedOrderDetails}
        selectedOrderTimeStamps={selectedOrderTimeStamps}
        onSelectOrder={handleSelectOrder}
      />
    </div>
  );
};

export default App;
