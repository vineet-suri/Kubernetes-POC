import {ConnectorMsApplication} from '../..';
import {Client, createRestAppClient, expect} from '@loopback/testlab';
import {setupApplication} from './test-helper';

describe('DbConfig (acceptance)', () => {
  let app: ConnectorMsApplication;
  let client: Client;

  //before(givenEmptyDatabase);
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('retrieves dbConfig details', async () => {
    // arrange
    // const dbConfig = {};
    const expected = Object.assign([
      {
        dbConfig: {},
      },
      {
        dbConfig: {},
      },
    ]);

    // act
    const response = await client.get('/tenant-db-configs-only').expect(200);

    // assert
    expect(response.body).to.be.Array;
    if (response.body.length >= 1) {
      expect(response.body[0]).to.have.property('dbConfig');
    }
  });

  it('retrieves dbConfig details', async () => {
    // arrange
    // const dbConfig = {};
    const expected = [
      {
        deleted: false,
        createdOn: '2019-07-17T18:30:00.000Z',
        modifiedOn: '2019-07-17T18:30:00.000Z',
        createdBy: '1',
        modifiedBy: '1',
        id: 1,
        name: 'tenant_one',
        tenantKey: 'tenone',
      },
      {
        deleted: false,
        createdOn: '2019-07-17T18:30:00.000Z',
        modifiedOn: '2019-07-17T18:30:00.000Z',
        createdBy: '1',
        modifiedBy: '1',
        id: 2,
        name: 'tenant_two',
        tenantKey: 'tentwo',
      },
    ];

    // act
    const response = await client.get('/tenant-db-configs').expect(200);

    // assert
    expect(response.body).to.be.Array;
    if (response.body.length >= 1) {
      expect(response.body[0]).to.have.property('tenantKey');
    }
  });
});
