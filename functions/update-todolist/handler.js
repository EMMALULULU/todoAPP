'use strict';

module.exports = async (event, context, cb, prisma) => {
  const { username, todolist: newlist } = event.body;

  if (!username || !newlist) {
    return context.status(400).succeed({
      statusCode: 400,
      message: 'Please provide username and todolist object',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return context.status(404).succeed({
      code: 404,
      message: 'User not found!',
    });
  }

  const todolist = await prisma.todolist.findUnique({
    where: {
      userId: user.id,
    },
  });

  // Delete all old todoitems
  await prisma.todoitem.deleteMany({
    where: { todolistid: todolist.id },
  });

  // create new todoitem
  for (let todoitem of newlist.todoitems) {
    todoitem.id = undefined;
    await prisma.todoitem.create({
      data: {
        ...todoitem,
        todolistid: todolist.id,
      },
    });
  }

  const newState = await prisma.user.findUnique({
    include: {
      todolist: { select: { todoitems: true } },
    },
    where: {
      username,
    },
  });

  return context.status(200).succeed({
    code: 200,
    data: newState,
  });
};
