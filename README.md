# Real-time Analytics Dashboard

## Overview
This project is a React-based dashboard for analytics that consumes data from an API through a WebSocket connection. The dashboard provides real-time updates and visualizations using Recharts and MUI DataGridTable. Key features include dynamic data visualization, flexible chart selection, and a responsive design.

## Key Technologies and Libraries

- **React (v18.2.0)**: The core framework used for building the user interface.
- **Redux Toolkit (v2.2.7)**: Manages the application's state, particularly handling the real-time data updates from the WebSocket.
- **Recharts (v2.12.7)**: A composable charting library built on D3, used for creating various types of charts like Line, Bar, Pie, and Area charts.
- **MUI DataGridTable**: Provides a flexible and powerful table component for displaying data in a grid format. It is optimized to handle large datasets efficiently, consuming less performance and ensuring smooth user experience.
- **WebSocket (ws v8.18.0)**: Enables real-time data communication between the client and server.
- **Bootstrap (v4.6.2) and Reactstrap (v8.10.0)**: Used for responsive design and layout, providing pre-styled components such as buttons, cards, and grids.
- **FontAwesome (v6.5.1)**: Adds iconography to the user interface, enhancing visual appeal and usability.
- **Axios (v1.7.2)**: Handles HTTP requests, though primarily WebSocket is used for data fetching.

## Key Components and Features

- **Real-time Data Handling**
  - The dashboard connects to a WebSocket to fetch data, which is updated instantly on the frontend. Redux is used to manage the state and detect changes.
  
- **Dynamic Data Visualization**
  - Users can select different data columns and charts to display, including Line, Bar, Pie, and Area charts. The charts are rendered using Recharts, allowing for interactive and responsive visualizations.

- **MUI DataGridTable**
  - The data grid provides a robust interface for displaying and interacting with data in a tabular format. It supports features like sorting, filtering, and pagination. Additionally, it is optimized to handle large datasets efficiently, consuming minimal performance resources to ensure smooth operation even with extensive data.

- **Responsive Design**
  - The dashboard uses Bootstrap and Reactstrap to ensure that the layout adapts to different screen sizes, providing a consistent user experience across devices.

- **Iconography**
  - FontAwesome icons are integrated into the UI to enhance navigation and user interactions.

## Usage

1. **WebSocket Connection**: The dashboard automatically connects to the WebSocket when loaded, fetching and updating the data in real-time.
2. **Chart Selection**: Users can toggle different types of charts (Line, Bar, Pie, etc.) to visualize the data according to their needs.
3. **Data Grid**: The DataGridTable component provides a tabular view of the fetched data, with sorting and pagination features.

## Installation and Setup

1. **Clone the Repository**:
   git clone https://github.com/redddFF/react-dashboard-analytics
   cd react-dashboard-analytics
2. **Install Dependencies**:
   npm install
3. **Start the Application**:
   npm start
4. **Environment Variables**:
   Ensure that the WebSocket API endpoint is correctly set in your environment configuration.


**Conclusion**
This dashboard provides a comprehensive solution for real-time data visualization, allowing users to interactively explore and analyze their data through various charts and a robust data grid. With Redux managing state and WebSocket providing real-time updates, the dashboard is both responsive and flexible. The MUI DataGridTable ensures performance efficiency, even when handling large datasets.