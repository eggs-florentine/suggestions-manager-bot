const { MongoClient } = require('mongodb');
const { mongodbPW } = require('./config.json');
const uri =`"mongodb+srv://suggestions:${mongodbPW}@rose-vfms.k338rsp.mongodb.net/?retryWrites=true&w=majority&appName=rose-vfms"`;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

await client.connect();
const db = client.db('suggestions-bot');
const col = db.collection('suggestions');

/* DB SCHEMA
ID ID
TITLE STR
AUTHOR INT
TALLIES ARRAY [YES, NO]
VOTES ARRAY [INDIVIDUAL VOTERS]
SUMMARY STR
STICKYNOTE STR
ASSOCIATED LINK STR
STATUS STR 
*/

/*
STATUS OPTIONS:
UNFINAL:
PENDING REVIEW [ORANGE]
IN VOTING [BLUE]
IN PROGRESS [YELLOW]
MANAGER REVIEW [PINK]
FINALS:
IMPLEMENTED [GREEN]
FAILED [RED]
*/

async function createNew(title, author, summary, status, link, embedLink) {
    const obj = {
        title: title,
        author: author,
        summary: summary,
        status: status,
        associatedLink: link,
        embedLink: embedLink
    }

    const result = await col.insertOne(obj);
    return result.insertedId;
}

async function fail(id) {
    const obj = await col.findOne({id: id});
    const result = await col.updateOne({id: id}, {$set: {status: 'FAIL'}});
    return result;
}

function success() {

}

function stickyNote() {

}