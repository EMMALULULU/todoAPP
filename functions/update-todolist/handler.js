'use strict'

module.exports = async (event, context, cb, prisma) => {
  const { id, data } = event.body;

  const todolist = await prisma.todolist.findUnique({
    include: {
      user: true,
      todoitems: true
    },
    where: {
      id,
    },
  })

  // if no todolist found
  if (!todolist) {
    return context.status(404).succeed({
      code: 404,
      message: "Todolist not found!"
    })
  }

  const { name, todoitems } = data;

  // Delete all old todoitems
  await prisma.todoitem.deleteMany({
    where: { todolistid: id },
  })

  // create new todoitem
  for (let todoitem of todoitems) {
      await prisma.todoitem.create({
        data: {
          ...todoitem,
          todolistid: id,
        },
      })
  }

  // update the list itself
  const newState = await prisma.todolist.update({
    include: {
      user: true,
      todoitems: true
    },
    where: { id },
    data: { name },
  })


  return context.status(200).succeed({
    code: 200,
    data: newState
  })
}
