import { authenticateUser } from './users/authenticateUser.js'
import { registerUser } from './users/registerUser.js'
import { getUsername } from './users/getUsername.js'
import { requestAdminRole } from './users/requestAdminRole.js'
import { getUserStats } from './users/getUserStats.js'
import { getUserHistoricStats } from './users/getUserHistoricStats.js'
import { searchUsers } from './users/searchUsers.js'
import { getUserById } from './users/getUserById.js'
import { getUsernames } from './users/getUsernames.js'

import { createGame } from './games/createGame.js'
import { getGames } from './games/getGames.js'
import { toggleParticipation } from './games/toggleParticipation.js'
import { setGameWinner } from './games/setGameWinner.js'
import { deleteGame } from './games/deleteGame.js'

import { getSeasonLeaderboard } from './season/getSeasonLeaderboard.js'
import { finishSeason } from './season/finishSeason.js'
import { getLatestSeason } from './season/getLatestSeason.js'
import { createSeason } from './season/createSeason.js'
import { getSeasonById } from './season/getSeasonById.js'
import { getSeasonHistoric } from './season/getSeasonHistoric.js'
import { getFinishedSeasons } from './season/getFinishedSeasons.js'

export const logic = {
    authenticateUser,
    registerUser,
    getUsername,
    requestAdminRole,
    getUserStats,
    getUserHistoricStats,
    searchUsers,
    getUserById,
    getUsernames,

    createGame,
    getGames,
    toggleParticipation,
    setGameWinner,
    deleteGame,

    getSeasonLeaderboard,
    finishSeason,
    getLatestSeason,
    createSeason,
    getSeasonById,
    getSeasonHistoric,
    getFinishedSeasons
}