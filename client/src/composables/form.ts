import { sleep } from ".";
import { regexObject } from "./env";

export const selectImage = async (
   input: HTMLInputElement,
   options: { size: number } = {
      size: 120
   }
) => {
   const image = input.files?.item(0)
   let result = ''

   if (image) {
      const valid = image.size < (options.size * 1000)
      if (!valid) throw Error(`Image size must be less than ${options.size}kB`);
      const reader = new FileReader()
      reader.readAsDataURL(image)
      return reader
   }

   return null
}

export const vname = async (name: string) => {
   if (regexObject.name.test(name)) return name
   throw Error('name must be in the format \'First Last\'')
}
export const vemail = async (email: string) => {
   if (regexObject.email.test(email)) return email
   throw Error('the email is invalid!')
}

export const vpassword = async (password: string) => {
   if (regexObject.password.test(password)) return password
   throw Error('password must be at least 6 characters')
}