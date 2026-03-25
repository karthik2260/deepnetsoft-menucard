import { ItemDocument } from "../../models/item.model";


export interface IItemRepository {
  create(data: Partial<ItemDocument>): Promise<ItemDocument>;
  findByMenu(menuId: string): Promise<ItemDocument[]>;
}