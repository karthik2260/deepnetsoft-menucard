import { IItemRepository } from "../interfaces/repositoryInterfaces/item.repository.interface";
import type { ItemDocument } from "../models/item.model";
import { CustomError } from "../errors/customError";
import HTTP_statusCode from "../enums/httpStatusCode";

export class ItemService {
  constructor(private itemRepo: IItemRepository) {}

 
  createItem = async (data: Partial<ItemDocument>): Promise<ItemDocument> => {
    try {
      if (!data.name || !data.price || !data.menuId) {
        throw new CustomError(
          "Name, price and menuId are required",
          HTTP_statusCode.BAD_REQUEST
        );
      }

      return await this.itemRepo.create(data);

    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new CustomError(
        "Failed to create item",
        HTTP_statusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

 
  getItemsByMenu = async (menuId: string): Promise<ItemDocument[]> => {
    try {
      if (!menuId) {
        throw new CustomError(
          "Menu ID is required",
          HTTP_statusCode.BAD_REQUEST
        );
      }

      return await this.itemRepo.findByMenu(menuId);

    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new CustomError(
        "Failed to fetch items",
        HTTP_statusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}