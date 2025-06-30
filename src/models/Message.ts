import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

export interface MessageAttributes {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  content: string;
  sentAt: Date;
  readAt?: Date | null;
  caseId?: string | null;
  attachments?: string[] | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MessageCreationAttributes = Optional<
  MessageAttributes,
  "id" | "readAt" | "caseId" | "attachments" | "createdAt" | "updatedAt"
>;

class Message extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes {
  public id!: string;
  public senderId!: string;
  public recipientId!: string;
  public subject!: string;
  public content!: string;
  public sentAt!: Date;
  public readAt?: Date | null;
  public caseId?: string | null;
  public attachments?: string[] | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    recipientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    caseId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    attachments: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: true,
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    underscored: false,
  }
);

export default Message;
