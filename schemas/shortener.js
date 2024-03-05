import { object, string } from 'yup'

const userSchema = object({
  url: string().url().required()
})

const validateUrl = (input) => {
  return userSchema.validate(input)
}

export { validateUrl }
