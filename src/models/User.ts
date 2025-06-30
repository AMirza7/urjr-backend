// src/models/User.ts

import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  ModelAttributes,
} from "sequelize";
import sequelize from "../config/database";

// 1. Full attribute interface
export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  phone?: string | null;
  name: string;
  role:
    | "lawyer"
    | "junior_lawyer"
    | "legal_assistant"
    | "office_helper"
    | "law_student"
    | "admin"
    | "user";
  isVerified: boolean;
  isApproved: boolean;
  hasVerificationBadge: boolean;
  subscriptionTier: "free" | "pro" | "premium";
  profilePicture?: string | null;
  bio?: string | null;
  specialization?: string[] | null;
  practiceYears?: number | null;
  barCouncilNumber?: string | null;
  address?: string | null;
  isActive: boolean;
  suspendedAt?: Date | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    theme: string;
    language: string;
    notifications: {
      push: boolean;
      email: boolean;
      caseUpdates: boolean;
      reminders: boolean;
      marketing: boolean;
    };
    privacy: {
      profileVisible: boolean;
      contactInfoVisible: boolean;
      showOnlineStatus: boolean;
    };
  };
}

// 2. Creation subset (all fields with defaults or you don't want to provide in .create() must be optional)
export type UserCreationAttributes = Optional<
  UserAttributes,
  | "id"
  | "phone"
  | "profilePicture"
  | "bio"
  | "specialization"
  | "practiceYears"
  | "barCouncilNumber"
  | "address"
  | "suspendedAt"
  | "lastLoginAt"
  | "createdAt"
  | "updatedAt"
  | "isVerified"
  | "isApproved"
  | "hasVerificationBadge"
  | "subscriptionTier"
  | "isActive"
  | "preferences"
>;

// 3. The Model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public email!: string;
  public password!: string;
  public phone!: string | null;
  public name!: string;
  public role!:
    | "lawyer"
    | "junior_lawyer"
    | "legal_assistant"
    | "office_helper"
    | "law_student"
    | "admin"
    | "user";
  public isVerified!: boolean;
  public isApproved!: boolean;
  public hasVerificationBadge!: boolean;
  public subscriptionTier!: "free" | "pro" | "premium";
  public profilePicture!: string | null;
  public bio!: string | null;
  public specialization!: string[] | null;
  public practiceYears!: number | null;
  public barCouncilNumber!: string | null;
  public address!: string | null;
  public isActive!: boolean;
  public suspendedAt!: Date | null;
  public lastLoginAt!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public preferences!: UserAttributes["preferences"];
}

// 4. Typed attributes block
const userAttrs: ModelAttributes<User, UserAttributes> = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(
      "lawyer",
      "junior_lawyer",
      "legal_assistant",
      "office_helper",
      "law_student",
      "admin",
      "user"
    ),
    allowNull: false,
    defaultValue: "user",
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  hasVerificationBadge: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  subscriptionTier: {
    type: DataTypes.ENUM("free", "pro", "premium"),
    allowNull: false,
    defaultValue: "free",
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  specialization: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  practiceYears: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  barCouncilNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  suspendedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  preferences: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {
      theme: "system",
      language: "en",
      notifications: {
        push: true,
        email: true,
        caseUpdates: true,
        reminders: true,
        marketing: false,
      },
      privacy: {
        profileVisible: true,
        contactInfoVisible: false,
        showOnlineStatus: true,
      },
    },
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
};

// 5. Initialize (cast just for this call)
User.init(userAttrs as any, {
  sequelize,
  modelName: "User",
  tableName: "users",
  timestamps: true,
});

export default User;
