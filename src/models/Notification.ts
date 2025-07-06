// src/models/Notification.ts

import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface NotificationAttributes {
  id: string;
  userId: string;
  type: "email" | "push" | "in_app" | "template_approved" | "template_rejected";
  message: string;
  isRead: boolean;
  meta?: object | null;
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationCreationAttributes = Optional<
  NotificationAttributes,
  "id" | "isRead" | "meta" | "createdAt" | "updatedAt"
>;

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: string;
  public userId!: string;
  public type!: NotificationAttributes["type"];
  public message!: string;
  public isRead!: boolean;
  public meta?: object | null;

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
      field: "user_id",
      references: { model: "users", key: "id" },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM(
        "email",
        "push",
        "in_app",
        "template_approved",
        "template_rejected"
      ),
      allowNull: false,
      defaultValue: "in_app",
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "read",
    },
    meta: {
      type: DataTypes.JSONB,
      allowNull: true,
      field: "metadata",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
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
