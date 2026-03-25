import type { MenuDocument } from "../../models/menu.model";

export interface IMenuRepository {
  create(data: Partial<MenuDocument>): Promise<MenuDocument>;
  findAll(): Promise<MenuDocument[]>;
}