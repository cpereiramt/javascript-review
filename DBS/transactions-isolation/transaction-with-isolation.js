const { Sequelize } = require('sequelize');
const {User,sequelize} = require("./userModel.js");

async function createUserWithIsolation() {
  const t = await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE });

  try {
    const user = await User.create({
      username: 'jane_doe',
      email: 'jane@example.com'
    }, { transaction: t });

    // Simulando outra operação dentro da mesma transação
    user.username = 'jane_doe_updated';
    await user.save({ transaction: t });

    // Confirma a transação
    await t.commit();
    console.log('Transação completada com sucesso!');
  } catch (error) {
    // Desfaz a transação em caso de erro
    await t.rollback();
    console.error('Erro na transação, desfazendo mudanças:', error);
  }
}

createUserWithIsolation();
