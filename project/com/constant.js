export const constant = {
    EMPTY_OR_BLANK_REGEX: /^\s*$/,
    EMPTY_OR_BLANK_REGEX_MONGOOSE: /^(?!\s*$).+/,
    EMAIL_REGEX: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    USERNAME_REGEX: /^[a-zA-Z0-9_]+$/,
    NAME_REGEX: /^[A-Za-zÀ-ÿñÑ]+(?: [A-Za-zÀ-ÿñÑ]+)*$/,
    SURNAME_REGEX: /^[A-Za-zÀ-ÿñÑ]+(?: [A-Za-zÀ-ÿñÑ]+)*$/,
    DATE_REGEX: /^\d{2}-\d{2}-\d{4}$/

}