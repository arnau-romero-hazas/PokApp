import { constant } from './constant.js'

import { ValidationError } from './errors.js'

export const validate = {
    string(string, explain) {
        if(typeof string !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    text(text, explain) {
        this.string(text, explain)
        if (constant.EMPTY_OR_BLANK_REGEX.test(text))
        throw new ValidationError(`invalid ${explain} syntax`)
    },
    name(name, explain = 'name') {
        this.text(name, explain)
        this.minLength(name, 1, explain)
        this.maxLength(name, 20, explain)
        if (!constant.NAME_REGEX.test(name)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    surname(surname, explain = 'surname') {
        this.text(surname, explain)
        this.minLength(surname, 1, explain)
        this.maxLength(surname, 20, explain)
        if (!constant.NAME_REGEX.test(surname)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    email(email, explain = 'email') {
        this.string(email, explain)
        if(!constant.EMAIL_REGEX.test(email)) throw new ValidationError(`invalid ${explain} syntax`)
        this.maxLength(email, 30, explain)
    },
    maxLength(value, maxLength, explain) {
        if (value.length > maxLength) throw new ValidationError(`invalid ${explain} maxLength`)
    },
    minLength(value, minLength, explain) {
        if (value.length < minLength) throw new ValidationError(`invalid ${explain} minLength`)
    },
    username(username, explain = 'username') {
        this.text(username, explain)
        this.minLength(username, 3, explain)
        this.maxLength(username, 20, explain)
        if (!constant.USERNAME_REGEX.test(username)) throw new ValidationError(`invalid ${explain} syntax`)
    },
    password(password, explain = 'password') {
        this.text(password, explain)
        this.minLength(password, 8, explain)
        this.maxLength(password, 20, explain)
    },
    id(id, explain = 'id') {
        this.text(id, explain)
        if (id.length !== 24) throw new ValidationError(`invalid ${explain} length`)
    },
    title(title, explain = 'title') {
        this.text(title, explain)
        this.minLength(title, 1, explain)
        this.maxLength(title, 40, explain)
    },
    season(season, explain = 'season') {
        this.text(season, explain)
        this.minLength(season, 1, explain)
        this.maxLength(season, 40, explain)
    },
    place(place, explain = 'place') {
        this.text(place, explain)
        this.minLength(place, 1, explain)
        this.maxLength(place, 40, explain)
    },
    date(date, explain = 'date') {
        if(typeof date !== 'string') throw new ValidationError(`invalid ${explain} type`)
    },
    idArray(array, explain = 'ids') {
        if (!Array.isArray(array)) throw new ValidationError(`${explain} must be an array`)
        array.forEach((id, i) => this.id(id, `${explain}[${i}]`))
      }
}