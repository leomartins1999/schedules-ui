import InputGroup from "react-bootstrap/InputGroup"
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown"

function renderClassesDropdown(classes, klass, setKlass) {
    return (
        <DropdownButton variant="outline-secondary" title={klass}>
            {classes.map(klass => renderDropdownItem(klass, () => setKlass(klass)))}
        </DropdownButton>
    )
}

function renderDateDropdown(dates, date, setDate) {
    return (
        <DropdownButton variant="outline-secondary" title={date}>
            {dates.map(date => renderDropdownItem(date, () => setDate(date)))}
        </DropdownButton>
    )
}

function renderDropdownItem(txt, onClick) {
    return (
        <Dropdown.Item onClick={onClick}>
            {txt}
        </Dropdown.Item>
    )
}

function removeDatesUpTo(dates, startDate) {
    const idx = dates.indexOf(startDate)

    return dates.slice(idx)
}

function updateDates(endDate, setStartDate, setEndDate) {
    return (newStartDate) => {
        setStartDate(newStartDate)
        if (newStartDate >= endDate) setEndDate(newStartDate)
    }
}

function ScheduleSelector({ classes, dates, klass, setKlass, startDate, setStartDate, endDate, setEndDate }) {
    return (
        <InputGroup className="justify-content-between mb-2">
            <InputGroup.Text id="inputGroup-sizing-sm">Class</InputGroup.Text>
            {renderClassesDropdown(classes, klass, setKlass)}

            <InputGroup.Text id="inputGroup-sizing-sm">Start Date</InputGroup.Text>
            {renderDateDropdown(dates, startDate, updateDates(endDate, setStartDate, setEndDate))}

            <InputGroup.Text id="inputGroup-sizing-sm">End Date</InputGroup.Text>
            {renderDateDropdown(removeDatesUpTo(dates, startDate), endDate, setEndDate)}
        </InputGroup>
    )
}

export default ScheduleSelector
