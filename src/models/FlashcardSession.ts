import {
    Model,
    DataTypes,
    Optional,
  } from "sequelize";
  import sequelize from "../config/database";
  
  export interface FlashcardSessionAttributes {
    id: string;
    userId: string;
    category: string;
    totalCards: number;
    correctAnswers: number;
    score: number;
    timeSpent: number;
    completedAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type FlashcardSessionCreationAttributes = Optional<
    FlashcardSessionAttributes,
    "id" | "createdAt" | "updatedAt"
  >;
  
  class FlashcardSession extends Model<
    FlashcardSessionAttributes,
    FlashcardSessionCreationAttributes
  > implements FlashcardSessionAttributes {
    public id!: string;
    public userId!: string;
    public category!: string;
    public totalCards!: number;
    public correctAnswers!: number;
    public score!: number;
    public timeSpent!: number;
    public completedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  FlashcardSession.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      totalCards: { type: DataTypes.INTEGER, allowNull: false },
      correctAnswers: { type: DataTypes.INTEGER, allowNull: false },
      score: { type: DataTypes.DOUBLE, allowNull: false },
      timeSpent: { type: DataTypes.INTEGER, allowNull: false },
      completedAt: { type: DataTypes.DATE, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      modelName: "FlashcardSession",
      tableName: "flashcardsessions", // this matches your migration/camelCase table name
      underscored: false,             // disables snake_case <-> camelCase mapping
      timestamps: true,
    }
  );
  
  export default FlashcardSession;
  