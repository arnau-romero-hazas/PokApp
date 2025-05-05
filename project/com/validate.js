import { constant } from './constant.js'

import { errors } from './index.js'
const { ValidationError } = errors

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
    }
}