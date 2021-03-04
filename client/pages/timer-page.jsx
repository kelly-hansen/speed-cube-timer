import React, { useState, useContext } from 'react';
import Header from '../components/header';
import Timer from '../components/timer';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import YellowSection from '../components/yellow-section';
import SessionStats from '../components/session-stats';
import SessionTimes from '../components/session-times';
import SaveRecordModal from '../components/save-record-modal';
import AppContext from '../lib/app-context';
import VirtualCube from '../components/virtual-cube';

export default function TimerPage() {
  constructor(props) {
    super(props);
    this.state = {
      sessionTimes: [],
      sessionRecords: null,
      showResetModal: false,
      showSaveRecordModal: false,
      virtualCube: {
        active: false,
        type: 'RubiksCube'
      }
    };
    this.getSessionRecords = this.getSessionRecords.bind(this);
    this.addNewTime = this.addNewTime.bind(this);
    this.deleteTime = this.deleteTime.bind(this);
    this.resetSession = this.resetSession.bind(this);
    this.toggleResetModal = this.toggleResetModal.bind(this);
    this.toggleSaveRecordModal = this.toggleSaveRecordModal.bind(this);
    this.toggleVirtualCube = this.toggleVirtualCube.bind(this);
    this.changeCubeType = this.changeCubeType.bind(this);
  }

  const [sessionTimes, setSessionTimes] = useState([]);
  const [sessionRecords, setSessionRecords] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSaveRecordModal, setShowSaveRecordModal] = useState(false);
  const [virtualCube, setVirtualCube] = useState({
    active: false,
    type: 'RubiksCube'
  });

  const context = useContext(AppContext);

  getSessionRecords(sessionTimes) {
    if (sessionTimes.length === 0) {
      return null;
    }

    const result = {};
    result.bestSingle = [sessionTimes.length > 0 ? Math.min(...sessionTimes) : null];

    if (sessionTimes.length < 5) {
      result.bestAverage3Of5 = null;
      result.bestAverage3Of5Arr = null;
    } else {
      let bestAvg;
      let bestStartingIndex = 0;
      for (let i = 0; i < sessionTimes.length - 4; i++) {
        const sortedSet = sessionTimes.slice(i, i + 5).sort((a, b) => a - b);
        const setOf3 = sortedSet.slice(1, 4);
        const avg = setOf3.reduce((acc, cur) => acc + cur) / 3;
        if (bestAvg) {
          if (avg < bestAvg) {
            bestAvg = avg;
            bestStartingIndex = i;
          }
        } else {
          bestAvg = avg;
        }
      }
      result.bestAverage3Of5 = [bestAvg];
      result.bestAverage3Of5Arr = sessionTimes.slice(bestStartingIndex, bestStartingIndex + 5);
    }

    return result;
  }

  addNewTime(time) {
    const sessionTimes = this.state.sessionTimes.concat(time);
    const sessionRecords = this.getSessionRecords(sessionTimes);
    this.setState({
      sessionTimes,
      sessionRecords
    });
  }

  deleteTime(index) {
    const sessionTimes = this.state.sessionTimes.slice();
    sessionTimes.splice(index, 1);
    const sessionRecords = this.getSessionRecords(sessionTimes);
    this.setState({
      sessionTimes,
      sessionRecords
    });
  }

  resetSession() {
    this.setState({
      sessionTimes: [],
      sessionRecords: null,
      showResetModal: false
    });
  }

  toggleResetModal() {
    this.setState({
      showResetModal: !this.state.showResetModal
    });
  }

  toggleSaveRecordModal() {
    this.setState({
      showSaveRecordModal: !this.state.showSaveRecordModal
    });
  }

  toggleVirtualCube() {
    this.setState({
      virtualCube: {
        active: !this.state.virtualCube.active,
        type: this.state.virtualCube.type
      }
    });
  }

  changeCubeType() {
    this.setState({
      virtualCube: {
        active: this.state.virtualCube.active,
        type: this.state.virtualCube.type === 'RubiksCube'
          ? 'PocketCube'
          : 'RubiksCube'
      }
    });
  }

  render() {

    return (
      <>
        <Header />
        <Container>
          <Row className={this.state.virtualCube.active ? 'justify-content-center mb-2' : 'justify-content-center mb-3'}>
            {
              !this.state.virtualCube.active
                ? (
                <Col md={8} lg={6} xl={6}>
                  <Button onClick={this.toggleVirtualCube} className="std-button" block>Virtual Cube</Button>
                </Col>
                  )
                : (
                <>
                  <Col md={8} lg={6} xl={6} className="d-flex">
                    <div className="w-50 pr-1">
                      <Button onClick={this.toggleVirtualCube} className="std-button" block>Hide Cube</Button>
                    </div>
                    <div className="w-50 pl-1">
                      <Button onClick={this.changeCubeType} className="std-button" block>Change Type</Button>
                    </div>
                  </Col>
                </>
                  )
            }
          </Row>
          {this.state.virtualCube.active && (
            <Row className="justify-content-center mb-4">
              <Col md={8} lg={6} xl={6}>
                <VirtualCube type={this.state.virtualCube.type} />
              </Col>
            </Row>
          )}
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={6}>
              <Timer addNewTime={this.addNewTime} />
            </Col>
          </Row>
        </Container>
        <YellowSection>
          <Container>
            <Row>
              <Col>
                <p>Session</p>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col sm className="d-flex justify-content-center mb-4">
                <SessionStats sessionTimes={this.state.sessionTimes} />
              </Col>
              <Col sm className="d-flex justify-content-center">
                <SessionTimes sessionTimes={this.state.sessionTimes} deleteTime={this.deleteTime} />
              </Col>
            </Row>
            <Row className="justify-content-center">
              {this.context.user && <Col md={8} lg className="mt-3">
                <Button onClick={this.toggleSaveRecordModal} className="std-button" block>Save Record</Button>
              </Col>}
              <Col md={8} lg className="mt-3">
                <Button onClick={this.toggleResetModal} className="std-button" variant="danger" block>Reset Session</Button>
              </Col>
            </Row>
          </Container>
        </YellowSection>
        <Modal show={this.state.showResetModal} onHide={this.toggleResetModal}>
          <Modal.Body>Are you sure you want to reset the session? All current times will be lost.</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleResetModal} variant="secondary">Cancel</Button>
            <Button onClick={this.resetSession} variant="primary">Reset Session</Button>
          </Modal.Footer>
        </Modal>
        <SaveRecordModal
          sessionRecords={this.state.sessionRecords}
          toggleSaveRecordModal={this.toggleSaveRecordModal}
          showModal={this.state.showSaveRecordModal}
        />
      </>
    );
  }
}

TimerPage.contextType = AppContext;
