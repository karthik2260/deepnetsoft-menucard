import { IMenuRepository } from "../interfaces/repositoryInterfaces/menu.repository.interface";
import menuModel from "../models/menu.model";
import type { MenuDocument } from "../models/menu.model";

export class MenuRepository implements IMenuRepository {
  async create(data: Partial<MenuDocument>): Promise<MenuDocument> {
    return await menuModel.create(data);
  }

  async findAll(): Promise<MenuDocument[]> {
    return await menuModel.find();
  }
}