/* eslint-env mocha */

after((done) => {
  console.log('ddd');
  done();
});
// const { Server } = require('mock-socket');
// const { expect } = require('chai');
const { describe, it } = require('mocha');

require('../app/app');

describe('Cli Console', () => {
  describe('Interact console', () => {
    it('Opens a socket and connect to it', (done) => {
      done();
    });
  });
});
