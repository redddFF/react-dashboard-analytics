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
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import {
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
  AreaChart,
  Area,
} from 'recharts';
import Header from "components/Headers/Header.js";
import DataGridTable from "components/DataGridTable";

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} (${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Index = (props) => {
  const [activeNav] = useState(1);
  const [lineChartFields, setLineChartFields] = useState([]);
  const [barChartFields, setBarChartFields] = useState([]);
  const [areaChartFields, setAreaChartFields] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [areaChartData, setAreaChartData] = useState([]);
  const [numericFields, setNumericFields] = useState([]);
  const [limit, setLimit] = useState(10);

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.data);

  useEffect(() => {
    const cleanupWebSocket = dispatch(connectWebSocket());

    return () => {
      cleanupWebSocket();
    };
  }, [dispatch]);

  const limitedData = useMemo(() => data.slice(0, limit), [data, limit]);

  useEffect(() => {
    if (limitedData.length > 0) {
      const fields = Object.keys(limitedData[0]).filter(key =>
        typeof limitedData[0][key] === 'number'
      );
      setNumericFields(fields);
    }
  }, [limitedData]);

  useEffect(() => {
    if (limitedData.length > 0) {
      const getChartData = (fields) =>
        limitedData.map(item => ({
          name: item.name,
          ...fields.reduce((acc, key) => ({
            ...acc,
            [key]: item[key]
          }), {})
        }));

      setLineChartData(getChartData(lineChartFields));
      setBarChartData(getChartData(barChartFields));
      setAreaChartData(getChartData(areaChartFields));
    }
  }, [limitedData, lineChartFields, barChartFields, areaChartFields]);

  const handleFieldChange = (e, chartType) => {
    const value = e.target.value;
    const updateFields = (fields, setFields) => 
      fields.includes(value)
        ? fields.filter(field => field !== value)
        : [...fields, value];
    
    if (chartType === 'line') {
      setLineChartFields(prevFields => updateFields(prevFields, setLineChartFields));
    } else if (chartType === 'bar') {
      setBarChartFields(prevFields => updateFields(prevFields, setBarChartFields));
    } else if (chartType === 'area') {
      setAreaChartFields(prevFields => updateFields(prevFields, setAreaChartFields));
    }
  };

  const getChartCheckboxes = (chartType, fields, selectedFields, onChange) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {fields.map(field => (
        <FormGroup key={field} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Label check style={{ marginRight: '20px' }}>
            <Input
              type="checkbox"
              value={field}
              checked={selectedFields.includes(field)}
              onChange={(e) => onChange(e, chartType)}
            />
            {field}
          </Label>
        </FormGroup>
      ))}
    </div>
  );

  const getColor = (index) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57', '#a4de6c'];
    return colors[index % colors.length];
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
                       
                        >
                          <div className="mb-3">
                  <FormGroup>
                    <Label for="dataLimit">Data Limit</Label>
                    <Input
                      id="dataLimit"
                      type="number"
                      value={limit}
                      onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                    />
                  </FormGroup>
                </div>
                          
                        </NavLink>
                      </NavItem>
                 
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {getChartCheckboxes('line', numericFields, lineChartFields, handleFieldChange)}

                <div className="chart">
                  <ResponsiveContainer width="100%" height={400} style={{ margin: 0, paddingRight: 50, paddingBottom: 50 }}>
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {lineChartFields.map((field, index) => (
                        <Line
                          key={field}
                          type="monotone"
                          dataKey={field}
                          stroke={getColor(index)}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
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
                  <ResponsiveContainer width="100%" height={300} style={{ margin: 0, paddingRight: 50 }}>
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {barChartFields.map((field, index) => (
                        <Bar
                          key={field}
                          dataKey={field}
                          fill={getColor(index)}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                  {getChartCheckboxes('bar', numericFields, barChartFields, handleFieldChange)}
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
                      color="success"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Import File
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <DataGridTable data={limitedData} />
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
              <CardBody>
               
                {/* Area Chart */}
                <ResponsiveContainer width="100%" height={300} style={{ margin: 0, paddingRight: 50 }}>
                  <AreaChart data={areaChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={renderTooltipContent} />
                    <Legend />
                    {areaChartFields.map((field, index) => (
                      <Area
                        key={field}
                        type="monotone"
                        dataKey={field}
                        stroke={getColor(index)}
                        fillOpacity={0.3}
                        fill={getColor(index)}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>

                {getChartCheckboxes('area', numericFields, areaChartFields, handleFieldChange)}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
