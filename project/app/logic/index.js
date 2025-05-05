import { getUsername } from './users/getUsername.js'
import { loginUser } from './users/loginUser.js'
import { logoutUser } from './users/logoutUser.js'
import { registerUser } from './users/registerUser.js'
import { isUserLoggedIn } from './users/isUserLoggedIn.js'
import { getUserId } from './users/getUserId.js'
import { getUserRole } from './users/getUserRole.js'
import { getUserById } from './users/getUserById.js'
import { getUsernamesByIds } from './users/getUsernameByIds.js'
import { requestAdminRole } from './users/requestAdminRole.js'
import { getUserStats } from './users/getUserStats.js'
import { getUserHistoricStats } from './users/getUserHistoricStats.js'
import { searchUsers } from './users/searchUsers.js'
import { getUserStatsById } from './users/getUserStatsById.js'
import { getUserHistoricStatsById } from './users/getUserHistoricStatsById.js'

import { createGame } from "./games/createGame.js"
import { getGames } from "./games/getGames.js"
import { toggleParticipation } from "./games/toggleParticipation.js"
import { setGameWinner } from "./games/setGameWinner.js"
import { deleteGame } from './games/deleteGame.js'

import { finishSeason } from './season/finishSeason.js'
import { getLatestSeason } from './season/getLatestSeason.js'
import { getSeasonLeaderboard } from './season/getSeasonLeaderboard.js'
import { createSeason } from './season/createSeason.js'
import { getSeasonById } from './season/getSeasonById.js'
import { getSeasonHistoric } from './season/getSeasonHistoric.js'
import { getFinishedSeasons } from './season/getFinishedSeasons.js'

export const logic = {
    loginUser,
    registerUser,
    logoutUser,
    getUsername,
    isUserLoggedIn,
    getUserId,
    getUserRole,
    getUserById,
    getUsernamesByIds,
    requestAdminRole,
    getUserStats,
    getUserHistoricStats,
    searchUsers,
    getUserHistoricStatsById,
    getUserStatsById,

    createGame,
    getGames,
    setGameWinner,
    toggleParticipation,
    deleteGame,

    finishSeason,
    getLatestSeason,
    getSeasonLeaderboard,
    createSeason,
    getSeasonById,
    getSeasonHistoric,
    getFinishedSeasons
}