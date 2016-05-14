#!/bin/bash

echo "Packing"
tar -czf archive.tar.gz dist node_modules server.js src gulpfile.js
echo "Upload"
scp archive.tar.gz root@37.139.1.133:/root/lenka/archive.tar.gz
echo "Unpack"
ssh root@37.139.1.133 "cd /root/lenka && tar -xf archive.tar.gz && rm archive.tar.gz"
echo "DelArchive"
rm archive.tar.gz