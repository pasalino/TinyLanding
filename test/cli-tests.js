/* eslint-env mocha */

// const { Server } = require('mock-socket');
require('./fixtures');
const { execSync, exec } = require('child_process');
const chai = require('chai');
const sinon = require('sinon');
const { describe, it } = require('mocha');


const { expect } = chai;
chai.should();
chai.use(require('chai-things'));

const { landingList } = require('../bin/landing');

describe('Cli Console', () => {
  describe('Manage CLI output', () => {
    it('should show help with error when ask manage without parameters', async (done) => {
      try {
        execSync('NODE_ENV=test node ./bin/manage.js');
      } catch (error) {
        expect(error.message).to.include.any.string('You need at least one command before moving on');
        done();
      }
    });
    it('should show help without error when ask help parameters', (done) => {
      exec('NODE_ENV=test node ./bin/manage.js --help', (err, stdout, stderr) => {
        expect(err).to.be.a('null');
        expect(stderr).to.be.eq('');
        done();
      });
    });
    it('should show help with error when call wrong command', (done) => {
      exec('NODE_ENV=test node ./bin/manage.js aaa', (err, stdout, stderr) => {
        expect(err).to.be.not.a('null');
        expect(stderr).to.include.any.string('You need at least one command before moving on');
        done();
      });
    });
    it('should show landing list without error', (done) => {
      exec('NODE_ENV=test node ./bin/manage.js landing', (err, stdout, stderr) => {
        expect(err).to.be.a('null');
        expect(stderr).to.be.eq('');
        done();
      });
    });
    it('should adding landing without error', (done) => {
      exec('NODE_ENV=test node ./bin/manage.js add-landing test', (err, stdout, stderr) => {
        expect(err).to.be.a('null');
        expect(stderr).to.be.eq('');
        done();
      });
    });
    it('should show leads for tinylanding without error', (done) => {
      exec('NODE_ENV=test node ./bin/manage.js leads --name tiny-landing', (err, stdout, stderr) => {
        expect(err).to.be.a('null');
        expect(stderr).to.be.eq('');
        done();
      });
    });
  });
  describe('Listing Landing Page', () => {
    it('should show list on console without hash when use command without parameters', async () => {
      const consoleTable = sinon.spy(console, 'table');
      const consoleLog = sinon.spy(console, 'log');
      await landingList({ hash: false });
      expect(consoleLog.callCount).to.equal(1);
      const tableResult = consoleTable.args[0];
      expect(tableResult).to.not.have.property('Hash');
      /* eslint-disable no-console */
      console.table.restore();
      console.log.restore();
      /* eslint-enable no-console */
    });
    it('should show list on console with hash column when use hash parameter', async () => {
      const consoleTable = sinon.spy(console, 'table');
      const consoleLog = sinon.spy(console, 'log');
      await landingList({ hash: true });
      expect(consoleLog.callCount).to.equal(1);
      const tableResult = consoleTable.args[0][0];
      expect(tableResult).all.have.property('Hash');
      /* eslint-disable no-console */
      console.table.restore();
      console.log.restore();
      /* eslint-enable no-console */
    });
  });
  describe('Landing List command', () => {
    it('given no parameters should return object when called', async () => {
      const result = await landingList({ hash: true });
      expect(result).to.be.a('Array');
    });
  });
});
