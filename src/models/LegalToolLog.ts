import {
    DataTypes, Model, Optional
  } from "sequelize";
  import sequelize from "../config/database";
  
  interface LegalToolLogAttributes {
    id: string;
    toolName: string;
    userId?: string;
    inputSummary?: any;
    status: "success" | "failure";
    durationMs: number;
    createdAt?: Date;
  }
  
  export type LegalToolLogCreation = Optional<LegalToolLogAttributes, "id" | "userId" | "inputSummary" | "createdAt">;
  
  class LegalToolLog extends Model<LegalToolLogAttributes, LegalToolLogCreation> implements LegalToolLogAttributes {
    public id!: string;
    public toolName!: string;
    public userId?: string;
    public inputSummary?: any;
    public status!: "success" | "failure";
    public durationMs!: number;
    public createdAt?: Date;
  }
  
  LegalToolLog.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      toolName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "tool_name",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "user_id",
      },
      inputSummary: {
        type: DataTypes.JSONB,
        allowNull: true,
        field: "input_summary",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      durationMs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "duration_ms",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
    },
    {
      sequelize,
      tableName: "legal_tool_logs",
      timestamps: false,
    }
  );
  
  export default LegalToolLog;
  