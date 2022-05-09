'use strict'


module.exports = async (event, context, cb, prisma) => {
  const { name, username } = event.body;

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return context.status(404).succeed({
      code: 404,
      message: "User not found!"
    })
  }

  const todolist = await prisma.todolist.create({
    data: {
      userId: user.id,
      name
    },
  })

  return context.status(200).succeed(todolist)

}
