import express, { Express, Request, Response } from "express";

const rankRouter = express.Router();

rankRouter.get("/", (req: Request, res:Response) => {

  console.log(req.body);
});

export default rankRouter;
