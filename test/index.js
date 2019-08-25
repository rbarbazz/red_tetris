import { describe } from 'mocha';
import { expect } from 'chai';

import './helpers/ignoreStyle';
import mockReactDomRender from './helpers/react';
import containers from './client/containers';
import components from './client/components';
import actions from './client/actions';
import reducers from './client/reducers';
import middleware from './client/middleware';
import '../src/client/index';


describe('React', () => {
  describe('index', () => {
    it('should call ReactDom.render once', () => {
      expect(mockReactDomRender).to.have.property('callCount', 1);
      mockReactDomRender.restore();
    });
  });
  containers();
  components();
});

describe('Redux', () => {
  actions();
  middleware();
  reducers();
});
