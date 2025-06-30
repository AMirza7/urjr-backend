// src/models/CaseFolder.ts
import {
    Model,
    DataTypes,
    Optional,
    ModelAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  import User from "./User";  // ← default import, not `{ User }`
  
  // 1. Attribute interfaces
  export interface CaseFolderAttributes {
    id: string;
    title: string;
    caseNumber: string;
    clientName: string;
    caseType: string;
    court: string;
    status: string;
    userId: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type CaseFolderCreationAttributes = Optional<
    CaseFolderAttributes,
    "id" | "createdAt" | "updatedAt"
  >;
  
  // 2. Model class
  export class CaseFolder
    extends Model<CaseFolderAttributes, CaseFolderCreationAttributes>
    implements CaseFolderAttributes
  {
    public id!: string;
    public title!: string;
    public caseNumber!: string;
    public clientName!: string;
    public caseType!: string;
    public court!: string;
    public status!: string;
    public userId!: string;
    public description!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  
    // association mixin
    public getUser!: () => Promise<User>;
  
    static associate() {
      CaseFolder.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  
  // 3. Typed attributes block
  const caseFolderAttrs: ModelAttributes<
    CaseFolder,
    CaseFolderAttributes
  > = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caseType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    court: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // explicitly declare timestamps:
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
  };
  
  // 4. Initialize (cast to any to satisfy TS)
  CaseFolder.init(caseFolderAttrs as any, {
    sequelize,
    modelName: "CaseFolder",
    tableName: "casefolders",
    timestamps: true,
  });
  
  export default CaseFolder;
  