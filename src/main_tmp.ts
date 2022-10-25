/**
 * Utility to generate a self-signed certificate and create a request for kepware server
 * How to manage certificate for OPCUA 
 * 1) Generate a self-signed certificate
 * 2) Create a connection with this self signed certificate
 * 3) Check kepware server "Trusted client" list. You should see your connection "rejected", you can accept it as "trusted"
 * 4) Run the OPCUA connector service, and don't forget to add this self-signed certificate into the container volume to be used ( certificate .der and the private key .pem)
 */

import {OPCUAClient} from "node-opcua";
import { getClientOpts } from "./opcua";
import * as fs from "fs";
import {Command} from "commander";

(async () => 

    {
        const program = new Command();
        program
            .command("gen-cert")
                .description("Generate a self-signed certificate with all data required for OPCUA compliance.")
                  .argument("self-signed", "self-signed")
                    .option('--CN <CN>', 'Common Name')
                    .option('--OU <OU>', 'Organizational Unit')
                    .option('(--O <O>)', 'Organization')
                    .option('--L <L>', 'Locality')
                    .option('--ST <ST>', 'State')
                    .option('--C <C>', 'Country')
                    .option('--E <E>', 'Email')
                    .option('--ST <ST>', 'State')
                    .option('--IP <IP>', 'Instance address such as e.g zalv0001.inetpsa.com')
        program.parse();
        const options = program.opts();
        console.log(options.IP);
        const limit = options.IP ? 1 : undefined;

        // // Override to the extension file the SubjectAltName based on the IP given 
        // // Must be such as : URI:URN:<rzlv0003.inetpsa.com your IP here>
        // fs.writeFileSync("extension.cnf", `basicConstraints=CA:TRUE\n
        // authorityKeyIdentifier=keyid,issuer\n
        // keyUsage=dataEncipherment,keyEncipherment,nonRepudiation,digitalSignature,keyCertSign,cRLSign\n
        // extendedKeyUsage=serverAuth,clientAuth\n
        // subjectAltName=URI:URN:${}`);



        
        // const limit = options.first ? 1 : undefined;
        // console.log(program.args[0].split(options.separator, limit));


        // TODO : after
        // let opcuaConn = OPCUAClient.create(getClientOpts()); 
        // opcuaConn.connect("opcurl", (err) => {
        //     console.log(`Error while trying to connect ${err}`);
        // });


    }   
)() 