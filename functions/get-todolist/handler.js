'use strict'

module.exports = async (event, context, cb, prisma) => {

  const { id } = event.body;

  const todolist = await prisma.todolist.findUnique({
    include:{
      user: true,
      todoitem: true
    },
    where: {
      id,
    },
  })

  if (!todolist) {
    return context.status(404).succeed({
      code: 404,
      message: "Todolist not found!"
    })
  }

  return context.status(200).succeed({
    code: 200,
    data: todolist
  })


}
