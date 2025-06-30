import {
    Model, DataTypes, Optional, Sequelize
  } from "sequelize";
  import sequelize from "../config/database";
  import User from "./User";
  
  export interface SecureNoteAttributes {
    id: string;
    title: string;
    content: string;
    encrypted: boolean;
    tags: string[];
    caseId?: string | null;
    isPrivate: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type SecureNoteCreationAttributes = Optional<
    SecureNoteAttributes,
    "id" | "tags" | "caseId" | "isPrivate" | "createdAt" | "updatedAt"
  >;
  
  class SecureNote extends Model<SecureNoteAttributes, SecureNoteCreationAttributes>
    implements SecureNoteAttributes {
    public id!: string;
    public title!: string;
    public content!: string;
    public encrypted!: boolean;
    public tags!: string[];
    public caseId?: string | null;
    public isPrivate!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  SecureNote.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      encrypted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      caseId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: { model: "casefolders", key: "id" },
        onDelete: "SET NULL",
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: "SecureNotes",
      underscored: false,
    }
  );
  
  SecureNote.belongsTo(User, { foreignKey: "userId", as: "user" }); // if you store userId
  
  export default SecureNote;
  