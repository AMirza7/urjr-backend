import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
    ModelAttributes,
  } from "sequelize";
  import sequelize from "../config/database";
  import CaseFolder from "./CaseFolder";
  
  export interface CaseTimelineEventAttributes {
    id: string;
    caseId: string;
    title: string;
    description: string;
    date: Date;
    type: "filing" | "hearing" | "order" | "payment" | "document" | "meeting";
    status: "completed" | "upcoming" | "overdue";
    documents: string[]; // UUID array
    notes?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type CaseTimelineEventCreationAttributes = Optional<
    CaseTimelineEventAttributes,
    "id" | "documents" | "notes" | "createdAt" | "updatedAt"
  >;
  
  class CaseTimelineEvent
    extends Model<CaseTimelineEventAttributes, CaseTimelineEventCreationAttributes>
    implements CaseTimelineEventAttributes
  {
    public id!: string;
    public caseId!: string;
    public title!: string;
    public description!: string;
    public date!: Date;
    public type!: "filing" | "hearing" | "order" | "payment" | "document" | "meeting";
    public status!: "completed" | "upcoming" | "overdue";
    public documents!: string[];
    public notes?: string | null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  CaseTimelineEvent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      caseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "CaseFolders", key: "id" },
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("filing", "hearing", "order", "payment", "document", "meeting"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("completed", "upcoming", "overdue"),
        allowNull: false,
      },
      documents: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: true,
        defaultValue: [],
      },
      notes: {
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
      modelName: "CaseTimelineEvent",
      tableName: "CaseTimelineEvents",
      timestamps: true,
    }
  );
  
  // Associations
  CaseTimelineEvent.belongsTo(CaseFolder, { foreignKey: "caseId", as: "caseFolder" });
  CaseFolder.hasMany(CaseTimelineEvent, { foreignKey: "caseId", as: "timelineEvents" });
  
  export default CaseTimelineEvent;
  