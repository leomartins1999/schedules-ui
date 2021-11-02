import renderer from 'react-test-renderer';
import ScheduleListingPage from '../ScheduleListingPage';
import { ErrorState, LoadingState, SuccessState } from '../../../state/State';

it('renders no schedules', () => {
    const service = {
        getSchedules: async () => SuccessState([])
    }

    const tree = renderer
        .create(<ScheduleListingPage service={service} />)
        .toJSON()

    expect(tree).toMatchSnapshot();
})

it('renders the schedules list', () => {
    const service = {
        getSchedules: async () => SuccessState([
            {
                id: "1",
                name: "Done schedule",
                status: "DONE"
            },
            {
                id: "2",
                name: "Importing schedule",
                status: "IMPORTING"
            }
        ])
    }

    const tree = renderer
        .create(<ScheduleListingPage service={service} />)
        .toJSON()

    expect(tree).toMatchSnapshot();
})

it('renders loading', () => {
    const service = {
        getSchedules: async () => LoadingState()
    }

    const tree = renderer
        .create(<ScheduleListingPage service={service} />)
        .toJSON()

    expect(tree).toMatchSnapshot();
})

it('renders error', () => {
    const service = {
        getSchedules: async () => ErrorState()
    }

    const tree = renderer
        .create(<ScheduleListingPage service={service} />)
        .toJSON()

    expect(tree).toMatchSnapshot();
})
