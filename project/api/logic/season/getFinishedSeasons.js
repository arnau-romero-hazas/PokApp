import { Season } from '../../data/index.js'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const getFinishedSeasons = () => {
    return Season.find({ status: 'finished' }, { _id: 1, name: 1 }).lean()
    .sort({ endDate: -1 })
    .catch (error => { throw new SystemError(error.message) })
    .then(seasons => {
        debugger
        const returnedSeasons = seasons.map(season => ({
            id: season._id.toString(),
            seasonName: season.name
        })) 

        return returnedSeasons
    })
}

export default getFinishedSeasons