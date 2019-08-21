import { describe } from 'mocha';

import './helpers/ignoreStyle';
import './helpers/react';
import containers from './client/containers';
import components from './client/components';
import actions from './client/actions';
import reducers from './client/reducers';


describe('React', () => {
  containers();
  components();
});

describe('Redux', () => {
  actions();
  reducers();
});
