const Task = require("../../models/model_task");
const { dateToString } = require("../../helpers/date");

module.exports = {
  /* async task Query Function() 
     Return all tasks
  */
  tasks: async () => {
    try {
      const tasks = await Task.find();
      return tasks.map(task => {
        return {
          ...task._doc,
          _id: task.id,
          _createdAt: dateToString(task.createdAt)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  getTask: async args => {
    const _id = args.taskOne._id;
    try {
      const task = await Task.findOne({ _id: _id });
      return {
        ...task._doc
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  /* async createTask Mutation Function()
    @Params:  TaskInput {
    taskName: String!
    description: String
    status: String
    githubLink: String
    */
  createTask: async args => {
    const task = new Task({
      taskName: args.taskInput.taskName,
      description: args.taskInput.description,
      status: args.taskInput.status,
      githubLink: args.taskInput.githubLink
    });

    try {
      const result = await task.save();
      return {
        ...result._doc, // Return Mongo User Doc
        _id: task.id, // Assign _id to (Mongo)result.id
        _createdAt: dateToString(result.createdAt) // Assign _createdAt to (Mongo)result.createdAt
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  updateTask: async args => {
    const _id = args.taskUpdate._id;
    console.log(_id);
    const task = {
      taskName: args.taskUpdate.taskName,
      description: args.taskUpdate.description,
      status: args.taskUpdate.status,
      githubLink: args.taskUpdate.githubLink
    };

    try {
      const result = await Task.findOneAndUpdate({ _id: _id }, task);
      return {
        ...result._doc, // Return Mongo User Doc
        _id,
        _createdAt: dateToString(result.createdAt) // Assign _createdAt to (Mongo)result.createdAt
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteTask: async args => {
    let taskId = args.taskDelete._id;

    try {
      const task = await Task.findOneAndDelete({ _id: taskId });
      return {
        ...task._doc,
        _id: task.id,
        status: "Task Deleted"
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
