import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

export interface PinboardPostAttributes {
  id: string;
  content: string;
  tags: string[];           // Array of tags
  priority: string;         // Always store as string (for consistency)
  userId: string;           // Owner (UUID)
  createdAt?: Date;
  updatedAt?: Date;
}

export type PinboardPostCreationAttributes = Optional<
  PinboardPostAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class PinboardPost extends Model<PinboardPostAttributes, PinboardPostCreationAttributes>
  implements PinboardPostAttributes {
  public id!: string;
  public content!: string;
  public tags!: string[];
  public priority!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PinboardPost.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    priority: {
      type: DataTypes.STRING, // always string!
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "pinboard_posts",
    underscored: true,
  }
);

export default PinboardPost;
