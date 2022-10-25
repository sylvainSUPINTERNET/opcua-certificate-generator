# Utility for OPCUA certificate



## How to run it locally 

```` bash 

npm install

npm run dev

````


## How to build executable ( using pkg npm package )

```` bash 

npm run gen-exec

# Should generate a directory at root of your project "build" and the executable is inside

````


## How to run executable ?

```` bash

Go to build directory and : 

 1) pick the .exe file 

 2) Create a directory tree with .exe file such as :

 |-- build
     |-- config.cnf => config related to openSSL ( do not edit )
     |-- extension.cnf => use in openSSL x509 certificate generation to add data such as SubjectAltName required by OPCUA
 |-- opcua-certificate-utility.exe

 3) Run the executable

   
   Note : IP should be such as zalv0003.inetpsa.com ( will fill in URI as URI:URN:zalv0003.inetpsa.com )
         

 4) Should have at the end, a certificate .der and the .pem private key generated 

````


## How to validate with OPCUA server


1) Once the certificate / private key has been generated :

Copy the certificate .der and the private key .pem into the target boxer vision

In the .env file on the boxer vision, change the following variables : 

```` bash 

AUTH_MECHANISM="certificateif
APPLICATION_URI="" => should be the same as the one in the certificate, if you use zalv0003.inetpsa.com as ip, so must be : URN:zalv0003.inetpsa.com
CERTIFICATE_FILE="<path_to_your_certificate>.der"
PRIVATE_KEY_FILE="<path_to_your_private_key>.pem"

````

2) Run the container one time, should get an error "rejected by the server"

Please check kepware server in the trusted client list to accept it 


Restart the container after the client is trusted manually by kepware server, and you should be fine





