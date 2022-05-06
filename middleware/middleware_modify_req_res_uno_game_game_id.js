const debugPrinter = require('../util/debug_printer');
const dbEngineGameUno = require('../controller/db_engine_game_uno');
const utilCommon = require('../controller/util_common');
const constants = require('../server/constants');

const middlewareModifyReqResGameUnoGameID = {};

/**
 * NOTES:
 *      THIS FUNCTION REQUIRES req.params
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function attachGameToRequestAndResponseLocalAndGuard(req, res, next) {
    debugPrinter.printMiddleware(attachGameToRequestAndResponseLocalAndGuard.name);

    const gameRow = await dbEngineGameUno.getGameRowByGameIDSimple(req.params.game_id);

    if (!gameRow) {
        utilCommon.reqSessionMessageHandler(req, constants.FAILURE, 'Game does not exist');

        res.redirect('back');
    } else {
        req.game = gameRow;

        res.locals.game = req.game;

        debugPrinter.printDebug(req.game);

        next();
    }
}

middlewareModifyReqResGameUnoGameID.attachGameToRequestAndResponseLocalAndGuard = attachGameToRequestAndResponseLocalAndGuard;

async function attachGameToRequestAndResponseLocal(req, res, next) {
    debugPrinter.printMiddleware(attachGameToRequestAndResponseLocal.name);

    const gameRow = await dbEngineGameUno.getGameRowByGameIDSimple(req.params.game_id);

    if (gameRow) {
        req.game = gameRow;
        res.locals.game = req.game;
    }
    next();
}

middlewareModifyReqResGameUnoGameID.attachGameToRequestAndResponseLocal = attachGameToRequestAndResponseLocal;

/**
 * NOTES:
 *      THIS FUNCTION REQUIRES req.params
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function attachPlayerToRequestAndResponseLocalsAndGuard(req, res, next) {
    debugPrinter.printMiddleware(attachPlayerToRequestAndResponseLocalsAndGuard.name);

    const rowPlayer = await dbEngineGameUno.getPlayerRowDetailedByGameIDAndUserID(req.params.game_id, req.user.user_id);

    if (!rowPlayer) {
        utilCommon.reqSessionMessageHandler(req, constants.FAILURE, 'Player does not exist');

        res.redirect('back');
    } else {
        req.player = rowPlayer;

        res.locals.player = req.player;

        debugPrinter.printDebug(req.player);

        next();
    }
}

middlewareModifyReqResGameUnoGameID.attachPlayerToRequestAndResponseLocalsAndGuard = attachPlayerToRequestAndResponseLocalsAndGuard;

async function attachPlayerToRequestAndResponseLocals(req, res, next) {
    debugPrinter.printMiddleware(attachPlayerToRequestAndResponseLocals.name);

    const rowPlayer = await dbEngineGameUno.getPlayerRowDetailedByGameIDAndUserID(req.params.game_id, req.user.user_id);

    if (rowPlayer) {
        req.player = rowPlayer;
        res.locals.player = req.player;
    }

    next();
}

middlewareModifyReqResGameUnoGameID.attachPlayerToRequestAndResponseLocals = attachPlayerToRequestAndResponseLocals;

module.exports = middlewareModifyReqResGameUnoGameID;
