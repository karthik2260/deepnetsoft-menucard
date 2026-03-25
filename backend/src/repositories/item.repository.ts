import { IItemRepository } from "../interfaces/repositoryInterfaces/item.repository.interface";
import itemModel from "../models/item.model";
import type { ItemDocument } from "../models/item.model";

export class ItemRepository implements IItemRepository {
  async create(data: Partial<ItemDocument>): Promise<ItemDocument> {
    return await itemModel.create(data);
  }

  async findByMenu(menuId: string): Promise<ItemDocument[]> {
    return await itemModel.find({ menuId });
  }
}