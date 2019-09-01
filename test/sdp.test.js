const { SourceDemo, SourceGame, SourceDemoParser } = require('../sdp');
const assert = require('assert');
const fs = require('fs');

describe('SourceDemoParser', () => {
    describe('#Portal', () => {
        it('parse header correctly', () => {
            let demo = new SourceDemo();
            let buffer = fs.readFileSync('./demos/public/portal.dem');

            SourceDemoParser.default()
                .withHeaderOnly(true)
                .parseDemoHeader(demo, buffer);

            assert.equal(demo.header.demoFileStamp, 'HL2DEMO');
            assert.equal(demo.header.demoProtocol, 3);
            assert.equal(demo.header.networkProtocol, 15);
            assert.equal(demo.header.serverName, 'localhost:0');
            assert.equal(demo.header.clientName, "Can't Even");
            assert.equal(demo.header.mapName, 'testchmb_a_00');
            assert.equal(demo.header.gameDirectory, 'portal');
            assert.equal(demo.header.playbackTime, 3.944999933242798);
            assert.equal(demo.header.playbackTicks, 263);
            assert.equal(demo.header.playbackFrames, 253);
            assert.equal(demo.header.signOnLength, 80641);
        });
    });
    describe('#Portal 2', () => {
        it('parse header correctly', () => {
            let demo = new SourceDemo();
            let buffer = fs.readFileSync('./demos/public/portal2.dem');

            SourceDemoParser.default()
                .withHeaderOnly(true)
                .parseDemoHeader(demo, buffer);

            assert.equal(demo.header.demoFileStamp, 'HL2DEMO');
            assert.equal(demo.header.demoProtocol, 4);
            assert.equal(demo.header.networkProtocol, 2001);
            assert.equal(demo.header.serverName, 'localhost:27015');
            assert.equal(demo.header.clientName, 'PerOculos');
            assert.equal(demo.header.mapName, 'sp_a1_intro1');
            assert.equal(demo.header.gameDirectory, 'portal2');
            assert.equal(demo.header.playbackTime, -1.6666667461395264);
            assert.equal(demo.header.playbackTicks, -100);
            assert.equal(demo.header.playbackFrames, 10405);
            assert.equal(demo.header.signOnLength, 116002);
        });
    });
});
describe('SourceDemo', () => {
    describe('#Portal 2', () => {
        it('adjust demo correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal2.dem');

            let demo = SourceDemoParser.default()
                .withAutoAdjustment(true)
                .parseDemo(buffer);

            assert.equal(demo.header.playbackTime, 346.93334987640384);
            assert.equal(demo.header.playbackTicks, 20816);

            demo.detectGame(new SourceGame());
            demo.adjust();

            assert.equal(demo.header.playbackTime, 334.6833492922783);
            assert.equal(demo.header.playbackTicks, 20081);
        });
    });
});
describe('encodeUserCmdMessages', () => {
    describe('#Portal 2', () => {
        it('encode CUserCmd correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal2.dem');

            let parser = SourceDemoParser.default().withAutoAdjustment(true);

            let demo = parser.parseDemo(buffer);
            let message = parser.encodeUserCmdMessages(demo)[0];

            assert.equal(message.commandNumber, 3299);
            assert.equal(message.tickCount, 100);
            assert.equal(message.viewAngleX, undefined);
            assert.equal(message.viewAngleY, 9.99755859375);
            assert.equal(message.viewAngleZ, undefined);
            assert.equal(message.forwardMove, undefined);
            assert.equal(message.sideMove, undefined);
            assert.equal(message.upMove, undefined);
            assert.equal(message.buttons, undefined);
            assert.equal(message.impulse, undefined);
            assert.equal(message.weaponSelect, undefined);
            assert.equal(message.weaponSubtype, undefined);
            assert.equal(message.mouseDx, undefined);
            assert.equal(message.mouseDy, undefined);
        });
    });
    describe('#Portal', () => {
        it('encode CUserCmd correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal.dem');

            let parser = SourceDemoParser.default().withAutoAdjustment(true);

            let demo = parser.parseDemo(buffer);
            let message = parser.encodeUserCmdMessages(demo)[0];

            assert.equal(message.commandNumber, 16);
            assert.equal(message.tickCount, 4262);
            assert.equal(message.viewAngleX, -0.13199999928474426);
            assert.equal(message.viewAngleY, -171.32244873046875);
            assert.equal(message.viewAngleZ, undefined);
            assert.equal(message.forwardMove, undefined);
            assert.equal(message.sideMove, undefined);
            assert.equal(message.upMove, undefined);
            assert.equal(message.buttons, undefined);
            assert.equal(message.impulse, undefined);
            assert.equal(message.weaponSelect, undefined);
            assert.equal(message.weaponSubtype, undefined);
            assert.equal(message.mouseDx, undefined);
            assert.equal(message.mouseDy, undefined);
        });
    });
});
describe('encodeStringTables', () => {
    describe('#Portal 2', () => {
        it('encode string tables correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal2.dem');
            let parser = SourceDemoParser.default();
            let demo = parser.parseDemo(buffer);

            let st = parser.encodeStringTables(demo);
            assert.equal(st.length, 1);
        });
    });
    describe('#Portal', () => {
        it('encode string tables correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal.dem');
            let parser = SourceDemoParser.default();
            let demo = parser.parseDemo(buffer);

            let st = parser.encodeStringTables(demo);
            assert.equal(st.length, 1);
        });
    });
});
describe('encodeDataTables', () => {
    describe('#Portal 2', () => {
        it('encode data tables correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal2.dem');
            let parser = SourceDemoParser.default();
            let demo = parser.parseDemo(buffer);

            let dt = parser.encodeDataTables(demo)[0];
            assert.equal(dt.tables.length, 307);
            assert.equal(dt.classes.length, 236);
        });
    });
    describe('#Portal', () => {
        it('encode data tables correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal.dem');
            let parser = SourceDemoParser.default();
            let demo = parser.parseDemo(buffer);

            let dt = parser.encodeDataTables(demo)[0];
            assert.equal(dt.tables.length, 269);
            assert.equal(dt.classes.length, 222);
        });
    });
});
/* describe('encodePackets', function() {
    describe('#Portal 2', () => {
        it('encode packets correctly', () => {
            let buffer = fs.readFileSync('./demos/public/portal2.dem');
            let parser = SourceDemoParser.default();
            let demo = parser.parseDemo(buffer);

            let packets = parser.encodePackets(demo);
        });
    });
}); */
