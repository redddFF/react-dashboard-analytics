import React, { useState, useEffect, useMemo } from "react";
import { connectWebSocket } from 'actions/dataActions';
import classnames from "classnames";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import {
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Header from "components/Headers/Header.js";
import DataGridTable from "components/DataGridTable";
import ChartSelector from "components/ChartSelector";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [selectedColumns, setSelectedColumns] = useState({});
  const [selectedCharts, setSelectedCharts] = useState({
    lineChart: false,
    barChart: false,
    pieChart: false,
    scatterPlot: false,
    areaChart: false,
  });

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const dispatch = useDispatch();
  const { data, error } = useSelector(state => state.data);

  useEffect(() => {
    const cleanupWebSocket = dispatch(connectWebSocket());

    return () => {
      cleanupWebSocket(); // Clean up WebSocket connection on component unmount
    };
  }, [dispatch]);

  const limitedData = useMemo(() => {
    return data.slice(0, 50);
  }, [data]);

  const transformedData = useMemo(() => {
    return limitedData.map((item, index) => {
      const transformedItem = { name: item.name || `Item ${index + 1}` };
      Object.keys(selectedColumns).forEach(column => {
        if (selectedColumns[column]) {
          transformedItem[column] = item[column];
        }
      });
      return transformedItem;
    });
  }, [limitedData, selectedColumns]);

  const pieData = useMemo(() => {
    return transformedData.map(item => ({
      name: item.name,
      value: Object.values(item).reduce((acc, val) => (typeof val === 'number' ? acc + val : acc), 0),
    }));
  }, [transformedData]);

  const scatterColumns = useMemo(() => {
    return Object.keys(selectedColumns).filter(key => selectedColumns[key]);
  }, [selectedColumns]);

  const xKey = scatterColumns[0];
  const yKey = scatterColumns[1];

  const handleColumnChange = (event) => {
    const { name, checked } = event.target;
    setSelectedColumns(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChartChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCharts(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {selectedCharts.lineChart && (
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={transformedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {scatterColumns.map(column => (
                          <Line type="monotone" dataKey={column} stroke="#8884d8" key={column} />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  {selectedCharts.barChart && (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={transformedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {scatterColumns.map(column => (
                          <Bar dataKey={column} fill="#8884d8" key={column} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <DataGridTable data={data} />
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <div className="chart">
                {selectedCharts.pieChart && (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        fill="#8884d8"
                      />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#82ca9d"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
