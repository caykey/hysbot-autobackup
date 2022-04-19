import cron from 'node-cron';
import dotenv from 'dotenv';
import { spawn } from 'child_process';
import { NodeSSH } from 'node-ssh';

dotenv.config();

cron.schedule('59 23 * * *', run);

async function run() {
	let backup = spawn('mongodump', [
		`--uri=${process.env.MONGO_CONNECTION!}`,
		'--out=./backup',
		'--gzip',
	]);

	backup.on('exit', async (code, signal) => {
		if (code || signal) return;

		const ssh = new NodeSSH();

		await ssh.connect({
			host: process.env.CACTIVECLOUD_PROD_IP,
			username: process.env.CACTIVECLOUD_PROD_USERNAME,
			password: decodeURIComponent(process.env.CACTIVECLOUD_PROD_PASSWORD!),
		});

		const date = new Date();

		ssh
			.putDirectory(
				process.env.RELATIVE_LOCAL_FOLDER!,
				`${
					process.env.RELATIVE_REMOTE_FOLDER
				}/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
			)
			.catch(err => console.log(err));
	});
}
