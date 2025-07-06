import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import City from './City';

class State extends Model {
  public id!: string;
  public name!: string;
  public code?: string;
}

State.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  code: DataTypes.STRING(10),
}, {
  sequelize,
  tableName: 'states',
});

State.hasMany(City, { foreignKey: 'stateId', as: 'cities' });
export default State;
