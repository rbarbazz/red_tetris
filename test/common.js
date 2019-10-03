import { expect } from 'chai';
import sinon from 'sinon';

import * as sockWrapper from '../src/common/sockWrapper';


export default () => describe('Index', () => {
  it('should call sendError', () => {
    const mockFunction = sinon.spy();
    const socket = {
      emit: mockFunction,
    };

    sockWrapper.sendError(socket, null, null);
    expect(mockFunction.callCount).to.equal(1);
  });

  it('should call sendError', () => {
    const mockFunction = sinon.spy();
    const socket = {
      emit: mockFunction,
    };

    sockWrapper.sendError(socket, null, null, '');
    expect(mockFunction.callCount).to.equal(1);
  });

  it('should call sendResponse', () => {
    const mockFunction = sinon.spy();
    const socket = {
      emit: mockFunction,
    };

    sockWrapper.sendResponse(socket, null, null);
    expect(mockFunction.callCount).to.equal(1);
  });

  it('should call sendResponse', () => {
    const mockFunction = sinon.spy();
    const socket = {
      emit: mockFunction,
    };

    sockWrapper.sendResponse(socket, null, null, {});
    expect(mockFunction.callCount).to.equal(1);
  });

  it('should call sendRequest', () => {
    const mockFunction = sinon.spy();
    const socket = {
      emit: mockFunction,
    };

    sockWrapper.sendRequest(socket, null, null, null);
    expect(mockFunction.callCount).to.equal(1);
  });

  it('should call sendRequest', () => {
    const mockFunction = sinon.spy();
    const socket = {
      emit: mockFunction,
    };

    sockWrapper.sendRequest(socket, null, null, null, []);
    expect(mockFunction.callCount).to.equal(1);
  });
});
