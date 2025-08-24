const mongoose =  require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, default: false},
});
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    priority: {type: String, required: true, enum: ["Low", "Medium", "High"]},
    status: {type: String, enum: ["Completed", "In Progress", "Pending"],default:"Pending"},
    assignDate: {type: Date, default: Date.now},
    dueDate: {type: Date, required: true},
    assignedTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    todoCheckList:[todoSchema],
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    attachments :{type: String},
    progress: {type: Number, default: 0}, // Percentage of task completionS
},{timeStamp :true});
module.exports =   mongoose.model("Task",taskSchema);

