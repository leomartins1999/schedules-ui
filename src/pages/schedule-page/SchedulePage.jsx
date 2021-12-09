import { useEffect, useState } from "react"
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { LoadingState } from "../../utils/State";

import { fetchScheduleDetails, renderScheduleDetails } from "./ScheduleDetails"
import { fetchScheduleSelectorInformation, renderScheduleSelector } from "./ScheduleSelector"
import { fetchScheduleLectures, renderScheduleLectures } from "./ScheduleLectures"
import { fetchScheduleScores, renderScheduleScores } from "./ScheduleScores"

function SchedulePage({ scheduleId, service }) {
    const [scheduleDetails, setScheduleDetails] = useState(LoadingState())
    const [selectorInformation, setSelectorInformation] = useState(LoadingState())
    const [lectures, setLectures] = useState(LoadingState())
    const [scores, setScores] = useState(LoadingState())

    // states used for user input
    const [klass, setKlass] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    // trigger fetch of schedule information
    useEffect(() => {
        fetchScheduleDetails(service, scheduleId, setScheduleDetails)
    }, [scheduleId, service])

    // trigger fetch of classes and dates for schedule
    useEffect(() => {
        fetchScheduleSelectorInformation(service, scheduleId, scheduleDetails.status, setKlass, setStartDate, setEndDate, setSelectorInformation)
    }, [scheduleId, service, scheduleDetails])

    // trigger fetch of lectures
    useEffect(() => {
        fetchScheduleLectures(service, scheduleId, klass, startDate, endDate, setLectures)
    }, [scheduleId, service, klass, startDate, endDate])

    // trigger fetch of scores
    useEffect(() => {
        fetchScheduleScores(service, scheduleId, setScores)
    }, [scheduleId, service, scheduleDetails])

    return (
        <div className="p-2">
            {renderScheduleDetails(scheduleDetails)}
            <Row className="mt-2">
                <Col>
                    {renderScheduleSelector(selectorInformation, klass, setKlass, startDate, setStartDate, endDate, setEndDate)}
                    {renderScheduleLectures(lectures, startDate, endDate)}
                </Col>
                <Col>
                    {renderScheduleScores(scores)}
                </Col>
            </Row>
        </div>
    );
}

export default SchedulePage;
