/* eslint-env mocha */

// const { Server } = require('mock-socket');
const { execSync, exec } = require('child_process');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { landingList } = require('../bin/landing');

describe('Cli Console', () => {
  describe('Manage CLI', () => {
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
    it('should show list on console without hash', async () => {
      const consoleTable = sinon.spy(console, 'table');
      const consoleLog = sinon.spy(console, 'log');
      await landingList({ hash: true, order: 'aaa' });
      expect(consoleLog.callCount).to.equal(1);
      const tableResult = consoleTable.args[0];
      expect(tableResult).to.not.have.property('Hash');
    });
  });
});
