import type { Request, Response } from "express";
import type { ItemService } from "../services/item.service";
import { handleError } from "../util/handleError";
export class ItemController {
  constructor(private itemService: ItemService) {}

 
  createItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await this.itemService.createItem(req.body);

      res.status(201).json({
        success: true,
        message: "Item created successfully",
        data: item,
      });

    } catch (error) {
      handleError(res, error, "Create Item Error");
    }
  };

  
  getItemsByMenu = async (req: Request, res: Response): Promise<void> => {
    try {
      const menuId = Array.isArray(req.params.menuId)
  ? req.params.menuId[0]
  : req.params.menuId;

      const items = await this.itemService.getItemsByMenu(menuId);

      res.status(200).json({
        success: true,
        message: "Items fetched successfully",
        data: items,
      });

    } catch (error) {
      handleError(res, error, "Get Items Error");
    }
  };
}