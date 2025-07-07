// src/models/index.ts

import sequelize from '../config/database';  // your existing Sequelize instance

// 1️⃣ Side-effect imports to initialize all models
import './User';
import './CaseFolder';
import './Document';
import './ClerkHire';
import './Rating';

// 2️⃣ Now pull in the typed exports
import User         from './User';
import CaseFolder   from './CaseFolder';
import Document     from './Document';
import ClerkHire    from './ClerkHire';
import Rating       from './Rating';

// === Associations ===

// Documents ↔ Users
User.hasMany(Document,   { foreignKey: 'userId',    as: 'documents' });
Document.belongsTo(User, { foreignKey: 'userId',    as: 'owner'     });

// Documents ↔ CaseFolders
CaseFolder.hasMany(Document,   { foreignKey: 'caseFolderId', as: 'documents'  });
Document.belongsTo(CaseFolder, { foreignKey: 'caseFolderId', as: 'caseFolder' });

// ClerkHires ↔ Users
User.hasMany(ClerkHire, { foreignKey: 'clerkId',  as: 'hiresReceived' });
User.hasMany(ClerkHire, { foreignKey: 'clientId', as: 'hiresMade'     });
ClerkHire.belongsTo(User,    { foreignKey: 'clerkId',  as: 'clerk'  });
ClerkHire.belongsTo(User,    { foreignKey: 'clientId', as: 'client' });

// Ratings ↔ Users
User.hasMany(Rating, { foreignKey: 'clerkId', as: 'ratingsReceived' });
User.hasMany(Rating, { foreignKey: 'raterId', as: 'ratingsGiven'    });
Rating.belongsTo(User, { foreignKey: 'clerkId', as: 'clerk' });
Rating.belongsTo(User, { foreignKey: 'raterId', as: 'rater' });

export {
  sequelize,
  User,
  CaseFolder,
  Document,
  ClerkHire,
  Rating,
};
