import {
    Model,
    DataTypes,
    Optional,
    Sequelize
  } from "sequelize";
  import sequelize from "../config/database";
  
  export interface LegalTemplateAttributes {
    id: string;
    category: string;
    title: string;
    description: string;
    content: string;
    placeholders: string[];
    downloads: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type LegalTemplateCreationAttributes = Optional<
    LegalTemplateAttributes,
    "id" | "downloads" | "createdAt" | "updatedAt"
  >;
  
  class LegalTemplate
    extends Model<LegalTemplateAttributes, LegalTemplateCreationAttributes>
    implements LegalTemplateAttributes
  {
    public id!: string;
    public category!: string;
    public title!: string;
    public description!: string;
    public content!: string;
    public placeholders!: string[];
    public downloads!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  LegalTemplate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      placeholders: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
      downloads: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LegalTemplate",
      tableName: "legaltemplates",
      underscored: false,
    }
  );
  
  export default LegalTemplate;
  