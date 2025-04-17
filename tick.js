const getTickResponse = (clientManager, clientId) => {
    return JSON.stringify({
        'test': 'hello',
        clientId,
        masterId: clientManager.masterId,
        masterPosition: clientManager.getPositionFromMaster(),
        masterIsPlaying: clientManager.getIsMasterPlaying(),
    });
};

export default getTickResponse;