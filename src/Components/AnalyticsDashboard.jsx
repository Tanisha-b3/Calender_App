import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2"; // Import Pie Chart and Bar Chart
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "chart.js/auto"; // Chart.js auto-setup
import "./analytics.css";

// Simulated API call to fetch data
const fetchAnalyticsData = async () => {
  // Simulate fetching data from a backend
  return {
    companies: ["Company A", "Company B", "Company C"],
    communications: [
      { method: "LinkedIn Post", count: 30 },
      { method: "Email", count: 50 },
      { method: "Phone Call", count: 20 },
      { method: "LinkedIn Message", count: 40 },
      { method: "Other", count: 10 },
    ],
    engagementMetrics: {
      LinkedInPost: 75,
      Email: 50,
      PhoneCall: 60,
      LinkedInMessage: 85,
      Other: 30,
    },
    overdueTrends: [5, 10, 15, 7, 12, 8, 4], // Weekly overdue data
  };
};

const AnalyticsDashboard = () => {
  const [filters, setFilters] = useState({
    company: "",
    dateRange: "",
    method: "",
  });
  const [data, setData] = useState({
    companies: [],
    communications: [],
    engagementMetrics: {},
    overdueTrends: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAnalyticsData();
      setData(result);
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const exportToCSV = () => {
    const csvData =
      "Method,Count\n" +
      data.communications.map((c) => `${c.method},${c.count}`).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "analytics_report.csv");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Analytics Report", 14, 15);

    // Add a table for communication frequency
    doc.autoTable({
      head: [["Method", "Count"]],
      body: data.communications.map((c) => [c.method, c.count]),
      startY: 25,
      theme: "grid",
    });

    // Add engagement metrics as a table
    doc.text("Engagement Metrics", 14, doc.autoTable.previous.finalY + 10);
    doc.autoTable({
      head: [["Method", "Engagement (%)"]],
      body: Object.entries(data.engagementMetrics).map(([method, value]) => [
        method,
        `${value}%`,
      ]),
      startY: doc.autoTable.previous.finalY + 15,
      theme: "grid",
    });

    // Add overdue trends as a note
    doc.text("Overdue Trends (Weekly)", 14, doc.autoTable.previous.finalY + 30);
    doc.text(data.overdueTrends.join(", "), 14, doc.autoTable.previous.finalY + 40);

    doc.save("analytics_report.pdf");
  };

  return (
    <div className="analytics-container max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Reporting & Analytics Dashboard</h2>

      {/* Filters Section */}
      <div className="filters mb-8">
        <h4 className="text-xl font-semibold mb-4">Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="filter-group">
            <label htmlFor="company" className="block text-gray-600">Company:</label>
            <select
              name="company"
              id="company"
              value={filters.company}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Companies</option>
              {data.companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="dateRange" className="block text-gray-600">Date Range:</label>
            <input
              type="date"
              name="dateRange"
              id="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="method" className="block text-gray-600">Communication Method:</label>
            <select
              name="method"
              id="method"
              value={filters.method}
              onChange={handleFilterChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Methods</option>
              {["LinkedIn Post", "Email", "Phone Call", "LinkedIn Message", "Other"].map(
                (method, index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="chart">
          <h4 className="text-xl font-semibold mb-4">Communication Frequency (Bar Chart)</h4>
          <Bar
            data={{
              labels: data.communications.map((c) => c.method),
              datasets: [
                {
                  label: "Frequency",
                  data: data.communications.map((c) => c.count),
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: "index", intersect: false },
              },
            }}
          />
        </div>

        <div className="chart">
          <h4 className="text-xl font-semibold mb-4">Communication Frequency (Pie Chart)</h4>
          <Pie
            data={{
              labels: data.communications.map((c) => c.method),
              datasets: [
                {
                  label: "Frequency",
                  data: data.communications.map((c) => c.count),
                  backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: { mode: "index", intersect: false },
              },
            }}
          />
        </div>
      </div>

      {/* Download Section */}
      <div className="downloads flex gap-4">
        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Download CSV Report
        </button>
        <button
          onClick={exportToPDF}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
