const fs = require('fs');
const { SourceDemoParser, Speedrun: { SarReplay } } =  require('./src/sdp.js');

let file = process.argv[2];

if (!file) {
	console.error('Usage: node convert.js [demo]');
	return;
}

let demo = new SourceDemoParser({
    header: true,
    messages: true,
    stringTables: false,
    dataTables: false,
    packets: false,
    userCmds: true,
})
	.parse(fs.readFileSync(file));
	
fs.writeFileSync(file.split('.').slice(0, -1).join('.') + ".str", SarReplay.default().convert([demo]), { encoding: 'ascii' })