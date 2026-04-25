import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", async (req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post("/", async (req, res) => {
    const newTasks = new Task(req.body);
    const saved = await newTasks.save();
    res.json(saved); 
});

router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted"});
});

router.put("/:id", async (req, res) => {
    const updated = await Task.findByIdAndDelete(
        req.params.id,
        req.body,
        { new: true}
    );
    res.json(updated);
})

export default router;