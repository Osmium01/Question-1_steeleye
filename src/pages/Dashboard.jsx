import React, { useState } from "react";
import mockData from "../assets/data.json";
import timestampData from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // Combine timestamp data with order data using id as the common identifier
  const ordersWithTimestamps = mockData.results.map((order) => {
    const matchingTimestamp = timestampData.results.find(
      (ts) => ts["&id"] === order["&id"]
    );
    return {
      ...order,
      submittedDate: matchingTimestamp
        ? matchingTimestamp.timestamps.orderSubmitted
        : "N/A",
    };
  });

  // Filter orders based on the search query
  const filteredOrders = ordersWithTimestamps.filter((order) =>
    order["&id"].toLowerCase().includes(searchText.toLowerCase())
  );

  // Calculate the total number of orders
  const totalOrders = filteredOrders.length;

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${totalOrders} order${
            totalOrders !== 1 ? "s" : ""
          }`}
        />
        <div className={styles.actionBox}>
          <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card cardData={selectedOrderDetails} title="Selected Order Details" />
          <Card cardData={selectedOrderTimeStamps} title="Selected Order Timestamps" />
        </div>
        <List
          rows={filteredOrders}
          selectedCurrency={currency}
          onSelectOrder={(orderId) => {
            const selectedOrder = filteredOrders.find(
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
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
