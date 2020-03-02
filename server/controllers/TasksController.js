import express from 'express';
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { tasksService } from "../services/TasksService";

//PUBLIC
export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete);
  }

  async getById(req, res, next) {
    try {
      let data = await tasksService.getById(req.params.id, req.userInfo.email);
      return res.send(data);
    } catch (error) { next(error); }
  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await tasksService.create(req.body);
      return res.status(201).send(data);
    } catch (error) { next(error); }
  }

  async edit(req, res, next) {
    try {
      let data = await tasksService.edit(req.params.id, req.userInfo.email, req.body);
      return res.send(data);
    } catch (error) { next(error); }
  }

  async delete(req, res, next) {
    try {
      await tasksService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) { next(error); }
  }
}


