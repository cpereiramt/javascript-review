const {User,sequelize} = require("./userModel.js");

  async function createUserTransaction() {
    const t = await sequelize.transaction();
  
    try {
      const user = await User.create({
        username: 'john_doe',
        email: 'john@example.com'
      }, { transaction: t });
  
      // Simulando outra operação dentro da mesma transação
      user.username = 'john_doe_updated';
      await user.save({ transaction: t });
      await new Promise(resolve => setTimeout(resolve,2000));
      // Confirma a transação
      await t.commit();
      console.log('Transação completada com sucesso!');
    } catch (error) {
      // Desfaz a transação em caso de erro
      await t.rollback();
      console.error('Erro na transação, desfazendo mudanças:', error);
    }
  }
  createUserTransaction();
  