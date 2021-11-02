import renderer from 'react-test-renderer';
import NavigationBar from "../NavigationBar"

it('renders the NavBar', () => {
    const tree = renderer
        .create(<NavigationBar />)
        .toJSON();

    expect(tree).toMatchSnapshot();
})
