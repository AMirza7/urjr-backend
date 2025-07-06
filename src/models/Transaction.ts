import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Transaction extends Model {
  public id!: string;
  public userId!: string;
  public amount!: number;
  public method!: string;
  public status!: 'pending'|'success'|'failed';
  public metadata?: object;
}

Transaction.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending','success','failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'Transactions',
});

Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });

export default Transaction;
