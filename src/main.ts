import { Command } from 'commander';
import { exec } from "child_process"
import * as fs from 'fs';
import path from "path";
const openssl = require('async-openssl');
const prompt = require('prompt');



( async () => {
    console.info("Self-signed certificate generator for OPCUA-client (CBV)")
    
    prompt.start();

    // tsc .\src\test.ts;; node .\src\test.js --ip="zalv0003.inetpsa.com" --CN="CN" --OU="OY" --O="UO" --L="LL" --ST="ST" --C="CC" --E="E"
    const {CN, OU, O, L, ST, C, E, ip} = await prompt.get(['CN', 'OU', 'O', 'L', 'ST', 'C', 'E', 'ip']);

    
    try {
        // Generate extension file
        const extensionFileName = "extension.cnf";
        const configOpenssl = "config.cnf"

        // OpenSSL Config file
        fs.readFile(path.resolve(process.cwd()+"/build", configOpenssl), 'utf-8', (err, data) => {
            if ( err !== null ) console.info(err)
            console.info(" > Using OpenSSL config file");
            console.info(data)
            console.info(" -- OpenSSL config file --\n\n")
        });

        // Extension file
        fs.writeFileSync(path.resolve(process.cwd()+"/build", extensionFileName), `basicConstraints=CA:TRUE\nauthorityKeyIdentifier=keyid,issuer\nkeyUsage=dataEncipherment,keyEncipherment,nonRepudiation,digitalSignature,keyCertSign,cRLSign\nextendedKeyUsage=serverAuth,clientAuth\nsubjectAltName=URI:URN:${ip}`);
        fs.readFile(path.resolve(process.cwd()+"/build", extensionFileName), 'utf-8', (err, data) => {
            if ( err !== null ) console.info(err)
            console.info("\n> Using extension file :\n");
            console.info(data)
            console.info("\n-- END extension file --\n\n")
        });



        // Generate Certificate with extension file with OpenSSL
        const subject = `/C=${C}/ST=${ST}/L=${L}/O=${O}/OU=${OU}/CN=${CN}/emailAddress=${E}`;
        console.info("\n > Using Subject : " + subject+"\n");

        await openssl('genrsa -out default_pk.pem 2048');
        await openssl(`req -config ${path.resolve(process.cwd()+"/build", configOpenssl)} -new -key default_pk.pem -out cert.csr -subj ${subject}`);
        await openssl(`x509 -req -days 3650 -extfile ${path.resolve(process.cwd()+"/build", extensionFileName)} -in cert.csr -signkey default_pk.pem -out public.pem`);
        await openssl(`x509 -in public.pem -inform PEM -out public.der -outform DER`);

        console.info(" > Certificate generated with success !");
        console.info("   - Certificate file : public.der");
        console.info("   - Private key file : default_pk.pem");

        console.info("\n\n...Request OPCUA server to add the certificate to the waiting room for trusted list");
        console.info("\n\n")



        console.info("\n Please, check kepware server waiting room for trusted clients. Accept it then run the container opcua client with this certificate")


        await prompt.get("Press any key to continue");

    } catch ( e ) {
        console.info(e)
        await prompt.get("Press any key to continue ( error )");        
    }

})();




