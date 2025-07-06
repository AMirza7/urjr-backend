import {
  Model,
  DataTypes,
  Optional
} from "sequelize";
import sequelize from "../config/database";
import User from "./User";

export interface LegalTemplateAttributes {
  id: string;
  userId: string;
  category: string;
  title: string;
  description: string;
  content: string;
  placeholders: string[];
  downloads: number;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export type LegalTemplateCreationAttributes = Optional<
  LegalTemplateAttributes,
  | "id"
  | "downloads"
  | "status"
  | "rejectionReason"
  | "createdAt"
  | "updatedAt"
>;

class LegalTemplate
  extends Model<LegalTemplateAttributes, LegalTemplateCreationAttributes>
  implements LegalTemplateAttributes {
  public id!: string;
  public userId!: string;
  public category!: string;
  public title!: string;
  public description!: string;
  public content!: string;
  public placeholders!: string[];
  public downloads!: number;
  public status!: 'pending' | 'approved' | 'rejected';
  public rejectionReason!: string | null;
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
      references: { model: 'users', key: 'id' },
    },
    category: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    placeholders: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    downloads: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: {
      type: DataTypes.ENUM('pending','approved','rejected'),
      allowNull: false,
      defaultValue: 'pending',
    },
    rejectionReason: {
      type: DataTypes.TEXT,
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
    modelName: "LegalTemplate",
    tableName: "legal_templates",
    underscored: true,
  }
);

// Associations
LegalTemplate.belongsTo(User, { foreignKey: 'userId', as: 'creator' });
User.hasMany(LegalTemplate, { foreignKey: 'userId', as: 'templates' });

export default LegalTemplate;