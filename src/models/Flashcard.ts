import {
    Model,
    DataTypes,
    Optional,
    Sequelize,
  } from "sequelize";
  import sequelize from "../config/database";
  
  export interface FlashcardAttributes {
    id: string;
    question: string;
    answer: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    lastReviewed?: Date | null;
    timesReviewed: number;
    correctAnswers: number;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type FlashcardCreationAttributes = Optional<
    FlashcardAttributes,
    "id" | "lastReviewed" | "timesReviewed" | "correctAnswers" | "createdAt" | "updatedAt"
  >;
  
  class Flashcard
    extends Model<FlashcardAttributes, FlashcardCreationAttributes>
    implements FlashcardAttributes
  {
    public id!: string;
    public question!: string;
    public answer!: string;
    public category!: string;
    public difficulty!: "easy" | "medium" | "hard";
    public tags!: string[];
    public lastReviewed!: Date | null;
    public timesReviewed!: number;
    public correctAnswers!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  Flashcard.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      question: { type: DataTypes.TEXT, allowNull: false },
      answer: { type: DataTypes.TEXT, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      difficulty: { type: DataTypes.ENUM("easy", "medium", "hard"), allowNull: false },
      tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false, defaultValue: [] },
      lastReviewed: { type: DataTypes.DATE, allowNull: true },
      timesReviewed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      correctAnswers: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Flashcard",
      tableName: "flashcards",
      underscored: false,
    }
  );
  
  export default Flashcard;
  