const mongoose = require('mongoose');
const ottoman = require('ottoman');
const { model, Schema } = require('ottoman');
const assert = require('assert');

describe.only('test create function', async () => {
    const schema = {
        callsign: String,
        country: String,
        name: String
    };

    const doc = {
        callsign: 'Couchbase',
        country: 'United States',
        name: 'Couchbase Airlines'
    };

    before(async () => {
        ottoman.connect({
            connectionString: 'couchbase://localhost',
            bucketName: 'testBucket',
            username: 'user',
            password: 'password'
        });

        // how to drop the bucket/scope/collection?
        // how to remove all docs from a bucket/scope/collection?
        await ottoman.ensureIndexes();
    })

    it('ottoman - should create new doc', async () => {
        const airlineSchema = new Schema(schema);
        const Airline = Model('Airline', airlineSchema);
        const cbAirlines = new Airline(doc);

        const created = await Airline.create(cbAirlines);
        assert.strictEqual(created.callsign, cbAirlines.callsign);
        assert.strictEqual(created.country, cbAirlines.country);
        assert.strictEqual(created.name, cbAirlines.name);

        console.log(await Airline.find());
    });
})