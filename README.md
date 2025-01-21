# BE-Assignment-1

# Express Request Logger
A simple Express.js application that logs incoming HTTP request details to a file using the `fs` module. This project demonstrates middleware and file system interactions in Node.js.

## Features
- Logs essential request details:
  - Timestamp
  - IP Address
  - URL
  - Protocol
  - HTTP Method
  - Hostname
- Logs are written in JSON format with indentation for readability.
- Supports log rotation for files exceeding a specified size.