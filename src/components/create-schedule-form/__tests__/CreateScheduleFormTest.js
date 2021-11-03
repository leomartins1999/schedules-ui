import renderer from 'react-test-renderer';
import CreateScheduleForm from '../CreateScheduleForm'

it('renders the Create Schedule Form', () => {
    const service = {
        createSchedule: () => { }
    };

    const tree = renderer
        .create(<CreateScheduleForm service={service} />)
        .toJSON();

    expect(tree).toMatchSnapshot();
})
