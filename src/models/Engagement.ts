import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Engagement extends Model {
  public id!: string;
  public clientId!: string;
  public clerkId!: string;
  public fee!: number;
  public commission!: number;
  public status!: 'pending'|'active'|'completed'|'cancelled';
}

Engagement.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  clerkId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  fee: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  commission: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: {
    type: DataTypes.ENUM('pending','active','completed','cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  sequelize,
  tableName: 'Engagements',
});

Engagement.belongsTo(User, { foreignKey: 'clientId', as: 'client' });
Engagement.belongsTo(User, { foreignKey: 'clerkId', as: 'clerk' });

export default Engagement;
