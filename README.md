# Hysbot Daily Backup

Extremely simple script for the Hysbot backup to the CactiveCloud backup server.

## Configuration

**A `.env` file is required with the following entries:**
| Key | Description |
| --- | --- |
| `MONGO_CONNECTION` | Connection string for your MongoDB Database |
| `CACTIVECLOUD_PROD_USERNAME` | FTP Username |
| `CACTIVECLOUD_PROD_PASSWORD` | FTP Password |
| `CACTIVECLOUD_PROD_IP` | FTP Host/IP |
| `RELATIVE_LOCAL_FOLDER` | Relative Remote Folder copying backup folder |
| `RELATIVE_REMOTE_FOLDER` | FTP Relative Folder pasting backup folder |

## Compiling

	> npm install
	> npm start