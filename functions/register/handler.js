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

  await prisma.todolist.create({
    data: {
      userId: user.id,
    },
  })

  const data = await prisma.user.findUnique({
    include: {
      todolist: { select: { todoitems: true } },
    },
    where: {
      id: user.id,
    },
  })

  data.password = undefined

  return context
    .status(200)
    .succeed({
      statusCode: 200,
      data
    })
}
