1. Add certificates in the root folder
```
openssl genrsa -out key.pem 2048
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

2. Run into terminal
```
node index.js
```

3. Check your ip and replace it into public/index.html and public/video.html
