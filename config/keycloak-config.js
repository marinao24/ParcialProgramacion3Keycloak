const session = require('express-session')
const Keycloak = require('keycloak-connect')

let _keycloak

var keycloakConfig = { 
    clientId: 'nodejs-microservice', 
    bearerOnly: true, 
    serverUrl: 'http://localhost:8080/auth',
    realm: 'Demo-Realm',
    credentials: {
        secret: '0e8ab339-b3ed-4199-a7a2-fd9ca160eddc'
    }
};

function initKeycloak() { 
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if(!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    }
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};