import express from "express";
import { MenuRepository } from "../repositories/menu.repository";
import { MenuService } from "../services/menu.service";
import { MenuController } from "../controllers/menu.controller";

const router = express.Router();

const menuRepository = new MenuRepository();
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

// RESTful routes
router.get("/", menuController.getMenus.bind(menuController));        // GET /api/menus
router.post("/", menuController.createMenu.bind(menuController));     // POST /api/menus

export default router;