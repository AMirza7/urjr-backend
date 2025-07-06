import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Subscription extends Model {
  public id!: string;
  public userId!: string;
  public tier!: 'free'|'pro'|'premium';
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'active'|'expired'|'cancelled';
}

Subscription.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  tier: {
    type: DataTypes.ENUM('free','pro','premium'),
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active','expired','cancelled'),
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  sequelize,
  tableName: 'Subscriptions',
});

Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Subscription, { foreignKey: 'userId', as: 'subscriptions' });

export default Subscription;
