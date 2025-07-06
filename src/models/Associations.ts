// src/models/associations.ts

import State from "./State";
import City from "./City";
import User from "./User";
import LegalTemplate from "./LegalTemplate";
import Transaction from "./Transaction";
import Subscription from "./Subscription";
import Engagement from "./Engagement";
import Flashcard from "./Flashcard";
import FlashcardSession from "./FlashcardSession";
import SecureNote from "./SecureNote";
import PinboardPost from "./PinboardPost";
import Notification from "./Notification";
import LegalToolLog from "./LegalToolLog";

/**
 * Call this once after importing all model classes,
 * so Sequelize can set up each relationship.
 */
export function initAssociations() {
  // State <> City
  State.hasMany(City,          { foreignKey: "stateId",       as: "cities"             });
  City.belongsTo(State,        { foreignKey: "stateId",       as: "parentState"        });

  // User ← State/City (residence)
  User.belongsTo(State,        { foreignKey: "stateId",       as: "residenceState"     });
  User.belongsTo(City,         { foreignKey: "cityId",        as: "residenceCity"      });

  // Engagement ← User 
  User.hasMany(Engagement,     { foreignKey: "userId",        as: "engagements"        });
  Engagement.belongsTo(User,   { foreignKey: "userId",        as: "engagementUser"     });

  // Flashcard ← User
  User.hasMany(Flashcard,      { foreignKey: "ownerId",       as: "ownedFlashcards"    });
  Flashcard.belongsTo(User,    { foreignKey: "ownerId",       as: "flashcardOwner"     });

  // FlashcardSession ← Flashcard
  Flashcard.hasMany(FlashcardSession, { foreignKey: "flashcardId", as: "sessions"          });
  FlashcardSession.belongsTo(Flashcard, { foreignKey: "flashcardId", as: "parentFlashcard"  });

  // SecureNote ← User
  User.hasMany(SecureNote,     { foreignKey: "userId",        as: "secureNotes"        });
  SecureNote.belongsTo(User,   { foreignKey: "userId",        as: "noteOwner"          });

  // PinboardPost ← User
  User.hasMany(PinboardPost,   { foreignKey: "userId",        as: "pinboardPosts"      });
  PinboardPost.belongsTo(User, { foreignKey: "userId",        as: "postAuthor"         });

  // Notification ← User
  User.hasMany(Notification,   { foreignKey: "userId",        as: "notifications"      });
  Notification.belongsTo(User, { foreignKey: "userId",        as: "notificationUser"   });

  // LegalTemplate ← User
  User.hasMany(LegalTemplate,  { foreignKey: "userId",        as: "createdTemplates"   });
  LegalTemplate.belongsTo(User,{ foreignKey: "userId",        as: "templateCreator"    });

  // Transaction ← User
  User.hasMany(Transaction,     { foreignKey: "userId",        as: "userTransactions"   });
  Transaction.belongsTo(User,   { foreignKey: "userId",        as: "transactionUser"    });

  // Transaction ← Subscription
  Subscription.hasMany(Transaction,    { foreignKey: "subscriptionId", as: "subscriptionTransactions" });
  Transaction.belongsTo(Subscription,  { foreignKey: "subscriptionId", as: "parentSubscription"       });

  // Subscription ← User
  User.hasMany(Subscription,   { foreignKey: "userId",        as: "userSubscriptions"  });
  Subscription.belongsTo(User, { foreignKey: "userId",        as: "subscriber"         });

  // LegalToolLog ← User
  User.hasMany(LegalToolLog,   { foreignKey: "userId",        as: "toolLogs"           });
  LegalToolLog.belongsTo(User, { foreignKey: "userId",        as: "toolLogUser"        });
}
