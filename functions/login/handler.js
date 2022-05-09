'use strict'

module.exports = async (event, context, cb, prisma) => {
  const { username, password } = event.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  const isMatchedPassword = user.password === password;

  if (!isMatchedPassword) {
    return context.status(404).succeed({
      code: 400,
      message: "Invalid username or password"
    })
  }

  user.password = undefined;

  return context.status(200).succeed({ username: user.username })



}
