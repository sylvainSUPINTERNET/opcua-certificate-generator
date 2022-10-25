// export getClientOptions = ():OPCUAClientOptions => {
//     return new ClientAuthBuilder()
//     .setApplicationName(process.env.APPLICATION_NAME ? process.env.APPLICATION_NAME : "")
//     .setApplicationUri(process.env.APPLICATION_URI)
//     .setConnectionStrategy(connectionStrategy)
//     .setMessageSecurityMode(clientAuthMechanism)
//     .setSecurityPolicy(clientAuthMechanism)
//     .setCertificateDataPath(clientAuthMechanism)
//     .setCertificatePrivateKeyPath(clientAuthMechanism)
//     .build(clientAuthMechanism);
// }


import {
    OPCUAClientOptions
 } from "node-opcua";



export const getClientOpts = (): OPCUAClientOptions => {

    return {
        applicationName: "MyApp",
        applicationUri: "urn:MyApp",
    }
}
