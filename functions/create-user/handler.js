'use strict'

module.exports = async (event, context, cb, prisma) => {
  const { username, password } = event.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (existingUser) {
    return context.status(400)
      .succeed({
        statusCode: 400,
        message: "User already exist"
      })
  }


  const user = await prisma.user.create({
    data: {
      username,
      password
    },
  })

  user.password = null;

  return context
    .status(200)
    .succeed({
      statusCode: 200,
      data: user
    })
}
