import type { Request, Response } from "express";
import type { MenuService } from "../services/menu.service";
import { handleError } from "../util/handleError";
export class MenuController {
  constructor(private menuService: MenuService) {}

  createMenu = async (req: Request, res: Response): Promise<void> => {
    try {
      const menu = await this.menuService.createMenu(req.body);

      res.status(201).json({
        success: true,
        message: "Menu created successfully",
        data: menu,
      });

    } catch (error) {
      handleError(res, error, "Create Menu Controller Error");
    }
  };

  getMenus = async (req: Request, res: Response): Promise<void> => {
    try {
      const menus = await this.menuService.getMenus();

      res.status(200).json({
        success: true,
        message: "Menus fetched successfully",
        data: menus,
      });

    } catch (error) {
      handleError(res, error, "Get Menus Controller Error");
    }
  };
}