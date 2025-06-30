'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // ensure uuid-ossp is enabled in an earlier migration
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(
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
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      hasVerificationBadge: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      subscriptionTier: {
        type: Sequelize.ENUM("free", "pro", "premium"),
        allowNull: false,
        defaultValue: "free",
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      specialization: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      practiceYears: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      barCouncilNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      suspendedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastLoginAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      preferences: {
        type: Sequelize.JSONB,
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
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
