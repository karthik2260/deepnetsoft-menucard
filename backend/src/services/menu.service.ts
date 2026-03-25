import type { MenuNode } from "../interfaces/menu.interface";
import type { MenuDocument } from "../models/menu.model";
import { CustomError } from "../errors/customError";
import HTTP_statusCode from "../enums/httpStatusCode";
import { IMenuRepository } from "../interfaces/repositoryInterfaces/menu.repository.interface";
export class MenuService {
  constructor(private menuRepo: IMenuRepository) {}

  createMenu = async (data: Partial<MenuDocument>) => {
    try {
      if (!data.name) {
        throw new CustomError(
          "Menu name is required",
          HTTP_statusCode.BAD_REQUEST
        );
      }

      return await this.menuRepo.create(data);

    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw new CustomError(
        "Failed to create menu",
        HTTP_statusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  getMenus = async (): Promise<MenuNode[]> => {
    try {
      const menus = await this.menuRepo.findAll();
      return this.constructMenuHierarchy(menus);
    } catch (error) {
      throw new CustomError(
        "Failed to fetch menus",
        HTTP_statusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  private constructMenuHierarchy(menus: MenuDocument[]): MenuNode[] {
    const map = new Map<string, MenuNode>();
    const roots: MenuNode[] = [];

    menus.forEach((menu) => {
      const id = menu._id.toString();

      map.set(id, {
        _id: id,
        name: menu.name,
        ...(menu.description !== undefined && { description: menu.description }),
        parentId: menu.parentId ? menu.parentId.toString() : null,
        children: [],
      });
    });

    menus.forEach((menu) => {
      const id = menu._id.toString();
      const parentId = menu.parentId ? menu.parentId.toString() : null;

      if (parentId && map.has(parentId)) {
        map.get(parentId)!.children.push(map.get(id)!);
      } else {
        roots.push(map.get(id)!);
      }
    });

    return roots;
  }
}