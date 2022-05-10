'use strict'

module.exports = async (event, context, cb, prisma) => {
  const { username, password } = event.body;
  
  if (!username || !password) {
    return context.status(400)
    .succeed({
      statusCode: 400,
      message: "Please provide username and password"
    })
  }

  const user = await prisma.user.findUnique({
    include: {
      todolist: { select: { todoitems: true } },
    },
    where: {
      username
    },
  })

  if (!user) {
    return context.status(404).succeed({
      code: 404,
      message: "User not found!"
    })
  }

  const isMatchedPassword = user.password === password;

  if (!isMatchedPassword) {
    return context.status(404).succeed({
      code: 400,
      message: "Invalid username or password"
    })
  }

  user.password = undefined;

  return context.status(200).succeed({
    statusCode: 200,
    data: user
  })



}
