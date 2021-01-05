import React from 'react';
import Header from '../components/header';
import { Table } from 'react-bootstrap';

export default class WorldRecordsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: null
    };
  }

  render() {
    return (
      <>
        <Header />
        <h5 className="text-center">World Records</h5>
        <p className="text-center font-weight-bold mb-4">via World Cube Association (WCA)</p>
        <div className="d-flex justify-content-center">
          <div className="world-records-cont">
            <h5 className="ml-1">3x3x3 Cube</h5>
            <Table striped size="sm" className="mb-4">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Single</td>
                  <td>Yusheng Du</td>
                  <td>3.47</td>
                </tr>
                <tr>
                  <td>Average</td>
                  <td>Feliks Zemdegs</td>
                  <td>5.53</td>
                </tr>
              </tbody>
            </Table>
            <h5 className="ml-1">3x3x3 Cube</h5>
            <Table striped size="sm">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Single</td>
                  <td>Yusheng Du</td>
                  <td>3.47</td>
                </tr>
                <tr>
                  <td>Average</td>
                  <td>Feliks Zemdegs</td>
                  <td>5.53</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}
