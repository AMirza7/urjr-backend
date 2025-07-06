import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';


class City extends Model {
  public id!: string;
  public name!: string;
  public stateId!: string;
}

City.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  stateId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'cities',
});


export default City;
