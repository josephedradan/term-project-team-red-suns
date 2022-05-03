/*
Handle all the game api calls

 */
const gameUno = require('./game_uno');

const intermediateGameUno = require('./intermediate_game_uno');

const connectionContainer = require('../server/server');

const { io } = connectionContainer;

const dbEngine = require('./db_engine');
const dbEngineGameUno = require('./db_engine_game_uno');

const utilCommon = require('./util_common');

const debugPrinter = require('../util/debug_printer');
const dbEngineMessage = require('./db_engine_message');
const intermediateSocketIOGameUno = require('./intermediate_socket_io_game_uno');
const db = require('../db');

const controllerGameID = {};

// controllerGameID.initializeDrawStack = async () => {
//     const newDeck = [];
//     const coloredNumCards = await dbEngine.getCardTableOnType('NUMBER');
//     const blackWildCards = await dbEngine.getCardTableOnType('SPECIAL');
// };

async function POSTPlayCard(req, res, next) {
    // TODO: SOCKET HERE

    /* LOOK AT MIGRATION
    * req.user
      req.game
      req.player
    */
    const {
        collection_index,
    } = req.body;

    res.json({
        status: 'success',
        message: 'you played a card (CHANGE ME)', // TODO CHANGE ME
    });
}

controllerGameID.POSTPlayCard = POSTPlayCard;

async function GETDrawCard(req, res, next) {
    await intermediateGameUno.drawCardWrapped(req.game.game_id, req.player.player_id);
    const retVal = await dbEngineGameUno.getCollectionByPlayerID(req.player.player_id);
    res.json(retVal);
}

controllerGameID.GETDrawCard = GETDrawCard;

async function POSTStartGame(req, res, next) {
    // If game is not active, make it active

    const gameState = await intermediateGameUno.startGameWrapped(req.game.game_id, req.player.player_id);

    res.json(gameState);
}

controllerGameID.POSTStartGame = POSTStartGame;

async function POSTLeaveGame(req, res, next) {
    debugPrinter.printMiddleware(POSTLeaveGame.name);

    const result = await intermediateGameUno.leaveGameWrapped(req.game.game_id, req.user.user_id);

    debugPrinter.printDebug(result);

    res.json(result);
}

controllerGameID.POSTLeaveGame = POSTLeaveGame;

async function POSTTransferHost(req, res, next) {
    debugPrinter.printMiddleware(POSTLeaveGame.name);

    const result = await intermediateGameUno.leaveGameWrapped(req.game.game_id, req.user.user_id);

    debugPrinter.printDebug(result);

    res.json(result);
}

controllerGameID.POSTTransferHost = POSTTransferHost;

async function GETAllMessages(req, res, next) {
    debugPrinter.printMiddleware(GETAllMessages.name);

    const messageRows = await dbEngineMessage.getMessageRowsByGameID(req.game.game_id);

    res.json(messageRows);
}

controllerGameID.GETAllMessages = GETAllMessages;

/**
 * Get Info about the current game the user is in
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function GETGameState(req, res, next) {
    debugPrinter.printMiddleware(GETGameState.name);

    const result = await dbEngineGameUno.getGameState(req.game.game_id);

    debugPrinter.printDebug(result);

    res.json(result);
}

controllerGameID.GETGameState = GETGameState;

async function POSTSendMessage(req, res, next) {
    debugPrinter.printMiddleware(POSTSendMessage.name);

    const { message } = req.body; // TODO NO VALIDATION BY THE WAY

    const messageRow = await intermediateGameUno.sendMessageWrapped(
        req.game.game_id,
        req.player.player_id,
        message,
    );

    res.json(messageRow);
}

controllerGameID.POSTSendMessage = POSTSendMessage;

async function GETGetHand(req, res, next) {
    debugPrinter.printMiddleware(GETGetHand.name);

    const result = await dbEngineGameUno.getCollectionByPlayerID(req.player.player_id);

    debugPrinter.printDebug(result);

    res.json(result);
}

controllerGameID.GETGetHand = GETGetHand;

module.exports = controllerGameID;
