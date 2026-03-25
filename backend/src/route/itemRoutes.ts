import express from "express";

import { ItemRepository } from "../repositories/item.repository";
import { ItemService } from "../services/item.service";
import { ItemController } from "../controllers/item.controller";

const router = express.Router();

const itemRepository = new ItemRepository();
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

router.post("/", itemController.createItem.bind(itemController));
router.get("/:menuId", itemController.getItemsByMenu.bind(itemController));
export default router;