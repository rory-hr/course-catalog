## SETUP INSTRUCTIONS

1. Install dependencies:
```
npm install
```

2. Bundle app:
```
npm run build
```

3. Set environment variables by renaming **example.env** => **.env** and enter the appropriate values for your mongod instance. 
*Note that user authentication is currently setup to run through the admin database.*

4. Open client at port speciefied in **.env** or at default **3000**.