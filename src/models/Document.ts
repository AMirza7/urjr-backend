// src/models/Document.ts

import {
    Model, DataTypes, Optional, Sequelize
  } from "sequelize";
  import sequelize from "../config/database";
  
  export interface DocumentAttributes {
    id: string;
    userId: string;
    caseFolderId?: string | null;
    name: string;
    fileType: string;
    fileSize: number;
    fileUrl: string;
    tags?: string[] | null;
    isEncrypted: boolean;
    deletedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type DocumentCreationAttributes = Optional<
    DocumentAttributes,
    "id" | "caseFolderId" | "tags" | "isEncrypted" | "deletedAt" | "createdAt" | "updatedAt"
  >;
  
  class Document extends Model<DocumentAttributes, DocumentCreationAttributes>
    implements DocumentAttributes {
    public id!: string;
    public userId!: string;
    public caseFolderId!: string | null;
    public name!: string;
    public fileType!: string;
    public fileSize!: number;
    public fileUrl!: string;
    public tags!: string[] | null;
    public isEncrypted!: boolean;
    public deletedAt!: Date | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Document.init(
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
      caseFolderId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      isEncrypted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
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
      modelName: "Document",
      tableName: "documents",
      timestamps: true,
      paranoid: true, // enables soft-delete (sets deletedAt)
    }
  );
  
  export default Document;
  