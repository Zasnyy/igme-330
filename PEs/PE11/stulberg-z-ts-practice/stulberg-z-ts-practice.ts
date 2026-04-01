interface ToDo {
    id: number,
    title: string,
    status: string,
    completedOn?: Date
}

enum Status{
    done = "done",
    inProgress = "in-progress",
    todo = "todo"
}

const todoItems: ToDo[] = [
    { id: 1, title: "Learn HTML", status: Status.done, completedOn: new Date("2021-09-11") },
    { id: 2, title: "Learn TypeScript", status: Status.inProgress },
    { id: 3, title: "Write the best web app in the world", status: Status.todo },
]

function addTodoItem(todo: string): ToDo {
    const id = getNextId(todoItems)

    const newTodo = {
        id,
        title: todo,
        status: "todo",
    }

    todoItems.push(newTodo)

    return newTodo
}

function getNextId(items: ToDo[]): number {
    return items.reduce((max, x) => x.id > max ? x.id : max, 0) + 1;
}

const newTodo = addTodoItem("Buy lots of stuff with all the money we make from the app")

console.log(JSON.stringify(newTodo))