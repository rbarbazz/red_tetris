import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

const noop = () => null;
require.extensions['.css'] = noop;

configure({ adapter: new Adapter() });
