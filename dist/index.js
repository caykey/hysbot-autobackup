"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
const child_process_1 = require("child_process");
const node_ssh_1 = require("node-ssh");
dotenv_1.default.config();
node_cron_1.default.schedule('59 23 * * *', run);
async function run() {
    let backup = (0, child_process_1.spawn)('mongodump', [
        `--uri=${process.env.MONGO_CONNECTION}`,
        '--out=./backup',
        '--gzip',
    ]);
    backup.on('exit', async (code, signal) => {
        if (code || signal)
            return;
        const ssh = new node_ssh_1.NodeSSH();
        await ssh.connect({
            host: process.env.CACTIVECLOUD_PROD_IP,
            username: process.env.CACTIVECLOUD_PROD_USERNAME,
            password: decodeURIComponent(process.env.CACTIVECLOUD_PROD_PASSWORD),
        });
        const date = new Date();
        ssh
            .putDirectory(process.env.RELATIVE_LOCAL_FOLDER, `${process.env.RELATIVE_REMOTE_FOLDER}/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`)
            .catch(err => console.log(err));
    });
}
//# sourceMappingURL=index.js.map