import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import sinon from 'sinon';
import ReactDom from 'react-dom';
import { configure } from 'enzyme';

const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>')).window;
global.document = document;
global.window = document.defaultView;

configure({ adapter: new Adapter() });

export default sinon.stub(ReactDom, 'render');
