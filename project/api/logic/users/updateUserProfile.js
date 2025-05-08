import { User } from '../../data/index.js'
import { errors, validate } from '../../validations'
import bcrypt from 'bcryptjs'

const { NotFoundError, ValidationError, NotAllowedError, DuplicityError } = errors

export const updateUserProfile = async (userId, { name, surname, email, username, currentPassword, newPassword }) => {
  validate.id(userId, 'userId')

  const user = await User.findById(userId)
  if (!user) throw new NotFoundError('User not found')

  // Validaciones
  if (name) validate.name(name)
  if (surname) validate.surname(surname)
  if (email) {
    validate.email(email)
    const existingEmail = await User.findOne({ email, _id: { $ne: userId } })
    if (existingEmail) throw new DuplicityError('Email is already taken')
  }

  if (username) {
    validate.username(username)
    const existingUsername = await User.findOne({ username, _id: { $ne: userId } })
    if (existingUsername) throw new DuplicityError('Username is already taken')
  }

  // Cambio de contraseña
  if (currentPassword && newPassword) {
    const match = await bcrypt.compare(currentPassword, user.password)
    if (!match) throw new NotAllowedError('Current password is incorrect')
    validate.password(newPassword)
    user.password = await bcrypt.hash(newPassword, 10)
  }

  // Aplicar cambios
  if (name) user.name = name
  if (surname) user.surname = surname
  if (email) user.email = email
  if (username) user.username = username

  await user.save()
}
