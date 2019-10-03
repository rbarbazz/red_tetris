import * as server from '../../src/server/index';
import params from '../../src/params';


export default () => describe('Index', () => {
  it('should start and close the server', () => {
    server.create(params.server)
      .then(promise => promise.stop(() => {}))
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  });
});
