import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface NotificationAttributes {
  id: string;
  userId: string;
  type: "email" | "push" | "in_app";
  message: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NotificationCreationAttributes = Optional<NotificationAttributes, "id" | "isRead" | "createdAt" | "updatedAt">;

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: string;
  public userId!: string;
  public type!: "email" | "push" | "in_app";
  public message!: string;
  public isRead!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Notification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("email", "push", "in_app"),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    underscored: true,
  }
);

export default Notification;
