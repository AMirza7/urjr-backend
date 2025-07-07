// src/models/Rating.ts
import {
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import sequelize from '../config/database';
import User      from './User';

// 1️⃣ The shape of a row in "ratings"
interface RatingAttributes {
  id:        string;
  clerkId:   string;
  raterId:   string;
  score:     number;
  comment:   string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2️⃣ Which fields are optional when creating
interface RatingCreationAttributes
  extends Optional<RatingAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// 3️⃣ The Model class with generics
export class Rating
  extends Model<RatingAttributes, RatingCreationAttributes>
  implements RatingAttributes {
  public id!: string;
  public clerkId!: string;
  public raterId!: string;
  public score!: number;
  public comment!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize (register fields & options)
Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    clerkId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    raterId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings',
    timestamps: true,
  }
);

// 5️⃣ Associations
// A rating belongs to the clerk user and the rater user
Rating.belongsTo(User, {
  as: 'clerk',
  foreignKey: 'clerkId',
});
Rating.belongsTo(User, {
  as: 'rater',
  foreignKey: 'raterId',
});

export default Rating;
