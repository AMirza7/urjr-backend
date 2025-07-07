// src/models/ClerkHire.ts
import {
  Model,
  DataTypes,
  Optional
} from 'sequelize';
import sequelize           from '../config/database';
import User                from './User';
import LegalTemplate       from './LegalTemplate';

// 1️⃣ Define the shape of a ClerkHire row
interface ClerkHireAttributes {
  id:            string;
  clerkId:       string;
  clientId:      string;
  templateId:    string | null;
  amount:        number;
  commission:    number;
  status:        'pending' | 'paid' | 'completed';
  transactionId: string;            // ← new
  createdAt?:    Date;
  updatedAt?:    Date;
}

// 2️⃣ Define which attributes are optional when creating a new record
interface ClerkHireCreationAttributes
  extends Optional<
    ClerkHireAttributes,
    'id' | 'createdAt' | 'updatedAt'
  > {}

// 3️⃣ Define the Model class, with generics
export class ClerkHire
  extends Model<ClerkHireAttributes, ClerkHireCreationAttributes>
  implements ClerkHireAttributes {
  public id!: string;
  public clerkId!: string;
  public clientId!: string;
  public templateId!: string | null;
  public amount!: number;
  public commission!: number;
  public status!: 'pending' | 'paid' | 'completed';
  public transactionId!: string;     // ← new

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4️⃣ Initialize the model
ClerkHire.init(
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
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    templateId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    commission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'completed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    transactionId: {               // ← new column definition
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,                // shared Sequelize instance
    modelName: 'ClerkHire',
    tableName: 'clerk_hires',
    timestamps: true,
  }
);

// 5️⃣ Set up associations
ClerkHire.belongsTo(User, {
  as: 'clerk',
  foreignKey: 'clerkId',
});
ClerkHire.belongsTo(User, {
  as: 'client',
  foreignKey: 'clientId',
});
ClerkHire.belongsTo(LegalTemplate, {
  as: 'template',
  foreignKey: 'templateId',
});

export default ClerkHire;
