import renderer from 'react-test-renderer';
import ScheduleListItem from "../ScheduleListItem"

it('renders a done schedule list item', () => {
    const schedule = {
        id: "1",
        name: "Done schedule",
        status: "DONE"
    }

    const tree = renderer
        .create(<ScheduleListItem schedule={schedule} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
})

it('renders an importing schedule list item', () => {
    const schedule = {
        id: "2",
        name: "Importing schedule",
        status: "IMPORTING"
    }

    const tree = renderer
        .create(<ScheduleListItem schedule={schedule} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
})

it('renders a calculating schedule list item', () => {
    const schedule = {
        id: "3",
        name: "Calculating schedule",
        status: "CALCULATING"
    }

    const tree = renderer
        .create(<ScheduleListItem schedule={schedule} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
})

it('renders an error schedule list item', () => {
    const schedule = {
        id: "4",
        name: "Error schedule",
        status: "ERROR"
    }

    const tree = renderer
        .create(<ScheduleListItem schedule={schedule} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
})
