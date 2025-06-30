import User from './User';
import CaseFolder from './CaseFolder';
import Document from './Document';

// Associations
User.hasMany(Document, { foreignKey: 'userId' });
Document.belongsTo(User, { foreignKey: 'userId' });

CaseFolder.hasMany(Document, { foreignKey: 'caseFolderId' });
Document.belongsTo(CaseFolder, { foreignKey: 'caseFolderId' });

export { User, CaseFolder, Document };
